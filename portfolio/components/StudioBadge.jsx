'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Lanyard = dynamic(() => import('./react-bits/lanyard/Lanyard'), { ssr: false });
const frontImage = '/lanyard/gusesba-frente.svg';
const backImage = '/lanyard/gusesba-verso.svg';

export default function StudioBadge() {
  const frame = useRef(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  return <figure ref={frame} className="studio-badge" data-reveal="">
    <div className="badge-poster"><img src={frontImage} alt="Crachá de Gustavo Esmanhotto, Gusesba" width="640" height="900" /></div>
    {nearby && <Lanyard frontImage={frontImage} backImage={backImage} cardColor="#1a1a19" strapColor="#ff693b" size={0.62} strapLength={0.39} breeze={0.13} />}
    <figcaption>Arraste o crachá ou toque para virar.</figcaption>
  </figure>;
}
