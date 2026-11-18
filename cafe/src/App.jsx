import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowLeft, Menu, X, Plus } from 'lucide-react';
import BlurText from './components/BlurText';
import { menu, gallery, formatPrice } from './data';

const links = [['A bréu', '#sobre'], ['Nosso café', '#cafe'], ['Cardápio', '#cardapio'], ['O espaço', '#espaco']];
const ease = [0.22, 1, 0.36, 1];

function Flower({ className = '' }) {
  return <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.25">{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="40" cy="25" rx="8" ry="17" transform={`rotate(${i * 45} 40 40)`} />)}<circle cx="40" cy="40" r="5" /></g></svg>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>;
}

function TextLink({ href, children }) {
  return <a className="text-link" href={href}>{children}<ArrowUpRight size={18} strokeWidth={1.4} /></a>;
}

// Adapted from Transitions.dev's free Tabs sliding recipe.
function MenuTabs({ category, onChange }) {
  const bar = useRef(null);
  const pill = useRef(null);
  const first = useRef(true);
  useLayoutEffect(() => {
    const move = animate => {
      const tab = bar.current.querySelector('[aria-selected="true"]');
      const indicator = pill.current;
      if (!animate) indicator.style.transition = 'none';
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
      indicator.style.width = `${tab.offsetWidth}px`;
      if (!animate) { void indicator.offsetWidth; indicator.style.transition = ''; }
    };
    move(!first.current);
    first.current = false;
    const resize = new ResizeObserver(() => move(false));
    resize.observe(bar.current);
    document.fonts.ready.then(() => { if (bar.current) move(false); });
    return () => resize.disconnect();
  }, [category]);

  const keys = Object.keys(menu);
  const handleKeys = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % keys.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + keys.length) % keys.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = keys.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    onChange(keys[next]);
    bar.current.querySelectorAll('[role="tab"]')[next].focus();
  };
  return <div ref={bar} className="menu-tabs" role="tablist" aria-label="Categorias do cardápio">
    <span className="tabs-pill" ref={pill} aria-hidden="true" />
    {keys.map((name, index) => <button key={name} id={`tab-${index}`} role="tab" aria-selected={category === name} aria-controls="menu-panel" tabIndex={category === name ? 0 : -1} onKeyDown={e => handleKeys(e, index)} onClick={() => onChange(name)}>{name}</button>)}
  </div>;
}

