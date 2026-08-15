import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import StickyShowcase from '../../components/stickyShowcase/StickyShowcase';
import './style.css';

/**
 * Компонент секции "Портфолио" (Showcasing) - отображает липкую витрину
 * лучших проектов, управляемую прокруткой пользователя
 *
 * @component
 * @example
 * return (
 *   <Showcasing />
 * )
 *
 * @description
 * Этот компонент отвечает за отображение секции портфолио на главной странице.
 * Смена проекта происходит по мере прокрутки страницы — скорость и направление
 * задаёт сам пользователь, см. {@link StickyShowcase}.
 *
 * @returns {JSX.Element} Секция с заголовком и витриной проектов
 */
const Showcasing = () => {
  const { t } = useTranslation();

  return (
    <section className="showcasing" aria-labelledby="showcasing-heading">
      <div className="container">
        <Heading
          id="showcasing-heading"
          title={t('heading.showcasing.name')}
          accent={t('heading.showcasing.accent')}
        />
      </div>
      <div className="showcasing__wrapper">
        <StickyShowcase />
      </div>
    </section>
  );
};

export default Showcasing;
