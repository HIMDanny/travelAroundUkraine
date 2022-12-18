import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { CatalogTourCard } from '../../features/Catalogue/components';
import { gettWishList } from '../../store/slices/inFavoritesSlice/inFavoritesSlice';
import { setIsLoading, getProducts } from '../../store/slices/catalogueSlice/catalogueSlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalogue.products, shallowEqual);
  const inFavorites = useSelector((state) => state.favorites.inFavorites);
  const isLogin = useSelector((state) => state.userReducer.isLogin);
  useEffect(() => {
    if (products.length <= 0) {
      dispatch(setIsLoading(true));
      dispatch(getProducts());
      dispatch(setIsLoading(false));
    }
  }, []);
  useEffect(() => {
    dispatch(gettWishList(isLogin));
  }, [isLogin]);
  return (
    <>
      {inFavorites.length === 0 ? (
        <Typography variant="h2" sx={{ padding: '100px', textAlign: 'center' }}>
          No items found
        </Typography>
      ) : (
        <Grid container sx={{ mt: '60px', gap: '40px', p: 5, justifyContent: 'center' }}>
          {products.map(({ name, currentPrice, duration, description, imageUrls, _id, itemNo }) => {
            const checkForFavorites = inFavorites.find((itemId) => _id === itemId);
            if (checkForFavorites) {
              return (
                <CatalogTourCard
                  key={itemNo}
                  name={name}
                  description={description}
                  currentPrice={currentPrice}
                  duration={duration}
                  imageUrls={imageUrls}
                  itemNo={itemNo}
                  id={_id}
                  inFavorites={checkForFavorites ? !!checkForFavorites : false}
                  inFavoritesCounter={inFavorites.length - 1}
                />
              );
            }
            return null;
          })}
        </Grid>
      )}
      {}
    </>
  );
};

export default FavoritesPage;
