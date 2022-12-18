/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getProduct from '../../../api/getProduct';

const initialState = {
  data: {},
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,

  reducers: {
    setTour: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTour } = tourSlice.actions;

export const fetchTour = (itemNo) => async (dispatch) => {
  const data = await getProduct(itemNo);

  dispatch(setTour(data));
};

export default tourSlice.reducer;
