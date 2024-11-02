// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './redux/canvasSlice';

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
