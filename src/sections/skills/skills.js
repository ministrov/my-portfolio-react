import { FaReact, FaCss3Alt } from 'react-icons/fa';
import { SiRedux, SiNextdotjs } from 'react-icons/si';
import { RiJavascriptLine } from 'react-icons/ri';
import { TbBrandTypescript } from 'react-icons/tb';
import { ImHtmlFive } from 'react-icons/im';
import { FaGitAlt } from 'react-icons/fa6';
import { FaSass } from 'react-icons/fa6';

export const skills = [
  {
    id: 1,
    tech: 'HTML5',
    percent: 65,
    icon: <ImHtmlFive color="red" />,
  },
  {
    id: 2,
    tech: 'CSS3',
    percent: 55,
    icon: <FaCss3Alt color="blue" />,
  },
  {
    id: 3,
    tech: 'JavaScript',
    percent: 75,
    icon: <RiJavascriptLine color="orange" />,
  },
  {
    id: 4,
    tech: 'TypeScript',
    percent: 45,
    icon: <TbBrandTypescript color="blue" />,
  },
  {
    id: 5,
    tech: 'React',
    percent: 65,
    icon: <FaReact color="lightblue" />,
  },
  {
    id: 6,
    tech: 'Next',
    percent: 35,
    icon: <SiNextdotjs />,
  },
  {
    id: 7,
    tech: 'Redux',
    percent: 45,
    icon: <SiRedux color="purple" />,
  },
  {
    id: 8,
    tech: 'RTK',
    percent: 55,
    icon: <SiRedux color="purple" />,
  },
  {
    id: 9,
    tech: 'Git',
    percent: 65,
    icon: <FaGitAlt color="red" />,
  },
  {
    id: 10,
    tech: 'Sass',
    percent: 65,
    icon: <FaSass color="pink" />,
  },
];
