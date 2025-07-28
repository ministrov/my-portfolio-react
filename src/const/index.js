import { GoProjectSymlink } from "react-icons/go";
import { BiHomeAlt2 } from "react-icons/bi";
import { SlGlobe } from 'react-icons/sl';
import { SiAffinitydesigner } from 'react-icons/si';
import { TbSeo } from 'react-icons/tb';

export const routes = [
  {
    title: "mainNav.home",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "mainNav.projects",
    href: "/projects",
    Icon: GoProjectSymlink,
  }
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