import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: 'auto',
  height: '400px',
};

const center = {
  lat: 50.429407,
  lng: 30.591509,
};

function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA5TINnTB_Yan0MjSGYVPfzgeZEOrMFLWA">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        mapContainerClassName="mapContainerStyle"
      />
    </LoadScript>
  );
}
export default Map;
