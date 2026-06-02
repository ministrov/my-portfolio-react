import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент хлебных крошек для навигации по сайту.
 * Отображает цепочку ссылок, ведущих к текущей странице, как упорядоченный список.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Array} props.items - Массив объектов хлебных крошек
 * @param {string|number} props.items[].id - Уникальный идентификатор элемента (строка или число)
 * @param {string} props.items[].name - Отображаемое название элемента
 * @param {string} [props.items[].link] - Ссылка для перехода (если отсутствует, элемент считается текущей страницей)
 * @param {Object} props... - Дополнительные свойства, передаваемые в контейнер
 * @returns {JSX.Element} Отрисованный компонент хлебных крошек
 *
 * @example
 * const breadcrumbItems = [
 *   { id: 'home', name: 'Главная', link: '/' },
 *   { id: 'projects', name: 'Проекты', link: '/projects' },
 *   { id: 'project-1', name: 'Проект 1' }
 * ];
 *
 * <Breadcrumbs items={breadcrumbItems} />
 */
const Breadcrumbs = ({ items, ...props }) => {
  const { t } = useTranslation();

  return (
    <nav
      className="breadcrumbs"
      aria-label={t('breadcrumbs.ariaLabel')}
      {...props}
    >
      <ol className="breadcrumbs__list">
        {items.map((item, index) => (
          <li key={item.id} className="breadcrumbs__item">
            {index > 0 && (
              <MdOutlineKeyboardArrowRight
                className="breadcrumbs__arrow"
                aria-hidden="true"
              />
            )}
            {item.link ? (
              <Link to={item.link} className="breadcrumbs__link">
                {item.name}
              </Link>
            ) : (
              <span className="breadcrumbs__current" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  /** Массив элементов хлебных крошек */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /** Уникальный идентификатор элемента (строка или число) */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** Отображаемое название элемента */
      name: PropTypes.string.isRequired,
      /** Ссылка для перехода (опционально) */
      link: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumbs;