function GalleryDialog({ selected, onChange, onClose }) {
  const dialog = useRef(null);
  const timer = useRef(null);
  const frame = useRef(null);
  const [phase, setPhase] = useState('');
  const reduced = useReducedMotion();
  const opened = selected !== null;
  useEffect(() => {
    if (!opened) return;
    const element = dialog.current;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    frame.current = requestAnimationFrame(() => setPhase('is-open'));
    return () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(timer.current);
      document.body.style.overflow = previous;
      element.close();
    };
  }, [opened]);
  const close = () => {
    if (phase === 'is-closing') return;
    setPhase('is-closing');
    timer.current = setTimeout(() => { onClose(); setPhase(''); }, reduced ? 0 : 150);
  };
  const step = direction => onChange((selected + direction + gallery.length) % gallery.length);
  return <dialog ref={dialog} className="gallery-dialog" aria-label="Galeria de fotografias" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }}>
    {opened && <div className={`gallery-modal ${phase}`}>
      <button className="dialog-close icon-button" aria-label="Fechar galeria" onClick={close}><X /></button>
      <img src={`/images/${gallery[selected].src}.jpg`} alt={gallery[selected].alt} />
      <div className="dialog-caption"><span aria-live="polite">{gallery[selected].caption}</span><div><button className="icon-button" aria-label="Foto anterior" onClick={() => step(-1)}><ArrowLeft /></button><button className="icon-button" aria-label="Próxima foto" onClick={() => step(1)}><ArrowRight /></button></div></div>
    </div>}
  </dialog>;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState('Cafés');
  const [selected, setSelected] = useState(null);
  const reduced = useReducedMotion();
  const navButton = useRef(null);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') { setMobileOpen(false); navButton.current?.focus(); } };
    if (mobileOpen) document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [mobileOpen]);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="bréu — início">bréu<span>CAFÉ & TEMPO</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="visit-link" href="#visite">Vem ficar um pouco<ArrowUpRight size={16} /></a>
      <button ref={navButton} className="mobile-toggle icon-button" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="mobile-nav" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      <AnimatePresence>{mobileOpen && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : 0.25 }}>
        {[...links, ['Vem nos visitar', '#visite']].map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={20} /></a>)}
        <span>São Francisco · Curitiba, PR</span>
      </motion.nav>}</AnimatePresence>
    </header>

    <main id="conteudo">
      <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> CAFÉ DE ORIGEM. TEMPO DE QUALIDADE.</div>
          <h1 id="hero-title" aria-label="A vida pede uma pausa."><BlurText text="A vida pede" delay={90} distance={18} blur={4} stepDuration={0.4} className="hero-title-line" /><span className="hero-title-italic">uma pausa.</span></h1>
          <Reveal delay={0.3}><p className="hero-description">Um bom café, algo saindo do forno e nenhum<br className="desktop-break" /> motivo para olhar o relógio.</p><a className="button button-green" href="#cardapio">Encontre seu novo favorito<ArrowUpRight size={18} /></a></Reveal>
          <div className="hero-bottom"><span>FEITO COM CALMA.<br />EM CURITIBA.</span><a href="#sobre" className="scroll-cue" aria-label="Conhecer a bréu"><ArrowDown size={19} /></a></div>
        </div>
        <div className="hero-visual">
          <motion.div className="hero-photo" initial={reduced ? false : { opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }}><img src="/images/space.jpg" alt="Cafeteria iluminada, com plantas, tons claros e mesas para uma pausa" fetchPriority="high" width="2000" height="1333" /><span className="photo-note">SEU CANTO NO MEIO DA CIDADE.</span></motion.div>
          <div className="hero-stamp"><span>CAFÉ BOM</span><Flower /><span>SEM PRESSA</span></div>
          <span className="hero-coordinate">25°25′ S &nbsp; 49°16′ O</span>
        </div>
      </section>

      <div className="values-strip" aria-label="Nossa essência"><span>Cafés de pequenos produtores</span><Flower /><span>Cozinha feita aqui</span><Flower /><span>O tempo é seu</span><Flower /><span>Curitiba, de coração</span></div>

      <section className="about section-shell section-space" id="sobre" aria-labelledby="about-title">
        <Reveal className="section-number"><span>01 / A BRÉU</span><Flower /></Reveal>
        <div className="about-main"><Reveal><h2 id="about-title">Entre um compromisso<br />e outro, <em>existe a bréu.</em></h2></Reveal><div className="about-details"><Reveal className="about-image"><img src="/images/interior.jpg" alt="Uma mesa com café, plantas e a luz suave da janela" loading="lazy" width="1800" height="1200" /><span>Um lugar para estar. Só estar.</span></Reveal><Reveal className="about-text" delay={0.1}><p>A gente nasceu da vontade de abrir espaço. Na rotina, na cidade, na mesa.</p><p>Escolhemos os grãos pelo que contam, preparamos a comida com as mãos e deixamos a porta aberta para encontros que não precisam de ocasião.</p><p>Por aqui, até um dia cinza de Curitiba<br />ganha outra luz.</p><TextLink href="#espaco">Conheça o nosso canto</TextLink></Reveal></div></div>
      </section>

      <section className="coffee-section" id="cafe" aria-labelledby="coffee-title">
        <div className="coffee-photo"><img src="/images/hero.jpg" alt="Preparo cuidadoso de café coado com chaleira e filtro de papel" loading="lazy" width="1800" height="1200" /><span className="image-label">DO GRÃO AO SEU MOMENTO.</span></div>
        <div className="coffee-content"><Reveal><span className="eyebrow">02 / NOSSO CAFÉ</span><h2 id="coffee-title">Tem uma história<br />em <em>cada xícara.</em></h2><p>Pequenos produtores brasileiros. Torras que respeitam a origem. Um cuidado que começa bem antes de o café chegar à sua mesa.</p><div className="coffee-origin"><span className="origin-label">NO MOINHO, NESTA TEMPORADA</span><h3>Mantiqueira de Minas</h3><p>Doçura de caramelo, chocolate e um final cítrico.</p><div className="origin-tags"><span>Catuaí amarelo</span><span>Torra média-clara</span></div></div><TextLink href="#cardapio">Descubra seu jeito de tomar</TextLink></Reveal></div>
      </section>

      <section className="menu-section section-shell section-space" id="cardapio" aria-labelledby="menu-title">
        <Reveal className="menu-heading"><div><span className="eyebrow">03 / À MESA</span><h2 id="menu-title">O que vai bem<br />com <em>o seu dia?</em></h2></div><p>Do primeiro gole à última migalha.<br />Coisas simples, feitas com intenção.</p></Reveal>
        <div className="menu-layout"><Reveal className="menu-feature"><div className="menu-feature-photo"><img src="/images/pastry.jpg" alt="Croissants artesanais de massa folhada dourada" loading="lazy" width="1800" height="1200" /><span className="handwritten">feito aqui,<br />todo dia.</span></div><div className="menu-feature-caption"><span>DO FORNO PARA A MESA</span><span>Combina com mais um café. <ArrowUpRight size={15} /></span></div></Reveal>
          <div className="menu-content"><MenuTabs category={category} onChange={setCategory} /><div id="menu-panel" className="menu-panel" role="tabpanel" aria-labelledby={`tab-${Object.keys(menu).indexOf(category)}`} tabIndex={0}><AnimatePresence mode="wait" initial={false}><motion.div key={category} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: reduced ? 0 : 0.18, ease }}>{menu[category].map(item => <div className="menu-item" key={item.name}><div><h3>{item.name}</h3><p>{item.detail}</p></div><span>{formatPrice(item.price)}</span></div>)}</motion.div></AnimatePresence></div><p className="menu-footnote">Leite vegetal disponível. Se tiver alguma restrição alimentar,<br />converse com a gente antes de pedir.</p></div>
        </div>
      </section>

      <section className="space-section" id="espaco" aria-labelledby="space-title"><div className="space-top section-shell"><Reveal><span className="eyebrow">04 / NOSSO CANTO</span><h2 id="space-title">A cidade lá fora.<br /><em>Você, aqui.</em></h2></Reveal><Reveal className="space-description"><p>Luz que entra sem pedir licença. Plantas que crescem devagar. Uma playlist no volume certo.</p><p>Puxe uma cadeira. A mesa também é sua.</p><Flower /></Reveal></div><div className="space-wide"><img src="/images/gallery.jpg" alt="Balcão da cafeteria com cerâmicas, plantas e preparo de café" loading="lazy" width="1800" height="1200" /><div className="space-overlay"><span>ALGUNS LUGARES PEDEM<br />PARA A GENTE FICAR.</span><span>bréu</span></div></div></section>

      <section className="gallery-section section-shell section-space" id="galeria" aria-labelledby="gallery-title"><Reveal className="gallery-heading"><h2 id="gallery-title">Fragmentos de <em>um dia bom.</em></h2><span className="eyebrow">UM OLHAR MAIS DE PERTO <ArrowDown size={15} /></span></Reveal><div className="gallery-grid">{gallery.map((photo, index) => <Reveal key={photo.src} delay={index * 0.06} className={`gallery-item gallery-item-${index}`}><button onClick={() => setSelected(index)} aria-label={`Ampliar foto: ${photo.alt}`}><img src={`/images/${photo.src}.jpg`} alt={photo.alt} loading="lazy" width="900" height="1100" /><span className="gallery-plus"><Plus size={21} /></span></button><span className="gallery-caption">{photo.caption}</span></Reveal>)}</div></section>

      <section className="visit-section section-shell" id="visite" aria-labelledby="visit-title"><div className="visit-intro"><span className="eyebrow">05 / NOS ENCONTRAMOS AQUI</span><Reveal><h2 id="visit-title">Seu próximo<br /><em>“só mais um café”.</em></h2></Reveal><TextLink href="https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Francisco%2C+Curitiba%2C+PR">Explore o bairro</TextLink></div><div className="visit-info"><Flower /><div><span className="eyebrow">NO CORAÇÃO DE CURITIBA</span><p>São Francisco<br />Curitiba, Paraná</p><span className="location-note">Uma esquina imaginada no nosso bairro favorito.</span></div><div className="hours"><span className="eyebrow">TEMPO PARA UM ENCONTRO</span><p><span>Terça a sexta</span><span>9h — 19h</span></p><p><span>Sábado e domingo</span><span>9h — 18h</span></p><small>Segunda é dia de recarregar.</small></div></div></section>
    </main>

    <footer className="site-footer"><div className="footer-top"><a className="footer-brand" href="#inicio" aria-label="Voltar ao início">bréu<span>CAFÉ & TEMPO</span></a><p>O café acaba.<br /><em>A vontade de voltar, não.</em></p><a className="back-top icon-button" href="#inicio" aria-label="Voltar ao início"><ArrowUpRight size={26} /></a></div><div className="footer-bottom"><span>CURITIBA, PR · FEITO PARA FICAR.</span><span>Projeto conceitual de portfólio. Cafeteria e cardápio fictícios.</span><a href="#galeria">Um pouco do nosso olhar <ArrowUpRight size={13} /></a></div></footer>
    <GalleryDialog selected={selected} onChange={setSelected} onClose={() => setSelected(null)} />
  </>;
}
