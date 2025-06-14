import { FaReact, FaCss3Alt } from 'react-icons/fa';
import { SiRedux, SiNextdotjs } from 'react-icons/si';
import { RiJavascriptLine } from 'react-icons/ri';
import { TbBrandTypescript } from 'react-icons/tb';
import { ImHtmlFive } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';

export const skills = [
  {
    id: uuidv4(),
    tech: 'HTML5',
    percent: 65,
    icon: <ImHtmlFive color="red" />,
  },
  {
    id: uuidv4(),
    tech: 'CSS3',
    percent: 55,
    icon: <FaCss3Alt color="blue" />,
  },
  {
    id: uuidv4(),
    tech: 'JavaScript',
    percent: 75,
    icon: <RiJavascriptLine color="orange" />,
  },
  {
    id: uuidv4(),
    tech: 'TypeScript',
    percent: 45,
    icon: <TbBrandTypescript color="blue" />,
  },
  {
    id: uuidv4(),
    tech: 'React',
    percent: 65,
    icon: <FaReact color="lightblue" />,
  },
  {
    id: uuidv4(),
    tech: 'Next',
    percent: 35,
    icon: <SiNextdotjs />,
  },
  {
    id: uuidv4(),
    tech: 'Redux',
    percent: 45,
    icon: <SiRedux color="purple" />,
  },
  {
    id: uuidv4(),
    tech: 'RTK',
    percent: 55,
    icon: <SiRedux color="purple" />,
  }
];
