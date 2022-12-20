import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import axios from 'axios';
import { styled, Button, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { CatalogFilterPrice, CatalogFilterDuration, CatalogFilterSeason } from '..';
import {
  setPrices,
  setIsFilter,
  setFilteredTours,
  setClearDuration,
  setAllSeasons,
  fetchFilteredTours,
} from '../../../../store/slices/filterSlice/filterSlice';
import { getProducts, setIsLoading } from '../../../../store/slices/catalogueSlice/catalogueSlice';

const FilterWrapper = styled(Stack)(({ theme }) => ({
  margin: '0 auto',
  width: 252,
  padding: 0,

  [theme.breakpoints.up('tablet')]: {
    width: 540,
  },

  [theme.breakpoints.up('laptop')]: {
    width: 235,
  },
}));

const ShowButton = styled(Button)(() => ({
  padding: '12px 85px',
  alignSelf: 'center',
  marginTop: 40,
  maxWidth: 200,
}));

const ResetButton = styled((props) => (
  <Button
    variant="text"
    startIcon={
      <CloseIcon
        sx={{
          width: '14px',
          height: '14px',
          color: 'gray',
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  padding: '5px 15px',
  marginTop: '12px',
  border: 'none',
  background: 'none',
  fontWeight: 500,
  fontSize: 12,
  textTransform: 'none',
  color: theme.palette.text.primary,
  alignSelf: 'center',

  '&:hover': {
    background: 'none',
    filter: 'brightness(1.5)',
    color: theme.palette.text.primary,
  },
}));

const CatalogMainFilter = () => {
  const dispatch = useDispatch();
  const prices = useSelector((store) => store.filter.prices);
  const [minPrice, maxPrice] = prices;
  const products = useSelector((state) => state.catalogue.products, shallowEqual);
  const allPrices = [...new Set(products.map((tour) => tour.currentPrice))].sort((a, b) => a - b);
  const duration = useSelector((store) => store.filter.duration);
  const seasons = useSelector((store) => store.filter.seasons.map((el) => (el ? el.toLowerCase() : el)));

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const filterTours = async () => {
    const filterPrices = () => {
      if (minPrice > maxPrice) {
        const reversePrices = [...prices].reverse();
        dispatch(setPrices(reversePrices));
        const filterPricesValues = allPrices.filter((price) => price >= maxPrice && price <= minPrice);
        return filterPricesValues;
      }
      const filterPricesValues = allPrices.filter((price) => price >= minPrice && price <= maxPrice);
      return filterPricesValues;
    };

    const params = new URLSearchParams();

    params.set('currentPrice', filterPrices());
    if (duration.length > 0) {
      params.set('duration', duration);
    }
    if (seasons.length > 0) {
      params.set('season', seasons.concat('all seasons'));
    }

    dispatch(setIsLoading(true));
    dispatch(setIsFilter(true));
    await dispatch(fetchFilteredTours(params));
    dispatch(setIsLoading(false));
  };

  const resetFilter = () => {
    dispatch(setIsFilter(false));
    dispatch(setFilteredTours([]));
    dispatch(setPrices([Math.min.apply(null, allPrices), Math.max.apply(null, allPrices)]));
    dispatch(setClearDuration([]));
    dispatch(setClearDuration([]));
    dispatch(setAllSeasons([]));
  };

  return (
    <FilterWrapper>
      <Typography variant="h3">Filter</Typography>

      <Grid container columnSpacing={5} sx={{ p: 0 }}>
        <Grid spacing={4} item xs={12} tablet={6} laptop={12}>
          <CatalogFilterPrice />
          <CatalogFilterDuration />
        </Grid>

        <Grid item xs={12} tablet={6} laptop={12}>
          <CatalogFilterSeason />
        </Grid>
      </Grid>

      <ShowButton onClick={filterTours}>Filter</ShowButton>
      <ResetButton onClick={resetFilter}>Reset filter</ResetButton>
    </FilterWrapper>
  );
};

export default CatalogMainFilter;
