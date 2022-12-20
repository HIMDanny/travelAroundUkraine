import React, { useEffect, useState } from 'react';
import { Container, Paper, CircularProgress, Typography, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { grey } from '@mui/material/colors';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchUserInfo } from '../../store/slices/userSlice/userSlice';
import { UserList, ButtonContainer, UserOrders } from '../../features/User/components';

const containerSX = {
  marginTop: { xs: '120px', tablet: '180px' },
  width: '75%',
  py: '20px !important',
  backgroundColor: grey.A100,
  borderRadius: '20px',
  marginBottom: '100px',
};

const preloaderSX = {
  display: 'block',
  m: '15% auto',
  width: '100px !important',
  height: '100px !important',
  color: 'secondary',
};

const UserPage = () => {
  const { userData, error, isLoading } = useSelector((store) => store.userReducer, shallowEqual);
  const [value, setValue] = useState('1');

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!userData) dispatch(fetchUserInfo());
  }, []);

  return (
    <Container component={Paper} sx={containerSX}>
      {isLoading && <CircularProgress sx={preloaderSX} />}
      {userData && (
        <>
          <Typography sx={{ my: '15px', p: 0, textAlign: 'center' }} variant="h2">
            {userData.firstName} {userData.lastName}
          </Typography>

          <TabContext value={value}>
            <TabList
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="User tabs"
              centered
            >
              <Tab label="User Info" value="1" />
              <Tab label="Orders" value="2" />
            </TabList>

            <TabPanel value="1">
              <UserList userData={userData} />
            </TabPanel>

            <TabPanel value="2">
              <UserOrders />
            </TabPanel>
          </TabContext>

          <ButtonContainer />
        </>
      )}
      {error && (
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h2">Error code: {error.status}</Typography>
          <Typography sx={{ color: 'red', py: 3 }} variant="h3">
            {error.statusText}
          </Typography>
          <Typography>Please try again later</Typography>
        </Container>
      )}
    </Container>
  );
};

export default UserPage;
