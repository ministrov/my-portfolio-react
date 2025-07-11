import SocialItem from './SocialItem.jsx';
import { socials } from './socials.js';
import './style.css';

const SocialList = ({ className = 'socials__list', variant = 'white' }) => {
  return (
    <ul className={`socials ${className}`}>
      {socials.map((social) => (
        <SocialItem
          key={social.name}
          social={social}
          tabIndex={0}
          variant={variant}
        />
      ))}
    </ul>
  );
};

export default SocialList;


// const coder = {
//   name: 'Anton Zhilin',
//   skills: ['React', 'NextJS', 'Redux', 'TypeScript',
//     'REST API', 'Material UI', 'Docker', 'AWS'
//   ],
//   hardWorker: true,
//   quickLearner: true,
//   problemSolver: true,
//   hireable() {
//     return (
//       this.hardWorker &&
//       this.problemSolver &&
//       this.skills.length >=
//     );
//   }
// };







