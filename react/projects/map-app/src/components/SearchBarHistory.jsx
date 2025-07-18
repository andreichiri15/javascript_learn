import { useMap } from 'react-leaflet';

export default function SearchBarHistory({searchHistory, deleteFromHistory}) {
    const map = useMap()
    
    const moveToLocation = (location, zoomLevel) => {
        const newPos = {
            lat: location.location.y,
            lng: location.location.x
        }

        map.flyTo(newPos, zoomLevel)
    }

    return (
        <div className="search-bar-history">
            {searchHistory.map((value, index) => {
                console.log(value[0].location.label)
                return (
                    <div 
                        key = {index} 
                        style={{display: 'flex', justifyContent: 'space-between'}}
                        onClick = {() => {
                            moveToLocation(value[0], value[1])
                        }}>
                        <div
                            key = {index}
                            style={{display: 'inline'}}>
                            {value[0].location.label.length > 50 ? value[0].location.label.slice(0, 50) + '...' : value[0].location.label}
                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            deleteFromHistory(value[0])
                        }
                        }>
                            ×
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
