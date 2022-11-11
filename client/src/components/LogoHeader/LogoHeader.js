import React from 'react';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import { NavLink } from 'react-router-dom';

const LogoHeader = () => (
  <NavLink to="/" style={{ textDecoration: 'none' }}>
    <TravelExploreOutlinedIcon fontSize="large" sx={{ color: 'text.primary' }} />
  </NavLink>
);

export default LogoHeader;
