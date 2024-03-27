import { configureStore } from "@reduxjs/toolkit";
import SnackbarSlice from "./slice/SnackbarSlice";
import PlayBarSlice from "./slice/PlayBarSlice";

const store = configureStore({
    reducer: {
        SnackbarSlice,
        PlayBarSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;