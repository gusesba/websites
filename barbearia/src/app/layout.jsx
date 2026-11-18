import '../transitions.css';
import '../styles.css';

export const metadata = {
  title: 'BRAVIO — Barbearia de Curitiba',
  description: 'BRAVIO. Corte com personalidade, barba no capricho e uma pausa na correria de Curitiba. Conheça este projeto conceitual de barbearia.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'BRAVIO — Seu estilo. Sem concessões.',
    description: 'Barbearia de Curitiba. Um projeto conceitual de design e desenvolvimento web.',
    type: 'website',
  },
};

export const viewport = { themeColor: '#181a18' };

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
