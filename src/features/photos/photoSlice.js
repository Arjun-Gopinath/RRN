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
        setPhotos: (state, { payload }) => {
            state.photos = payload;
            writeCache(payload);
        },
        appendPhotos: (state, { payload }) => {
            state.photos = [...state.photos, ...payload];
            writeCache(state.photos);
        }
    }
})

export const { setPhotos, appendPhotos } = photoSlice.actions;
export default photoSlice.reducer;
