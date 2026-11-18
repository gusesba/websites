'use client';

import { useEffect, useRef, useState } from 'react';
import { Arrow, Mark } from './Icons';

const navigation = [['Projetos', '#projetos'], ['Processo', '#processo'], ['Estúdio', '#estudio']];

export default function Header({ contact }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [open]);
  return <header className="site-header">
    <div className="wrap header-inner">
      <a href="#inicio" className="brand" aria-label="Gusesba Studio, início" onClick={() => setOpen(false)}><Mark /><span>gusesba<span className="brand-dot">.</span></span><small>STUDIO</small></a>
      <nav id="navegacao" aria-label="Navegação principal" className={open ? 'navigation open' : 'navigation'}>
        {navigation.map(([text, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{text}</a>)}
      </nav>
      <div className="header-actions">
        <a className="button contact-link" href={contact} target="_blank" rel="noreferrer"><span className="contact-label"><span className="contact-prefix">Vamos </span>conversar</span><Arrow size={15} /></a>
        <button ref={toggle} className={'menu-toggle' + (open ? ' active' : '')} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="navegacao" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </div>
  </header>;
}
