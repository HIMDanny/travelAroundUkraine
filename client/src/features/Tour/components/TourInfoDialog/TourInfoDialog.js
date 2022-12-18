/* eslint-disable react/forbid-prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box as MuiBox, Button, IconButton, MenuItem as MuiMenuItem, Select as MuiSelect, Stack } from '@mui/material';
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CloseIcon from '@mui/icons-material/Close';

import formatTourDate from '../../utils/formatTourDate';
import currencyConverter from '../../utils/currencyConverter';
import convertData from '../../utils/convertData';

import { addProduct } from '../../../../store/slices/cartSlice/cartSlice';

const currencySymbol = {
  eur: '€',
  usd: '$',
  uah: '₴',
};

const BoxWrapper = styled(MuiBox)(({ theme }) => ({
  position: 'sticky',
  top: 20,
  padding: '20px 20px 30px',
  borderRadius: 5,

  '@media (min-width: 1051px)': {
    border: `1px solid ${theme.palette.divider}`,
  },
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

const IncludedContentWrapper = styled(MuiBox)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '7px',
});

const Cost = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 0,
  fontSize: 35,
  lineHeight: 1,
  color: theme.palette.primary.main,
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

const DetailsText = styled((props) => <Typography gutterBottom={false} {...props} />)({});

const TourInfoDialog = ({
  dates,
  professionalGuide,
  accommodation,
  meals,
  transferAlongTheRoute,
  travelInsurance,
  departs,
  duration,
  returns,
  currentPrice,
  id,
  itemNo,
  closeButton,
  handleClose,
}) => {
  const [currency, setCurrency] = useState('eur');
  const included = convertData(professionalGuide, accommodation, meals, transferAlongTheRoute, travelInsurance);
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.userReducer.isLogin);

  return (
    <BoxWrapper>
      {closeButton && (
        <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      )}
      <Section>
        <Title>Included</Title>

        <IncludedContentWrapper>
          {included.map(({ icon, service }) => (
            <Stack key={service} direction="row" gap="5px" alignItems="center">
              {icon}
              <Typography gutterBottom={false}>{service}</Typography>
            </Stack>
          ))}
        </IncludedContentWrapper>
      </Section>
      <Section>
        <Title>Dates</Title>
        <Stack direction="row" gap="5px" alignItems="center">
          <CalendarMonthIcon color="primary" />
          <Typography gutterBottom={false}>
            {formatTourDate(dates.beginDate)} - {formatTourDate(dates.endDate)}
          </Typography>
        </Stack>
      </Section>
      <Section>
        <Title>Details</Title>
        <Stack gap="5px">
          <Stack direction="row" alignItems="center" gap="5px">
            <AccessTimeIcon color="primary" />
            <DetailsText>Duration</DetailsText>
            <DetailsText marginLeft="auto">{duration}</DetailsText>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            <FlightTakeoffIcon color="primary" />
            <DetailsText>Departs</DetailsText>
            <DetailsText marginLeft="auto">{departs}</DetailsText>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            <KeyboardReturnIcon color="primary" />
            <DetailsText>Returns</DetailsText>
            <DetailsText marginLeft="auto">{returns}</DetailsText>
          </Stack>
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
      <MuiBox>
        <Title>Total</Title>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Cost>
            {currencySymbol[currency]}
            {currencyConverter(currentPrice, currency)}
          </Cost>
          <Button
            sx={{ paddingInline: '30px' }}
            disableElevation
            onClick={() => dispatch(addProduct(itemNo, id, isLogin))}
          >
            Add to Cart
          </Button>
        </Stack>
      </MuiBox>
    </BoxWrapper>
  );
};

TourInfoDialog.propTypes = {
  dates: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  professionalGuide: PropTypes.bool,
  accommodation: PropTypes.bool,
  meals: PropTypes.bool,
  transferAlongTheRoute: PropTypes.bool,
  travelInsurance: PropTypes.bool,
  duration: PropTypes.string,
  departs: PropTypes.string,
  returns: PropTypes.string,
  currentPrice: PropTypes.number,
  id: PropTypes.string,
  itemNo: PropTypes.string,
  closeButton: PropTypes.bool,
  handleClose: PropTypes.func,
};

TourInfoDialog.defaultProps = {
  closeButton: false,
  handleClose: () => {},
  professionalGuide: false,
  accommodation: false,
  meals: false,
  transferAlongTheRoute: false,
  travelInsurance: false,
  duration: 'Unknown',
  departs: 'Unknown',
  returns: 'Unknown',
  currentPrice: 0,
  id: '',
  itemNo: '',
};

export default TourInfoDialog;
