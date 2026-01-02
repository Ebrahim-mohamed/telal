"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default marker issue in Next.js
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Default Leaflet marker
// const defaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// Custom marker (Ensure `/public/marker.svg` exists)
const customIcon = L.icon({
  iconUrl: "/assets/marker.svg",
  iconSize: [90, 90],
  iconAnchor: [45, 90],
  popupAnchor: [0, -80],
});

interface MapProps {
  lat: number;
  lng: number;
  name: string;
}

const locations = [
  //landMarks
  { id: 1, lat: 21.7341668, lng: 39.0828927, name: "Jeddah Tower" },
  { id: 2, lat: 21.7332871, lng: 39.084097, name: "Jeddah Economic City" },
  { id: 3, lat: 21.6023186, lng: 39.1077514, name: "Jeddah Corniche" },
  { id: 4, lat: 21.6158207, lng: 39.1062671, name: "Jeddah Waterfront Harbor" },
  { id: 5, lat: 21.5156556, lng: 39.1450512, name: "King Fahd's Fountain" },
  {
    id: 6,
    lat: 21.4881189,
    lng: 39.1860472,
    name: "Al-Balad (Historic Jeddah)",
  },
  {
    id: 7,
    lat: 21.4841396,
    lng: 39.1876259,
    name: "Naseef House",
  },
  //hospitals
  {
    id: 8,
    lat: 21.7681918,
    lng: 39.1001376,
    name: "King Abdullah Medical Complex ",
  },
  {
    id: 9,
    lat: 21.7414016,
    lng: 39.1736738,
    name: "New King Faisal Specialist Hospital ",
  },
  //education
  {
    id: 10,
    lat: 21.4940484,
    lng: 39.2389317,
    name: "King Abdulaziz University",
  },
  {
    id: 11,
    lat: 21.4884025,
    lng: 39.2302769,
    name: "Dar Al-Hekma University",
  },
  {
    id: 12,
    lat: 21.4782056,
    lng: 39.2106634,
    name: "Effat University",
  },
  {
    id: 13,
    lat: 21.4783551,
    lng: 39.2930658,
    name: "Al-Andalus Private Schools",
  },
  {
    id: 14,
    lat: 21.8571184,
    lng: 39.0623161,
    name: "University of Business and Technology - UBT",
  },
  {
    id: 15,
    lat: 21.7693429,
    lng: 39.1318678,
    name: "Batterjee Medical College",
  },
  //shopping
  {
    id: 16,
    lat: 21.7739847,
    lng: 39.1702953,
    name: "The Village Mall",
  },
  {
    id: 17,
    lat: 21.7653125,
    lng: 39.1421875,
    name: "Marina Avenue Mall",
  },
  {
    id: 18,
    lat: 21.6289161,
    lng: 39.1120399,
    name: "Red Sea Mall",
  },
  {
    id: 19,
    lat: 21.632517,
    lng: 39.156161,
    name: "Mall of Arabia",
  },
  {
    id: 20,
    lat: 21.508063,
    lng: 39.223421,
    name: "Al Salaam Mall",
  },
  //entertainment
  {
    id: 21,
    lat: 21.5688248,
    lng: 39.1114231,
    name: "Al Shallal Theme Park",
  },
  {
    id: 22,
    lat: 21.5721858,
    lng: 39.1096142,
    name: "Fakieh Aquarium",
  },
];

export const Map = () => {
  return (
    <MapContainer
      center={[21.6, 39.15]} // Optimal center for Jeddah locations
      zoom={12} // Best zoom to cover all locations
      style={{ height: "100%", width: "100%", borderRadius: "2.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <LocationMarker
          key={loc.id}
          lat={loc.lat}
          lng={loc.lng}
          name={loc.name}
        />
      ))}
    </MapContainer>
  );
};

function LocationMarker({ lat, lng, name }: MapProps) {
  return (
    <Marker position={[lat, lng]} icon={customIcon}>
      <Popup className="text-6xl w-fit">{name}</Popup>
    </Marker>
  );
}
