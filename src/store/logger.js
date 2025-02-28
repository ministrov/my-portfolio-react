// import { store } from './store';

export const logIt = (store) => (next) => (action) => {
    console.log(`[${Date()}] — выполнено действие`);
    console.log(action);
    console.log('Текущее состояние:');
    console.log(store.getState());

    return next(action);
};