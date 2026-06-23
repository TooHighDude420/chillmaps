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
                <div class='min-w-[10vh] flex flex-col items-center text-black text-lg'>
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
                        <div className='h-[50%] w-[50%] bg-[#0a2a2d] rounded-3xl p-5'>
                            <form className='w-full h-full flex flex-col items-center justify-around p-5 gap-y-5' onSubmit={
                                async (e) => {
                                    e.preventDefault();

                                    addChillSpot(coords, e.target.title.value, e.target.description.value).then((mess) => {
                                        setPopup(false)
                                        setDirty(true)
                                    });

                                }
                            }>
                                <div className='w-full flex justify-center items-center gap-x-5'>
                                    <label htmlFor="title" className="text-2xl">title</label>
                                    <input type="text" name="title" id="title" className="bg-white text-black rounded-2xl pl-2 text-xl" required />
                                </div>

                                <div className='w-full flex justify-center items-center gap-x-5'>
                                    <label htmlFor="description" className="text-2xl">description</label>
                                    <input type="text" name="description" id="description" className="bg-white text-black rounded-2xl pl-2 text-xl" required />
                                </div>

                                <div className='w-full flex justify-center items-center gap-x-5'>
                                    <button type="submit" className="w-[20%] bg-[#032327] rounded-full p-1">make spot</button>
                                    <button onClick={() => { setPopup(false) }} className="w-[10%] bg-[#032327] rounded-full p-1" >close</button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default MapScreen