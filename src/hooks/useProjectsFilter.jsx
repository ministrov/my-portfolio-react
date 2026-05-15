import { useReducer } from 'react';

import {
  ActionTypes,
  projectsReducer,
  initialState,
} from '../sections/projects/projectsReduce';

/**
 * Кастомный хук для фильтрации проектов.
 * Использует редьюсер для управления состоянием фильтров.
 * Предоставляет состояние фильтров и функцию для их изменения.
 *
 * @returns {Object} Объект с состоянием фильтров и функцией обработки клика.
 * @property {Object} state - Текущее состояние фильтров (редьюсер).
 * @property {Function} handleFilterClick - Функция для установки фильтра по имени.
 *   @param {string} name - Название фильтра для активации.
 *
 * @example
 * const { state, handleFilterClick } = useProjectsFilter();
 * console.log(state.filter); // текущий активный фильтр
 * handleFilterClick('web'); // устанавливает фильтр 'web'
 */
const useProjectsFilter = () => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  const handleFilterClick = (name) => {
    dispatch({ type: ActionTypes.SET_FILTER, payload: name });
  };

  return { state, handleFilterClick };
};

export default useProjectsFilter;
