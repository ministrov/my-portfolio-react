import { FaReact, FaNode, FaCss3Alt, FaVuejs } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { ImHtmlFive } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';

export const skills = [
  {
    id: uuidv4(),
    tech: 'HTML',
    icon: <ImHtmlFive />
  },
  {
    id: uuidv4(),
    tech: 'CSS3',
    icon: <FaCss3Alt />
  },
  {
    id: uuidv4(),
    tech: 'React JS',
    icon: <FaReact/>
  },
  {
    id: uuidv4(),
    tech: 'Vue3 JS',
    icon: <FaVuejs />
  },
  {
    id: uuidv4(),
    tech: 'Node JS',
    icon: <FaNode/>
  },
  {
    id: uuidv4(),
    tech: 'JavaScript',
    icon: <SiJavascript />
  }
];
