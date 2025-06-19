// import { useState } from 'react';
// import './ExpandableCard.css';

// const ExpandableCard = ({ service, className }) => {
//   const { num, href, icon, title, description } = service;
//   const [expanded, setExpanded] = useState(false);

//   const handleToggle = () => {
//     setExpanded(prevState => !prevState);
//   };

//   return (
//     <div className={`expandable-card ${className}`}>
//       <header className="card-header">
//         {icon && <span className="card-icon">{icon}</span>}
//         <h3 className="card-title">{title}</h3>
//         <p>{num}</p>
//         <p>{href}</p>
//         <button
//           type="button"
//           className="card-toggle-btn"
//           onClick={handleToggle}
//           aria-label={`${expanded ? 'Hide details' : 'Show details'}`}
//         >
//           {expanded ? '-' : '+'}
//         </button>
//       </header>
//       <div
//         className={`card-body ${expanded ? 'show' : 'hide'}`}
//         style={{ maxHeight: expanded ? 'none' : '0', overflow: 'hidden' }}
//       >
//         {description}
//       </div>
//     </div>
//   );
// };

// export default ExpandableCard;