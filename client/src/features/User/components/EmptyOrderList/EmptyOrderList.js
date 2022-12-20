import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';

const emptyOrderListSX = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '20px',
};

const emptyOrderListMessage = {
  pt: { xs: '20px', tablet: '40px', desktop: '60px' },
  fontSize: { xs: '16px', tablet: '24px' },
};

const EmptyOrderList = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalogue');
  };

  return (
    <Paper sx={emptyOrderListSX}>
      <Typography variant="h2" sx={emptyOrderListMessage}>
        You don&apos;t have orders yet!
      </Typography>

      <Button onClick={handleClick} sx={{ m: '10%' }}>
        Catalogue
      </Button>
    </Paper>
  );
};

export default EmptyOrderList;
