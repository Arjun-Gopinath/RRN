import { createSlice } from "@reduxjs/toolkit";

const CACHE_KEY = 'rrn-photos';

const readCache = () => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    } catch {
        return [];
    }
};

const writeCache = (photos) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(photos));
    } catch {}
};

const photoSlice = createSlice({
    name: "photos",
    initialState: { photos: readCache() },
    reducers: {
        addPhotos: (state, { payload }) => {
            state.photos = payload;
            writeCache(payload);
        }
    }
})

export const { addPhotos } = photoSlice.actions;
export default photoSlice.reducer;
