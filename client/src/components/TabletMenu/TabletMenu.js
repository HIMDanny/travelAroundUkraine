import React from 'react';
import { Typography, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import appliedTheme from '../../theme/theme';

const pages = [
  {
    name: 'Home',
    link: '/',
    innerContent: 'Home',
  },
  {
    name: 'Catalogue',
    link: '/catalogue',
    innerContent: 'Catalogue',
  },
  {
    name: 'Cart',
    link: '/cart',
    innerContent: <ShoppingCartIcon fontSize="medium" />,
  },
];

const boxSX = {
  flexGrow: 1,
  display: { xs: 'none', laptop: 'flex' },
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const typograpySX = {
  textDecoration: 'none',
  display: 'block',
  margin: '0 36px',
  transition: '0.5s',
  fontSize: { laptop: '18px' },

  '&:hover': {
    color: appliedTheme.palette.secondary.main,
  },
};

const TabletMenu = () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <Box component="nav" sx={boxSX}>
      {pages.map(({ name, link, innerContent }) => (
        <Typography
          component={NavLink}
          to={link}
          key={name}
          sx={typograpySX}
          style={pathname === link ? { color: appliedTheme.palette.secondary.main } : null}
          end
        >
          {innerContent}
        </Typography>
      ))}
    </Box>
  );
};

export default TabletMenu;
