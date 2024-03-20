import { configureStore } from "@reduxjs/toolkit";
import SnackbarSlice from "./slice/SnackbarSlice";

const store = configureStore({
    reducer: {
        SnackbarSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;