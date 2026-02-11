import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import HotelList from "./components/HotelList";
import { fetchHotels } from "./services/overpassApi";
import "./App.css";


function App() {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default India
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (place) => {
    try {
      setLoading(true);
      setHotels([]);
      setSelectedHotel(null);

      // 1️⃣ Get coordinates from Nominatim
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );

      const geoData = await geoRes.json();

      if (!geoData.length) {
        alert("Place not found");
        setLoading(false);
        return;
      }

      const lat = Number(geoData[0].lat);
      const lon = Number(geoData[0].lon);

      setPosition([lat, lon]);

      // 2️⃣ Fetch tourism places
      const hotelData = await fetchHotels(lat, lon);

      setHotels(hotelData);
      setLoading(false);

    } catch (error) {
      console.error("Search error:", error);
      setLoading(false);
    }
  };

 return (
  <div className="app-container">
    <h2 className="app-title">Tourist Hotel Finder</h2>

    <SearchBar onSearch={handleSearch} />

    {loading && <p className="loading-text">Loading places...</p>}

    <div className="main-layout">
      <div className="hotel-list">
        <HotelList
          hotels={hotels}
          onSelect={setSelectedHotel}
        />
      </div>

      <div className="map-container">
        <MapView
          position={position}
          hotels={hotels}
          selectedHotel={selectedHotel}
        />
      </div>
    </div>
  </div>
);

}

export default App;
