import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicInfoItem } from "../../types";


const PlayBarSlice = createSlice({
    name: "PlayBarSlice",
    initialState: {
        musicInfo: null,
        artwork: "",
        play: false,
    } as { musicInfo: MusicInfoItem | null; artwork: string; play: boolean; },
    reducers: {
        setMusicInfo(state, action: PayloadAction<MusicInfoItem>) {
            state.musicInfo = { ...action.payload };
        },
        setArtwork(state, action: PayloadAction<string>) {
            state.artwork = action.payload;
        },
        setPlay(state, action: PayloadAction<boolean>) {
            state.play = action.payload;
        }
    }
});
export default PlayBarSlice.reducer;
export const { setMusicInfo, setArtwork, setPlay } = PlayBarSlice.actions;