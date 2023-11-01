// store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add more reducers as needed
  },
});

export default store;
