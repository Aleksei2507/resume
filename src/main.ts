import {
  createIcons,
  createElement,
  Code,
  Layout,
  Type,
  Repeat,
  Layers,
  Paintbrush,
  Wind,
  Terminal,
  Zap,
  Package,
  FileCode,
  Wand,
  GitBranch,
  BookOpen,
  CheckCircle,
  Server,
  Network,
  Send,
  Bot,
  FileText,
  Image,
  ShoppingCart,
  LineChart,
  Car,
  Globe,
  Shield,
  Droplet,
  Building2,
  Moon,
  Sun,
} from 'lucide';
import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  createIcons({
    icons: {
      Code,
      Layout,
      Type,
      Repeat,
      Layers,
      Paintbrush,
      Wind,
      Terminal,
      Zap,
      Package,
      FileCode,
      Wand,
      GitBranch,
      BookOpen,
      CheckCircle,
      Server,
      Network,
      Send,
      Bot,
      FileText,
      Image,
      ShoppingCart,
      LineChart,
      Car,
      Globe,
      Shield,
      Droplet,
      Building2,
      Moon,
      Sun,
    },
  });

  const themeToggle = document.getElementById('themeToggle') as HTMLElement;
  const yearElement = document.getElementById('year') as HTMLElement;
  const sections = document.querySelectorAll<HTMLElement>('section');

  const savedTheme: string = localStorage.getItem('theme') || 'dark';

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    },
    { threshold: 0.1 },
  );

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  document.body.dataset.theme = savedTheme;

  if (themeToggle) {
    themeToggle.innerHTML = '';

    const newIconElement = createElement(savedTheme === 'light' ? Sun : Moon);
    themeToggle.append(newIconElement);

    const toggleTheme = (event?: MouseEvent) => {
      const isLight = document.body.dataset.theme === 'light';
      const newTheme = isLight ? 'dark' : 'light';

      const changeTheme = () => {
        document.body.dataset.theme = newTheme;
        document.body.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);

        const iconElement = themeToggle.querySelector('svg');
        if (iconElement) {
          iconElement.remove();
        }
        const newIconElement = createElement(newTheme === 'light' ? Sun : Moon);
        themeToggle.append(newIconElement);
      };

      if (document.startViewTransition) {
        document.startViewTransition(changeTheme);
      } else {
        requestAnimationFrame(changeTheme);
      }
    };

    themeToggle.addEventListener('click', toggleTheme);
  }

  sections.forEach((section) => observer.observe(section));
});
