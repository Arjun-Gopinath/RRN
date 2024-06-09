import axios from "axios";
import { addPhotos } from "../features/photos/photoSlice";

export const fetchPhotos = async (dispatch, content, per_page, category) => {
    const url = `https://pixabay.com/api`;
    const params = {
        key: import.meta.env.VITE_API_KEY,
        q: content,
        lang: "en",
        image_type: "photo",
        category: category,
        per_page: per_page
    };

    try {
        let response = await axios.get(url, {
            params: params,
            maxRedirects: 0
        });

        if (response.status === 200) {
            console.log("Response Ready");
            dispatch(addPhotos(response.data.hits));
            return response;
        } else {
            throw new Error('Failed to fetch photos');
        }
    } catch (error) {
        console.log("We're doomed");
        if (error.response) {
            let redirectUrl = error.response.headers.location;

            if (error.response.status === 301 || error.response.status === 307) {
                if (redirectUrl.startsWith("http://")) {
                    redirectUrl = redirectUrl.replace("http://", "https://");
                }

                console.log(redirectUrl, " not yet");
                response = await axios.get(redirectUrl, {
                    params: params
                });

                if (response.status === 200) {
                    console.log("hurray");
                    dispatch(addPhotos(response.data.hits));
                    return response;
                } else {
                    throw new Error('Failed to fetch photos after redirect');
                }
            }
        }

        console.error('Error fetching photos:', error);
        throw error;
    }
}