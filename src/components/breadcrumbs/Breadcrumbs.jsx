import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент хлебных крошек для навигации по сайту.
 * Отображает цепочку ссылок, ведущих к текущей странице.
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
  return (
    <nav className="breadcrumbs" aria-label="breadcrumbs" {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.id} className="item">
            {item.link ? (
              <>
                <Link 
                  to={item.link} 
                  className="link"
                  aria-current={isLast ? undefined : 'false'}
                >
                  {item.name}
                </Link>
                {!isLast && (
                  <MdOutlineKeyboardArrowRight
                    className="arrow-right"
                    aria-hidden="true"
                  />
                )}
              </>
            ) : (
              <span 
                className="current" 
                aria-current="page"
              >
                {item.name}
              </span>
            )}
          </div>
        );
      })}
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
