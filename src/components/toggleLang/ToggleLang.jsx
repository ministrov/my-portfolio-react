// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../store/language.slice';
import i18n from 'i18next';
import './styles.css';

// export const ToggleLang = () => {
//     const [toggled, setToggled] = useState(false);

//     return (
//         <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => setToggled(!toggled)}>
//             <div className="thumb">{toggled ? 'Ru' : 'En'}</div>
//         </button>
//     );
// }

export const ToggleLang = () => {
    const dispatch = useDispatch();
    const currentLang = useSelector((state) => state.currentLang);

    const handleLanguageChange = (lang) => {
        dispatch(toggleLanguage(lang));
        i18n.changeLanguage(lang)
    }
    return (
        <div className="toggle-btn">
            <button
                onClick={() => handleLanguageChange('en')}
                disabled={currentLang === 'en'}
            >
                English
            </button>
            <button
                onClick={() => handleLanguageChange('ru')}
                disabled={currentLang === 'ru'}
            >
                Russian
            </button>
        </div>
    );
}
