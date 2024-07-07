import React, { useEffect } from 'react';
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
                console.log('Initializing map...');
                await loadScript('https://api-maps.yandex.ru/2.1/?apikey=2eb846ea-82d7-463d-b4e9-63588716063f&lang=ru_RU');

                window.ymaps.ready(() => {
                    console.log('Yandex Maps API is ready');
                    const { Map, Placemark, Polygon, route, GeoObject } = window.ymaps;
                    const mapInstance = new Map('map-container', {
                        center: [55.76, 37.64],
                        zoom: 5,
                        controls: []
                    });

                    window.mapInstance = mapInstance;

                    // Добавление внешних границ России
                    window.ymaps.borders.load('RU', {
                        lang: 'ru',
                        quality: 2
                    }).then((result) => {
                        const externalBorders = result.features.map(feature => {
                            return new GeoObject({
                                geometry: {
                                    type: 'Polygon',
                                    coordinates: feature.geometry.coordinates.filter(polygon => polygon.length === 1)[0],
                                    fillRule: 'nonZero'
                                },
                                properties: {
                                    name: feature.properties.name
                                }
                            }, {
                                fillColor: '#00000000',
                                strokeColor: '#2E2E2E',
                                strokeWidth: 2,
                                strokeStyle: 'dash'
                            });
                        });
                        externalBorders.forEach(border => mapInstance.geoObjects.add(border));
                    });

                    // Заводы
                    const factories = [
                        { coords: [55.76, 37.64], name: 'Завод в Москве' },
                        { coords: [59.93, 30.31], name: 'Завод в Санкт-Петербурге' },
                        { coords: [56.85, 60.60], name: 'Завод в Екатеринбурге' },
                        { coords: [55.03, 82.92], name: 'Завод в Новосибирске' }
                    ];

                    const factoryPlacemarks = factories.map(factory => {
                        return new Placemark(factory.coords, {
                            hintContent: factory.name,
                            balloonContent: factory.name
                        });
                    });

                    factoryPlacemarks.forEach(placemark => {
                        mapInstance.geoObjects.add(placemark);
                    });

                    const handleSearch = (query) => {
                        console.log(`Searching for: ${query}`);
                        window.ymaps.geocode(query).then((res) => {
                            const firstGeoObject = res.geoObjects.get(0);
                            if (!firstGeoObject) {
                                console.error('No results found');
                                return;
                            }
                            const coords = firstGeoObject.geometry.getCoordinates();
                            const bounds = firstGeoObject.properties.get('boundedBy');
                            const polygon = new window.ymaps.Polygon([bounds[0], [bounds[1][0], bounds[0][1]], bounds[1], [bounds[0][0], bounds[1][1]], bounds[0]], {}, {
                                fillColor: '#ff000022',
                                strokeColor: '#ff0000',
                                strokeWidth: 2
                            });

                            mapInstance.geoObjects.removeAll();
                            factoryPlacemarks.forEach(placemark => {
                                mapInstance.geoObjects.add(placemark);
                            });
                            mapInstance.geoObjects.add(polygon);

                            mapInstance.setCenter(coords, 10);

                            let nearestFactory = null;
                            let minDistance = Number.MAX_VALUE;
                            let nearestPlacemark = null;

                            factoryPlacemarks.forEach((placemark, index) => {
                                const distance = window.ymaps.coordSystem.geo.getDistance(coords, factories[index].coords);
                                if (distance < minDistance) {
                                    minDistance = distance;
                                    nearestFactory = factories[index];
                                    nearestPlacemark = placemark;
                                }
                            });

                            if (nearestFactory) {
                                window.ymaps.route([
                                    coords,
                                    nearestFactory.coords
                                ], {
                                    mapStateAutoApply: true
                                }).then((route) => {
                                    route.getPaths().options.set({
                                        strokeColor: '0000ffff',
                                        opacity: 0.9
                                    });

                                    mapInstance.geoObjects.add(route);

                                    const distance = route.getHumanLength();
                                    const duration = route.getHumanTime();

                                    const balloonContent = `
                                        <strong>Расстояние:</strong> ${distance}<br>
                                        <strong>Время в пути:</strong> ${duration}
                                    `;

                                    const routeMidpoint = [
                                        (coords[0] + nearestFactory.coords[0]) / 2,
                                        (coords[1] + nearestFactory.coords[1]) / 2
                                    ];

                                    const balloon = new window.ymaps.Placemark(routeMidpoint, {
                                        balloonContent
                                    });

                                    mapInstance.geoObjects.add(balloon);
                                    balloon.balloon.open();

                                    nearestPlacemark.balloon.open();
                                });
                            }
                        }).catch(error => {
                            console.error('Geocode error:', error);
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
        <div style={{ height: '100%' }}>
            <MapComponent />
        </div>
    );
};

export default App;
