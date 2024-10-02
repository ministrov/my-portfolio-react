import { FaReact, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { SiTypescript } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { ImHtmlFive } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';

export const skills = [
  {
    id: uuidv4(),
    tech: 'HTML',
    icon: <ImHtmlFive color='red' />
  },
  {
    id: uuidv4(),
    tech: 'CSS3',
    icon: <FaCss3Alt color='blue' />
  },
  {
    id: uuidv4(),
    tech: 'JavaScript',
    icon: <SiJavascript color='orange' />
  },
  {
    id: uuidv4(),
    tech: 'TypeScript',
    icon: <SiTypescript color='blue' />
  },
  {
    id: uuidv4(),
    tech: 'React JS',
    icon: <FaReact  color='lightblue'/>
  },
  {
    id: uuidv4(),
    tech: 'Redux',
    icon: <SiRedux color='purple'/>
  }
  // {
  //   id: uuidv4(),
  //   tech: 'ReduxToolkit',
  //   icon: <SiRedux color='purple'/>
  // },
  // {
  //   id: uuidv4(),
  //   tech: 'Redux Toolkit + RTK Query',
  //   icon: <SiRedux color='purple'/>
  // }
];
