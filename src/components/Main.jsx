import { Div, Notification } from 'atomize'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { fetchPhotos } from '../common/api'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import "./Main.css"
import SearchBox from './SearchBox';

const Main = () => {
    const dispatch = useDispatch();
    const [loading, isLoading] = useState(true);
    const [error, isError] = useState(false);
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
            <Notification isOpen={error}>Error fetching records</Notification>
            <header style={{ zIndex: "1000", width: "100%", position: "fixed" }}>
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
                <Div d="flex" justify="center" align="center" p={{ t: "120px" }} flexWrap="wrap">
                    {
                        dogs.length > 0 && dogs.map((dog) => <Card key={dog.id} photo={dog} />)
                    }
                </Div>
            }
        </>
    )
}

export default Main