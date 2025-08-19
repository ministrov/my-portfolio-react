import { useReducer } from 'react';

import {
  ActionTypes,
  projectsReducer,
  initialState,
} from '../sections/projects/projectsReduce';

const useProjectsFilter = () => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  const handleFilterClick = (name) => {
    dispatch({ type: ActionTypes.SET_FILTER, payload: name });
  };

  return { state, handleFilterClick };
};

export default useProjectsFilter;
