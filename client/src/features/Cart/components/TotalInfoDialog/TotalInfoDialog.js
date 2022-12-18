import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Stack,
  Box as MuiBox,
  Typography,
  styled,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  alpha,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useNavigate } from 'react-router-dom';

import calcToursQuantityAndPrice from '../../utils/calcToursQuantityAndPrice';
import currencyConverter from '../../../Tour/utils/currencyConverter';

const currencySymbol = {
  eur: '€',
  usd: '$',
  uah: '₴',
};

const BoxWrapper = styled(MuiBox)(({ theme }) => ({
  position: 'sticky',
  top: 90,
  padding: '20px 20px 30px',
  borderRadius: 5,

  border: `1px solid ${theme.palette.divider}`,
}));

const Section = styled(MuiBox)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: 15,
  marginBottom: 20,
}));

const Title = styled((props) => <Typography variant="h3" color="text.primary" {...props} />)({
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 20,
});

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  transition: theme.transitions.create(['color', 'background-color']),

  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    color: theme.palette.primary.main,
  },

  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
  marginBottom: '10px',
  fontWeight: 700,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.divider}`,

    transition: theme.transitions.create('border-color'),
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.primary.main}`,
  },
  '.MuiSelect-icon': {
    transition: theme.transitions.create('transform'),
  },
}));

const TotalInfoDialog = ({ cart }) => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('eur');

  const { toursPrice, toursQuantity } = calcToursQuantityAndPrice(cart);

  return (
    <BoxWrapper>
      <Section>
        <Title>Total</Title>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tours amount:</Typography>
          <Typography>{toursQuantity}</Typography>
        </Stack>
      </Section>

      <Section>
        <Title>Currency</Title>
        <Select fullWidth value={currency} onChange={(e) => setCurrency(e.target.value)} IconComponent={ExpandMoreIcon}>
          {Object.keys(currencySymbol).map((key) => (
            <MenuItem key={key} value={key}>
              {key.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </Section>

      <Section>
        <Stack direction="row" justifyContent="space-between">
          <Typography>To be paid:</Typography>
          <Typography fontSize={18}>
            {currencySymbol[currency]}
            {currencyConverter(toursPrice, currency)}
          </Typography>
        </Stack>
      </Section>

      <MuiBox>
        <Stack direction="row" justifyContent="end" alignItems="center">
          <Button sx={{ paddingInline: '30px' }} disableElevation onClick={() => navigate('/checkout')}>
            Checkout
          </Button>
        </Stack>
      </MuiBox>
    </BoxWrapper>
  );
};

TotalInfoDialog.propTypes = {
  cart: PropTypes.array,
};

TotalInfoDialog.defaultProps = {
  cart: [],
};

export default TotalInfoDialog;
