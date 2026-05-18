import { Div, Notification } from 'atomize'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Modal from './Modal'
import { fetchPhotos } from '../common/api'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import "../styles/Main.css"
import SearchBox from './SearchBox';

const Main = () => {
    const dispatch = useDispatch();
    const [loading, isLoading] = useState(true);
    const [error, isError] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const photos = useSelector((state) => state.photos) || {};
    const [dogs, setDogs] = useState({});
    async function handlePhotos(query) {
        const response = await fetchPhotos(dispatch, query, 15, "any");
        if (!response || response.status != 200) {
            isError(true);
        } else {
            isLoading(false);
        }
    }
    useEffect(() => {
        handlePhotos('dogs');
    }, []);

    useEffect(() => {
        setDogs(photos);
    }, [photos]);

    return (
        <>
            {selectedPhoto && (
                <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            )}
            <Notification isOpen={error}>Error fetching records</Notification>
            <header className="app-header">
                <Header />
                <SearchBox placeholder={"Enter description"}
                    onSearch={(query) => {
                        isLoading(true);
                        handlePhotos(query);
                    }
                    } />
            </header>
            {loading ?
                <div className='loader-parent'>
                    <div className="loader"></div>
                </div> :
                <Div d="flex" justify="center" align="center" className="content-area" flexWrap="wrap">
                    {
                        dogs.length > 0 && dogs.map((dog) => <Card key={dog.id} photo={dog} onClick={setSelectedPhoto} />)
                    }
                </Div>
            }
        </>
    )
}

export default Main
