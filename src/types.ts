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
    url: {
        url: string;
    };
};

import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;