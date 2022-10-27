import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
    width: '1200px',
    height: '400px'
};

const center = {
    lat: 50.429407,
    lng: 30.591509
};


function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyA5TINnTB_Yan0MjSGYVPfzgeZEOrMFLWA"
        >
            <GoogleMap
                id="marker-example"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
             />
        </LoadScript>
    )
}
export default Map
