import { useState, useEffect } from "react";

export default function PopupForm({
    markerObject,
    startEdit,
    handleSubmit,
    deleteMarker,
    startEditContent,
    handleCancel,
    }) {

    const [formData, setFormData] = useState({
        title: "",
        rating: null,
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    useEffect(() => {
        if (markerObject?.editMode && markerObject?.locationData) {
        setFormData({
            title: markerObject.locationData.title || "",
            rating: String(markerObject.locationData.rating || ""),
            description: markerObject.locationData.description || "",
        });
        }
    }, [markerObject, markerObject.editMode]);

    return (
        <div className="popup-wrapper">
        {markerObject?.editMode ? (
            <form className="popup-form">
            <label>
                Title:
                <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                />
            </label>

            <label>
                Rating:
                <div className="rating-group">
                {[1, 2, 3, 4, 5].map((num) => (
                    <span key={num}>
                    <input
                        type="radio"
                        id={`rating-${num}`}
                        name="rating"
                        value={num}
                        checked={formData.rating === String(num)}
                        onChange={handleChange}
                    />
                    <label htmlFor={`rating-${num}`}>★</label>
                    </span>
                ))}
                </div>
            </label>

            <label>
                Description:
                <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                />
            </label>

            <div className="popup-buttons">
                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e, markerObject, formData);
                    }}>
                    Save
                </button>
                <button
                    className="cancel"
                    onClick={(e) => {
                        e.preventDefault();
                        handleCancel(markerObject);
                    }}>
                    Cancel
                </button>
            </div>
            </form>
        ) : (
            <div className="static-display">
            <div><strong>Title:</strong> {markerObject.locationData.title}</div>
            <div><strong>Description:</strong> {markerObject.locationData.description}</div>
            <div><strong>Rating:</strong> {markerObject.locationData.rating ? markerObject.locationData.rating + ' stars' : 'Not rated yet'}</div>

            <div className="popup-buttons">
                <button onClick={() => startEditContent(markerObject)}>Edit Content</button>
                <button className="cancel" onClick={() => deleteMarker(markerObject)}>Delete</button>
                <button onClick={() => startEdit(markerObject)}>Edit Location</button>
            </div>
            </div>
        )}
        </div>
    );
}
