import React from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../../../store/slices/userSlice/userSlice';

const buttonBoxSX = { display: 'flex', width: '100%', justifyContent: 'end', my: '20px' };

const buttonSX = {
  width: { xs: '86px', mobile: '110px', tablet: '140px', laptop: '150px' },
  px: 0,
  py: { xs: '8px', mobile: '12px', desktop: '14px' },
  mx: 4,
  fontSize: { xs: '12px', laptop: '14px' },
};

const ButtonContainer = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={buttonBoxSX}>
      <Button onClick={() => dispatch(setIsModalOpen(true))} sx={buttonSX}>
        log out
      </Button>
    </Box>
  );
};

export default ButtonContainer;
