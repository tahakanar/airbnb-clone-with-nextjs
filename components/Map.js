import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  console.log(selectedLocation);
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    zoom: 11,
    latitude: center.latitude,
    longitude: center.longitude,
  });

  return (
    <ReactMapGL
      style={{ width: 600, height: 400 }}
      mapStyle='mapbox://styles/tahakanar/ckz2lfjdw001c14o430bezsrt'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewPort}
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='animate-bounce text-lg cursor-pointer'
              aria-label='push-pin'
            >
              📌
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
