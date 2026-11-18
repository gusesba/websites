'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowDown, Scissors, Menu, X, Plus, ChevronDown, ChevronLeft, ChevronRight, MapPin, Clock, Check, Coffee, Sparkles } from 'lucide-react';
import BlurText from './components/BlurText';
import Magnet from './components/Magnet';

const services = [
  { name: 'Corte autoral', description: 'Na tesoura ou na máquina. Do seu jeito, nos mínimos detalhes.', time: 45, price: 65, tag: 'SEU ESTILO, NOSSA ASSINATURA' },
  { name: 'Barba & ritual', description: 'Toalha quente, navalha e um tempo só pra você.', time: 35, price: 50, tag: 'O CLÁSSICO BEM-FEITO' },
  { name: 'Corte + barba', description: 'A experiência completa. Alinhado da primeira à última linha.', time: 75, price: 105, tag: 'O FAVORITO DA CASA' },
  { name: 'Acabamento', description: 'Pezinho, contornos e aquele cuidado entre um corte e outro.', time: 20, price: 30, tag: 'DETALHE QUE FAZ DIFERENÇA' },
];

const gallery = [
  { image: 'cut.jpg', title: 'Precisão em cada linha.', category: '01 / NA CADEIRA', alt: 'Barbeiro fazendo um corte com máquina e pente' },
  { image: 'hero.jpg', title: 'O clássico tem seu lugar.', category: '02 / BARBA & RITUAL', alt: 'Barbeiro aparando uma barba com tesoura' },
  { image: 'space.jpg', title: 'Pode se sentir em casa.', category: '03 / NOSSO ESPAÇO', alt: 'Ambiente de barbearia com cadeiras e espelhos' },
  { image: 'ritual.jpg', title: 'As ferramentas do ofício.', category: '04 / NOS DETALHES', alt: 'Tesouras, máquinas e produtos sobre uma bancada de madeira' },
];

const faqs = [
  ['Preciso agendar antes de ir?', 'Agendar é o melhor caminho para ter seu tempo reservado, sem espera. Nesta versão de portfólio, você pode experimentar o fluxo completo pelo botão “Agendar meu horário”.'],
  ['Posso chegar sem saber qual corte fazer?', 'Pode, e deve. A ideia da BRAVIO é começar pela conversa: entender sua rotina, seu cabelo e o que combina com você antes de pegar a tesoura.'],
  ['Quais são as formas de pagamento?', 'Para o conceito desta barbearia, consideramos Pix e cartões de débito e crédito. Nenhuma cobrança é feita neste site demonstrativo.'],
  ['Essa barbearia existe de verdade?', 'A BRAVIO é uma marca fictícia, criada para demonstrar um projeto de identidade visual, design e desenvolvimento web. As imagens são ilustrativas e os agendamentos são simulações.'],
];

