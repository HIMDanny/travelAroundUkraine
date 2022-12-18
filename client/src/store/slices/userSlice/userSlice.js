/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  isModalOpen: false,
  userData: null,
  error: null,
  isLoading: false,
};

export const fetchUserInfo = createAsyncThunk('user/feacthUserInfo', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosConfig.get('/customers/customer').then((loggedInCustomer) => loggedInCustomer);
    return data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    toggleIsLogin: (state) => {
      state.isLogin = !state.isLogin;
    },

    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state, action) => {
      state.userData = action.payload;
      state.isLoading = true;
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { toggleIsLogin, setIsModalOpen } = userSlice.actions;

export default userSlice.reducer;
