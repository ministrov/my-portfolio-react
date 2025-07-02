import SocialListItem from './SocialListItem.jsx';
import { socials } from './socials.js';
import './style.css';

const SocialList = ({ className }) => {
  return (
    <ul className={`${className} socials`}>
      {socials.map((social) => (
        <SocialListItem tabIndex={0} key={social.name} social={social} />
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







