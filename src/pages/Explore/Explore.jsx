import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "../../hooks/useGeolocation";
import { AsteriskSquare } from "lucide-react";
import { customIcon } from "../../assets/icons/customIcon";
import { Link } from "react-router";
import Button from "./../../components/ui/Buttons/Button";

const circles = [
  {
    id: 1,
    name: "cairo dogs club",
    lat: 30.06263,
    lng: 31.24967,
  },
  {
    id: 2,
    name: "cairo developers hub",
    lat: 30.36166,
    lng: 31.35255,
  },
  {
    id: 3,
    name: "cairo cats lovers",
    lat: 30.13333,
    lng: 31.25,
  },
  {
    id: 4,
    name: "motorbike group",
    lat: 30.1,
    lng: 31.7,
  },
  {
    id: 5,
    name: "cairo developers hub",
    lat: 30,
    lng: 31,
  },

];

const Explore = () => {
  const { position, isLoading, error, getPosition } = useGeolocation();
  const [myLocation, setMyLocation] = useState([30.1, 31.5]);

  useEffect(() => {
    if (position) {
      console.log(position);
      setMyLocation([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <div className="relative h-screen z-40 mt-16">
      <MapContainer
        center={myLocation}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
        key={myLocation.toString()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {circles.map((circle) => (
          <Marker
            key={circle.id}
            position={[circle.lat, circle.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="flex flex-col">
                <h3 className="text-secondary text-lg font-bold">
                  {circle.name}
                </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Button variant="primary">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Join
                  </Link>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          variant="primary"
          handleClick={() => getPosition()}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get My Position"}
        </Button>
        {error && (
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
