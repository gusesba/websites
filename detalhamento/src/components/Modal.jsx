import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Native dialog provides focus containment, Escape handling and focus restoration.
// Open/close motion follows the transitions.dev modal recipe.
export default function Modal({ open, onClose, titleId, children, className = '', onKeyDown }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    let frame;
    let timer;
    if (open) {
      dialog.showModal();
      dialog.classList.remove('is-closing');
      void dialog.offsetWidth;
      frame = requestAnimationFrame(() => dialog.classList.add('is-open'));
    } else if (dialog.open) {
      dialog.classList.remove('is-open');
      dialog.classList.add('is-closing');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--modal-close-dur'));
      timer = window.setTimeout(() => {
        dialog.close();
        dialog.classList.remove('is-closing');
      }, reduced ? 0 : duration);
    }
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`t-modal ${className}`}
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={onKeyDown}
    >
      <div className="dialog-surface">
        <button className="icon-button dialog-close" aria-label="Fechar janela" onClick={onClose}><X size={20} /></button>
        {children}
      </div>
    </dialog>
  );
}
