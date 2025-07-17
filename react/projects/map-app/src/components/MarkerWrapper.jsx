import {Marker, Tooltip} from 'react-leaflet'
import {useRef} from 'react'

export default function MarkerWrapper({markerObject, handleDragEnd, changeCurrentSelection, setHidePopup}) {
    const markerRef = useRef(null)

    return (
        <Marker
            key={markerObject.id}
            position={markerObject.position}
            draggable={markerObject.draggable}
            ref={markerRef}
            eventHandlers={{
                dragend: (e) => {
                    setHidePopup(false)
                    handleDragEnd(e, markerObject, markerRef.current._latlng)
                },
                click: (e) => changeCurrentSelection(markerObject),
                dragstart: (e) => {
                    setHidePopup(true)
                }
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
        </Marker>
    )
}
