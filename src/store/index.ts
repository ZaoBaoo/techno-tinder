import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './reducers/popup';

const store = configureStore({
  reducer: {
    popupData: popupReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
