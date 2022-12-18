import React, { useState } from 'react';
import { styled, alpha, Box, Slider, InputBase } from '@mui/material';
import { FilterAccordion } from '..';

const minPrice = 10;
const maxPrice = 1000;

function valuetext(value) {
  return `${value} €`;
}

const FilterInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 40,
    border: '1px solid #EDEDED',
    width: 105,
    height: 30,
    paddingLeft: 16,
    fontSize: 12,
    boxSizing: 'border-box',

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 0.12rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CatalogFilterPrice = () => {
  const [value, setValue] = useState([200, 600]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FilterAccordion title="Price">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FilterInput placeholder={String(minPrice)} value={value[0]} />
        <FilterInput placeholder={String(maxPrice)} value={value[1]} />
      </Box>
      <Box sx={{ m: '0 auto', pt: '20px' }}>
        <Slider
          min={minPrice}
          max={maxPrice}
          getAriaLabel={() => 'Price range'}
          value={value}
          onChange={handleChange}
          getAriaValueText={valuetext}
        />
      </Box>
    </FilterAccordion>
  );
};

export default CatalogFilterPrice;
