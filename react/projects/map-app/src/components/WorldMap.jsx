import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { v4 as uuidv4 } from 'uuid';

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import PopupForm from "./PopupForm";
import SearchBar from "./SearchBar";

export default function WorldMap({isLoggedIn, markerMode, setMarkerMode}) {
    const mapRef = useRef(null);
	const latitude = 51.505;
	const longitude = -0.09;

    const [markers, setMarkers] = useState([])
    const [startedEdit, setStartedEdit] = useState(false)
    const [editInfo, setEditInfo] = useState(true)
    
    const navigate = useNavigate()

    function LocationMarker() {
        let position
        const map = useMapEvents({
            click(e) {
                if (markerMode != 1) {
                    return
                }

                let newMarkers = [...markers]
                let id = uuidv4()

                position = [e.latlng.lat, e.latlng.lng]

                const locationData = {
                    title: '',
                    rating: 0,
                    description: ''
                }

                const newMarker = {
                    id: id,
                    draggable: false,
                    position: position,
                    locationData: locationData
                }

                newMarkers.push(newMarker)
                setMarkers(newMarkers)

                console.log(markers, newMarkers)

                setMarkerMode(0)
            }
        })
    }

    useEffect(() => {
        console.log(
            'un nou render', markers
        )

    })

    const handleDragEnd = (e, draggedMarker) => {
        draggedMarker.draggable = false

        setMarkerMode(0)
        setStartedEdit(false)

        console.log(draggedMarker)
    }


    const startEdit = (clickedMarker) => {
        console.log('ajung aici?')

        clickedMarker.draggable = true

        setStartedEdit(true)
    }

    const handleSubmit = (e, markerObj, formData) => {
        console.log(markerObj)

        markerObj.locationData.title = formData['title']
        markerObj.locationData.rating = formData['rating']
        markerObj.locationData.description = formData['description']
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn])

    const addNewMarker = (result) => {
        console.log('am intrat', markers)

        let position = [result.location.y, result.location.x]

        const locationData = {
            title: '',
            rating: 0,
            description: ''
        }

        const newMarker = {
            id: uuidv4(),
            draggable: false,
            position: position,
            locationData: locationData
        }

        setMarkers(prev => [...prev, newMarker])
    }

    const toggleEditInfo = () => {
        setEditInfo((prev) => !prev)
    }

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
                            // click: (e) => handleClick(e, markerObject),
                        }}>
                        <Popup>
                            <PopupForm
                                toggleEditInfo={toggleEditInfo}
                                markerObject={markerObject} 
                                startEdit={startEdit} 
                                handleSubmit={handleSubmit}
                                editInfo={editInfo}/>
                        </Popup>
                    </Marker>
                ))}
                <LocationMarker />
				<SearchBar addNewMarker = {addNewMarker}/>
            </MapContainer>
        </>
    )
}
