import { useState } from "react";

function SearchBar({ onSearch }) {
  const [place, setPlace] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place.trim()) return;
    onSearch(place);
  };

  return (
  <form onSubmit={handleSubmit} className="search-form">
    <input
      type="text"
      name="location"
      placeholder="Enter city..."
      value={place}
      onChange={(e) => setPlace(e.target.value)}
      required
      className="search-input"
    />
    <button type="submit" className="search-button">
      Search
    </button>
  </form>
);

}

export default SearchBar;
