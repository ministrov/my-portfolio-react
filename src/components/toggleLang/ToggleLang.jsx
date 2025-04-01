import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../store/language.slice';
import i18n from 'i18next';
import './styles.css';

export const ToggleLang = () => {
    const dispatch = useDispatch();
    const { currentLang, toggled } = useSelector((state) => state.currentLang);

    console.log(currentLang);

    const handleLanguageChange = (lang) => {
        dispatch(toggleLanguage(lang));
        i18n.changeLanguage(lang);
    }

    return (
        <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => handleLanguageChange('ru')}>
            <div className="thumb">{toggled ? 'Ru' : 'En'}</div>
        </button>
    );
}