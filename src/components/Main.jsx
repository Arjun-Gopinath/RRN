import React, { useEffect, useState } from 'react'
import Card from './Card'
import Modal from './Modal'
import Sidebar from './Sidebar'
import { fetchPhotos } from '../common/api'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import SearchBox from './SearchBox';

const Main = () => {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos) || [];
    const [dogs, setDogs] = useState(photos);
    const [loading, isLoading] = useState(photos.length === 0);
    const [error, isError] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentQuery, setCurrentQuery] = useState('dogs');

    async function handlePhotos(query) {
        try {
            await fetchPhotos(dispatch, query, 15, "any");
            isLoading(false);
            isError(false);
        } catch {
            isError(true);
            isLoading(false);
        }
    }

    useEffect(() => {
        if (photos.length === 0) {
            handlePhotos('dogs');
        }
    }, []);

    useEffect(() => {
        setDogs(photos);
    }, [photos]);

    const handleSearch = (query) => {
        setCurrentQuery(query);
        isLoading(true);
        handlePhotos(query);
    };

    return (
        <>
            {selectedPhoto && (
                <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            )}
            <header className="app-header">
                <Header />
                <SearchBox placeholder="Search anything..." onSearch={handleSearch} />
            </header>
            {error && (
                <div className="error-banner">Could not fetch photos. Check your API key or connection.</div>
            )}
            {loading ? (
                <div className="loader-parent">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="content-area">
                    <div className="layout-wrapper">
                        <div className="photo-grid">
                            {dogs.length > 0 && dogs.map((dog, i) => (
                                <Card key={dog.id} photo={dog} index={i} onClick={setSelectedPhoto} />
                            ))}
                        </div>
                        {dogs.length > 0 && (
                            <Sidebar
                                photos={dogs}
                                currentQuery={currentQuery}
                                onSearch={handleSearch}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Main
