import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion, OutlinedToggleButton } from '..';

const touristsNumber = Array(10)
  .fill()
  .map((_, i) => i + 1);

const CatalogFilterTourists = () => (
  <FilterAccordion title="Tourists">
    <Grid container spacing={1}>
      {touristsNumber.map((el) => (
        <Grid xs={4} key={el}>
          <OutlinedToggleButton value={el}>{el} pers.</OutlinedToggleButton>
        </Grid>
      ))}

      <Grid xs={8}>
        <OutlinedToggleButton>More than 10 pers.</OutlinedToggleButton>
      </Grid>
    </Grid>
  </FilterAccordion>
);

export default CatalogFilterTourists;
