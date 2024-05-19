import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photos: {}
}

const photoSlice = createSlice({
    name: "photos",
    initialState: initialState,
    reducers: {
        addPhotos: (state, { payload }) => {
            state.photos = payload;
        }
    }
})

export const { addPhotos } = photoSlice.actions;
export default photoSlice.reducer;