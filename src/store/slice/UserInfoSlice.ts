import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types";

const UserInfoSlice = createSlice({
    name: "UserInfoSlice",
    initialState: {
        user_id: 0,
        username: "",
        password: "",
    } as UserInfo,
    reducers: {
        setUserInfo(state, action: PayloadAction<UserInfo>): void {
            state = { ...action.payload };
        }
    }
});

export default UserInfoSlice.reducer;
export const { setUserInfo } = UserInfoSlice.actions;