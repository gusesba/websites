'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const blocks = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.dataset.reveal = 'visible';
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -24px 0px' });

    for (const block of blocks) {
      if (block.getBoundingClientRect().bottom <= 0) continue;
      block.dataset.reveal = 'pending';
      observer.observe(block);
    }

    return () => {
      observer.disconnect();
      for (const block of blocks) block.dataset.reveal = '';
    };
  }, []);

  return null;
}
