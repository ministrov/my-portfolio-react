import { useState } from 'react';
import './styles.css';

export const ToggleLang = () => {
    const [toggled, setToggled] = useState(false);

    return (
        <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => setToggled(!toggled)}>
            <div className="thumb">{toggled ? 'Ru' : 'En'}</div>
        </button>
    );
}
