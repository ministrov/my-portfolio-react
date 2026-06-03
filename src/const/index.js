import { GoProjectSymlink } from 'react-icons/go';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa6';
import { SlGlobe } from 'react-icons/sl';
import { SiAffinitydesigner } from 'react-icons/si';
import { TbSeo } from 'react-icons/tb';

export const routes = [
  {
    title: 'mainNav.home',
    href: '/',
    Icon: BiHomeAlt2,
  },
  {
    title: 'mainNav.about',
    href: '/about',
    Icon: FaUserTie,
  },
  {
    title: 'mainNav.projects',
    href: '/projects',
    Icon: GoProjectSymlink,
  },
];

export const filters = [
  { id: 1, name: 'All' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Next' },
  { id: 4, name: 'JavaScript' },
];

export const services = [
  {
    id: 1,
    title: 'services.title.one',
    description: 'services.description.one',
    icon: <SlGlobe color="white" size={25} />,
  },
  {
    id: 2,
    title: 'services.title.two',
    description: 'services.description.two',
    icon: <SiAffinitydesigner color="white" size={25} />,
  },
  {
    id: 3,
    title: 'services.title.three',
    description: 'services.description.three',
    icon: <TbSeo color="white" size={25} />,
  },
];

export const faqs = [
  {
    id: 1,
    question: 'faqs.question_1.name',
    answer: 'faqs.question_1.answer',
  },
  {
    id: 2,
    question: 'faqs.question_2.name',
    answer: 'faqs.question_2.answer',
  },
  {
    id: 3,
    question: 'faqs.question_3.name',
    answer: 'faqs.question_3.answer',
  },
  {
    id: 4,
    question: 'faqs.question_4.name',
    answer: 'faqs.question_4.answer',
  },
  {
    id: 5,
    question: 'faqs.question_5.name',
    answer: 'faqs.question_5.answer',
  },
  {
    id: 6,
    question: 'faqs.question_6.name',
    answer: 'faqs.question_6.answer',
  },
  {
    id: 7,
    question: 'faqs.question_7.name',
    answer: 'faqs.question_7.answer',
  },
];

export const education = [
  {
    id: 1,
    titleKey: 'aboutEducation.title1',
    textKey: 'aboutEducation.textOne',
    dateKey: 'aboutEducation.dateOne',
  },
  {
    id: 2,
    titleKey: 'aboutEducation.title2',
    textKey: 'aboutEducation.textTwo',
    dateKey: 'aboutEducation.dateTwo',
  },
  {
    id: 3,
    titleKey: 'aboutEducation.title3',
    textKey: 'aboutEducation.textThree',
    dateKey: 'aboutEducation.dateThree',
  },
];

// Массив данных для элементов опыта
export const experienceItems = [
  {
    id: 1,
    titleKey: 'aboutExperience.titleOne',
    dateKey: 'aboutExperience.dateOne',
    textKey: 'aboutExperience.textOne',
    hasCompany: false, // У первого элемента нет названия компании
  },
  {
    id: 2,
    titleKey: 'aboutExperience.titleTwo',
    dateKey: 'aboutExperience.dateTwo',
    textKey: 'aboutExperience.textTwo',
    hasCompany: true,
  },
  {
    id: 3,
    titleKey: 'aboutExperience.titleThree',
    dateKey: 'aboutExperience.dateThree',
    textKey: 'aboutExperience.textThree',
    hasCompany: true,
  },
];

export const skills = [
  'JavaScript',
  'JQuery',
  'HTML',
  'CSS',
  'React',
  'RTK',
  'Zustand',
  'Next',
];

/**
 * Конфигурация по умолчанию для анимированного фона
 * @type {Object}
 */
/**
 * Данные автора для компонента AuthorPhoto
 * @type {Object}
 */
export const authorData = {
  code: {
    name: 'Антон Жилин',
    role: 'Frontend Developer',
    location: 'Moscow, Russia',
    experience: '4+ years',
    focus: 'Frontend architecture, animation, DX',
    stack: ['React', 'Next.js', 'TypeScript'],
    interests: ['UX', 'Design systems', 'Animations'],
    currentlyLearning: ['Testing', 'Node.js'],
    availableFor: ['Remote', 'Consulting'],
  },
};

/**
 * Технологии для отображения в секции "Обо мне" в виде тегов.
 * Имена технологий — универсальные, не требуют локализации.
 * @type {string[]}
 */
export const ABOUT_TECH_TAGS = [
  'React',
  'Next.js',
  'TypeScript',
  'RTK Query',
  'CSS Modules',
  'Framer Motion',
  'WCAG 2.1',
  'mobile-first',
  'Agile/Scrum',
];

/**
 * Статистика для секции "Обо мне" — ключевые факты, отображаемые в виде чипов.
 * Поле labelKey указывает на ключ в i18n-словаре.
 * @type {{ number: string, labelKey: string }[]}
 */
export const ABOUT_STATS = [
  { number: '4+', labelKey: 'about.stats.years' },
  { number: '10+', labelKey: 'about.stats.projects' },
  { number: 'Middle', labelKey: 'about.stats.level' },
  { number: 'B2', labelKey: 'about.stats.lang' },
];

export const DEFAULT_CONFIG = {
  MAX_STARS: 350,
  MIN_STARS: 50,
  STAR_SIZE_MIN: 0.7,
  STAR_SIZE_MAX: 4,
  STAR_OPACITY_MIN: 0.1,
  STAR_OPACITY_MAX: 0.7,
  PULSE_PROBABILITY: 0.6, // 60% chance for pulse animation
  DRIFT_DISTANCE_MIN: 5,
  DRIFT_DISTANCE_MAX: 20,
  PULSE_INTENSITY_MIN: 0.3,
  PULSE_INTENSITY_MAX: 0.8,
  PULSE_DURATION_MIN: 2,
  PULSE_DURATION_MAX: 5,
  DRIFT_DURATION_MIN: 3,
  DRIFT_DURATION_MAX: 9,
  COLORS: [
    '#ffffff',
    'rgba(43, 87, 168, 1)',
    '#ffffff',
    'rgb(254,6,110)',
    '#ffffff',
  ],
};

// Константы для breakpoints (можно вынести в отдельный файл констант)
export const BREAKPOINTS = {
  MOBILE: 375,
  TABLET: 768,
};
/**
 * Ключ для сохранения предпочтительного языка в localStorage.
 * @constant {string}
 */
export const LOCAL_STORAGE_KEY = 'preferredLang';

/**
 * Допустимые значения языка.
 * @constant {Object}
 */
export const LANGUAGES = {
  RU: 'ru',
  EN: 'en',
};
