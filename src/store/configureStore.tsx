import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import mainReducer from './slices/main.slice';
import snackbarReducer from './slices/snackbar.slice';
import backdropReducer from './slices/backdrop.slice';

const reducer = combineReducers({
    main: mainReducer,
    snackbar: snackbarReducer,
    backdrop: backdropReducer,
});

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: false })],
});

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
