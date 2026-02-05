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
