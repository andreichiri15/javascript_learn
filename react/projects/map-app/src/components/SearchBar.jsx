import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import 'leaflet-geosearch/dist/geosearch.css';

export default function SearchBar({addNewMarker, setShowHistory}) {
    const [inputSearch, setInputSearch] = useState('')

    const map = useMap();
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
        provider: provider,
        autoComplete: true,
        style: 'bar',
        showMarker: false,

    });

    useEffect(() => {
        map.addControl(searchControl);

        const searchInput = document.querySelector('.leaflet-geosearch-bar input');
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                setShowHistory(inputSearch == '')
            });

            searchInput.addEventListener('blur', () => {
                // setShowHistory(false)
            });

            searchInput.addEventListener('input', () => {
                console.log('intra')

                setInputSearch(searchInput.value)

                setShowHistory(searchInput.value == '')
            });
        }
        
        map.on('geosearch/showlocation', (result) => {
            addNewMarker(result, map.getZoom())
        })
        // map.on('geosearch/showlocation', addNewMarker)
        return () => map.removeControl(searchControl);
    }, []);

    return null;
}
