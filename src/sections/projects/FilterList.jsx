import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import FilterButton from '../../components/filterButton/FilterButton';
import './style.css';

/**
 * Список фильтров для проектов.
 * Отображает кнопки фильтров и управляет активным состоянием.
 * Значение фильтра (`value`) используется для матчинга, `label` — ключ
 * перевода для видимого текста кнопки.
 *
 * Визуально — подчёркнутые табы: равные колонки грида задают позиции,
 * а бегунок под активной кнопкой сдвигается через CSS custom properties
 * (`--filter-count`, `--active-index`), без замера DOM в JS.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Object[]} props.filters - Массив фильтров
 * @param {number} props.filters[].id - Уникальный идентификатор фильтра
 * @param {string} props.filters[].value - Значение фильтра (навык)
 * @param {string} props.filters[].label - Ключ перевода подписи кнопки
 * @param {string} props.activeFilter - Активный фильтр (значение)
 * @param {Function} props.onFilterClick - Обработчик клика по фильтру
 * @returns {JSX.Element} Список фильтров
 */
const FilterList = ({ filters, activeFilter, onFilterClick }) => {
  const { t } = useTranslation();
  const activeIndex = Math.max(
    0,
    filters.findIndex((filter) => filter.value === activeFilter)
  );

  return (
    <div className="projects__filter">
      <div
        className="projects__filter-track"
        style={{
          '--filter-count': filters.length,
          '--active-index': activeIndex,
        }}
      >
        <ul
          className="projects__filter-list"
          aria-label={t('filters.ariaLabel')}
        >
          {filters.map((filter) => (
            <li key={filter.id} className="projects__filter-item">
              <FilterButton
                active={activeFilter}
                currentBtn={filter.value}
                filterName={t(filter.label)}
                onClick={() => onFilterClick(filter.value)}
              />
            </li>
          ))}
        </ul>
        <span className="projects__filter-indicator" aria-hidden="true" />
      </div>
    </div>
  );
};

export default memo(FilterList);
