import { createSlice } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';

// TODO: 1) Remove inFavoritesCounter and send 2 requests instead of one. Then, delete unnecessary logic from components. 2) Delete Infavorites slice - move logic to catalog slice and add inFavorites property to all items at DB.


const inFavoritesReducer = createSlice({
  name: 'inFavorites',
  initialState: {
    inFavorites: [],
  },
  reducers: {
    setItemInFavorites: (state, action) => {
      state.inFavorites.push(action.payload);
    },
    setInitialState: (state, action) => {
      state.inFavorites = action.payload;
    },
    deleteItemFromFavorites: (state, action) => {
      state.inFavorites = state.inFavorites.filter((elId) => elId !== action.payload);
    },
  },
});

export const { setItemInFavorites, setInitialState, deleteItemFromFavorites } = inFavoritesReducer.actions;

export default inFavoritesReducer.reducer;

export const gettWishList = (isLogin) => async (dispatch) => {
  if (isLogin) {
    try {
      const { data } = await axiosConfig('/wishlist');
      if (data) {
        const itemIds = data.products.map(({ _id }) => _id);
        dispatch(setInitialState(itemIds));
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    const localFavorites = JSON.parse(localStorage.getItem('inFavorites'));
    if (localFavorites) {
      dispatch(setInitialState(localFavorites));
    }
  }
};

export const addItemtoWishList = (isLogin, id) => async (dispatch) => {
  if (isLogin) {
    try {
      const { status } = await axiosConfig(`/wishlist/${id}`, {
        method: 'PUT',
      });
      if (status === 200) {
        dispatch(setItemInFavorites(id));
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    const localFavorites = JSON.parse(localStorage.getItem('inFavorites'));
    if (localFavorites) {
      localFavorites.push(id);
      localStorage.setItem('inFavorites', JSON.stringify(localFavorites));
      dispatch(setItemInFavorites(id));
    } else {
      dispatch(setItemInFavorites(id));
      localStorage.setItem('inFavorites', JSON.stringify([id]));
    }
  }
};

export const deleteItemfromWishList = (isLogin, id, inFavoritesCounter) => async (dispatch) => {
  if (isLogin && inFavoritesCounter > 0) {
    try {
      const { status } = await axiosConfig(`/wishlist/${id}`, {
        method: 'DELETE',
      });
      if (status === 200) {
        dispatch(deleteItemFromFavorites(id));
      }
    } catch (err) {
      console.error(err);
    }
  } else if (isLogin && inFavoritesCounter === 0) {
    try {
      const { status } = await axiosConfig(`/wishlist`, {
        method: 'DELETE',
      });
      if (status === 200) {
        dispatch(deleteItemFromFavorites(id));
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    const localFavorites = JSON.parse(localStorage.getItem('inFavorites')).filter((elId) => elId !== id);
    console.log(localFavorites);
    dispatch(deleteItemFromFavorites(id));
    if (localFavorites.length === 0) {
      localStorage.removeItem('inFavorites');
    } else {
      localStorage.setItem('inFavorites', JSON.stringify(localFavorites));
    }
  }
};
