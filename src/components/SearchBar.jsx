import React, { useState } from 'react'
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) onSearch(city);
    }
    return (
        <div className="search-container">
            <div className="input-wrapper">
                <form className="search-bar" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for a location..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar