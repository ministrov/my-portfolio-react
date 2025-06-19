import { useState } from 'react';
import './ExpandableCard.css'; // импорт стилей компонента

const ExpandableCard = ({
  title,
  content,
  isExpanded = false,
  icon = null,
  className = ''
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(prevState => !prevState);
  };

  return (
    <div className={`expandable-card ${className}`}>
      <header className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        <h3 className="card-title">{title}</h3>
        <button
          type="button"
          className="card-toggle-btn"
          onClick={handleToggle}
          aria-label={`${expanded ? 'Hide details' : 'Show details'}`}
        >
          {expanded ? '-' : '+'}
        </button>
      </header>
      <div
        className={`card-body ${expanded ? 'show' : 'hide'}`}
        style={{ maxHeight: expanded ? 'none' : '0', overflow: 'hidden' }}
      >
        {content}
      </div>
    </div>
  );
};

export default ExpandableCard;