import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "../../hooks/useGeolocation";
import { MapPin, ExternalLink } from "lucide-react";
import { customIcon } from "../../assets/icons/customIcon";
import { useSelector } from "react-redux";
import { getProfileData } from "../../features/userProfile/profileSlice";
import { useCircleEvents } from "../../hooks/useCircleEvents";

const Explore = () => {
  const { position, isLoading, getPosition } = useGeolocation();
  const [myLocation, setMyLocation] = useState([30.1, 31.5]);
  const [eventsWithLocations, setEventsWithLocations] = useState([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Get user data from Redux
  const profile = useSelector(getProfileData);
  const circles = useSelector((state) => state.circles.circles);

  // Get events for user's circles
  const userCircleIds = profile?.joinedCircles || [];
  const { eventsByCircle, loading: eventsLoading } =
    useCircleEvents(userCircleIds);

  useEffect(() => {
    if (position) {
      setMyLocation([position.lat, position.lng]);
    }
  }, [position]);

  // Free geocoding function using OpenStreetMap Nominatim
  const geocodeWithNominatim = async (query) => {
    console.log(`🌍 Starting geocoding for query: "${query}"`);

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
      console.log(`🌍 Geocoding URL: ${url}`);

      const response = await fetch(url);
      console.log(`🌍 Response status: ${response.status}`);
      console.log(`🌍 Response ok: ${response.ok}`);

      if (!response.ok) {
        console.log(`❌ HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`🌍 Geocoding response data:`, data);

      if (data && data.length > 0) {
        const result = data[0];
        console.log(`🌍 First result:`, result);

        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        console.log(`🌍 Parsed coordinates: lat=${lat}, lon=${lon}`);

        if (!isNaN(lat) && !isNaN(lon)) {
          console.log(`✅ Geocoding successful: [${lat}, ${lon}]`);
          return [lat, lon];
        } else {
          console.log(`❌ Invalid coordinates: lat=${lat}, lon=${lon}`);
        }
      } else {
        console.log(`❌ No geocoding results found for: "${query}"`);
      }

      return null;
    } catch (error) {
      console.log(`❌ Geocoding error:`, error);
      return null;
    }
  };

  // Enhanced function to extract coordinates from Google Maps URL OR geocode search queries
  const extractCoordinatesFromUrlOrGeocode = async (url) => {
    console.log(`🔍 Starting coordinate extraction for: ${url}`);

    if (!url || !url.includes("google.com/maps")) {
      console.log(`❌ Not a Google Maps URL: ${url}`);
      return null;
    }

    try {
      // Handle query format: https://www.google.com/maps/search/?api=1&query=cairo%20tower
      if (url.includes("query=")) {
        console.log(`🔍 Detected query format URL`);
        const queryMatch = url.match(/[?&]query=([^&]+)/);
        if (queryMatch) {
          const query = decodeURIComponent(queryMatch[1]);
          console.log(`🔍 Extracted query: ${query}`);

          // Try to get coordinates from geocoding
          console.log(`🌍 Starting geocoding for: ${query}`);
          const coordinates = await geocodeWithNominatim(query);
          if (coordinates) {
            console.log(
              `✅ Geocoding successful: [${coordinates[0]}, ${coordinates[1]}]`,
            );
            return coordinates;
          } else {
            console.log(`❌ Geocoding failed for: ${query}`);
            return null;
          }
        }
      }

      // Handle place URLs with embedded coordinates
      console.log(`🔍 Checking for embedded coordinates...`);

      // Format 1: @30.0459751,31.2242988,17z (most common)
      const atCoordsMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (atCoordsMatch) {
        const lat = parseFloat(atCoordsMatch[1]);
        const lng = parseFloat(atCoordsMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found @ coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 2: 3d data parameters
      const dataMatch = url.match(/3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (dataMatch) {
        const lat = parseFloat(dataMatch[1]);
        const lng = parseFloat(dataMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found 3d!4d coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 3: ll parameter
      const llMatch = url.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (llMatch) {
        const lat = parseFloat(llMatch[1]);
        const lng = parseFloat(llMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found ll coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 4: q parameter with coordinates
      const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (qMatch) {
        const lat = parseFloat(qMatch[1]);
        const lng = parseFloat(qMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found q coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 5: center parameter
      const centerMatch = url.match(/[?&]center=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (centerMatch) {
        const lat = parseFloat(centerMatch[1]);
        const lng = parseFloat(centerMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found center coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 6: saddr parameter
      const saddrMatch = url.match(/[?&]saddr=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (saddrMatch) {
        const lat = parseFloat(saddrMatch[1]);
        const lng = parseFloat(saddrMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found saddr coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 7: daddr parameter
      const daddrMatch = url.match(/[?&]daddr=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (daddrMatch) {
        const lat = parseFloat(daddrMatch[1]);
        const lng = parseFloat(daddrMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found daddr coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 8: cid parameter
      const cidMatch = url.match(/[?&]cid=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (cidMatch) {
        const lat = parseFloat(cidMatch[1]);
        const lng = parseFloat(cidMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found cid coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 9: complex data parameters with coordinates
      const complexDataMatch = url.match(
        /data=![^!]*!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
      );
      if (complexDataMatch) {
        const lat = parseFloat(complexDataMatch[1]);
        const lng = parseFloat(complexDataMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found complex data coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      // Format 10: place URLs with coordinates in the path
      const placePathMatch = url.match(
        /place\/[^@]+@(-?\d+\.\d+),(-?\d+\.\d+)/,
      );
      if (placePathMatch) {
        const lat = parseFloat(placePathMatch[1]);
        const lng = parseFloat(placePathMatch[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`✅ Found place path coordinates: [${lat}, ${lng}]`);
          return [lat, lng];
        }
      }

      console.log(`❌ No coordinate patterns found in URL`);
      return null;
    } catch (error) {
      console.log(`❌ Error during coordinate extraction:`, error);
      return null;
    }
  };

  // Get all events with locations from user's circles (now with geocoding)
  const getEventsWithLocations = async () => {
    const eventsWithLocations = [];

    if (!profile?.joinedCircles || !circles || !eventsByCircle) {
      console.log("❌ Missing data:", {
        hasProfile: !!profile,
        hasJoinedCircles: !!profile?.joinedCircles,
        hasCircles: !!circles,
        hasEventsByCircle: !!eventsByCircle,
      });
      return eventsWithLocations;
    }

    console.log("🔍 Starting to process events...");
    console.log("User joined circles:", profile.joinedCircles);
    console.log("Available circles:", Object.keys(eventsByCircle));

    for (const circleId of Object.keys(eventsByCircle)) {
      const circle = circles.find((c) => c.id === circleId);
      const events = eventsByCircle[circleId] || [];

      console.log(`📍 Processing circle: ${circle?.circleName || circleId}`);
      console.log(`Events in this circle: ${events.length}`);

      for (const event of events) {
        console.log(
          `🎯 Processing event: ${event.activity || event.name || event.id}`,
        );
        console.log(`Event Location field:`, event.Location);

        if (event.Location && event.Location.trim()) {
          console.log(`📍 Found Location field: ${event.Location}`);

          // Always try to extract coordinates from the Location field
          const coordinates = await extractCoordinatesFromUrlOrGeocode(
            event.Location,
          );
          console.log(`🎯 Extracted coordinates:`, coordinates);

          if (coordinates) {
            console.log(
              `✅ Successfully extracted coordinates for event: ${event.activity || event.name}`,
            );
            eventsWithLocations.push({
              ...event,
              circleId,
              circleName: circle?.circleName || "Unknown Circle",
              coordinates,
            });
          } else {
            console.log(
              `❌ Failed to extract coordinates from: ${event.Location}`,
            );
          }
        } else {
          console.log(
            `❌ No Location field or empty Location for event: ${event.activity || event.name || event.id}`,
          );
        }
      }
    }

    console.log(
      `🎉 Final result: ${eventsWithLocations.length} events with coordinates found`,
    );
    return eventsWithLocations;
  };

  // Load events with locations when data changes
  useEffect(() => {
    console.log("🔄 useEffect triggered with:", {
      hasProfile: !!profile,
      hasJoinedCircles: !!profile?.joinedCircles,
      hasCircles: !!circles,
      hasEventsByCircle: !!eventsByCircle,
      profile,
      circlesLength: circles?.length,
      eventsByCircleKeys: eventsByCircle ? Object.keys(eventsByCircle) : [],
    });

    const loadEvents = async () => {
      if (profile?.joinedCircles && circles && eventsByCircle) {
        console.log("🔄 Starting to load events...");
        setIsGeocoding(true);
        try {
          const events = await getEventsWithLocations();
          console.log("🔄 Events loaded:", events);
          setEventsWithLocations(events);
          console.log("🔄 State updated with events");
        } catch (error) {
          console.error("❌ Error loading events:", error);
        } finally {
          setIsGeocoding(false);
        }
      } else {
        console.log("🔄 Not loading events - missing data");
      }
    };

    loadEvents();
  }, [profile, circles, eventsByCircle]);

  return (
    <div className="relative z-40 mt-16 h-screen">
      <MapContainer
        center={myLocation}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
        key={myLocation.toString()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* Show user's circle events with locations */}
        {eventsWithLocations.map((event) => (
          <Marker
            key={`${event.circleId}-${event.id}`}
            position={event.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div className="flex flex-col gap-2">
                <h3 className="text-secondary text-lg font-bold">
                  {event.activity || event.name || "Event"}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Circle:</strong> {event.circleName}
                </p>
                {event.place && (
                  <p className="text-sm text-gray-600">
                    <strong>Place:</strong> {event.place}
                  </p>
                )}
                {event.day && (
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {event.day}
                  </p>
                )}
                {event.Location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <a
                      href={event.Location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      View on Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Simple position button */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={() => getPosition()}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/80 rounded-lg px-4 py-2 text-text disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Get My Position"}
        </button>
      </div>
    </div>
  );
};

export default Explore;
