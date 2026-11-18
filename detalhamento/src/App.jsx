'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowUp, CalendarDays, MapPin, Menu, X, ChevronDown, Check, Diamond, ShieldCheck, Star, Droplets, Armchair, Disc3, Camera, Play, Compass, Crosshair } from 'lucide-react';
import BlurText from './components/react-bits/BlurText';
import Magnet from './components/react-bits/Magnet';
import ShinyText from './components/react-bits/ShinyText';
import SpotlightCard from './components/react-bits/SpotlightCard';
import StarBorder from './components/react-bits/StarBorder';
import ClickSpark from './components/react-bits/ClickSpark';
import Booking from './components/Booking';
import Gallery from './components/Gallery';
import { Brand, Reveal, SectionLabel, TiltCard } from './components/Primitives';
import { services, packages, questions } from './data';

const LightRays = dynamic(() => import('./components/react-bits/LightRays'), { ssr: false });
const serviceIcons = [Droplets, Armchair, ShieldCheck, Disc3];
const navItems = [['inicio', 'Início'], ['servicos', 'Serviços'], ['pacotes', 'Pacotes'], ['galeria', 'Galeria'], ['sobre', 'Sobre'], ['contato', 'Contato']];

function GoldButton({ children, className = '', onClick, href, outline = false, ...props }) {
  return <StarBorder as={href ? 'a' : 'button'} href={href} onClick={onClick} className={`button ${outline ? 'button-outline' : 'button-gold'} ${className}`} radius={40} color="#f4d697" trailColor="#ac8241" duration={5} stars={2} glow={0.8} backgroundColor={outline ? '#0b0b0be0' : '#b58c48'} textColor={outline ? '#f3f1ed' : '#ffffff'} borderColor={outline ? '#ffffff45' : '#d1ad6a'} {...props}>{children}</StarBorder>;
}

function PackageSection({ onBook }) {
  const [large, setLarge] = useState(false);
  const reduced = useReducedMotion();
  return <section className="packages section-pad" id="pacotes"><div className="container">
    <SectionLabel number="02">ESCOLHA A SUA EXPERIÊNCIA</SectionLabel>
    <Reveal className="section-heading"><h2>CADA CARRO, UMA HISTÓRIA.<br /><em>CADA CUIDADO, UM NÍVEL.</em></h2><p>Do cuidado essencial à proteção completa.<br />Encontre a experiência que combina com você.</p></Reveal>
    <div className="package-toolbar"><div className="vehicle-switch" role="group" aria-label="Porte do veículo">{['Hatch / Sedã', 'SUV / Grande porte'].map((label, index) => <button key={label} aria-pressed={large === Boolean(index)} onClick={() => setLarge(Boolean(index))}>{large === Boolean(index) && <motion.span className="switch-pill" layoutId="vehicle-pill" transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} />}<span>{label}</span></button>)}</div><span className="small-note">VALORES ILUSTRATIVOS · PROJETO CONCEITUAL</span></div>
    <div className="package-grid">{packages.map((item, index) => <Reveal key={item.name} delay={index * 0.09}><TiltCard className={item.featured ? 'featured-package' : ''}><SpotlightCard className={`package-card ${item.featured ? 'package-card-featured' : ''}`} spotlightColor="#d5ad64" intensity={0.2} borderGlow={0.95} spotlightSize={350}>
      {item.featured && <div className="package-badge"><Diamond size={12} /> A EXPERIÊNCIA SIGNATURE</div>}
      <span className="package-eyebrow">{item.eyebrow}</span><h3>{item.name}</h3><p className="package-description">{item.description}</p>
      <div className="package-price"><span>A PARTIR DE</span><div><small>R$</small><AnimatePresence mode="wait" initial={false}><motion.strong key={large ? 'large' : 'small'} initial={{ opacity: 0, y: reduced ? 0 : 5, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: reduced ? 0 : -5, filter: 'blur(2px)' }} transition={{ duration: reduced ? 0 : 0.15 }}>{new Intl.NumberFormat('pt-BR').format(item.price + (large ? item.suvExtra : 0))}</motion.strong></AnimatePresence></div></div>
      <ul>{item.includes.map(text => <li key={text}><Check size={14} />{text}</li>)}</ul><GoldButton outline={!item.featured} onClick={() => onBook(item.name)}>Escolher {item.name} <ArrowUpRight size={17} /></GoldButton><p className="package-detail">{item.detail}</p>
    </SpotlightCard></TiltCard></Reveal>)}</div><p className="pricing-note">A avaliação define o cuidado ideal. Pacotes, preços e serviços apresentados são fictícios.</p>
  </div></section>;
}

