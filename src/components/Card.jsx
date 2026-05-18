import React from 'react'

const Card = ({ photo, onClick, index = 0 }) => {
    const tags = photo.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3);
    // Wider tilt range: ±3.5° for a naturally scattered feel
    const rotation = (((photo.id % 11) - 5) * 0.7).toFixed(2);

    return (
        <div
            className="photo-card"
            style={{
                '--tilt': `${rotation}deg`,
                '--delay': `${index * 45}ms`,
            }}
            onClick={() => onClick && onClick(photo)}
        >
            <img src={photo.previewURL} alt={photo.tags} className="card-image" />
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
