import { useEffect, useState } from "react";

function useLocation() {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    async function getLocation() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "efcadedc6ec64c51b36918c3e38a707c";
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const loc = data.results[0];
          setLocation(loc.name || loc.district || loc.country || loc.city);
        } catch (error) {}
      });
    }
    getLocation();
  }, []);

  return location;
}

export default useLocation;
