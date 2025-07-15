import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet-geosearch/dist/geosearch.css';

export default function SearchBar({addNewMarker}) {
    const [searchInput, setSearchInput] = useState('')
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
        
        // map.on('geosearch/showlocation', (result) => {
        //     console.log('intru aici huh')

        //     addNewMarker(result)
        // })
        map.on('geosearch/showlocation', addNewMarker)
        return () => map.removeControl(searchControl);
    }, []);

    return null;
}
