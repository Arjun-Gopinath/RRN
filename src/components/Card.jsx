import React, { useState } from 'react'

const Card = ({ photo, onClick, index = 0 }) => {
    const tags = photo.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3);
    const rotation = (((photo.id % 11) - 5) * 0.7).toFixed(2);
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="photo-card"
            style={{
                '--tilt': `${rotation}deg`,
                '--delay': `${index * 45}ms`,
            }}
            onClick={() => onClick && onClick(photo)}
        >
            {imgError ? (
                <div className="card-image card-img-error" aria-label="Image unavailable">
                    <span className="card-img-error-icon">&#128247;</span>
                </div>
            ) : (
                <img
                    src={photo.previewURL}
                    alt={photo.tags}
                    className="card-image"
                    onError={() => setImgError(true)}
                />
            )}
            <div className="card-caption">
                {tags.map((tag, i) => (
                    <span key={tag} className="card-tag">
                        {tag}{i < tags.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Card
