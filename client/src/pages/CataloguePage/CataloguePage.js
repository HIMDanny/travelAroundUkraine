import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { styled, Stack, Box, Container, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CatalogTourCard, CatalogMainSection, CatalogMainFilter } from '../../features/Catalogue/components';
import { getProducts, setIsLoading } from '../../store/slices/catalogueSlice/catalogueSlice';
import { gettWishList } from '../../store/slices/inFavoritesSlice/inFavoritesSlice';
import scrollToTop from '../../layout/utils/scrollToTop';

const FilterContainer = styled((props) => <Grid item xs={12} {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
  padding: '25px 0',
  height: 'fit-content',

  [theme.breakpoints.up('laptop')]: {
    width: 295,
  },
}));

const CataloguePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalogue.products, shallowEqual);
  const isLoading = useSelector((state) => state.catalogue.isLoading);
  const inFavorites = useSelector((state) => state.favorites.inFavorites);
  const isLogin = useSelector((store) => store.user.isLogin);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 5;
  let lastItemIndex = currentPage * countriesPerPage;
  let firstItemIndex = lastItemIndex - countriesPerPage;
  let currentItems = products.slice(firstItemIndex, lastItemIndex);

  const isFilter = useSelector((state) => state.filter.isFilter);
  const filteredTours = useSelector((state) => state.filter.tours);

  if (isFilter && filteredTours.length > 0) {
    currentItems = filteredTours.slice(firstItemIndex, lastItemIndex);
  }

  useEffect(() => {
    if (products.length <= 0) {
      dispatch(setIsLoading(true));
      dispatch(getProducts());
      dispatch(setIsLoading(false));
    }
  }, []);

  const setCountPagination = () => {
    let num = products.length / countriesPerPage;
    if (isFilter) {
      num = filteredTours.length / countriesPerPage;
    }
    if (Number.isInteger(num)) {
      return num;
    }
    return Math.floor(num) + 1;
  };
  useEffect(() => {
    dispatch(gettWishList(isLogin));
  }, [isLogin]);

  return (
    <>
      {isLoading === false ? (
        <Box sx={{ backgroundColor: '#EDEDED', paddingBottom: '150px' }}>
          <CatalogMainSection />
          <Container>
            <Grid container sx={{ mt: '60px', gap: '40px' }}>
              <FilterContainer>
                <CatalogMainFilter />
              </FilterContainer>
              <Grid item xs={12} laptop sx={{ p: 0 }}>
                {isFilter && filteredTours.length > 0 ? (
                  <Typography variant="h2" sx={{ mb: '25px' }}>
                    Results for your request
                  </Typography>
                ) : (
                  <Typography variant="h2" sx={{ textTransform: 'uppercase', mb: '25px' }}>
                    Tours
                  </Typography>
                )}
                <Stack spacing={2}>
                  {isFilter && filteredTours.length === 0 ? (
                    <Typography variant="h2" sx={{ paddingTop: '400px', paddingBottom: '400px', textAlign: 'center' }}>
                      No results for your request
                    </Typography>
                  ) : (
                    currentItems.map(({ name, currentPrice, duration, description, imageUrls, _id, itemNo }) => {
                      const checkForFavorites = inFavorites.find((itemId) => _id === itemId);
                      return (
                        <CatalogTourCard
                          key={_id}
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
                    })
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: '50px' }}>
            <Pagination
              count={setCountPagination()}
              color="primary"
              page={currentPage}
              onChange={(_, num) => {
                setCurrentPage(num);
                lastItemIndex = currentPage * countriesPerPage;
                firstItemIndex = lastItemIndex - countriesPerPage;
                currentItems = () => {
                  if (!isFilter) {
                    return products.slice(firstItemIndex, lastItemIndex);
                  }
                  return filteredTours.slice(firstItemIndex, lastItemIndex);
                };
                scrollToTop();
              }}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="h2" sx={{ paddingTop: '400px', paddingBottom: '400px', textAlign: 'center' }}>
          Loading...
        </Typography>
      )}
      {}
    </>
  );
};

export default CataloguePage;
