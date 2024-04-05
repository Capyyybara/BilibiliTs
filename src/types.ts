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
    AlbumPage: {
        AlbumInfo: AlbumInfoItem;
    };
    MyAlbumPage: {
        albumInfo: AlbumInfo;
    };
    HistoryPage: undefined;
    SignUpPage: undefined;
};
export type AlbumInfoItem = {
    aid: number;
    album?: string;
    artist?: string;
    artwork: string;
    bvid: string;
    date?: string;
    description?: string;
    duration: number;
    id: string;
    tags?: (null | string)[];
    title: string;
};

export type AlbumInfoList = {
    data: AlbumInfoItem[];
    isEnd: boolean;
};
export type MusicInfoItem = {
    aid: number;
    bvid: string;
    cid?: number;
    duration: number;
    id: number;
    title: string;
};

export type IndividualMusicInfoItem = {
    aid: number;
    cid: number;
    bvid: string;
};

export type Source = {
    headers: {
        accept: string;
        'accept-encoding': string;
        connection: string;
        host: string;
        referer: string;
        'user-agent': string;
    };
    url: string;
};

export type UserInfo = {
    user_id: number;
    username: string;
    password: string;
};

export type AlbumInfo = {
    album_id: number;
    album_name: string;
    user_id: number;
    album_data: string;
    album_bvid: string;
};

export type MyAlbumMusicInfo = {
    aid: number;
    album_id: number;
    artwork: string;
    bvid: string;
    cid: number;
    duration: number;
    id: number;
    music_id: number;
    title: string;
};

export type MusicHistory = {
    aid: number;
    artwork: string;
    bvid: string;
    cid: number;
    duration: number;
    id: number;
    music_history_id: number;
    title: string;
    user_id: number;
};

import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;