function FAQ() {
  const [active, setActive] = useState(null);
  return <section className="faq section-pad" id="duvidas"><div className="container faq-layout"><Reveal><SectionLabel number="06">VAMOS CONVERSAR</SectionLabel><h2>ANTES DO<br /><em>PRIMEIRO CUIDADO.</em></h2><p>Respostas para seguir<br />com tranquilidade.</p></Reveal><div className="faq-list">{questions.map(([question, answer], index) => <div key={question} className="t-acc faq-item" data-open={active === index}><h3><button className="t-acc-head" aria-expanded={active === index} aria-controls={`faq-${index}`} onClick={() => setActive(active === index ? null : index)}><span>{question}</span><span className="t-acc-chevron"><ChevronDown size={18} /></span></button></h3><div className="t-acc-panel" id={`faq-${index}`} inert={active !== index}><div className="t-acc-panel-inner"><p>{answer}</p></div></div></div>)}</div></div></section>;
}

export default function App() {
  const [booking, setBooking] = useState(false);
  const [selectedService, setSelectedService] = useState('Quero uma orientação');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [effects, setEffects] = useState(true);
  const menuButton = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollY, [0, 1100], [0, reduced || !effects ? 0 : 120]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px' });
    navItems.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  function openBooking(service = 'Quero uma orientação') { setSelectedService(service); setBooking(true); setMenuOpen(false); }
  const navLinks = navItems.map(([id, title]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{title}</a>);

  return <MotionConfig reducedMotion="user"><ClickSpark className={effects ? 'experience' : 'experience effects-paused'} sparkColor={['#dbb875', '#fff1cb']} sparkCount={12} sparkRadius={40} sparkSize={13} duration={650} glow={0.5} disabled={reduced || !effects}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a><motion.div className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true" />
    <header className={`header ${scrolled || menuOpen ? 'header-solid' : ''}`}><div className="nav-container"><Brand /><nav className="desktop-nav" aria-label="Navegação principal">{navLinks}</nav><div className="nav-actions"><GoldButton outline className="nav-cta" onClick={() => openBooking()}>Agendar agora <ArrowRight size={17} /></GoldButton><button ref={menuButton} className="menu-toggle icon-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></div><nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação móvel" inert={!menuOpen} onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current.focus(); } }}><div>{navLinks}<button className="text-link" onClick={() => openBooking()}>Agendar agora <ArrowUpRight size={18} /></button></div></nav></header>
    <main id="conteudo">
      <section className="hero" id="inicio"><div className="hero-stage"><motion.div className="hero-image-wrap" style={{ y: heroY }}><Image className="hero-image" src="/images/porsche-abertura.webp" alt="Porsche preto em um estúdio escuro de detalhamento, visto de trás e iluminado por linhas de LED" width={1536} height={1024} preload /></motion.div><div className="hero-shade" />{effects && !reduced && <div className="hero-rays" aria-hidden="true"><LightRays raysOrigin="top-center" raysColor="#e9c78d" intensity={0.45} rayDensity={1.3} lightSpread={0.65} rayLength={2} followMouse mouseInfluence={0.22} haze={0.1} glow={0.3} opacity={0.32} maxDevicePixelRatio={1.3} /></div>}
      <div className="hero-content"><span className="hero-eyebrow">CUIDADO PREMIUM. PRECISÃO EM CADA REFLEXO.</span><h1 className="sr-only">Detalhamento em outro nível. NÓR Detailing em Curitiba.</h1><div className="hero-title" aria-hidden="true">{reduced ? <p>DETALHAMENTO</p> : <BlurText text="DETALHAMENTO" animateBy="letters" effect="tilt" delay={28} direction="top" distance={40} stepDuration={0.5} />}<ShinyText className="hero-gold-title" text="EM OUTRO NÍVEL." color="#b99451" shineColor="#ffe6b3" speed={3.2} delay={1} shineWidth={30} glow={0.18} disabled={reduced || !effects} /></div><motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.6, duration: 0.8 }}>Cuidado especializado e proteção para revelar<br />o melhor do seu carro. Aqui, em Curitiba.</motion.p><div className="hero-buttons"><Magnet padding={25} magnetStrength={8} maxOffset={7} disabled={reduced || !effects}><GoldButton href="#pacotes">Conheça os pacotes <ArrowRight size={18} /></GoldButton></Magnet><GoldButton outline onClick={() => openBooking()}>Agendar avaliação <CalendarDays size={17} /></GoldButton></div></div>
      <aside className="hero-rail" aria-label="Explore a NÓR"><a href="#galeria" aria-label="Explorar galeria"><Camera size={19} /></a><a href="#processo" aria-label="Conhecer o processo"><Play size={17} /></a><a href="#sobre" aria-label="Conhecer a NÓR"><Compass size={19} /></a><span className="rail-line" /><span className="rail-label">EXPLORE A NÓR</span></aside>
      <aside className="hero-facts" aria-label="O universo NÓR"><div><Diamond /><strong>04</strong><span>ESPECIALIDADES</span></div><div><ShieldCheck /><strong>360°</strong><span>CUIDADO COMPLETO</span></div><div><Star /><strong>CTBA</strong><span>FEITO EM CURITIBA</span></div></aside><div className="hero-coordinate"><MapPin size={12} /> CURITIBA, PR · BRASIL</div><a href="#servicos" className="hero-scroll" aria-label="Explorar os serviços"><span>ROLE PARA DESCOBRIR</span><ArrowDown size={16} /></a></div>
      <div className="container service-strip">{services.map((item, index) => { const Icon = serviceIcons[index]; return <button key={item.name} onClick={() => openBooking(item.name)}><Icon strokeWidth={1.05} /><span><strong>{item.name}</strong><span>{['Limpeza profunda, descontaminação e proteção da pintura.', 'Cuidado minucioso para uma cabine renovada.', 'Profundidade no brilho. Proteção em cada camada.', 'Restaure, proteja e valorize cada acabamento.'][index]}</span></span><ArrowUpRight className="strip-arrow" size={14} /></button>; })}</div>
      <div className="container brand-strip"><p><span />UMA PAIXÃO. TODAS AS MARCAS.<span /></p><div className="car-brands" aria-label="Cuidado para veículos de todas as marcas"><span className="bmw-word">BMW</span><span className="amg-word"><i />AMG</span><span className="audi-word"><svg viewBox="0 0 104 35" aria-label="Audi" role="img">{[19, 41, 63, 85].map(x => <circle key={x} cx={x} cy="17.5" r="16" fill="none" stroke="currentColor" strokeWidth="2" />)}</svg></span><span className="porsche-word">PORSCHE</span><span className="mercedes-word">Mercedes-Benz</span><span className="tesla-word">TESLA</span></div></div></section>

      <section className="services section-pad" id="servicos"><div className="container"><SectionLabel number="01">CUIDADO DE VERDADE. EM CADA SUPERFÍCIE.</SectionLabel><Reveal className="section-heading"><h2>SEU CARRO MERECE<br /><em>UM OLHAR DIFERENTE.</em></h2><p>Precisão técnica, materiais bem escolhidos<br />e atenção ao que poucos percebem.</p></Reveal><div className="service-grid">{services.map((item, index) => { const Icon = serviceIcons[index]; return <Reveal key={item.name} delay={index * 0.07}><SpotlightCard className="service-card" spotlightColor="#d5ad64" intensity={0.13} borderGlow={0.9} spotlightSize={340} grain={0.025}><div className="service-card-top"><Icon size={39} strokeWidth={1} /><span>0{index + 1} / NÓR</span></div><h3>{item.name}</h3><p className="service-short">{item.short}</p><p>{item.description}</p><div className="service-tags">{item.includes.map(tag => <span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={() => openBooking(item.name)}>Conhecer esse cuidado <ArrowUpRight size={17} /></button></SpotlightCard></Reveal>; })}</div></div></section>

      <PackageSection onBook={openBooking} />
      <Gallery />

      <section className="about section-pad" id="sobre"><div className="container about-layout"><Reveal className="about-photo"><Image src="/images/ceramic-detail.webp" alt="Cuidado artesanal na aplicação de proteção sobre a pintura" width={1536} height={1024} /><div className="about-photo-caption"><Crosshair size={20} /><span>PRECISÃO É A NOSSA ASSINATURA.</span><span>NÓR / 01</span></div><div className="about-seal"><span>FEITO COM</span><Diamond size={27} strokeWidth={1} /><span>INTENÇÃO</span></div></Reveal><Reveal className="about-copy" delay={0.12}><SectionLabel number="04">A ESSÊNCIA NÓR</SectionLabel><h2>PAIXÃO QUE MOVE.<br /><em>PRECISÃO QUE FICA.</em></h2><p className="about-lead">Um carro carrega muito mais do que quilômetros. Carrega o seu jeito de viver.</p><p>A NÓR nasce dessa conexão. Um atelier de cuidado automotivo pensado para quem percebe a diferença no toque do couro, na profundidade da pintura e no desenho de um reflexo.</p><p>Em Curitiba, imaginamos um espaço onde técnica e tempo trabalham juntos. Com atenção individual, do primeiro olhar ao último acabamento.</p><div className="about-signature"><span>NÓR</span><div>O CUIDADO É PESSOAL.<br />O RESULTADO TEM ASSINATURA.</div></div></Reveal></div></section>

      <section className="process section-pad" id="processo"><div className="container"><SectionLabel number="05">POR TRÁS DO RESULTADO</SectionLabel><Reveal className="section-heading"><h2>O EXTRAORDINÁRIO<br /><em>TEM UM PROCESSO.</em></h2><p>Cada etapa importa.<br />Cada escolha tem um propósito.</p></Reveal><div className="process-grid">{[['01', 'AVALIAR', 'Ouvimos sua história e observamos cada superfície. O cuidado começa entendendo o seu carro.'], ['02', 'PREPARAR', 'Limpeza e preparação cuidadosas. Uma base bem feita faz toda a diferença no acabamento.'], ['03', 'TRANSFORMAR', 'Técnica e critério na execução. Cada etapa revela uma nova camada de presença.'], ['04', 'PRESERVAR', 'O último olhar antes de entregar. E a orientação certa para continuar cuidando.']].map(([number, title, description], index) => <Reveal className="process-step" key={number} delay={index * 0.12}><span className="step-number">{number}</span><div className="step-line"><span /><ArrowRight size={16} /></div><h3>{title}</h3><p>{description}</p></Reveal>)}</div></div></section>

      <FAQ />

      <section className="contact" id="contato"><Image src="/images/black-studio.webp" alt="" fill sizes="100vw" /><div className="contact-shade" /><div className="container"><Reveal><SectionLabel>SEU PRÓXIMO NÍVEL COMEÇA AQUI</SectionLabel><h2>PRONTO PARA<br /><ShinyText text="SENTIR A DIFERENÇA?" color="#b99451" shineColor="#ffe4ad" speed={3} disabled={reduced || !effects} /></h2><p>Uma boa conversa. Um novo olhar.<br />O cuidado que o seu carro merece.</p><Magnet padding={35} maxOffset={10} magnetStrength={8} disabled={reduced || !effects}><GoldButton onClick={() => openBooking()}>Agendar minha avaliação <ArrowUpRight size={20} /></GoldButton></Magnet><span className="contact-location"><MapPin size={13} /> CURITIBA · PARANÁ</span></Reveal></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><div><Brand /><p>Precisão que se vê.<br />Cuidado que se sente.</p></div><div className="footer-links"><span>EXPLORE</span><a href="#servicos">Serviços</a><a href="#pacotes">Pacotes</a><a href="#galeria">Galeria</a></div><div className="footer-links"><span>O UNIVERSO NÓR</span><a href="#sobre">Nossa essência</a><a href="#processo">O processo</a><a href="#duvidas">Dúvidas frequentes</a></div><div className="footer-end"><span>FEITO EM CURITIBA.<br />PENSADO NOS DETALHES.</span><a className="back-top" href="#inicio" aria-label="Voltar ao início"><ArrowUp size={19} /></a></div></div><div className="footer-bottom"><span>© 2026 NÓR DETAILING</span><p>Marca fictícia · Projeto de portfólio · Imagens criadas com IA.<br />Pacotes e valores ilustrativos. Sem vínculo com as marcas de veículos.</p><button className="effects-toggle" aria-pressed={effects} onClick={() => setEffects(!effects)}><span className={effects ? 'effect-indicator active' : 'effect-indicator'} />Efeitos {effects ? 'ativados' : 'pausados'}</button></div></div></footer>
    <Booking open={booking} selectedService={selectedService} onClose={() => setBooking(false)} />
  </ClickSpark></MotionConfig>;
}
