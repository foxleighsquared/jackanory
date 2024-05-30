import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { apiSetup } from 'lib/helpers/api-setup';
import authSlice from './auth-slice';

const rootReducer = combineReducers({
  [apiSetup.reducerPath]: apiSetup.reducer,
  auth: authSlice
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSetup.middleware)
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const Store = createWrapper(setupStore);

export default Store;
