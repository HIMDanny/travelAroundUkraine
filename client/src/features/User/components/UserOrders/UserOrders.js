import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Paper, CircularProgress, Typography } from '@mui/material';
import { fetchUserOrders } from '../../../../store/slices/userSlice/userSlice';
import { EmptyOrderList, Order } from '..';

const preloaderSX = {
  display: 'block',
  m: '15% auto',
  width: '100px !important',
  height: '100px !important',
  color: 'secondary',
};

const paperOrderListSX = {
  listStyleType: 'none',
  p: '5%',
  overflow: 'scroll',
  height: 'auto',
  maxHeight: '350px',
  borderRadius: '20px',
};

const UserOrders = () => {
  const { orders, ordersError, isOrdersLoading } = useSelector((store) => store.userReducer, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders) {
      dispatch(fetchUserOrders());
    }
  }, []);

  if (orders) {
    return orders.length === 0 ? (
      <EmptyOrderList />
    ) : (
      <Paper component="ul" sx={paperOrderListSX}>
        {orders.map(({ date, orderNo, products, totalSum }) => (
          <Order totalSum={totalSum} products={products} key={orderNo} date={date.split('T')[0]} orderNo={orderNo} />
        ))}
      </Paper>
    );
  }

  return (
    <>
      {isOrdersLoading && <CircularProgress sx={preloaderSX} />}
      {ordersError && <Typography>{ordersError}</Typography>}
    </>
  );
};

export default UserOrders;
