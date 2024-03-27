import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicInfoItem } from "../../types";


const PlayBarSlice = createSlice({
    name: "PlayBarSlice",
    initialState: {
        musicInfo: null,
        artwork: ""
    } as { musicInfo: MusicInfoItem | null; artwork: string; },
    reducers: {
        setMusicInfo(state, action: PayloadAction<MusicInfoItem>) {
            state.musicInfo = { ...action.payload };
        },
        setArtwork(state, action: PayloadAction<string>) {
            state.artwork = action.payload;
        },
    }
});
export default PlayBarSlice.reducer;
export const { setMusicInfo, setArtwork } = PlayBarSlice.actions;