import { useMap } from "react-leaflet";
import { useState } from "react";

export default function PopupForm({markerObject, startEdit, handleSubmit, editInfo = true, toggleEditInfo}) {
    const map = useMap()

    const [formData, setFormData] = useState({
        title: "",
        rating: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            {editInfo ?
                <div className='popup-wrapper'>
                    <form className="popup-form">
                        <label
                            style={{display:'block'}}>
                            Title:
                            <input
                                style={{display:'block'}}
                                type='text' 
                                name="title" 
                                onChange={handleChange}/>
                        </label>
                        <label
                            style={{display:'block'}}>
                            Rating:
                            {[5, 4, 3, 2, 1].map(num => (
                                <span key={num}>
                                    <input
                                    type="radio"
                                    id={`rating-${num}`}
                                    name="rating"
                                    value={num}
                                    checked={formData.rating === String(num)}
                                    onChange={handleChange}
                                    />
                                    <label htmlFor={`rating-${num}`}>{num}</label>
                                </span>
                            ))}
                        </label>
                        <label
                            style={{display:'block'}}>
                            Description:
                            <input 
                                style={{display:'block'}}
                                type='text' 
                                name='description' 
                                onChange={handleChange}
                            />
                        </label>
                        <button
                            style={{display:'block'}}
                            onClick={(e) => {
                                e.preventDefault()
                                toggleEditInfo()
                                handleSubmit(e, markerObject, formData)}}>
                            Save
                        </button>
                    </form>
                    <button
                        style={{display:'block'}}
                        onClick={() => {
                            map.closePopup()
                            startEdit(markerObject)}}>
                        Edit
                    </button>
                </div>
            :
                <div>
                    <div>{markerObject.locationData.title}</div>
                </div>
            }
        </>
    )
}
