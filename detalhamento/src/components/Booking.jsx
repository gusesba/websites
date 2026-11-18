"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import Modal from "./Modal";
import { services, packages } from "../data";

export default function Booking({ open, onClose, selectedService }) {
  const [submitted, setSubmitted] = useState(null);
  const [service, setService] = useState(selectedService);
  const successTitle = useRef(null);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    if (open) {
      setSubmitted(null);
      setService(selectedService);
      const today = new Date();
      today.setDate(today.getDate() + 1);
      setMinDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
    }
  }, [open, selectedService]);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted({ name: data.get('name').trim(), car: data.get('car').trim(), date: data.get('date'), service });
  }

  return <Modal open={open} onClose={onClose} titleId="booking-title" className="booking-dialog">
    <span className="demo-tag"><span />EXPERIÊNCIA DEMONSTRATIVA</span>
    <AnimatePresence mode="wait" initial={false}>
      {submitted ? <motion.div key="success" className="booking-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} onAnimationComplete={() => successTitle.current?.focus()}>
        <div className="success-mark t-success-check" data-state="in"><Check size={34} strokeWidth={1.4} ref={node => { const path = node?.querySelector('path'); if (path) path.style.setProperty('--check-length', Math.ceil(path.getTotalLength()) + 1); }} /></div>
        <h2 id="booking-title" ref={successTitle} tabIndex={-1}>Tudo certo,<br /><em>{submitted.name}.</em></h2>
        <p>Sua experiência de avaliação foi simulada.</p>
        <dl className="booking-summary"><div><dt>SEU CARRO</dt><dd>{submitted.car}</dd></div><div><dt>CUIDADO</dt><dd>{submitted.service}</dd></div><div><dt>DATA PREFERIDA</dt><dd>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(`${submitted.date}T12:00:00`))}</dd></div></dl>
        <p className="form-note">A NÓR é uma marca fictícia. Nenhum agendamento foi realizado e nenhum dado foi enviado.</p>
        <button className="button button-dark" onClick={onClose}>Continuar explorando <ArrowUpRight size={18} /></button>
      </motion.div> : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
        <h2 id="booking-title">Seu próximo<br /><em>cuidado.</em></h2>
        <p className="booking-intro">Cada carro tem uma história. Vamos começar pela sua.</p>
        <form onSubmit={submit}>
          <div className="form-row"><label>Como podemos chamar você?<input name="name" autoComplete="given-name" placeholder="Seu primeiro nome" minLength={2} maxLength={50} pattern=".*\S.*" required /></label><label>Qual é o seu carro?<input name="car" placeholder="Marca e modelo" minLength={2} maxLength={80} pattern=".*\S.*" required /></label></div>
          <label>Qual cuidado você procura?<select value={service} onChange={event => setService(event.target.value)}>{['Quero uma orientação', ...services.map(item => item.name), ...packages.map(item => item.name)].map(name => <option key={name}>{name}</option>)}</select></label>
          <label>Sua data preferida<input type="date" name="date" min={minDate} required /></label>
          <p className="form-note">Este formulário faz parte de um projeto de portfólio. Os dados ficam apenas nesta tela e não geram um agendamento real.</p>
          <button className="button button-dark" type="submit">Simular avaliação <ArrowUpRight size={18} /></button>
        </form>
      </motion.div>}
    </AnimatePresence>
  </Modal>;
}

