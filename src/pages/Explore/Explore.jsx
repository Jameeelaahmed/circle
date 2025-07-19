import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../../components/ui/Buttons/Button";

const Explore = () => {
  const { position, isLoading, getPosition } = useGeolocation();
  const [myLocation, setMyLocation] = useState([30.1, 31.5]);

  useEffect(() => {
    if (position) {
      setMyLocation([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <div className="relative h-screen w-screen">
      <MapContainer
        center={myLocation}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        key={myLocation.toString()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={myLocation}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapContainer>
      <div className="absolute top-4 right-4 z-[1000]">
        <Button variant="primary" onClick={getPosition} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get My Position"}
        </Button>
      </div>
    </div>
  );
};

export default Explore;
