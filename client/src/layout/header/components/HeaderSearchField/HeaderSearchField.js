/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable  react/prop-types */
import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import appliedTheme from '../../../../theme/theme';
import { HeaderFilterItems } from '..';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  transition: '0.2s',

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transition: '0.2s',
  },
  width: 'auto',
  marginLeft: '9vw',

  [theme.breakpoints.up('mobile')]: {
    display: 'block',
    marginLeft: '5vw',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    color: appliedTheme.palette.text.primary,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('mobile')]: {
      width: '12ch',
      '&:focus': {
        border: '1px solid #FFC700',
        borderRadius: theme.shape.borderRadius,
        width: '20ch',
      },
    },
  },
}));

const HeaderSearchField = () => {
  const [isOpenFilterItems, setIsOpenFilterItems] = useState(false);
  const handleFilter = () => {
    setIsOpenFilterItems(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleFilter);
  }, [isOpenFilterItems]);

  const changeState = (length) => {
    if (length >= 2) {
      setIsOpenFilterItems(true);
    } else {
      setIsOpenFilterItems(false);
    }
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: appliedTheme.palette.text.primary }} />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={(e) => changeState(e.target.value.length)}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
      {isOpenFilterItems && <HeaderFilterItems />}
    </Search>
  );
};

export default HeaderSearchField;
