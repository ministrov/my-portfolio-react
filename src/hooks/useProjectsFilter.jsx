import { useReducer } from 'react';
// import { useUrlParams } from '../hooks/useUrlParams';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ActionTypes,
  projectsReducer,
  initialState,
} from '../sections/projects/projectsReduce';

const useProjectsFilter = () => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);
  // const [filter, setFilter] = useUrlParams('filter', name);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleFilterClick = (name) => {
    dispatch({ type: ActionTypes.SET_FILTER, payload: name });
    queryParams.set('filter', name);
    navigate({ search: queryParams.toString() });
  };

  return { state, handleFilterClick };
};

export default useProjectsFilter;
