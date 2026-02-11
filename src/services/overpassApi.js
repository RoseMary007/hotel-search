export const fetchHotels = async (lat, lon) => {
  try {
    const query = `
      [out:json][timeout:25];
      (
        node["tourism"](around:5000,${lat},${lon});
        way["tourism"](around:5000,${lat},${lon});
      );
      out center;
    `;

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query,
      }
    );

    if (!response.ok) {
      console.error("Overpass API failed:", response.status);
      return [];
    }

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return [];
    }

    const hotels = data.elements
      .map((el) => {
        const hotelLat = el.lat || el.center?.lat;
        const hotelLon = el.lon || el.center?.lon;

        if (!hotelLat || !hotelLon) return null;

        return {
          id: el.id,
          name: el.tags?.name || "Unnamed Place",
          lat: Number(hotelLat),   // IMPORTANT
          lon: Number(hotelLon),   // IMPORTANT
        };
      })
      .filter(Boolean)
      .slice(0, 20); // limit results

    return hotels;

  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
