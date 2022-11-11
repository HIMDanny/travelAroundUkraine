import React from 'react';
import { Typography, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import appliedTheme from '../../theme/theme';

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

const typograpySX = (link, pathname) => ({
  textDecoration: 'none',
  display: 'block',
  margin: '0 36px',
  transition: '0.5s',
  fontSize: { laptop: '18px' },
  color: link === pathname && 'secondary.main',

  '&:hover': {
    color: 'secondary.main',
  },
});

const TabletMenu = () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <Box component="nav" sx={boxSX}>
      {pages.map(({ name, link, innerContent }) => (
        <Typography component={NavLink} to={link} key={name} sx={typograpySX(link, pathname)} end>
          {innerContent}
        </Typography>
      ))}
    </Box>
  );
};

export default TabletMenu;
