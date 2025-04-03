import { FaReact, FaCss3Alt } from 'react-icons/fa';
import { SiRedux, SiNextdotjs, SiMobxstatetree } from 'react-icons/si';
import { RiJavascriptLine } from 'react-icons/ri';
import { TbBrandTypescript } from 'react-icons/tb';
import { ImHtmlFive } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';

export const skills = [
  {
    id: uuidv4(),
    tech: 'HTML5',
    icon: <ImHtmlFive color="red" />,
  },
  {
    id: uuidv4(),
    tech: 'CSS3',
    icon: <FaCss3Alt color="blue" />,
  },
  {
    id: uuidv4(),
    tech: 'JavaScript',
    icon: <RiJavascriptLine color="orange" />,
  },
  {
    id: uuidv4(),
    tech: 'TypeScript',
    icon: <TbBrandTypescript color="blue" />,
  },
  {
    id: uuidv4(),
    tech: 'React',
    icon: <FaReact color="lightblue" />,
  },
  {
    id: uuidv4(),
    tech: 'Redux',
    icon: <SiRedux color="purple" />,
  },
  {
    id: uuidv4(),
    tech: 'RTK',
    icon: <SiRedux color="purple" />,
  },
  {
    id: uuidv4(),
    tech: 'Next',
    icon: <SiNextdotjs />,
  },
  {
    id: uuidv4(),
    tech: 'Zustand',
    icon: <SiMobxstatetree />,
  },
];
