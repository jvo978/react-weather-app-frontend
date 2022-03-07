import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import '../styles/Map.css'

const containerStyle = {
    width: '300px',
    height: '470px',
  };

function Map({ latLong }) {
    const [marker, setMarker] = useState(null)
  return (
      <div className='map__container'>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={latLong}
                zoom={11}
            >
                <Marker
                    position={!marker ? latLong : marker}
                >
                </Marker>
            </GoogleMap>
        </LoadScript>
      </div>
  )
}

export default Map