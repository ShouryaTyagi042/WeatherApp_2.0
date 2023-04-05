import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../css/Map.css";
import axios from "axios";

const Map = () => {
  function FetchCityName(lat, lng) {
    console.log(lat, lng);
    const fetchData = () => {
      return axios
        .get(
          `https://www.mapquestapi.com/geocoding/v1/reverse?key=qcA5j75eWPr0XWheixrO8T8AK5m0XgM0&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`
        )
        .then((response) =>
          console.log(response.data.results[0].locations[0].adminArea5)
        );
    };
    fetchData();
  }
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
        FetchCityName(e.latlng.lat.toString(), e.latlng.lng.toString());
        DisplayMarker(e.latlng);
      },
    });
  }
  function DisplayMarker(position, CityName) {
    return position === null ? null : (
      <Marker position={position}>
        <Popup> You are in </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};
export default Map;
