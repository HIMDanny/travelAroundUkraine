/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

const catalogueSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    popular: [],
    isLoading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setPopular: (state, action) => {
      state.popular = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default catalogueSlice.reducer;

export const { setProducts, setPopular, setIsLoading } = catalogueSlice.actions;

export const getProducts = () => async (dispatch) => {
  try {
    const { data, status } = await axiosConfig.get('/products');

    if (status) {
      dispatch(setProducts(data));
      dispatch(setPopular(data));
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const getPopularProducts = () => async (dispatch) => {
  const { data, status } = await axios('/products/filter?isPopular=true');

  if (status) {
    const { products } = data;
    dispatch(setPopular(products));
  }
};
