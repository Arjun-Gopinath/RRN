import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import Modal from './Modal'
import Sidebar from './Sidebar'
import { fetchPhotos } from '../common/api'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import SearchBox from './SearchBox';

const INITIAL_QUERY = 'dogs';
const QUERY_CACHE_KEY = 'rrn-query';

const readCachedQuery = () => localStorage.getItem(QUERY_CACHE_KEY) || INITIAL_QUERY;
const writeCachedQuery = (q) => { try { localStorage.setItem(QUERY_CACHE_KEY, q); } catch {} };

const Main = () => {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos) || [];
    const [loading, isLoading] = useState(photos.length === 0);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [error, isError] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentQuery, setCurrentQuery] = useState(readCachedQuery);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);
    const sentinelRef = useRef(null);

    async function loadPage(query, pageNum, append = false) {
        try {
            const result = await fetchPhotos(dispatch, query, pageNum, append);
            setTotalHits(result.totalHits);
            isLoading(false);
            isError(false);
        } catch {
            isError(true);
            isLoading(false);
            setFetchingMore(false);
        }
    }

    useEffect(() => {
        if (photos.length === 0) {
            loadPage(INITIAL_QUERY, 1, false);
        } else {
            setTotalHits(photos.length);
        }
    }, []);

    const handleSearch = (query) => {
        setCurrentQuery(query);
        writeCachedQuery(query);
        setPage(1);
        setTotalHits(0);
        isLoading(true);
        loadPage(query, 1, false);
    };

    const hasMore = photos.length < totalHits;

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasMore || fetchingMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !fetchingMore) {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    setFetchingMore(true);
                    loadPage(currentQuery, nextPage, true).then(() => setFetchingMore(false));
                }
            },
            { rootMargin: '400px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, fetchingMore, page, currentQuery]);

    return (
        <>
            {selectedPhoto && (
                <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            )}
            <header className="app-header">
                <Header />
                <SearchBox
                    placeholder="Search anything..."
                    onSearch={handleSearch}
                    initialQuery={currentQuery}
                />
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
                            {photos.map((photo, i) => (
                                <Card
                                    key={photo.id}
                                    photo={photo}
                                    index={Math.min(i, 15)}
                                    onClick={setSelectedPhoto}
                                />
                            ))}
                        </div>
                        {photos.length > 0 && (
                            <Sidebar
                                photos={photos}
                                currentQuery={currentQuery}
                                onSearch={handleSearch}
                            />
                        )}
                    </div>

                    {hasMore && !fetchingMore && (
                        <div className="scroll-sentinel" ref={sentinelRef} />
                    )}
                    {fetchingMore && (
                        <div className="fetch-more-loader">
                            <div className="fetch-more-spinner" />
                        </div>
                    )}
                    {!hasMore && photos.length > 0 && totalHits > 0 && (
                        <p className="load-more-hint">All {photos.length} photos loaded</p>
                    )}
                </div>
            )}
        </>
    )
}

export default Main
