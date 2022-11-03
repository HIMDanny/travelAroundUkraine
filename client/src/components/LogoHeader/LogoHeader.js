import React from 'react';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import { NavLink } from 'react-router-dom';
import appliedTheme from '../../theme/theme';

const LogoHeader = () => (
  <NavLink to="/" style={{ textDecoration: 'none' }}>
    <TravelExploreOutlinedIcon fontSize="large" sx={{ color: appliedTheme.palette.text.primary }} />
  </NavLink>
);

export default LogoHeader;