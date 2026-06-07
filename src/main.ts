import {
  Boxes,
  Building2,
  Car,
  CarFront,
  Droplet,
  Gauge,
  Globe2,
  LineChart,
  Mail,
  MapPin,
  Send,
  Shield,
  Sparkles,
  Truck,
  Workflow,
  createIcons,
} from 'lucide';
import { gsap } from 'gsap';

declare global {
  interface Window {
    __motionFallbackTimer?: number;
  }
}

const heroSelectors = [
  '.brand',
  '.top-nav',
  '.header-action',
  '.hero-copy > *',
  '.profile-panel',
  '.metric-list > div',
];

const revealSelector = [
  '.section-heading',
  '.summary-card',
  '.job',
  '.project-item',
  '.skills-layout article',
  '.education-card',
  '.contact-card',
].join(', ');

const interactiveCardSelector = [
  '.summary-card',
  '.project-item',
  '.skills-layout article',
  '.education-card',
  '.contact-card',
].join(', ');

document.addEventListener('DOMContentLoaded', () => {
  createIcons({
    icons: {
      Boxes,
      Building2,
      Car,
      CarFront,
      Droplet,
      Gauge,
      Globe2,
      LineChart,
      Mail,
      MapPin,
      Send,
      Shield,
      Sparkles,
      Truck,
      Workflow,
    },
  });

  const yearElement = document.getElementById('year');
  const header = document.querySelector<HTMLElement>('.site-header');
  const html = document.documentElement;

  const setHeaderState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  const revealImmediately = () => {
    window.clearTimeout(window.__motionFallbackTimer);
    html.classList.add('motion-mounted');
    html.classList.add('motion-fallback');
    gsap.set([...heroSelectors, revealSelector], {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
    });
  };

  const initScrollReveal = () => {
    const revealItems = gsap.utils.toArray<HTMLElement>(revealSelector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          target.classList.add('is-visible');

          gsap.to(target, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.66,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.9) {
        item.classList.add('is-visible');
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.56,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        return;
      }

      observer.observe(item);
    });
  };

  const initHoverMotion = () => {
    gsap.utils.toArray<HTMLElement>(interactiveCardSelector).forEach((card) => {
      card.addEventListener('pointerenter', () => {
        gsap.to(card, { y: -5, scale: 1.01, duration: 0.22, ease: 'power2.out' });
      });

      card.addEventListener('pointerleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.28, ease: 'power2.out' });
      });
    });
  };

  const initMotion = () => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        allowMotion: '(prefers-reduced-motion: no-preference)',
        isDesktop: '(min-width: 981px)',
      },
      (context) => {
        const { allowMotion, isDesktop, reduceMotion } = context.conditions ?? {};

        if (reduceMotion || !allowMotion) {
          revealImmediately();
          return;
        }

        window.clearTimeout(window.__motionFallbackTimer);
        html.classList.add('motion-mounted');
        html.classList.remove('motion-fallback');

        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        const heroItems = gsap.utils.toArray<HTMLElement>('.hero-copy > *');
        const metricItems = gsap.utils.toArray<HTMLElement>('.metric-list > div');

        heroTimeline
          .to('.brand', { autoAlpha: 1, y: 0, duration: 0.32 })
          .to('.top-nav', { autoAlpha: 1, y: 0, duration: 0.34 }, '<0.05')
          .to('.header-action', { autoAlpha: 1, y: 0, duration: 0.34 }, '<0.05')
          .to(heroItems, { autoAlpha: 1, y: 0, duration: 0.74, stagger: 0.07 }, '-=0.02')
          .to(
            '.profile-panel',
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.72,
            },
            isDesktop ? '-=0.46' : '-=0.28',
          )
          .to(metricItems, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.08 }, '-=0.26');

        initScrollReveal();
        initHoverMotion();

        gsap.to('.profile-top svg', {
          rotation: 8,
          y: -4,
          duration: 2.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      },
    );
  };

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  setHeaderState();
  initMotion();
  window.addEventListener('scroll', setHeaderState, { passive: true });
});
