import { createSlice } from "@reduxjs/toolkit";
import { AlbumInfo, MusicInfoItem } from "../../types";


const AlbumListSlice = createSlice({
    name: "AlbumListSlice",
    initialState: {
        albumListInfo: []
    } as { albumListInfo: MusicInfoItem[]; },
    reducers: {
        setAlbumListInfo(state, action) {
            state.albumListInfo = [...action.payload];
        }
    }
});

export default AlbumListSlice.reducer;
export const { setAlbumListInfo } = AlbumListSlice.actions;