import { createSlice } from "@reduxjs/toolkit";
import { MusicInfoItem } from "../../types";

const MusicInfoSlice = createSlice({
    name: "MusicInfoSlice",
    initialState: {
        musicInfo: null,
        artwork: "",
        albumId: null,
    } as { musicInfo: MusicInfoItem | null; artwork: string; albumId: number | null; },
    reducers: {
        setMusicInfo(state, action) {
            state.musicInfo = action.payload;
        },
        setArtwork(state, action) {
            state.artwork = action.payload;
        },
        setAlbumId(state, action) {
            state.albumId = action.payload;
        }
    }
});

export default MusicInfoSlice.reducer;
export const { setMusicInfo, setArtwork, setAlbumId } = MusicInfoSlice.actions;