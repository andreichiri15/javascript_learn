import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { v4 as uuidv4 } from 'uuid';

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function WorldMap({isLoggedIn, markerMode, setMarkerMode}) {
    const mapRef = useRef(null);
	const latitude = 51.505;
	const longitude = -0.09;

    const [markers, setMarkers] = useState([])
    
    const navigate = useNavigate()

    function LocationMarker() {
        // const [position, setPosition] = useState(null)
        let position
        const map = useMapEvents({
            click(e) {
                let newMarkers = [...markers]
                let id = uuidv4()
                position = [e.latlng.lat, e.latlng.lng]

                var newMarker = {
                    id: id,
                    position: position,
                    draggable: true
                }

                newMarkers.push(newMarker)
                setMarkers(newMarkers)

                // console.log(markers)
            }
        })
    }

    const handleDragEnd = (e, draggedMarker) => {
        draggedMarker.draggable = false

        setMarkerMode(0)

        console.log(draggedMarker)
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn])

    useEffect(() => {
        


    }, [markerMode])
    

    return (
        <>
            <MapContainer 
                center={[latitude, longitude]} 
                zoom={13} 
                ref={mapRef} 
                style={{height: "calc(100vh - 16px)", width: "100vw"}}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((markerObject, index) => (
                    <Marker
                        key={markerObject.id}
                        position={markerObject.position}
                        draggable={markerObject.draggable}
                        eventHandlers={{
                            dragend: (e) => handleDragEnd(e, markerObject),
                        }}/>
                ))}
                <LocationMarker />
            </MapContainer>
        </>
    )
}
