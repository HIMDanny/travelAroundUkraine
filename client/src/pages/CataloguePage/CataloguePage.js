import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { styled, Stack, Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CatalogTourCard, CatalogMainSection, CatalogMainFilter } from '../../features/Catalogue/components';
import { getProducts, setIsLoading } from '../../store/slices/catalogueSlice/catalogueSlice';

const FilterContainer = styled((props) => <Grid item xs={12} {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
  padding: '25px 0',
  height: 'fit-content',

  [theme.breakpoints.up('laptop')]: {
    width: 295,
    order: '-1',
  },
}));

const CataloguePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalogue.products, shallowEqual);
  const isLoading = useSelector((state) => state.catalogue.isLoading);
  useEffect(() => {
    if (products.length <= 0) {
      dispatch(setIsLoading(true));
      dispatch(getProducts());
      dispatch(setIsLoading(false));
    }
  }, []);

  return (
    <>
      {isLoading === false ? (
        <Box sx={{ backgroundColor: '#EDEDED', paddingBottom: '150px' }}>
          <CatalogMainSection />
          <Container>
            <Grid container sx={{ mt: '60px', gap: '40px' }}>
              <Grid item xs={12} laptop sx={{ p: 0 }}>
                <Typography variant="h2" sx={{ textTransform: 'uppercase', mb: '25px' }}>
                  Tours
                </Typography>
                <Stack spacing={2}>
                  {products.map(({ name, currentPrice, duration, description, imageUrls, _id, itemNo }) => (
                    <CatalogTourCard
                      key={_id}
                      name={name}
                      description={description}
                      currentPrice={currentPrice}
                      duration={duration}
                      imageUrls={imageUrls}
                      itemNo={itemNo}
                    />
                  ))}
                </Stack>
              </Grid>
              <FilterContainer>
                <CatalogMainFilter />
              </FilterContainer>
            </Grid>
          </Container>
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
