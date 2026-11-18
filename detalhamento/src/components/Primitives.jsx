'use client';

import { useReducedMotion, motion } from 'motion/react';

export function Brand() {
  return <a className="brand" href="#inicio" aria-label="NÓR Detailing, início"><svg viewBox="0 0 54 38" fill="none" aria-hidden="true"><path d="M6 32V6h8l26 26h8V6h-8v19L21 6H6" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" /><path d="m20 2 11-1" stroke="currentColor" strokeWidth="2" /></svg><span>NÓR<small>DETAILING</small></span></a>;
}

export function SectionLabel({ children, number }) {
  return <div className="section-label"><span className="label-line" />{children}{number && <span className="section-number">/ {number}</span>}</div>;
}

export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 35, filter: 'blur(5px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

// transitions.dev Card hover tilt: track the flat wrapper, transform the inner card.
export function TiltCard({ children, className = '' }) {
  const reduced = useReducedMotion();
  function track(event) {
    if (reduced || event.pointerType !== 'mouse') return;
    const wrapper = event.currentTarget;
    const card = wrapper.firstElementChild;
    const rect = wrapper.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    wrapper.classList.add('is-hover');
    card.classList.add('is-tilting');
    card.style.setProperty('--tilt-ry', `${(x - 0.5) * 12}deg`);
    card.style.setProperty('--tilt-rx', `${(0.5 - y) * 12}deg`);
    card.style.setProperty('--tilt-gx', `${x * 100}%`);
    card.style.setProperty('--tilt-gy', `${y * 100}%`);
  }
  function reset(event) {
    const card = event.currentTarget.firstElementChild;
    event.currentTarget.classList.remove('is-hover');
    card.classList.remove('is-tilting');
    card.style.setProperty('--tilt-rx', '0deg');
    card.style.setProperty('--tilt-ry', '0deg');
  }
  return <div className={`t-tilt ${className}`} onPointerMove={track} onPointerLeave={reset} onPointerCancel={reset}><div className="t-tilt-card">{children}<div className="t-tilt-glare" aria-hidden="true" /></div></div>;
}
