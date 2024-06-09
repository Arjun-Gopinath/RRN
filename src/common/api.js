import axios from "axios";
import { addPhotos } from "../features/photos/photoSlice";

export const fetchPhotos = async (dispatch, content, per_page, category) => {
    const url = `http://pixabay.com/api`;
    const params = {
        key: import.meta.env.VITE_API_KEY,
        q: content,
        lang: "en",
        image_type: "photo",
        category: category,
        per_page: per_page
    };

    try {
        const response = await axios.get(url, {
            params: params,
            maxRedirects: 0 // Prevent automatic redirects
        });

        if (response.status === 200) {
            dispatch(addPhotos(response.data.hits));
            return response;
        } else {
            throw new Error('Failed to fetch photos');
        }
    } catch (error) {
        if (error.response && error.response.status === 301) {
            // Handle the redirect manually if necessary
            const redirectUrl = error.response.headers.location.replace("http://", "https://");
            const redirectedResponse = await axios.get(redirectUrl, { params: params });

            if (redirectedResponse.status === 200) {
                dispatch(addPhotos(redirectedResponse.data.hits));
                return redirectedResponse;
            }
        }
        console.error('Error fetching photos:', error);
        throw error; // Rethrow the error for handling further up the call stack
    }
}