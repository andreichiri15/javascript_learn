import { useState, useEffect } from "react";

export default function PopupForm({markerObject, startEdit, handleSubmit, deleteMarker, startEditContent, handleCancel}) {
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

    useEffect(() => {
        if (markerObject?.editMode && markerObject?.locationData) {
            console.log('useeffect', markerObject)

            setFormData({
                title: markerObject.locationData.title || "",
                rating: String(markerObject.locationData.rating || ""),
                description: markerObject.locationData.description || "",
            });
        }
    }, [markerObject, markerObject.editMode]);

    return (
        <>
            {markerObject?.editMode ?
                <div className='popup-wrapper'>
                    <form className="popup-form">
                        <label
                            style={{display:'block'}}>
                            Title:
                            <input
                                style={{display:'block'}}
                                type='text' 
                                name="title"
                                value={formData.title}
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
                                value={formData.description}
                                name='description' 
                                onChange={handleChange}
                            />
                        </label>
                        <button
                            style={{display:'block'}}
                            onClick={(e) => {
                                // e.stopPropagation();
                                e.preventDefault()
                                handleSubmit(e, markerObject, formData)}}>
                            Save
                        </button>
                        <button
                            style={{display:'block'}}
                            onClick={(e) => {
                                e.preventDefault()

                                handleCancel(markerObject)
                            }}>
                            Cancel
                        </button>
                    </form>
                </div>
            :
                <div>
                    <div>{markerObject.locationData.title}</div>
                    <div>{markerObject.locationData.description}</div>
                    <button
                        style={{display:'block'}}
                        onClick={(e) => {
                            // e.stopPropagation();
                            startEditContent(markerObject)}}>
                        Edit Content
                    </button>
                    <button
                        style={{display:'block'}}
                        onClick={() => {
                            deleteMarker(markerObject)}}>
                        Delete
                    </button>
                </div> 
            }
            <button
                style={{display:'block'}}
                onClick={() => {
                    startEdit(markerObject)}}>
                Edit Location
            </button>
        </>
    )
}
