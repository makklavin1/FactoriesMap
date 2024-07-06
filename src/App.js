import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MapComponent from './MapComponent';

const App = () => {
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    console.log(`Loaded script: ${src}`);
                    resolve();
                };
                script.onerror = (e) => {
                    console.error(`Error loading script: ${src}`, e);
                    reject(e);
                };
                document.head.appendChild(script);
            });
        };

        const initMap = async () => {
            try {
                await loadScript('https://api-maps.yandex.ru/2.1/?apikey=2eb846ea-82d7-463d-b4e9-63588716063f&lang=ru_RU');

                window.ymaps.ready(() => {
                    const { Map, Placemark, Polyline, Circle } = window.ymaps;
                    const mapInstance = new Map('map-container', {
                        center: [55.76, 37.64],
                        zoom: 5,
                        controls: []
                    });

                    window.mapInstance = mapInstance;

                    // Заводы
                    const factories = [
                        { coords: [55.76, 37.64], name: 'Завод в Москве' },
                        { coords: [59.93, 30.31], name: 'Завод в Санкт-Петербурге' },
                        { coords: [56.85, 60.60], name: 'Завод в Екатеринбурге' },
                        { coords: [55.03, 82.92], name: 'Завод в Новосибирске' }
                    ];

                    factories.forEach(factory => {
                        const placemark = new Placemark(factory.coords, {
                            balloonContent: factory.name
                        });
                        mapInstance.geoObjects.add(placemark);
                    });

                    const handleSearch = (query) => {
                        window.ymaps.geocode(query).then((res) => {
                            const firstGeoObject = res.geoObjects.get(0);
                            const coords = firstGeoObject.geometry.getCoordinates();

                            const regionCircle = new Circle([coords, 1000 * 1000], {
                                balloonContent: 'Радиус 1000 км'
                            }, {
                                fillColor: '#ff000022',
                                strokeColor: '#ff0000',
                                strokeWidth: 2
                            });

                            mapInstance.geoObjects.removeAll();
                            factories.forEach(factory => {
                                const placemark = new Placemark(factory.coords, {
                                    balloonContent: factory.name
                                });
                                mapInstance.geoObjects.add(placemark);
                            });
                            mapInstance.geoObjects.add(regionCircle);

                            mapInstance.setCenter(coords, 6);

                            let nearestFactory = null;
                            let minDistance = Number.MAX_VALUE;

                            factories.forEach(factory => {
                                const distance = window.ymaps.coordSystem.geo.getDistance(coords, factory.coords);
                                if (distance < minDistance && distance <= 1000 * 1000) {
                                    minDistance = distance;
                                    nearestFactory = factory;
                                }
                            });

                            if (nearestFactory) {
                                const polyline = new Polyline([coords, nearestFactory.coords], {}, {
                                    strokeColor: '#FF0000',
                                    strokeWidth: 4
                                });
                                mapInstance.geoObjects.add(polyline);
                            }
                        });
                    };

                    window.handleSearch = handleSearch;
                });
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };

        initMap();
    }, []);

    return (
        <div>
            <MapComponent />
        </div>
    );
};

export default App;
