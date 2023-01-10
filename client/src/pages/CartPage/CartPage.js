import React, { useEffect } from 'react';

import { Box, Container, Stack, styled, Typography } from '@mui/material';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, setCartFromLocal } from '../../store/slices/cartSlice/cartSlice';

import { CartItem, TotalInfoDialog } from '../../features/Cart/components';

const ContentWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),

  [theme.breakpoints.up('laptop')]: {
    flexDirection: 'row',
  },
}));

const CartItemsList = styled((props) => <Stack component="ul" {...props} />)(({ theme }) => ({
  padding: 0,
  margin: 0,
  flexGrow: 1,
  gap: theme.spacing(2),

  listStyleType: 'none',
}));

const CartPage = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);
  const cart = useSelector((store) => store.cart.data);

  useEffect(() => {
    isLogin ? dispatch(fetchCart()) : dispatch(setCartFromLocal());
  }, []);

  // components saved into constants
  const cartContentWrapper = (
    <ContentWrapper>
      <CartItemsList>
        {cart.map(({ product: { imageUrls, name, currentPrice, duration, itemNo, _id }, cartQuantity }) => (
          <li key={_id}>
            <CartItem
              imageUrls={imageUrls}
              name={name}
              currentPrice={currentPrice}
              duration={duration}
              cartQuantity={cartQuantity}
              itemNo={itemNo}
              id={_id}
              isLogin={isLogin}
            />
          </li>
        ))}
        <li>
          <CartItem />
        </li>
      </CartItemsList>
      <Box flexGrow={1}>
        <TotalInfoDialog cart={cart} />
      </Box>
    </ContentWrapper>
  );

  return (
    <Box marginTop="100px" marginBottom="150px" component="section" paddingY={3}>
      <Container>
        <Typography marginBottom={2} variant="h2">
          Cart
        </Typography>

        {cart.length ? (
          cartContentWrapper
        ) : (
          <Typography variant="h2" align="center">
            Your cart is empty!
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
