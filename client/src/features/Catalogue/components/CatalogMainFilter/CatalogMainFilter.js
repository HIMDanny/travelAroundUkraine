import React from 'react';
import { styled, Button, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { CatalogFilterPrice, CatalogFilterTourists, CatalogFilterRegion } from '..';

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

const CatalogMainFilter = () => (
  <FilterWrapper>
    <Typography variant="h3">Filter</Typography>

    <Grid container columnSpacing={5} sx={{ p: 0 }}>
      <Grid spacing={4} item xs={12} tablet={6} laptop={12}>
        <CatalogFilterPrice />
        <CatalogFilterTourists />
      </Grid>

      <Grid item xs={12} tablet={6} laptop={12}>
        <CatalogFilterRegion />
      </Grid>
    </Grid>

    <ShowButton>Filter</ShowButton>
    <ResetButton>Reset filter</ResetButton>
  </FilterWrapper>
);

export default CatalogMainFilter;
