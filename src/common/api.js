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

    const response = await axios.get(url, {
        params: params
    }).catch((err) => { return err })
    if (response.status == 200) {
        dispatch(addPhotos(response.data.hits));
        return response;
    }
}