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
    dateTime: '1998-09/2002-06',
  },
  {
    id: 2,
    titleKey: 'aboutEducation.title2',
    textKey: 'aboutEducation.textTwo',
    dateKey: 'aboutEducation.dateTwo',
    dateTime: '2020-05/2021-03',
  },
  {
    id: 3,
    titleKey: 'aboutEducation.title3',
    textKey: 'aboutEducation.textThree',
    dateKey: 'aboutEducation.dateThree',
    dateTime: '2024-09/2024-11',
  },
];

// Массив данных для элементов опыта
export const experienceItems = [
  {
    id: 1,
    titleKey: 'aboutExperience.titleOne',
    dateKey: 'aboutExperience.dateOne',
    dateTimeKey: 'aboutExperience.dateTimeOne',
    textKey: 'aboutExperience.textOne',
    hasCompany: false, // У первого элемента нет названия компании
  },
  {
    id: 2,
    titleKey: 'aboutExperience.titleTwo',
    dateKey: 'aboutExperience.dateTwo',
    dateTimeKey: 'aboutExperience.dateTimeTwo',
    textKey: 'aboutExperience.textTwo',
    hasCompany: true,
  },
  {
    id: 3,
    titleKey: 'aboutExperience.titleThree',
    dateKey: 'aboutExperience.dateThree',
    dateTimeKey: 'aboutExperience.dateTimeThree',
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
  name: 'Антон Жилин',
  role: 'Frontend Developer · React / Next.js',
  location: 'Москва · Remote / Hybrid',
  photoAlt: 'Крупным планом автор проекта',
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
