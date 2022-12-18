/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const catalogueSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default catalogueSlice.reducer;

export const { setProducts, setIsLoading } = catalogueSlice.actions;

export const getProducts = () => async (dispatch) => {
  try {
    const { data, status } = await axios('/products');

    if (status) {
      dispatch(setProducts(data));
    }
  } catch (err) {
    console.error(err.message);
  }
};
