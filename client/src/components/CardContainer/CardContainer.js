import React from 'react';
import {NavLink} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation} from 'swiper'
import CardItem from '../CardItem/CardItem';
import styles from './CardContainer.module.scss';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



const cards = [
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
    <CardItem/>,
]

const CardContainer = () =>
    <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
            <h2 className={styles.header}>Popular tours</h2>
            <NavLink className={styles.allTours} to="/catalogue">View All</NavLink>
        </div>
        <ul className={styles.list}>
            <li>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper">
                    {cards.map(card => (
                        <SwiperSlide
                        >{card}</SwiperSlide>
                    ))}
                </Swiper>
            </li>
        </ul>

    </div>

export default CardContainer;

