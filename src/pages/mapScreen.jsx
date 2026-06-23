import maplibregl from 'maplibre-gl';
import databaseCallList from '../api';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Popup, Marker } from 'maplibre-gl';
import { data, Navigate, useNavigate } from 'react-router';

function MapScreen() {
    const navigate = useNavigate()

    if (!databaseCallList.getLoggedIn()) {
        return navigate("/login")
    }

    const [coords, setCoords] = useState(null)
    const [dirty, setDirty] = useState(false)
    const [popup, setPopup] = useState(false)

    const mapContainer = useRef(null);
    const geoApi = import.meta.env.VITE_GEOAPIFY;

    async function addChillSpot(coords, title, description) {
        let user = await databaseCallList.getUser();
        let result = await databaseCallList.genericInsert('chillspots', [
            {
                user_id: user.id,
                LngLat: coords,
                title: title,
                description: description
            }
        ]);

        return "success"
    }

    function makePopup(spot) {
        let popup = new Popup({
            anchor: 'bottom',
            offset: [0, -64] // height - shadow
        })
            .setHTML(`
            <div class='w-[10vh] text-black'>
                <p>${spot.title}</p>    
                <p>${spot.description}</p>    
                <p>${spot.Users.username}</p>
            </div>    
        `);

        return popup
    }

    function makeIco(map, spot) {
        let testico = document.createElement('div');
        testico.style.width = '35px';
        testico.style.height = '55px';
        testico.style.backgroundSize = "contain";
        testico.style.backgroundImage = `url(https://api.geoapify.com/v2/icon?type=material&color=%23ff5722&size=64&apiKey=${geoApi})`;
        testico.style.cursor = "pointer";

        let testmarker = new Marker(testico, {
            anchor: "bottom",
            offset: [0, 4]
        })
            .setLngLat(spot.LngLat)
            .setPopup(makePopup(spot))
            .addTo(map);
    }


    useEffect(() => {
        const myAPIKey = geoApi;
        const mapStyle =
            'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json';

        const initialState = {
            lng: 5.91111,
            lat: 51.98,
            zoom: 15,
        };

        let map = new Map({
            container: mapContainer.current,
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });

        databaseCallList.getChillspots().then((mess) => {
            mess.map((spot) => {
                makeIco(map, spot);
            })
        })

        map.on('click', (e) => {
            const target = e.originalEvent.target;

            if (target.closest(".maplibregl-marker")) return;

            let coords = e.lngLat;
            setCoords(coords);
            setPopup(true);
        });
    }, [mapContainer.current, dirty]);

    return (
        <div className="h-[80vh] w-full flex flex-col items-center">
            <div className="h-full w-full" ref={mapContainer}>

            </div>

            {!popup ?
                <div></div>
                : <div className='h-screen w-screen z-100 absolute top-0 flex justify-center items-center'>
                    <div className='h-[80vh] w-screen flex justify-center items-center'>
                        <div className='h-[50%] w-[50%] bg-amber-500 rounded-3xl p-5'>
                            <form onSubmit={
                                async (e) => {
                                    e.preventDefault();

                                    addChillSpot(coords, e.target.title.value, e.target.description.value).then((mess) => {
                                        setPopup(false)
                                        setDirty(true)
                                    });

                                }
                            }>
                                <label htmlFor="title">title</label>
                                <input type="text" name="title" id="title" />

                                <label htmlFor="description">description</label>
                                <input type="text" name="description" id="description" />

                                <button type="submit">make spot</button>
                                <button onClick={() => { setPopup(false) }}>close</button>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default MapScreen