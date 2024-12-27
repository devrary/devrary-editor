'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import theme from '@/states/global/slice/theme';
import modal from '@/states/global/slice/modal';
import editor from '@/states/global/slice/editor';

const rootReducer = combineReducers({
  theme,
  modal,
  editor,
  // Add reducers here
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
