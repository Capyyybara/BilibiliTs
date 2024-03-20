export interface UserElementType {
    user_id?: number;
    email: string;
    password: string;
    address: string;
}

export type RootStackParamList = {
    HomePage: undefined;
    LoginPage: undefined;
    SearchPage: {
        searchQuery: string;
    };
};
export type MusicInfoItem = {
    aid: number;
    album: string;
    artist: string;
    artwork: string;
    bvid: string;
    date: string;
    description: string;
    duration: number;
    id: string;
    tags: (null | string)[];
    title: string;
};

export type MusicInfoList = {
    data: MusicInfoItem[];
    isEnd: boolean;
};

import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;