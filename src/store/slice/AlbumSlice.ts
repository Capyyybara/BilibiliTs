import { createSlice } from "@reduxjs/toolkit";
import { AlbumInfo } from "../../types";

const AlbumSlice = createSlice({
    name: "AlbumSlice",
    initialState: {
        albumInfo: [],
        open: false
    } as { albumInfo: AlbumInfo[]; open: boolean; },
    reducers: {
        setAlbumInfo(state, action) {
            state.albumInfo = action.payload;
        },
        setOpen(state) {
            state.open = !state.open;
        }
    }
});

export default AlbumSlice.reducer;
export const { setAlbumInfo, setOpen } = AlbumSlice.actions;