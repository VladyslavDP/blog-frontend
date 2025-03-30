import { configureStore, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as uiSlice from './uiSlice';

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log(`[LOGGER]:`, action);
  return next(action);
};

const store = configureStore({
  reducer: {
    ui: uiSlice.default,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export * from './uiSlice';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
