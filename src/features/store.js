import { configureStore } from "@reduxjs/toolkit";
import photoReducer from './photos/photoSlice';

export const store = configureStore({
    reducer: photoReducer,
})