import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { styled, alpha, Box, Slider, InputBase } from '@mui/material';
import { FilterAccordion } from '..';
import { setPrices } from '../../../../store/slices/filterSlice/filterSlice';
// import { getProducts } from '../../../../store/slices/catalogueSlice/catalogueSlice';

const FilterInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 40,
    border: '1px solid',
    borderColor: '#EDEDED',
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

let minTourPrice = 0;
let maxTourPrice = 0;

function valuetext(value) {
  return `${value}`;
}

const CatalogFilterPrice = () => {
  const dispatch = useDispatch();

  const prices = useSelector((store) => store.filter.prices);
  const [minPrice, maxPrice] = prices;

  const getAllToursPrices = async () => {
    try {
      const { data } = await axios('/products');
      const allPrices = data.map((tour) => tour.currentPrice);
      minTourPrice = Math.min.apply(null, allPrices);
      maxTourPrice = Math.max.apply(null, allPrices);
      dispatch(setPrices([Math.max(minPrice, minTourPrice), Math.min(maxPrice, maxTourPrice)]));
      if (maxPrice === 0) {
        dispatch(setPrices([Math.max(minPrice, minTourPrice), maxTourPrice]));
      }
      return allPrices;
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    getAllToursPrices();
  }, []);

  const handleChange = (event, newValue) => {
    dispatch(setPrices(newValue));
  };

  const changeMinPrice = (event) => {
    const newValue = Number(event.target.value);
    if (!Number.isNaN(newValue)) {
      dispatch(setPrices([newValue, maxPrice]));
    } else {
      dispatch(setPrices([minTourPrice, maxPrice]));
    }
  };

  const changeMaxPrice = (event) => {
    const newValue = Number(event.target.value);
    if (!Number.isNaN(newValue)) {
      dispatch(setPrices([minPrice, newValue]));
    } else {
      dispatch(setPrices([minPrice, maxTourPrice]));
    }
  };

  return (
    <FilterAccordion title="Price">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FilterInput placeholder={String(minTourPrice)} value={minPrice} onChange={changeMinPrice} />
        <FilterInput placeholder={String(maxTourPrice)} value={maxPrice} onChange={changeMaxPrice} />
      </Box>
      <Box sx={{ m: '0 auto', pt: '20px' }}>
        <Slider
          min={minTourPrice}
          max={maxTourPrice}
          getAriaLabel={() => 'Price range'}
          value={prices}
          onChange={handleChange}
          getAriaValueText={valuetext}
        />
      </Box>
    </FilterAccordion>
  );
};

export default CatalogFilterPrice;
