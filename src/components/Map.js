import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../css/Map.css";
import axios from "axios";
import { useState } from "react";

const Map = () => {
  const [cityname, setcityname] = useState("");
  const [temp, settemp] = useState(null);
  function FetchCityName(lat, lng) {
    console.log(lat, lng);
    const fetchData = () => {
      return axios
        .get(
          `https://www.mapquestapi.com/geocoding/v1/reverse?key=qcA5j75eWPr0XWheixrO8T8AK5m0XgM0&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`
        )
        .then(
          (response) =>
            setcityname(response.data.results[0].locations[0].adminArea5)
          // setcityname(response.data.results[0].locations[0].adminArea5)
        );
    };
    fetchData();
  }
  function FetchCityTemp(CityName) {
    console.log(CityName);
    const fetchData = async () => {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=faridabad&units=imperial&appid=2b48636567a78dabde0496902b1d91bb`
      );
      return settemp(response.data.main.temp);
    };
    fetchData();
  }
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        FetchCityName(e.latlng.lat, e.latlng.lng);
        FetchCityTemp(cityname);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          You are here in {cityname}, Temp is {temp}°F.
        </Popup>
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
