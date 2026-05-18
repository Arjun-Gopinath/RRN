import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import Modal from './Modal'
import Sidebar from './Sidebar'
import { fetchPhotos } from '../common/api'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import SearchBox from './SearchBox';

const BATCH_SIZE = 24;

const Main = () => {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos) || [];
    const [dogs, setDogs] = useState(photos);
    const [loading, isLoading] = useState(photos.length === 0);
    const [error, isError] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentQuery, setCurrentQuery] = useState('dogs');
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const sentinelRef = useRef(null);

    async function handlePhotos(query) {
        try {
            await fetchPhotos(dispatch, query, 200, "any");
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

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || visibleCount >= dogs.length) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleCount(v => Math.min(v + BATCH_SIZE, dogs.length));
                }
            },
            { rootMargin: '300px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [visibleCount, dogs.length]);

    const handleSearch = (query) => {
        setCurrentQuery(query);
        setVisibleCount(BATCH_SIZE);
        isLoading(true);
        handlePhotos(query);
    };

    const visibleDogs = dogs.slice(0, visibleCount);
    const hasMore = visibleCount < dogs.length;

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
                            {visibleDogs.length > 0 && visibleDogs.map((dog, i) => (
                                <Card key={dog.id} photo={dog} index={i} onClick={setSelectedPhoto} />
                            ))}
                            {hasMore && (
                                <div className="scroll-sentinel" ref={sentinelRef} />
                            )}
                            {!hasMore && dogs.length > BATCH_SIZE && (
                                <p className="load-more-hint">All {dogs.length} photos loaded</p>
                            )}
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
