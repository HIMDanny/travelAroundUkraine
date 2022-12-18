import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha, ToggleButton } from '@mui/material';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    borderRadius: 40,
    border: '1px solid #EDEDED',
    background: 'none',
    fontWeight: 500,
    fontSize: 12,
    textTransform: 'none',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
    color: theme.palette.text.primary,
  
    '&:hover': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 0.12rem`,
      borderColor: theme.palette.primary.main,
      backgroundColor: `${alpha(theme.palette.primary.main, 0.05)}`,
    },
  
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
  
      '&:hover': {
        backgroundColor: `${alpha(theme.palette.primary.main, 0.85)}`,
      },
    },
  }));
  

  const OutlinedToggleButton = ({ value, children }) => {
    const [selected, setSelected] = useState(false);
  
    return (
      <StyledToggleButton
        value={value}
        selected={selected}
        onChange={() => setSelected(prev => !prev)}
      >
        {children}
      </StyledToggleButton>
    );
  };

  OutlinedToggleButton.propTypes = {
    children: PropTypes.any,
    value: PropTypes.number,
  };
  
  OutlinedToggleButton.defaultProps = {
    children: '',
    value: 0,
  };

  export default OutlinedToggleButton;
