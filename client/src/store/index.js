import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import tourReducer from './slices/tourSlice/tourSlice';
import catalogueReducer from './slices/catalogueSlice/catalogueSlice';
import cartReducer from './slices/cartSlice/cartSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import inFavoritesReducer from './slices/inFavoritesSlice/inFavoritesSlice';

const store = configureStore({
  reducer: {
    userReducer,
    tour: tourReducer,
    catalogue: catalogueReducer,
    cart: cartReducer,
    order: orderSlice,
    favorites: inFavoritesReducer,
  },
});

export default store;
