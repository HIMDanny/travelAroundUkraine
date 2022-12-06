import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tours: [],
  prices: [0, 0],
  isFilter: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    setFilteredTours: (state, action) => {
      state.tours = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
  },
});

export const { setFilteredTours, setPrices, setIsFilter } =
  filterSlice.actions;

export default filterSlice.reducer;