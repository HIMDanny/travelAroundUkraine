import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Typography, styled, Container } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardItem } from '..';

import 'swiper/swiper.min.css';

const cards = [
  {
    name: 'Kyiv city walk',
    region: 'Kyiv region',
    id: 1,
    url: '',
  },
  {
    name: 'Lviv city walk',
    region: 'Lviv region',
    id: 2,
  },
  {
    name: 'Donetsk city walk',
    region: 'Donetsk region',
    id: 3,
  },
  {
    name: 'Odessa city walk',
    region: 'Odessa region',
    id: 4,
  },
  {
    name: 'Dnepr city walk',
    region: 'Dnepr region',
    id: 5,
  },
  {
    name: 'Chernivtsi city walk',
    region: 'Chernivtsi region',
    id: 6,
  },
  {
    name: 'Ternopil city walk',
    region: 'Ternopil region',
    id: 7,
  },
  {
    name: 'Lutsk city walk',
    region: 'Lutsk region',
    id: 8,
  },
];

const CardContainerHeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
});

const CardContainerSwiperContainer = styled('div')({
  position: 'relative',
  margin: '70px auto 0 auto',

  '@media (min-width: 300px)': {
    width: '265px',
  },

  '@media (min-width: 600px)': {
    width: '560px',
  },

  '@media (min-width: 900px)': {
    width: '860px',
  },

  '@media (min-width: 1200px)': {
    width: '1150px',
  },
});

const CardContainerBtnPrev = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  height: '60px',
  width: '60px',
  borderRadius: '50px',
  position: 'absolute',
  cursor: 'pointer',
  zIndex: '2',
  top: '50%',
  marginTop: '-30px',
  marginLeft: '-30px',

  '& .MuiSvgIcon-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-12px',
    marginTop: '-10px',
    rotate: '180deg',
    color: theme.palette.primary.main,
  },
}));

const CardContainerBtnNext = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  height: '60px',
  width: '60px',
  borderRadius: '50px',
  position: 'absolute',
  cursor: 'pointer',
  zIndex: '2',
  top: '50%',
  right: '-30px',
  marginTop: '-30px',
  marginLeft: '100%',

  '& .MuiSvgIcon-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-10px',
    marginTop: '-12px',
    color: theme.palette.primary.main,
  },
}));

const CardContainer = () => (
  <Container>
    <CardContainerHeaderContainer>
      <Typography variant="h2" sx={{ marginBottom: '0px' }}>
        Popular tours
      </Typography>
      <Link to="/catalogue">
        <Typography>View All</Typography>
      </Link>
    </CardContainerHeaderContainer>
    <CardContainerSwiperContainer>
      <CardContainerBtnPrev id="previous">
        <ArrowForwardIosIcon />
      </CardContainerBtnPrev>
      <CardContainerBtnNext id="next">
        <ArrowForwardIosIcon />
      </CardContainerBtnNext>
      <Swiper
        breakpoints={{
          265: {
            width: 265,
            slidesPerView: 1,
          },
          560: {
            width: 560,
            slidesPerView: 2,
          },
          860: {
            width: 860,
            slidesPerView: 3,
          },
          1150: {
            width: 1150,
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        slidesPerGroup={1}
        loop
        loopFillGroupWithBlank
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '#next',
          prevEl: '#previous',
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {cards.map(({ name, region, id }) => (
          <SwiperSlide key={id}>
            <CardItem name={name} region={region} id={id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </CardContainerSwiperContainer>
  </Container>
);

export default CardContainer;
