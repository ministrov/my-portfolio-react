import { projects } from './projects';

export const ActionTypes = {
  SET_FILTER: 'SET_FILTER',
};

export const initialState = {
  filteredProjects: projects,
  activeFilter: 'All',
};

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      const filteredItems =
        action.payload === 'All'
          ? projects
          : projects.filter((project) =>
              project.skills.includes(action.payload)
            );

      return {
        ...state,
        filteredProjects: filteredItems,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};
