import { configureStore } from "@reduxjs/toolkit";
import SnackbarSlice from "./slice/SnackbarSlice";
import PlayBarSlice from "./slice/PlayBarSlice";
import UserInfoSlice from "./slice/UserInfoSlice";
import AlbumSlice from "./slice/AlbumSlice";
import MusicInfoSlice from "./slice/MusicInfoSlice";
import AlbumListSlice from "./slice/AlbumListSlice";

const store = configureStore({
    reducer: {
        SnackbarSlice,
        PlayBarSlice,
        UserInfoSlice,
        AlbumSlice,
        MusicInfoSlice,
        AlbumListSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;