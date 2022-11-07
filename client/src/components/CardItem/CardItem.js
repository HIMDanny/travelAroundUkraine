import React from 'react';
// import PropTypes from 'prop-types';
import {Typography, Box, styled} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const CardItemWrapper = styled("div")({
    minWidth: "265px",
    maxWidth: "265px",
    height: "400px",
    background: `url('./assets/images/hotDeals/aerial-view-of-colorful-mixed-forest-shrouded-in-morning-fog-on-a-beautiful-autumn-day.jpg')`,
    backgroundSize: "cover",
    color: "white",
    position: "relative",
    cursor: "pointer",

    "&::after": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        left: "0",
        top: "0",
        transition: "opacity 0.5s",
        opacity: "1",
    },

    "&:hover::after": {
        opacity: "0",
        cursor: "pointer",
    }
})

const CardItemPrice = styled(Typography)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    width: "108px",
    fontSize: "18px",
    paddingTop: "19px",
    paddingBottom: "19px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginTop: "0",
    position: "absolute",
    zIndex: "1",
    color: theme.palette.common.white,
}))

// eslint-disable-next-line react/jsx-props-no-spreading
const CardItemHeader = styled((props) => <Typography variant="h3"{...props}/>)(({theme}) => ({
    position: "absolute",
    marginTop: "265px",
    paddingLeft: "25px",
    zIndex: "2",
    textTransform: "uppercase",
    color: theme.palette.common.white,
}))

const CardItemLocation = styled('div')({
    height: "20px",
    display: "flex",
    paddingLeft: "25px",
    paddingRight: "25px",
    zIndex: "2",
    position: "absolute",
    width: "100%",
    alignItems: "center",
    marginTop: "350px",
})

const CardItemText = styled(Typography)(({theme}) => ({
        margin: "0",
        whiteSpace: "nowrap",
        color: theme.palette.common.white,
    }
))


const CardItem = () =>
    <CardItemWrapper>
        <CardItemPrice>
            $ 200.00
        </CardItemPrice>
        <CardItemHeader>
            Kyiv city walk
        </CardItemHeader>
        <CardItemLocation>
            <Box component="img" src="https://visitukraine.today/assets/img/fromukraine/maps-and-flags.png"
                 alt="location" sx={{paddingRight: "10px", maxWidth: 'min-content'}}/>
            <CardItemText>
                Kyiv region
            </CardItemText>
            <ArrowForwardIosIcon sx={{marginLeft: "80px"}} fontSize="small"/>
        </CardItemLocation>
    </CardItemWrapper>


// CardItem.PropTypes = {
//     name: PropTypes.string.isRequired,
//     region: PropTypes.string.isRequired,
// };


export default CardItem;
