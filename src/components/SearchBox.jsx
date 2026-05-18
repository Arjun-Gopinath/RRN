import React, { useState } from 'react';

const SearchBox = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (onSearch && query.trim()) onSearch(query.trim());
    };

    return (
        <div className="search-box">
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBox;
