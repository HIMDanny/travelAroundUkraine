import React from 'react';
import { styled, Stack, CardActions, CardMedia, Button, Typography, CardContent } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ReactComponent as CoinsIcon } from '../../svg/CoinsIcon.svg';

const CardContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 240,
  borderRadius: '10px 10px 0 0',

  [theme.breakpoints.up('tablet')]: {
    width: 238,
    height: 'auto',
    borderRadius: '10px 0 0 10px',
  },
}));

const CardTitle = styled((props) => <Typography variant="h3" {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: 20,
  marginBottom: 20,
}));

const TourDescription = styled(Typography)(({ theme }) => ({
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  paddingLeft: 24,
}));

const CardButton = styled(Button)(({ theme }) => ({
  padding: '12px 85px',
  marginTop: 15,

  [theme.breakpoints.up('tablet')]: {
    padding: '12px 43px',
  },
}));

const CatalogTourCard = () => (
  <CardContainer direction={{ xs: 'column', tablet: 'row' }} spacing={1}>
    <CardImage
      component="img"
      image="https://visitukraine.today/media/tours/gallery/ALeR7GgYjAqCqfJnQX5ZYKnBcsDZ6MTJs77IIBKi.jpg"
      alt="tour photo"
    />
    <CardContent sx={{ padding: '0 30px 0 36px' }}>
      <CardTitle>Sightseeing tour of Chernivtsi</CardTitle>

      <Stack direction="row" spacing={3} alignItems="start" sx={{ marginBottom: '20px' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CoinsIcon />
          <Typography variant="h3" component="span">
            69 €
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeIcon color="primary" sx={{ height: '21px' }} />
          <Typography variant="h3" component="span">
            3 hours
          </Typography>
        </Stack>
      </Stack>

      <TourDescription>
        Chernivtsi is often called the Ukrainian Paris, and for good reason - the pearl of Ukrainian Bukovina is in no
        way inferior to exquisite European capitals and offers tourists entertainment for every taste. We suggest
        starting with the classics and visiting the top must-see places that will make you fall in love with this city.
      </TourDescription>

      <CardActions>
        <CardButton href="#">More details</CardButton>
      </CardActions>
    </CardContent>
  </CardContainer>
);

export default CatalogTourCard;
