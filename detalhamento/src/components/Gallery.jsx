"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import Modal from "./Modal";
import GlareHover from "./react-bits/GlareHover";
import { Reveal, SectionLabel } from "./Primitives";
import { studies } from "../data";

const ease = [0.22, 1, 0.36, 1];
const filters = [["todos", "Todos"], ["pintura", "Pintura"], ["protecao", "Proteção"], ["interior", "Interiores"]];

export default function Gallery() {
  const [filter, setFilter] = useState('todos');
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reduced = useReducedMotion();
  const filtered = studies.filter(item => filter === 'todos' || item.category === filter);
  const showNext = direction => setActive(current => (current + direction + studies.length) % studies.length);

  return <section id="galeria" className="gallery section-pad">
    <div className="container">
      <SectionLabel number="03">UM OLHAR MAIS DE PERTO</SectionLabel>
      <Reveal className="section-heading gallery-heading"><h2>O RESULTADO<br />FALA <em>POR SI.</em></h2><div className="gallery-aside"><p>Reflexos que prendem o olhar.<br />Detalhes que fazem você ficar.</p><span className="small-note">GALERIA CONCEITUAL · IMAGENS CRIADAS COM IA</span></div></Reveal>
      <div className="gallery-filters" role="group" aria-label="Filtrar estudos visuais">{filters.map(([id, title]) => <button key={id} className={filter === id ? 'active' : ''} aria-pressed={filter === id} onClick={() => setFilter(id)}>{filter === id && <motion.span className="filter-pill" layoutId="gallery-filter" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}<span>{title}</span>{id === 'todos' && <span className="filter-count">03</span>}</button>)}</div>
      <motion.div layout className="gallery-grid" aria-live="polite">
        <AnimatePresence mode="popLayout">{filtered.map((item, index) => <motion.article layout key={item.title} className="gallery-item" initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }} transition={{ duration: 0.3, delay: index * 0.035, ease }}>
          <GlareHover className="gallery-glare" width="100%" borderRadius="12px" glareColor="#e8c784" glareOpacity={0.35} transitionDuration={900}><button className="gallery-image" onClick={() => { setActive(studies.indexOf(item)); setLightboxOpen(true); }} aria-label={`Ampliar: ${item.title}`}><img src={item.image} alt={item.alt} loading="lazy" width="1536" height="1024" style={{ objectPosition: item.position }} /><span className="gallery-index">0{studies.indexOf(item) + 1} / NÓR</span><span className="gallery-expand"><Plus size={23} strokeWidth={1.4} /></span></button></GlareHover>
          <div className="gallery-caption"><div><h3>{item.title}</h3><p>{item.subtitle}</p></div><ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" /></div>
        </motion.article>)}</AnimatePresence>
      </motion.div>
      <div className="gallery-bottom"><span>O resultado está no conjunto. A diferença, nos detalhes.</span><span>UM NOVO OLHAR PARA CADA DETALHE. <ArrowUpRight size={15} /></span></div>
    </div>
    <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)} titleId="lightbox-title" className="lightbox" onKeyDown={event => { if (event.key === 'ArrowRight') showNext(1); if (event.key === 'ArrowLeft') showNext(-1); }}>
      <img src={studies[active].image} alt={studies[active].alt} width="1536" height="1024" /><div className="lightbox-caption"><div><span className="small-note">ESTUDO CONCEITUAL · 0{active + 1} / 03</span><h2 id="lightbox-title">{studies[active].title}</h2></div><div className="lightbox-controls"><button className="icon-button" aria-label="Estudo anterior" onClick={() => showNext(-1)}><ArrowLeft size={20} /></button><button className="icon-button" aria-label="Próximo estudo" onClick={() => showNext(1)}><ArrowRight size={20} /></button></div></div>
    </Modal>
  </section>;
}

