import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function ChangeView({ selectedHotel }) {
  const map = useMap();

  useEffect(() => {
    if (selectedHotel) {
      map.setView(
        [selectedHotel.lat, selectedHotel.lon],
        16,
        { animate: true }
      );
    }
  }, [selectedHotel, map]);

  return null;
}

function MapView({ position, hotels, selectedHotel }) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Zoom when hotel selected */}
      <ChangeView selectedHotel={selectedHotel} />

      {hotels.map((hotel) => (
        <Marker
          key={hotel.id}
          position={[hotel.lat, hotel.lon]}
        >
          <Popup>
            <strong>{hotel.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
