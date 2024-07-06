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
        <div>
            <h1 style={{ textAlign: 'center' }}>Интерактивная карта с заводами</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                    type="text"
                    value={regionInput}
                    onChange={(e) => setRegionInput(e.target.value)}
                    placeholder="Введите регион для поиска"
                    style={{ padding: '10px', width: '60%', fontSize: '16px', marginRight: '10px' }}
                />
                <button
                    onClick={handleRegionSearch}
                    style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                    Искать заводы
                </button>
            </div>
            <div id="map-container" style={{ width: '100%', height: '600px', marginTop: '20px' }}></div>
        </div>
    );
};

export default MapComponent;
