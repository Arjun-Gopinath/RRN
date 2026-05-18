import { addPhotos } from "../features/photos/photoSlice";

export const fetchPhotos = async (dispatch, content, per_page, category) => {
    const params = new URLSearchParams({
        key: import.meta.env.VITE_API_KEY,
        q: content,
        lang: "en",
        image_type: "photo",
        category: category,
        per_page: per_page
    });

    const response = await fetch(`https://pixabay.com/api/?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    dispatch(addPhotos(data.hits));
    return { status: 200 };
}