function Asterisk({ className = '' }) {
  return <svg className={`asterisk ${className}`} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="m27 0 10 0 1 20 15-13 7 8-16 14 20-1v11l-21-1 14 16-8 7-14-17 1 20H25l1-21L10 58l-7-8 17-14-20 1V26l21 1L7 11l8-7 13 17z" /></svg>;
}

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#inicio" aria-label="BRAVIO — início"><span>BRAVIO</span><Asterisk /><span className="brand-caption">BARBEARIA<br />CURITIBA, PR</span></a>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Booking({ request, onClose }) {
  const dialog = useRef(null);
  const closeTimer = useRef(null);
  const [phase, setPhase] = useState('');
  const [selected, setSelected] = useState(request.service ?? 0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const firstDate = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i + 1, 12);
    return { value: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`, day: day.getDate(), weekday: day.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''), full: day.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }), closed: day.getDay() === 0 || day.getDay() === 1, saturday: day.getDay() === 6 };
  });
  const pickedDay = dates.find(day => day.value === date);
  const times = pickedDay?.saturday ? ['09:00', '10:00', '11:00', '13:00', '14:30', '16:00'] : ['10:00', '11:00', '13:00', '14:30', '16:00', '17:30'];

  useEffect(() => {
    const previous = document.activeElement;
    const modal = dialog.current;
    modal.showModal();
    const frame = requestAnimationFrame(() => setPhase('is-open'));
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(closeTimer.current);
      document.body.style.overflow = '';
      modal.close();
      previous?.focus();
    };
  }, []);

  function close() {
    if (closeTimer.current) return;
    setPhase('is-closing');
    closeTimer.current = setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150);
  }

  function advance(event) {
    event.preventDefault();
    if (step === 1) setStep(2);
    else setDone(true);
    dialog.current.scrollTop = 0;
  }

  return <dialog ref={dialog} className={`booking-dialog t-modal ${phase}`} aria-labelledby="booking-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === dialog.current) close(); }}>
    <div className="booking-inner">
      <button className="icon-button modal-close" onClick={close} aria-label="Fechar agendamento"><X /></button>
      <span className="eyebrow"><span className="tiny-dot" /> SUA PAUSA COMEÇA AQUI</span>
      {done ? <div className="booking-success" role="status">
        <span className="t-success-check success-icon" data-state="in" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" pathLength="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <h2 id="booking-title">TÁ NA AGENDA,<br />{name.trim().split(' ')[0]}.</h2>
        <p>Se a BRAVIO existisse, esse seria o seu momento.</p>
        <div className="booking-receipt"><strong>{services[selected].name}</strong><span>{pickedDay?.full} · {time}</span><span>{services[selected].time} min · R$ {services[selected].price},00</span></div>
        <p className="demo-note">Esta foi uma simulação. Nenhum horário foi reservado e nenhum dado foi enviado ou armazenado.</p>
        <button className="button button-orange" onClick={close}>Voltar para a BRAVIO <ArrowUpRight size={19} /></button>
      </div> : <>
        <h2 id="booking-title">RESERVE UM<br />TEMPO PRA VOCÊ.</h2>
        <p className="booking-subtitle">{step === 1 ? 'Escolha seu ritual e encontre o melhor horário.' : 'Só falta dar um nome a esse momento.'}</p>
        <div className="booking-progress"><span className={step === 1 ? 'active' : ''}>01 / Seu ritual</span><span className={step === 2 ? 'active' : ''}>02 / Seus detalhes</span></div>
        <form onSubmit={advance}>
          {step === 1 ? <>
            <fieldset className="service-options"><legend>Qual é o seu ritual?</legend>{services.map((service, index) => <label className={`service-option ${selected === index ? 'selected' : ''}`} key={service.name}><input type="radio" name="service" checked={selected === index} onChange={() => setSelected(index)} /><span><strong>{service.name}</strong><small>{service.time} min</small></span><b>R$ {service.price}</b></label>)}</fieldset>
            <fieldset><legend>Escolha o dia <small>(datas demonstrativas)</small></legend><div className="date-options">{dates.map(day => <label key={day.value} className={`date-option ${day.closed ? 'disabled' : ''} ${date === day.value ? 'selected' : ''}`}><input type="radio" name="date" value={day.value} checked={date === day.value} disabled={day.closed} onChange={() => { setDate(day.value); setTime(''); }} required /><span>{day.weekday}</span><strong>{day.day}</strong><small>{day.closed ? 'fechado' : day.full.split(' de ')[1]?.slice(0, 3)}</small></label>)}</div></fieldset>
            <fieldset><legend>Agora, o horário</legend>{!date ? <p className="date-hint">Selecione um dia para ver os horários.</p> : <div className="time-options">{times.map(slot => <label className={`time-option ${time === slot ? 'selected' : ''}`} key={slot}><input type="radio" name="time" value={slot} checked={time === slot} onChange={() => setTime(slot)} required />{slot}</label>)}</div>}</fieldset>
            <button className="button button-orange booking-next" type="submit" disabled={!date || !time}>Continuar <ArrowRight size={19} /></button>
          </> : <>
            <div className="booking-receipt"><strong>{services[selected].name}</strong><span>{pickedDay?.full} · {time}</span><span>{services[selected].time} min · R$ {services[selected].price},00</span></div>
            <label className="name-label" htmlFor="booking-name">Como podemos te chamar?</label><input className="name-input" id="booking-name" name="name" autoFocus autoComplete="given-name" placeholder="Seu primeiro nome" value={name} onChange={event => setName(event.target.value)} required minLength={2} maxLength={60} pattern=".*\S.*" />
            <p className="demo-note">Você está em um projeto de portfólio. O agendamento é uma demonstração e não envia seus dados.</p>
            <div className="booking-actions"><button type="button" className="back-button" onClick={() => setStep(1)}><ChevronLeft size={17} /> Voltar</button><button type="submit" className="button button-orange">Concluir simulação <Check size={18} /></button></div>
          </>}
        </form>
        <div className="booking-footer"><Scissors size={15} /> BRAVIO · Curitiba, PR <span>PROJETO CONCEITUAL</span></div>
      </>}
    </div>
  </dialog>;
}

function GalleryDialog({ index, onClose }) {
  const dialog = useRef(null);
  const [current, setCurrent] = useState(index);
  useEffect(() => {
    const previous = document.activeElement;
    const modal = dialog.current;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; modal.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="gallery-dialog" aria-label="Galeria de inspiração" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === dialog.current) onClose(); }} onKeyDown={event => { if (event.key === 'ArrowRight') setCurrent((current + 1) % gallery.length); if (event.key === 'ArrowLeft') setCurrent((current + gallery.length - 1) % gallery.length); }}>
    <div className="lightbox-inner"><button className="icon-button lightbox-close" onClick={onClose} aria-label="Fechar galeria"><X /></button><img src={`/images/${gallery[current].image}`} alt={gallery[current].alt} key={current} /><div className="lightbox-caption"><div><span className="eyebrow">{gallery[current].category}</span><p>{gallery[current].title}</p><small>Fotografia ilustrativa · Unsplash</small></div><div className="lightbox-controls"><button className="icon-button" onClick={() => setCurrent((current + gallery.length - 1) % gallery.length)} aria-label="Foto anterior"><ChevronLeft /></button><span>{current + 1} / {gallery.length}</span><button className="icon-button" onClick={() => setCurrent((current + 1) % gallery.length)} aria-label="Próxima foto"><ChevronRight /></button></div></div></div>
  </dialog>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('inicio');
  const hero = useRef(null);
  const nav = useRef(null);
  const menuButton = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const book = service => { setMenuOpen(false); setBooking({ service, id: Date.now() }); };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); }, { rootMargin: '-20% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const outside = event => { if (!nav.current?.contains(event.target) && !menuButton.current?.contains(event.target)) setMenuOpen(false); };
    const keyboard = event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', keyboard);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', keyboard); };
  }, [menuOpen]);

  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="header">
      <div className="header-inner"><Brand /><nav id="main-nav" ref={nav} aria-label="Navegação principal" className={menuOpen ? 'nav is-open' : 'nav'}>{[['servicos', 'Os serviços'], ['essencia', 'A essência'], ['galeria', 'Na cadeira'], ['encontre', 'Onde estamos']].map(([id, label]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<button className="mobile-book button button-orange" onClick={() => book()}>Agendar meu horário <ArrowUpRight size={16} /></button></nav><button className="header-book" onClick={() => book()}>Vem pra cadeira <ArrowUpRight size={17} /></button><button className="icon-button menu-toggle" ref={menuButton} aria-controls="main-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <main id="conteudo">
      <section id="inicio" className="hero" ref={hero} aria-labelledby="hero-title">
        <motion.div className="hero-photo" style={{ y: reduced ? 0 : imageY }}><img src="/images/hero.jpg" alt="O cuidado artesanal de um barbeiro aparando uma barba à tesoura" fetchPriority="high" /></motion.div>
        <div className="hero-gradient" />
        <div className="hero-topline"><span><span className="tiny-dot" /> BARBEARIA DE CURITIBA. COM PERSONALIDADE.</span><span className="hero-coordinate">25°25′ S &nbsp; 49°16′ W</span></div>
        <div className="hero-content"><div className="hero-overline"><span className="short-line" /> O CLÁSSICO, DO SEU JEITO.</div><h1 id="hero-title"><span className="hero-line">SEU ESTILO.</span><span className="hero-line">SEM</span><span className="hero-line hero-accent">CONCESSÕES<span className="title-period">.</span></span></h1><p>Um bom corte muda o dia.<br />O seu próximo começa aqui.</p><Magnet padding={35} magnetStrength={6} maxOffset={7} disabled={reduced}><button className="button button-orange hero-button" onClick={() => book()}>Agendar meu horário <ArrowUpRight size={22} /></button></Magnet><span className="hero-book-note">Seu momento. Sem pressa.</span></div>
        <div className="hero-stamp" aria-label="Feito à mão, no capricho"><span>CURITIBA · PARANÁ</span><Scissors strokeWidth={1.2} /><strong>FEITO À MÃO.</strong><span>NO CAPRICHO, SEMPRE.</span></div>
        <div className="hero-bottom"><a href="#servicos" className="scroll-link"><span className="scroll-icon"><ArrowDown size={16} /></span> CONHEÇA A BRAVIO</a><span className="hero-small">BOM CORTE. BOA PROSA. CAFÉ PASSADO.</span><span className="hero-index">01 <span>/ 04</span></span></div>
        <span className="hero-photo-credit">FOTOGRAFIA ILUSTRATIVA</span>
      </section>

      <div className="marquee" aria-label="Na régua. No seu ritmo. Curitiba, PR."><div className="marquee-track" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span className="marquee-part" key={i}>NA RÉGUA. <Asterisk /> NO SEU RITMO. <Asterisk /> CURITIBA, PR <Asterisk /></span>)}</div></div>

      <section id="servicos" className="services section-light" aria-labelledby="services-title"><div className="container">
        <Reveal className="section-top"><span className="eyebrow"><span className="tiny-dot" /> 01 / O QUE A GENTE FAZ</span><span className="section-side-note">TÉCNICA NO CORTE. PERSONALIDADE NO RESULTADO.</span></Reveal>
        <div className="services-layout"><Reveal className="services-intro"><h2 id="services-title">BOM CORTE.<br />ZERO PRESSA<span className="orange-text">.</span></h2><p>Do primeiro papo ao último detalhe,<br className="desktop-br" /> um cuidado que tem a sua cara.</p><div className="service-photo"><img src="/images/ritual.jpg" alt="Ferramentas do ofício: tesoura, pente e máquinas na bancada" loading="lazy" /><span>AS FERRAMENTAS MUDAM.<br />O CAPRICHO, NÃO.</span><Asterisk /></div><span className="price-note">Valores ilustrativos para este projeto conceitual.</span></Reveal>
          <div className="service-list">{services.map((service, index) => <Reveal key={service.name} delay={index * 0.06}><button className="service-row" onClick={() => book(index)} aria-label={`Agendar ${service.name}, ${service.time} minutos, ${service.price} reais`}><span className="service-number">0{index + 1}</span><span className="service-info"><span className={`service-tag ${index === 2 ? 'tag-featured' : ''}`}>{index === 2 && <Asterisk />}{service.tag}</span><strong>{service.name}</strong><span className="service-description">{service.description}</span><span className="service-time"><Clock size={12} /> {service.time} min</span></span><span className="service-price"><small>R$</small> {service.price}<ArrowUpRight size={23} /></span></button></Reveal>)}<Reveal><div className="services-footnote"><Scissors size={17} /><span>Todo corte começa com uma boa conversa.</span></div></Reveal></div>
        </div>
      </div></section>

      <section id="essencia" className="essence" aria-labelledby="essence-title"><div className="container essence-layout"><Reveal className="essence-image"><img src="/images/space.jpg" alt="Interior acolhedor de uma barbearia com espelhos, luz quente e cadeiras clássicas" loading="lazy" /><div className="photo-corner corner-top" /><div className="photo-corner corner-bottom" /><div className="image-label"><span>ENTRE. PUXE UMA CADEIRA.</span><ArrowUpRight size={22} /></div><span className="image-edge-text">UM RESPIRO NO MEIO DA CIDADE.</span></Reveal><Reveal className="essence-copy"><span className="eyebrow"><span className="tiny-dot" /> 02 / NOSSA ESSÊNCIA</span><h2 id="essence-title">MAIS QUE<br />UM CORTE.<br /><span className="outline-text">UM RESPIRO.</span></h2><BlurText text="Lá fora, Curitiba corre. Aqui dentro, o tempo é seu." delay={65} direction="bottom" className="essence-lead" /><p>A BRAVIO nasceu de uma ideia simples: resgatar o ritual de ir à barbearia. Um lugar onde a gente te chama pelo nome, escuta o que você quer e cuida de cada detalhe.</p><p>Sem fórmula pronta. Sem corte no automático.<br />Só você, uma boa conversa e o nosso melhor.</p><div className="essence-perks"><span><Coffee size={19} /> Café passado na hora</span><span><Scissors size={19} /> Corte com identidade</span><span><Sparkles size={19} /> Cuidado de verdade</span></div><a href="#encontre" className="text-link">Seu novo ponto em Curitiba <ArrowUpRight size={19} /></a></Reveal></div></section>

      <section id="galeria" className="gallery section-light" aria-labelledby="gallery-title"><div className="container"><Reveal className="section-top"><span className="eyebrow"><span className="tiny-dot" /> 03 / NA CADEIRA</span><span className="section-side-note">CADA DETALHE DIZ QUEM A GENTE É.</span></Reveal><Reveal className="gallery-heading"><h2 id="gallery-title">O ESTILO É SEU.<br />O CAPRICHO É NOSSO<span className="orange-text">.</span></h2><p>Um pouco do que inspira a BRAVIO.<br />Porque o cuidado também se vê.</p></Reveal><div className="gallery-grid">{gallery.map((item, index) => <Reveal key={item.image} className={`gallery-card gallery-card-${index}`} delay={index * 0.07}><button onClick={() => setPhoto(index)} aria-label={`Ampliar foto: ${item.title}`}><div className="gallery-image"><img src={`/images/${item.image}`} alt={item.alt} loading="lazy" /><span className="gallery-expand"><Plus size={24} /></span><span className="gallery-image-label">BRAVIO / INSPIRAÇÕES</span></div><div className="gallery-caption"><span><small>{item.category}</small><strong>{item.title}</strong></span><ArrowUpRight size={22} /></div></button></Reveal>)}</div><p className="gallery-disclaimer">Uma marca imaginada. Referências reais de um ofício. Fotografias ilustrativas via Unsplash.</p></div></section>

      <section className="manifesto" aria-label="Manifesto BRAVIO"><div className="container"><span className="eyebrow">AQUI, A GENTE ACREDITA NO SIMPLES BEM-FEITO.</span><Reveal><p>MENOS MESMICE.<br />MAIS <span>VOCÊ.</span><Asterisk /></p></Reveal><div className="manifesto-bottom"><span>SEU CABELO. SUA HISTÓRIA. SUAS REGRAS.</span><Magnet padding={25} magnetStrength={6} maxOffset={6} disabled={reduced}><button className="button button-dark" onClick={() => book()}>Encontre seu próximo corte <ArrowUpRight size={21} /></button></Magnet></div></div></section>

      <section id="encontre" className="location" aria-labelledby="location-title"><div className="container"><div className="location-layout"><Reveal className="location-copy"><span className="eyebrow"><span className="tiny-dot" /> 04 / NOSSO CANTO</span><h2 id="location-title">CURITIBA NO PEITO.<br />PORTAS ABERTAS<span className="orange-text">.</span></h2><p>Entre o café e a próxima conversa,<br />tem uma cadeira esperando por você.</p><div className="location-details"><div><MapPin size={20} /><span><strong>São Francisco, Curitiba — PR</strong><small>O bairro que inspira o nosso conceito.</small></span></div><div><Clock size={20} /><span><strong>Terça a sexta · 10h às 20h</strong><small>Sábado · 9h às 18h<br />Domingo e segunda · uma pausa por aqui.</small></span></div></div><a href="https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Francisco+Curitiba+PR" target="_blank" rel="noreferrer" className="text-link">Conhecer o bairro <ArrowUpRight size={19} /></a><p className="location-note">Localização conceitual. A BRAVIO não possui endereço físico.</p></Reveal><Reveal className="location-art"><div className="map-grid" /><svg className="map-streets" viewBox="0 0 600 480" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="16"><path d="M-20 95 620 215M-10 330 620 435M180-30 50 510M440-30 315 510M580-30 460 510" /><path d="m-20 460 580-500" strokeWidth="25" /></g><g fill="currentColor" fontFamily="sans-serif" fontSize="9" letterSpacing="2"><text x="105" y="340" transform="rotate(10 105 340)">R. TRAJANO REIS</text><text x="260" y="135" transform="rotate(-40 260 135)">SÃO FRANCISCO</text></g></svg><div className="map-pin"><div><Scissors size={30} /></div><span>É BEM POR AQUI.</span></div><span className="map-label">CURITIBA<br /><strong>25°25′ S 49°16′ W</strong></span><span className="map-demo">MAPA ARTÍSTICO / ILUSTRATIVO</span><Asterisk className="map-star" /></Reveal></div></div></section>

      <section className="faq section-light" aria-labelledby="faq-title"><div className="container faq-layout"><Reveal><span className="eyebrow"><span className="tiny-dot" /> ANTES DE SENTAR</span><h2 id="faq-title">PAPO<br /> RETO<span className="orange-text">.</span></h2><p>Pra chegar sem dúvida<br />e sair com estilo.</p></Reveal><Reveal className="faq-list">{faqs.map(([question, answer], index) => <div className="t-acc faq-item" data-open={openFaq === index} key={question}><h3><button className="t-acc-head" aria-expanded={openFaq === index} aria-controls={`faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span className="t-acc-chevron"><ChevronDown size={20} /></span></button></h3><div className="t-acc-panel" id={`faq-${index}`} inert={openFaq !== index}><div className="t-acc-panel-inner"><p>{answer}</p></div></div></div>)}</Reveal></div></section>
    </main>

    <footer className="footer"><div className="container"><Reveal className="footer-cta"><div><span className="eyebrow"><span className="tiny-dot" /> NOS VEMOS NA CADEIRA.</span><h2>VAMOS DAR<br />UM TRATO<span className="orange-text">?</span></h2></div><Magnet padding={30} magnetStrength={7} maxOffset={8} disabled={reduced}><button className="footer-round-button" onClick={() => book()}><ArrowUpRight size={48} strokeWidth={1} /><span>AGENDAR<br />MEU HORÁRIO</span></button></Magnet></Reveal><div className="footer-nav"><Brand footer /><div><a href="#servicos">Os serviços</a><a href="#essencia">A essência</a><a href="#encontre">Nosso canto</a><a href="#inicio" className="back-to-top">Voltar ao topo <ArrowUpRight size={16} /></a></div></div><div className="footer-wordmark" aria-hidden="true">BRAVIO<Asterisk /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BRAVIO · CURITIBA, PR</span><span>MARCA FICTÍCIA. DESIGN COM PERSONALIDADE.</span><a href="#projeto" onClick={event => { event.preventDefault(); setOpenFaq(3); document.getElementById('faq-title').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }); }}>PROJETO DE PORTFÓLIO <ArrowUpRight size={13} /></a></div></div></footer>
    {booking && <Booking key={booking.id} request={booking} onClose={() => setBooking(null)} />}
    {photo !== null && <GalleryDialog index={photo} onClose={() => setPhoto(null)} />}
  </MotionConfig>;
}

export default App;
