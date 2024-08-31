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
                        controls: [],
                        restrictMapArea: [
                            [35.0, 19.0],  // bottom-left corner
                            [82.0, 180.0]  // top-right corner
                        ]
                    });

                    window.mapInstance = mapInstance;



                    // Заводы
                    const factories = [
                        {
                            coords: [56.104622, 49.866245],
                            name: 'Арск',
                            info: `ГОСТ/ТУ;<br>Толщина металла: 0.5-0.7;<br>Толщина сэндвича: 50-300 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1000,1160,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: 100м2;<br>RAL Стандарт: 1015,3005,5002,5005,5021,6005,6029,7004,7024,8017,9003;<br>Виды профилирования: RIB, Микроволна, Гладкая.`
                        },
                        {
                            coords: [53.179238, 50.207407],
                            name: 'Маяк',
                            info: `ГОСТ/ТУ;<br>Толщина металла: 0.4-0.7;<br>Толщина сэндвича: 50-250 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: 300м2;<br>RAL Стандарт: 1014,1015,3005,5005,5021,6005,6026,6029,7004,7035,8017,9003,9002;<br>Виды профилирования: B1(V), Гладкий, T1(t), T2(s).`
                        },
                        {
                            coords: [53.264664, 50.499297],
                            name: 'Маяк',
                            info: `ГОСТ/ТУ;<br>Толщина металла: 0.4-0.7;<br>Толщина сэндвича: 50-250 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1160,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: 300м2;<br>RAL Стандарт: 1014,1015,3005,5005,5021,6005,6026,6029,7004,7035,8017,9003,9002;<br>Виды профилирования: B2(Microwave), Гладкий, T1(t), T3(Mesa), H(V2).`
                        },
                        {
                            coords: [55.206206, 61.449005],
                            name: 'Электрощит',
                            info: `ГОСТ/ТУ/CTO;<br>Толщина металла: 0.4-0.8;<br>Толщина сэндвича: 30-300 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1200,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: для резерва более 500м2;<br>RAL Стандарт: 1014,1015,1018,3003,3005,5005,5015,6005,6018,7004,7005,7024,7035,7047,8017,9002,9003,9006,9010,9016;<br>Виды профилирования: Гладкая, Накатка, Трапеция, Волна.`
                        },
                        {
                            coords: [53.111125, 50.045504],
                            name: 'Электрощит',
                            info: `ГОСТ/ТУ/CTO;<br>Толщина металла: 0.4-0.8;<br>Толщина сэндвича: 30-300 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1200,1190.;<br>Шаг распила: 5мм;<br>Мин. партия: для резерва более 500м2;<br>RAL Стандарт: 1014,1015,1018,3003,3005,5005,5015,6005,6018,7004,7005,7024,7035,7047,8017,9002,9003,9006,9010,9016;<br>Виды профилирования: Гладкая, Накатка, Профиль.`
                        },
                        {
                            coords: [53.426188, 50.12134],
                            name: 'Электрощит',
                            info: `ГОСТ/ТУ/CTO;<br>Толщина металла: 0.4-0.8;<br>Толщина сэндвича: 30-300 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1200,1190.;<br>Шаг распила: 5мм;<br>Мин. партия: для резерва более 500м2;<br>RAL Стандарт: 1014,1015,1018,3003,3005,5005,5015,6005,6018,7004,7005,7024,7035,7047,8017,9002,9003,9006,9010,9016;<br>Виды профилирования: Гладкая, Накатка, Профиль.`
                        },
                        {
                             coords: [53.270561, 50.482597],
                            name: 'Электрощит',
                            info: `ГОСТ/ТУ/CTO;<br>Толщина металла: 0.4-0.8;<br>Толщина сэндвича: 30-300 мм;<br>Наполнитель: МВУ, ПИР;<br>Размеры панелей: Стена - 1000,1150,1160,1170,1185,1200,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: для резерва более 500м2;<br>RAL Стандарт: 1014,1015,1018,3003,3005,5005,5015,6005,6018,7004,7005,7024,7035,7047,8017,9002,9003,9006,9010,9016;<br>Виды профилирования: Гладкая, Накатка, Профиль.`
                        },
                        {
                            coords: [48.811295, 44.84981],
                            name: 'Электрощит',
                            info: `ГОСТ/ТУ/CTO;<br>Толщина металла: 0.4-0.8;<br>Толщина сэндвича: 30-300 мм;<br>Наполнитель: МВУ, ПИР;<br>Размеры панелей: Стена - 1000,1150,1160,1170,1185,1200,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: для резерва более 500м2;<br>RAL Стандарт: 1014,1015,1018,3003,3005,5005,5015,6005,6018,7004,7005,7024,7035,7047,8017,9002,9003,9006,9010,9016;<br>Виды профилирования: Гладкая, Накатка, Профиль.`
                        },
                        {
                            coords: [53.37323, 50.177332],
                            name: 'Электрощит',
                            info: `ГОСТ/ТУ/CTO;<br>Толщина металла: -;<br>Толщина сэндвича: -;<br>Наполнитель: Фасонные изделия/Профлист;<br>Размеры панелей: -;<br>Шаг распила: -;<br>Мин. партия: -;<br>RAL Стандарт: -;<br>Виды профилирования: -`
                        },
                        {
                            coords: [48.811295, 44.84981],
                            name: 'DoorHan',
                            info: `ТУ/ГОСТ(по запросу);<br>Толщина металла: 0.45-0.7;<br>Толщина сэндвича: 60-220 мм;<br>Наполнитель: МВУ, ПИР;<br>Размеры панелей: Стена ПИР - 1000,1150.<br>Кровля ПИР - 1000.<br>Стена МВУ - 1190.<br>Кровля МВУ - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 150м2;<br>RAL Стандарт: 9003,9006,9010,8014,8017,7004,7035,7040,6005,5005,3005,3020,1014,1015,GLK,WGB,WGS;<br>Виды профилирования: Гладкая(Г), Трапеция(50/11), Трапеция(50/50), Z-lock "Двойной шип-паз"(Z3), Z-lock "Одинарный шип-паз"(Z5), Волна(B30).`
                        },
                        {
                            coords: [55.475952720439984,36.03295199949072],
                            name: 'DoorHan-Можайск',
                            info: `ТУ;<br>Толщина металла: 0.4-0.7;<br>Толщина сэндвича: 60-200 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1190. Кровля - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 150м2;<br>RAL Стандарт: 9002,9003,9006,9010,8014,8017,7004,7035,7040,6002,6005,6019,5005,5002,5024,3003,3005,3009,3011,3020,1014,1015,1018,GLK,WGB,WGS;<br>Виды профилирования: Гладкая(Г), Трапеция(50/10), Трапеция(50/50), Волна(B25), Доска(Д), Z-lock "Двойной шип-паз"(Z3).`
                        },
                        {
                            coords: [51.552775,39.277425],
                            name: 'DoorHan-Столица',
                            info: `ТУ;<br>Толщина металла: 0.4-0.7;<br>Толщина сэндвича: 30-200 мм;<br>Наполнитель: ПИР;<br>Размеры панелей: Стена - 1150.;<br>Шаг распила: 10мм;<br>Мин. партия: от 150м2;<br>RAL Стандарт: 9002,9003,9006,9010,8014,8017,7004,7035,7040,6002,6005,6019,5005,5002,5024,3003,3005,3009,3011,3020,1014,1015,1018,GLK,WGB,WGS;<br>Виды профилирования: Гладкая(Г), Трапеция(50/10), Трапеция(50/50), Волна(B25), Доска(Д), Z-lock "Двойной шип-паз"(Z3).`
                        },
                        {
                            coords: [55.02733,82.783508],
                            name: 'DoorHan-Новосибирск',
                            info: `-;<br>Толщина металла: -;<br>Толщина сэндвича: -;<br>Наполнитель: ПИР;<br>Размеры панелей: -;<br>Шаг распила: -;<br>Мин. партия: -;<br>RAL Стандарт: -;<br>Виды профилирования: -`
                        },
                        {
                            coords: [55.29331,38.68045],
                            name: 'Мосстрой',
                            info: `ТУ/СТО;<br>Толщина металла: 0.45-0.7;<br>Толщина сэндвича: 50-250 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1000,1190.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 1014,1015,1018,6002,6005,3020,2004,3003,3005,3009,3011,8017,9003,9002,9006,7004,5002,5005,7035.;<br>Виды профилирования: V-Профиль, Микроволна, Трапецивидный, Гладкий.`
                        },
                        {
                            coords: [54.491506,37.118927],
                            name: 'Новопласт',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.45-0.7;<br>Толщина сэндвича: 50-300 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1000,1190. Кровля - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9002,9003,9006,1014,9010,5002,3003,5005,5021,6002,6005,7004,8017,7024,7035.;<br>Виды профилирования: V-Профиль, Микроволна, Трапецивидный, Гладкий.`
                        },
                        {
                            coords: [46.547555,39.596184],
                            name: 'Новопласт-ЮГ',
                            info: `-;<br>Толщина металла: -;<br>Толщина сэндвича: -;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: -;<br>Шаг распила: -;<br>Мин. партия: -;<br>RAL Стандарт: -;<br>Виды профилирования: -`
                        },
                        {
                            coords: [55.03702,83.392117],
                            name: 'Панлайн',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.45-0.7;<br>Толщина сэндвича: 40-300 мм;<br>Наполнитель: МВУ, ППС, ПИР(ламели);<br>Размеры панелей: Стена - 1000,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9002,9003,8017,7004,5002,5005,6002,6005,1014,1015,3003,3005.;<br>Виды профилирования: Накатка, Микроволна, Трапеция, Гладкий.`
                        },
                        {
                            coords: [54.681243,39.623007],
                            name: 'Панлайн',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.45-0.7;<br>Толщина сэндвича: 40-300 мм;<br>Наполнитель: МВУ, ППС, ПИР(ламели);<br>Размеры панелей: Стена - 1000,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9002,9003,8017,7004,5002,5005,6002,6005,1014,1015,3003,3005.;<br>Виды профилирования: Накатка, Микроволна, Трапеция, Гладкий.`
                        },
                        {
                            coords: [55.913021,38.032396],
                            name: 'Профхолод',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.4-0.5;<br>Толщина сэндвича: 40-200 мм;<br>Наполнитель: ПИР;<br>Размеры панелей: Стена - 1000,1190.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003.;<br>Виды профилирования: Трапеция(80,90,100,200)/Гладкая`
                        },
                        {
                            coords: [53.588493,49.259514],
                            name: 'Роспанель(Стройпанель)',
                            info: `ПОЛУАВТОМАТИЧЕСКАЯ ЛИНИЯ<br>ТУ;<br>Толщина металла: 0.45-0.5;<br>Толщина сэндвича: 50-250 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1190. Кровля - 1190.;<br>Шаг распила: 10мм;<br>Мин. партия: от 20м2;<br>RAL Стандарт: 1014,1015,300,5002,5005,5021,6005,6026,6029,7004,7035,8017,9002,9003.;<br>Виды профилирования: Трапеция(100)`
                        },
                        {
                            coords: [54.346123,48.640278],
                            name: 'СПП(Европанель)',
                            info: `ТУ/ГОСТ(1 класс);<br>Толщина металла: 0.45-0.5;<br>Толщина сэндвича: 50-300 мм;<br>Наполнитель: МВУ, ППС, ПИР(ламели);<br>Размеры панелей: Стена - 1000,1190. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 50м2;<br>RAL Стандарт: 9003,9003,9006,1014,1015,1018,3003,3005,3009,3020,5002,5005,5015,5021,6005,6002,6018,6029,7035,8017.;<br>Виды профилирования: Трапеция(Микроволна/Гладкая).`
                        },
                        {
                            coords: [54.016342,37.511832],
                            name: 'Техностиль',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.45-0.8;<br>Толщина сэндвича: 50-300 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1000,1150(secretFIX),1190,1200. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 1014,1015,3005,5005,3009,5002,6002,6005,6018,7004,7024,7035,7047,8017,9002,9003,9006,9010.;<br>Виды профилирования: V-Профиль(100,150), Трапеция(50/50), Микроволна(15,20,25,30), Гладкий.`
                        },
                        {
                            coords: [53.934949,37.928542],
                            name: 'Техностиль',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.45-0.8;<br>Толщина сэндвича: 30-150 мм;<br>Наполнитель: ПИР;<br>Размеры панелей: Стена - 1000,1150(secretFIX),1190,1200. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 1014,1015,3005,5005,3009,5002,6002,6005,6018,7004,7024,7035,7047,8017,9002,9003,9006,9010.;<br>Виды профилирования: V-Профиль(100,150), Трапеция(50/50), Микроволна(15,20,25,30), Гладкий.`
                        },
                        {
                            coords: [53.934949,37.928542],
                            name: 'Техностиль',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.45-0.8;<br>Толщина сэндвича: 50-300 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1000,1150(secretFIX),1190,1200. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 1014,1015,3005,5005,3009,5002,6002,6005,6018,7004,7024,7035,7047,8017,9002,9003,9006,9010.;<br>Виды профилирования: V-Профиль(100,150), Трапеция(50/50), Микроволна(15,20,25,30), Гладкий.`
                        },
                        {
                            coords: [47.118249,39.768966],
                            name: 'ООО «РЗСП «ТЕРМАКС»',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.4-0.5;<br>Толщина сэндвича: 50-250 мм;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: Стена - 1000,1190.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: -;<br>Виды профилирования: -`
                        },
                        {
                            coords: [55.580518,51.832037],
                            name: 'ДиФерро',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5;<br>Толщина сэндвича: 40-200 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1150. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003,9002,9006,1014,1015,7047,7004,5015,5005,6002,3003,1018;<br>Виды профилирования: V-профиль(шаг 200мм), Микроволна, Трапецивидный, Гладкий.`
                        },
                        {
                            coords: [54.04406,37.534119],
                            name: 'ДиФерро',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5;<br>Толщина сэндвича: 40-200 мм;<br>Наполнитель: МВУ;<br>Размеры панелей: Стена - 1000,1150. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003,9002,9006,1014,1015,7047,7004,5015,5005,6002,3003,1018;<br>Виды профилирования: V-профиль(шаг 200мм), Микроволна, Трапецивидный, Гладкий.`
                        },
                        {
                            coords: [47.646494,40.305556],
                            name: 'ДиФерро',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5;<br>Толщина сэндвича: 50-200 мм;<br>Наполнитель: МВУ(только стена), ПИР;<br>Размеры панелей: Стена - 1000,1150. Кровля - 1000.;<br>Шаг распила: 5мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003,9002,9006,1014,1015,7047,7004,5015,5005,6002,3003,1018;<br>Виды профилирования:<br>МВУ: V-профиль(шаг 200мм), Микроволна, Трапецивидный, Гладкий.<br>ПИР: Гладкий, Трапеция, Микроволна.`
                        },
                        {
                            coords: [55.580518,51.832037],
                            name: 'ТехноПАН',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5-0,7;<br>Толщина сэндвича: 50-300 мм;<br>Наполнитель: МВУ, ППС, ПИР;<br>Размеры панелей: Стена - 1000,1190. Кровля - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 1014,1015,1018,2004,3003,3005,3020,5002,5005,5015,6002,6005,7004,7024,8017,9002,9003,9006;<br>Виды профилирования: -`
                        },
                        {
                            coords: [55.000755,82.634882],
                            name: 'ТехноПАН',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5-0,8;<br>Толщина сэндвича: 50-300 мм(МВУ), 80-300мм(ППС, ПИР);<br>Наполнитель: МВУ, ППС, ПИР;<br>Размеры панелей: Стена - 1000,1190,1200,1160. Кровля - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003,9002,9006,1014,1015,7047,7004,5015,5005,6002,3003,1018;<br>Виды профилирования: Гладкий, Трапеция, Микроволна, Канавка`
                        },
                        {
                            coords: [55.000755,82.634882],
                            name: 'ТехноПАН',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5-0,8;<br>Толщина сэндвича: 50-300 мм(МВУ), 80-300мм(ППС, ПИР);<br>Наполнитель: МВУ, ППС, ПИР;<br>Размеры панелей: Стена - 1000,1190,1200,1160. Кровля - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003,9002,9006,1014,1015,7047,7004,5015,5005,6002,3003,1018;<br>Виды профилирования: Гладкий, Трапеция, Микроволна, Канавка`
                        },
                        {
                            coords: [54.997523,82.827732],
                            name: 'ТехноПАН',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0.5-0,8;<br>Толщина сэндвича: 50-300 мм(МВУ), 80-300мм(ППС, ПИР);<br>Наполнитель: МВУ, ППС, ПИР;<br>Размеры панелей: Стена - 1000,1190,1200,1160. Кровля - 1000.;<br>Шаг распила: 10мм;<br>Мин. партия: от 100м2;<br>RAL Стандарт: 9003,9002,9006,1014,1015,7047,7004,5015,5005,6002,3003,1018;<br>Виды профилирования: Гладкий, Трапеция, Микроволна, Канавка`
                        },
                        {
                            coords: [54.854175,83.029099],
                            name: 'Термис(АльянсПанели)',
                            info: `ТУ/ГОСТ;<br>Толщина металла: -;<br>Толщина сэндвича: -;<br>Наполнитель: МВУ, ППС, Экструция;<br>Размеры панелей: -;<br>Шаг распила: -;<br>Мин. партия: -;<br>RAL Стандарт: -;<br>Виды профилирования: -`
                        },
                        {
                            coords: [56.395651,38.297525],
                            name: 'Стилпан',
                            info: `ТУ/ГОСТ;<br>Толщина металла: 0,5-0,7;<br>Толщина сэндвича: -;<br>Наполнитель: МВУ, ППС;<br>Размеры панелей: -;<br>Шаг распила: -;<br>Мин. партия: -;<br>RAL Стандарт: -;<br>Виды профилирования: -`
                        }
                    ];

                    const factoryPlacemarks = factories.map(factory => {
                        return new Placemark(factory.coords, {
                            hintContent: factory.name,
                            balloonContent: `${factory.name}<br>${factory.info}`
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