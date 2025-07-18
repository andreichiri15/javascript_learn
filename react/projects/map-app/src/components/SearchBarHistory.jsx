import { useMap } from 'react-leaflet';

export default function SearchBarHistory({searchHistory, deleteFromHistory}) {
    const map = useMap()
    
    const moveToLocation = (location) => {
        const newPos = {
            lat: location.location.y,
            lng: location.location.x
        }

        map.flyTo(newPos, map.getZoom())
    }

    return (
        <div className="search-bar-history">
            {searchHistory.map((value, index) => {
                console.log(value.location.label)
                return (
                    <div 
                        key = {index} 
                        style={{display: 'flex', justifyContent: 'space-between'}}
                        onClick = {() => {
                            moveToLocation(value)
                        }}>
                        <div
                            key = {index}
                            style={{display: 'inline'}}>
                            {value.location.label}
                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            deleteFromHistory(value)
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
