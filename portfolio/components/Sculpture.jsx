'use client';

import { useEffect, useRef, useState } from 'react';
import { createKnot } from './knot';

export default function Sculpture() {
  const canvasRef = useRef(null);
  const drawing = useRef(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = createKnot(canvas);
    if (!renderer) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stopped = preference.matches, visible = true, frame = 0, last = 0;
    let pitch = -.28, yaw = .35, pointer = null;
    const draw = () => renderer.draw(pitch, yaw);
    function animate(now) {
      frame = 0;
      if (last) yaw += Math.min(now - last, 80) * .000065;
      last = now;
      draw();
      schedule();
    }
    function schedule() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden && !stopped && !pointer) frame = requestAnimationFrame(animate);
      else last = 0;
    }
    function changePaused(value) { stopped = value; setPaused(value); schedule(); }
    const followPreference = () => changePaused(preference.matches);
    const resize = new ResizeObserver(() => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      draw();
    });
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    function start(event) {
      if (!event.isPrimary || event.button !== 0) return;
      pointer = [event.clientX, event.clientY];
      canvas.setPointerCapture(event.pointerId);
      schedule();
    }
    function move(event) {
      if (!pointer || !event.isPrimary) return;
      yaw += (event.clientX - pointer[0]) * .012;
      pitch += (event.clientY - pointer[1]) * .01;
      pointer = [event.clientX, event.clientY];
      draw();
    }
    function end() { pointer = null; schedule(); }
    function rotate(event) {
      const arrows = { ArrowLeft: [-.13, 0], ArrowRight: [.13, 0], ArrowUp: [0,-.13], ArrowDown: [0,.13] };
      if (!arrows[event.key]) return;
      event.preventDefault();
      const [x, y] = arrows[event.key];
      yaw += x; pitch += y; draw();
    }
    drawing.current = () => changePaused(!stopped);
    resize.observe(canvas); visibility.observe(canvas);
    canvas.addEventListener('pointerdown', start);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('lostpointercapture', end);
    canvas.addEventListener('keydown', rotate);
    preference.addEventListener('change', followPreference);
    document.addEventListener('visibilitychange', schedule);
    setReady(true); setPaused(stopped); draw(); schedule();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect();
      canvas.removeEventListener('pointerdown', start);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('lostpointercapture', end);
      canvas.removeEventListener('keydown', rotate);
      preference.removeEventListener('change', followPreference);
      document.removeEventListener('visibilitychange', schedule);
      renderer.dispose(); drawing.current = null;
    };
  }, []);
  return <figure className="art">
    <div className="art-grid" aria-hidden="true" />
    <i className="cross top-left" /><i className="cross top-right" /><i className="cross bottom-left" /><i className="cross bottom-right" />
    <img className={'knot-poster' + (ready ? ' hidden' : '')} src="/knot.webp" alt="Escultura de filamentos de cobre entrelaçados em um nó tridimensional" />
    <canvas ref={canvasRef} tabIndex={ready ? 0 : -1} aria-label="Escultura 3D de cobre. Arraste ou use as setas para girar." className={ready ? 'ready' : ''} />
    <figcaption><span className="fig-square" /> FIG. 01 <b>/</b> ESTUDO DE FORMA</figcaption>
    {ready && <button type="button" className="motion-toggle" onClick={() => drawing.current?.()} aria-label={paused ? 'Animar escultura' : 'Pausar escultura'} title={paused ? 'Animar escultura' : 'Pausar escultura'}>{paused ? '▷' : 'Ⅱ'}</button>}
  </figure>;
}
