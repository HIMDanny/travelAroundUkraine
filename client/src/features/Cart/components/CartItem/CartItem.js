/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  styled,
  Stack,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent as MuiCardContent,
  IconButton,
  TextField,
} from '@mui/material';

import { AccessTime, Remove, Add, DeleteOutline } from '@mui/icons-material';
import { ReactComponent as CoinsIcon } from '../../../../svg/CoinsIcon.svg';

const CardContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  [theme.breakpoints.up('tablet')]: {
    paddingTop: 24,
    width: '100%',
  },
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  maxHeight: 240,
  borderRadius: '10px 10px 0 0',

  [theme.breakpoints.up('tablet')]: {
    width: 238,
    height: 'auto',
    borderRadius: '10px 0 0 10px',
  },
}));

const CardTitle = styled((props) => <Typography variant="h3" {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: 20,
  [theme.breakpoints.up('tablet')]: {
    marginRight: 45,
  },
}));

const CardButton = styled(Button)(({ theme }) => ({
  padding: '12px 85px',
  textAlign: 'center',

  [theme.breakpoints.up('tablet')]: {
    paddingInline: '43px',
  },
}));

const DeleteButton = styled((props) => (
  <IconButton color="error" {...props}>
    <DeleteOutline />
  </IconButton>
))(({ theme }) => ({
  position: 'absolute',
  top: 15,
  right: 15,

  [theme.breakpoints.down('tablet')]: {
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create('background-color'),

    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

const AmountField = styled((props) => <TextField size="small" autoComplete="off" {...props} />)({
  maxWidth: '56px',

  '& input': {
    textAlign: 'center',
  },
});

const CartItem = () => {
  const [amount, setAmount] = useState(1);

  const incrementAmount = () => setAmount((prev) => Number(prev) + 1);

  const decrementAmount = () => setAmount((prev) => Number(prev) - 1);

  // TODO: add error if amount less than 1
  const onAmountFieldChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <CardContainer direction={{ xs: 'column', tablet: 'row' }} gap={1}>
      <DeleteButton />
      <CardImage
        component="img"
        image="https://visitukraine.today/media/tours/gallery/ALeR7GgYjAqCqfJnQX5ZYKnBcsDZ6MTJs77IIBKi.jpg"
        alt="tour photo"
      />
      <CardContent>
        <CardTitle>Sightseeing tour of Chernivtsi</CardTitle>

        <Stack direction="row" spacing={3} alignItems="start" sx={{ marginBottom: '10px' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CoinsIcon />
            <Typography variant="h3" component="span">
              69 €
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime color="primary" sx={{ height: '21px' }} />
            <Typography variant="h3" component="span">
              3 hours
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" marginY="5px">
          <IconButton disabled={amount <= 1} onClick={decrementAmount}>
            <Remove />
          </IconButton>
          <AmountField value={amount} onChange={onAmountFieldChange} />
          <IconButton onClick={incrementAmount}>
            <Add />
          </IconButton>
        </Stack>
        <CardActions>
          <CardButton href="#">More details</CardButton>
        </CardActions>
      </CardContent>
    </CardContainer>
  );
};

CartItem.propTypes = {};

export default CartItem;
