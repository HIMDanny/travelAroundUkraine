import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { BurgerMenu, TabletMenu, LogoHeader, HeaderSearchField } from '../../components';
import appliedTheme from '../../theme/theme';

const Header = () => {
  const [scrollY, setScrollY] = useState();

  useEffect(() => {
    const handleScrollY = () => setScrollY(window.scrollY);
    document.addEventListener('scroll', handleScrollY);

    return () => document.removeEventListener('scroll', handleScrollY);
  }, []);

  const appBarSX = {
    background: scrollY > 400 ? appliedTheme.palette.primary.main : 'none',
    boxShadow: scrollY > 400 ? null : 'none',
    py: { xs: 1, tablet: 1.5, laptop: 2 },
    opacity: 0.95,
    transition: '0.3s',
  };

  return (
    <AppBar sx={appBarSX}>
      <Container>
        <Toolbar disableGutters>
          <LogoHeader />
          <HeaderSearchField />
          <BurgerMenu />
          <TabletMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
