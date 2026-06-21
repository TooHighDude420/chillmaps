import maplibregl from 'maplibre-gl';
import databaseCallList from '../api';
import React, { useEffect, useRef } from 'react';
import { Map } from 'maplibre-gl';
import { Navigate } from 'react-router';

function MapScreen() {
    if (!databaseCallList.getLoggedIn()) {
        return <Navigate to={"/login"} />
    }

    const mapContainer = useRef(null);
    const geoApi = import.meta.env.GEOAPIFY;

    useEffect(() => {
        const myAPIKey = geoApi;
        const mapStyle =
            'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?';

        const initialState = {
            lng: 5.91111,
            lat: 51.98,
            zoom: 15,
        };

        const map = new Map({
            container: mapContainer.current,
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });
    }, [mapContainer.current]);

    return <div className="h-[80vh] w-full" ref={mapContainer}></div>;
}

export default MapScreen