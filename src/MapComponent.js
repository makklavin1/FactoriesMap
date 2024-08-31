import React, { useState } from 'react';

const MapComponent = () => {
    const [regionInput, setRegionInput] = useState('');

    const handleRegionSearch = () => {
        if (!regionInput.trim()) {
            alert('Введите регион для поиска!');
            return;
        }

        window.handleSearch(regionInput);
    };

    return (
        <div style={{ height: '100%' }}>
            <div className="search-container">
                <input
                    type="text"
                    value={regionInput}
                    onChange={(e) => setRegionInput(e.target.value)}
                    placeholder="Введите регион для поиска"
                />
                <button onClick={handleRegionSearch}>
                    Искать заводы
                </button>
                <a href="https://vektra24.ru" target="_blank" rel="noopener noreferrer" className="calculator-button">
                    В калькулятор
                </a>
            </div>
            <div id="map-container"></div>
        </div>
    );
};

export default MapComponent;
