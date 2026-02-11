import HotelCard from "./HotelCard";

function HotelList({ hotels, onSelect }) {
  if (!hotels.length) return <p>Search your heart out...</p>;

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          onClick={() => onSelect(hotel)}
          style={{ cursor: "pointer" }}
        >
          <HotelCard hotel={hotel} />
        </div>
      ))}
    </div>
  );
}

export default HotelList;
