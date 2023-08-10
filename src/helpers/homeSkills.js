import { FaReact, FaNode, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { v4 as uuidv4 } from 'uuid';

const HomeSkills = [
  {
    id: uuidv4(),
    tech: 'React JS',
    icon: <FaReact/>
  },
  {
    id: uuidv4(),
    tech: 'Node JS',
    icon: <FaNode/>
  },
  {
    id: uuidv4(),
    tech: 'CSS',
    icon: <FaCss3Alt />
  },
  {
    id: uuidv4(),
    tech: 'JavaScript',
    icon: <SiJavascript />
  }
];

export default HomeSkills;