

// import React, { useReducer } from 'react';

// // Исходные данные
// const initialProjects = [
//     { id: 1, name: 'Project Alpha' },
//     { id: 2, name: 'Project Beta' },
//     { id: 3, name: 'Project Gamma' }
// ];

// // Редукторная функция
// function reducer(state, action) {
//     switch (action.type) {
//         case 'FILTER':
//             return {
//                 ...state,
//                 filteredProjects: state.projects.filter(project =>
//                     project.name === action.payload
//                 )
//             };
//         case 'RESET':
//             return {
//                 ...state,
//                 filteredProjects: state.projects
//             };
//         default:
//             return state;
//     }
// }

// // Компонент
// function ProjectFilter() {
//     const [state, dispatch] = useReducer(reducer, {
//         projects: initialProjects,
//         filteredProjects: initialProjects
//     });

//     return (
//         <div>
//             {state.projects.map(project => (
//                 <button key={project.id} onClick={() =>
//                     dispatch({ type: 'FILTER', payload: project.name })
//                 }>
//                     {project.name}
//                 </button>
//             ))}
//             <button onClick={() => dispatch({ type: 'RESET' })}>Show All</button>
//             <ul>
//                 {state.filteredProjects.map(project => (
//                     <li key={project.id}>{project.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default ProjectFilter;