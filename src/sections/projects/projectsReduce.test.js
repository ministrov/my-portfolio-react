import { describe, it, expect } from 'vitest';
import { projectsReducer, initialState, ActionTypes } from './projectsReduce';
import { projects } from './projects';

describe('projectsReducer', () => {
  it('в начальном состоянии отдаёт все проекты и фильтр All', () => {
    expect(initialState.activeFilter).toBe('All');
    expect(initialState.filteredProjects).toHaveLength(projects.length);
  });

  it('по фильтру All возвращает полный список', () => {
    const state = projectsReducer(initialState, {
      type: ActionTypes.SET_FILTER,
      payload: 'All',
    });

    expect(state.activeFilter).toBe('All');
    expect(state.filteredProjects).toHaveLength(projects.length);
  });

  it('сужает список до проектов с нужным навыком', () => {
    const state = projectsReducer(initialState, {
      type: ActionTypes.SET_FILTER,
      payload: 'React',
    });

    expect(state.filteredProjects.length).toBeGreaterThan(0);
    expect(state.filteredProjects.length).toBeLessThan(projects.length);
    // skills — строка через запятую, фильтрация идёт через includes
    expect(
      state.filteredProjects.every((p) => p.skills.includes('React'))
    ).toBe(true);
  });

  it('на неизвестный навык отдаёт пустой список, не падая', () => {
    const state = projectsReducer(initialState, {
      type: ActionTypes.SET_FILTER,
      payload: 'КоболНаМарсе',
    });

    expect(state.filteredProjects).toEqual([]);
  });

  it('на неизвестный тип экшена возвращает состояние без изменений', () => {
    const state = projectsReducer(initialState, { type: 'ЧтоТоЕщё' });

    expect(state).toBe(initialState);
  });
});
