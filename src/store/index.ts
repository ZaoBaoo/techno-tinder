import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/app';
import productsReducer from './reducers/products';

const store = configureStore({
  reducer: {
    app: appReducer,
    products: productsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
