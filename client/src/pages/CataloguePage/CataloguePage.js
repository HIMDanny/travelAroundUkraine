import React from 'react';
import { Stack, Container, Box, Typography } from '@mui/material';
import { CatalogTourCard, CatalogMainSection } from '../../components';

const CataloguePage = () => (
  <Box sx={{ backgroundColor: '#EDEDED' }}>
    <CatalogMainSection />
    <Container>
      <Typography sx={{ marginTop: '60px', marginBottom: '40px', textTransform: 'uppercase' }} variant="h2">
        Tours
      </Typography>
      <Stack sx={{ paddingBottom: '90px'}} spacing={2}>
        <CatalogTourCard />
        <CatalogTourCard />
        <CatalogTourCard />
      </Stack>
    </Container>
  </Box>
);

export default CataloguePage;
