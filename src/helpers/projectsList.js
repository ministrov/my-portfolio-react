import { v4 as uuidv4 } from 'uuid';
import project01 from '../img/projects/01.jpg';
import project01Big from '../img/projects/01-big.jpg';
import project02 from '../img/projects/02.jpg';
import project02Big from '../img/projects/02-big.jpg';
import project03 from '../img/projects/03.jpg';
import project03Big from '../img/projects/03-big.jpg';
import project04 from '../img/projects/04.jpg';
import project04Big from '../img/projects/04-big.jpg';
import project05 from '../img/projects/05.jpg';
import project05Big from '../img/projects/05-big.jpg';
import project06 from '../img/projects/06.jpg';
import project06Big from '../img/projects/06-big.jpg';

const projects = [
  {
    id: uuidv4(),
    title: 'Gaming streaming portal',
    skills: 'React, Node.js, MongoDB',
    img: project01,
    imgBig: project01Big,
    gitHubLink: 'https://github.com'
  },
  {
    id: uuidv4(),
    title: 'Video Service',
    skills: 'React, PHP, MySQL',
    img: project02,
    imgBig: project02Big,
    gitHubLink: 'https://github.com'
  },
  {
    id: uuidv4(),
    title: 'Video Portal',
    skills: 'Vue JS, Node.js, MongoDB',
    img: project03,
    imgBig: project03Big,
    gitHubLink: 'https://github.com'
  },
  {
    id: uuidv4(),
    title: 'Dating App',
    skills: 'React Native',
    img: project04,
    imgBig: project04Big
  },
  {
    id: uuidv4(),
    title: 'Landing',
    skills: 'HTML, CSS, JS',
    img: project05,
    imgBig: project05Big
  },
  {
    id: uuidv4(),
    title: 'Gaming Comunity',
    skills: 'React, PHP, MySQL',
    img: project06,
    imgBig: project06Big
  }
];

export {projects};