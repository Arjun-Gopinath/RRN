import React, { useEffect, useState } from 'react';

const Modal = ({ photo, onClose }) => {
    const tags = photo.tags.split(',').map(t => t.trim()).filter(Boolean);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">&#x2715;</button>

                {imgError ? (
                    <div className="modal-image modal-img-error" aria-label="Image unavailable">
                        <span className="modal-img-error-icon">&#128247;</span>
                        <span className="modal-img-error-text">Image unavailable</span>
                    </div>
                ) : (
                    <img
                        src={photo.webformatURL}
                        alt={photo.tags}
                        className="modal-image"
                        onError={() => setImgError(true)}
                    />
                )}

                <div className="modal-details">
                    <div className="modal-photographer">
                        {photo.userImageURL && (
                            <img src={photo.userImageURL} alt={photo.user} className="modal-avatar" />
                        )}
                        <span className="modal-username">{photo.user}</span>
                    </div>

                    <div className="modal-divider" />

                    <div className="modal-stats">
                        <span title="Views">&#128065; {photo.views.toLocaleString()}</span>
                        <span title="Likes">&#9829; {photo.likes.toLocaleString()}</span>
                        <span title="Downloads">&#8595; {photo.downloads.toLocaleString()}</span>
                    </div>

                    <div className="modal-tags">
                        {tags.map(tag => (
                            <span key={tag} className="modal-tag">{tag}</span>
                        ))}
                    </div>

                    <a
                        href={photo.pageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-source-link"
                    >
                        View on Pixabay &#8599;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Modal;
