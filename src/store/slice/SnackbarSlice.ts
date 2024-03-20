import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
    show: boolean;
    message: string;
}

const SnackbarSlice = createSlice({
    name: "SnackbarSlice",
    initialState: {
        show: false,
        message: "",
    } as SnackbarState,
    reducers: {
        setShow(state: SnackbarState, action: PayloadAction<string>): void {
            state.show = !state.show;
            state.message = action.payload;
        }
    }
});

export default SnackbarSlice.reducer;
export const { setShow } = SnackbarSlice.actions;
