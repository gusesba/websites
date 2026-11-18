import { cp, mkdir, mkdtemp, readdir, readFile, rename, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Build isolated snapshots so each demo keeps its original typography, CSS and interactions.
const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, 'public', 'demos');
const demos = [
  { folder: 'barbearia', slug: 'bravio', credits: ['README.md', 'REACT-BITS-LICENSE.md'] },
  { folder: 'cafe', slug: 'breu', credits: ['THIRD-PARTY.md', 'REACT-BITS-LICENSE.md', 'TRANSITIONS-LICENSE.txt'] },
  { folder: 'detalhamento', slug: 'nor', credits: ['docs/credits.md', 'docs/licenses'] },
];

async function prefixAssets(folder, prefix) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      await prefixAssets(file, prefix);
    } else if (/\.(jsx?|css)$/.test(file)) {
      const source = await readFile(file, 'utf8');
      const updated = source.replace(/(["'`(])\/(images\/|fonts\/|favicon\.svg)/g, '$1' + prefix + '/$2');
      if (updated !== source) await writeFile(file, updated);
    }
  }
}

await mkdir(destination, { recursive: true });
for (const { folder, slug, credits } of demos) {
  const source = path.resolve(root, '..', folder);
  const work = await mkdtemp(path.join(root, '.demo-build-'));
  const prefix = '/demos/' + slug;
  try {
    await cp(path.join(source, 'src'), path.join(work, 'src'), { recursive: true });
    await cp(path.join(source, 'public'), path.join(work, 'public'), { recursive: true });
    await cp(path.join(source, 'package.json'), path.join(work, 'package.json'));
    await symlink(path.join(source, 'node_modules'), path.join(work, 'node_modules'), 'junction');
    await prefixAssets(path.join(work, 'src'), prefix);
    if (slug === 'nor') {
      // NÓR renders different hero markup for reduced motion. Keep its first render
      // identical to the static HTML until React reads the visitor's preference.
      const app = path.join(work, 'src', 'App.jsx');
      const text = await readFile(app, 'utf8');
      await writeFile(app, text.replaceAll('const reduced = useReducedMotion();', [
        'const prefersReduced = useReducedMotion();',
        '  const [mounted, setMounted] = useState(false);',
        '  useEffect(() => setMounted(true), []);',
        '  const reduced = mounted && prefersReduced;',
      ].join('\n')));
    }
    await writeFile(path.join(work, 'next.config.mjs'), 'export default ' + JSON.stringify({
      output: 'export', basePath: prefix, images: { unoptimized: true }, devIndicators: false,
    }));
    const build = spawnSync(process.execPath, [path.join(source, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], {
      cwd: work, stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    });
    if (build.status !== 0) throw new Error('Falha ao gerar ' + slug);
    const output = path.join(work, 'out');
    for (const credit of credits) {
      await cp(path.join(source, credit), path.join(output, 'creditos', path.basename(credit)), { recursive: true });
    }
    const target = path.join(destination, slug);
    if (path.dirname(target) !== destination) throw new Error('Destino inválido');
    try {
      await rename(target, path.join(work, 'anterior'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    try {
      await rename(output, target);
    } catch (err) {
      await rename(path.join(work, 'anterior'), target).catch(() => {});
      throw err;
    }
  } finally {
    if (path.dirname(work) === path.resolve(root) && path.basename(work).startsWith('.demo-build-')) {
      await rm(work, { recursive: true, force: true });
    }
  }
}
