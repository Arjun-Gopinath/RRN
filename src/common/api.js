import { setPhotos, appendPhotos } from "../features/photos/photoSlice";

const PER_PAGE = 20;

export const fetchPhotos = async (dispatch, content, page = 1, append = false) => {
    const params = new URLSearchParams({
        key: import.meta.env.VITE_API_KEY,
        q: content,
        lang: "en",
        image_type: "photo",
        per_page: PER_PAGE,
        page
    });

    const response = await fetch(`https://pixabay.com/api/?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    dispatch(append ? appendPhotos(data.hits) : setPhotos(data.hits));

    return { totalHits: data.totalHits, fetched: data.hits.length };
};
