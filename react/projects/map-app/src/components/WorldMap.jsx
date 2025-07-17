import { MapContainer, TileLayer, Marker, useMapEvents, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { v4 as uuidv4 } from 'uuid';

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function WorldMap({setStartedEdit, isLoggedIn, markers, setMarkers, markerMode, setMarkerMode, changeCurrentSelection, setIsOpened}) {
    const mapRef = useRef(null);
	const latitude = 51.505;
	const longitude = -0.09;

    const [editInfo, setEditInfo] = useState(true)
    const [showCustomPopup, setShowCustomPopup] = useState(false)
    
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

                // position = [e.latlng.lat, e.latlng.lng]
                position = e.latlng

                const locationData = {
                    title: '',
                    rating: 0,
                    description: ''
                }

                const newMarker = {
                    id: id,
                    draggable: false,
                    position: position,
                    locationData: locationData,
                    editMode: false
                }

                newMarkers.push(newMarker)
                setMarkers((prev) => [...prev, newMarker])

                console.log(markers, newMarkers)

                setMarkerMode(0)
            }
        })
    }

    const handleDragEnd = (e, draggedMarker) => {
        draggedMarker.draggable = false

        setMarkerMode(0)
        setStartedEdit((prev) => !prev)

        console.log(draggedMarker)
    }


    useEffect(() => {
        // if (!isLoggedIn) {
        //     navigate('/login')
        // }

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
            editMode: true,
            locationData: locationData
        }

        setMarkers(prev => [...prev, newMarker])
    }

    const toggleEditInfo = () => {
        setEditInfo((prev) => !prev)
    }

    const toggleShowCustomPopup = () => {
        // console.log('pluh')
        setShowCustomPopup((prev) => !prev)
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
                    <div key = {index}>
                        <Marker
                            key={markerObject.id}
                            position={markerObject.position}
                            draggable={markerObject.draggable}
                            eventHandlers={{
                                dragend: (e) => handleDragEnd(e, markerObject),
                                click: (e) => changeCurrentSelection(markerObject)
                            }}>
                            {/* <Popup>
                                <PopupForm
                                    toggleEditInfo={toggleEditInfo}
                                    markerObject={markerObject} 
                                    startEdit={startEdit} 
                                    handleSubmit={handleSubmit}
                                    editInfo={editInfo}
                                    deleteMarker={deleteMarker}/>
                            </Popup> */}
                            <Tooltip>
                                Click to edit
                            </Tooltip>
                            <Popup
                                closeOnClick={false}>
                                Current Selection
                            </Popup>
                        </Marker>
                    </div>
                ))}
                <LocationMarker />
				<SearchBar addNewMarker = {addNewMarker}/>
            </MapContainer>
        </>
    )
}
