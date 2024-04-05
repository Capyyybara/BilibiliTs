import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { MusicInfoItem } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMusicInfo, setPlay } from '../store/slice/PlayBarSlice';
import { Feather } from "@expo/vector-icons";
import { setOpen } from '../store/slice/AlbumSlice';
import { setAlbumId, setArtwork, setMusicInfo as setAlbumMusicInfo } from '../store/slice/MusicInfoSlice';
import { setAlbumListInfo } from '../store/slice/AlbumListSlice';


const MusicItem = ({ data, albumInfo }: { data: MusicInfoItem; albumInfo: MusicInfoItem[]; }) => {
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);
    const dispatch = useAppDispatch();
    return (
        <TouchableOpacity onPress={() => {
            if (playBarSlice.musicInfo?.cid != data.cid) {
                dispatch(setMusicInfo(data));
                dispatch(setPlay(true));
                console.log(albumInfo);

                dispatch(setAlbumListInfo(albumInfo));
            }
        }}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text>{data.title}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    dispatch(setAlbumMusicInfo(data));
                    // dispatch(setArtwork(playBarSlice.artwork));
                    dispatch(setOpen());
                }}>
                    <View style={styles.plus}>
                        <Feather name="plus-square" size={22} color="black" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableOpacity>
    );
};

export default MusicItem;

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: "row"
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 10,
        borderRadius: 3,
    },
    box: {
        flex: 1,
        // borderWidth: 1,
        height: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    plus: {
        right: 0,
        top: -2,
        justifyContent: "center",
        height: "100%",
        marginLeft: "5%",
        marginRight: "5%"
    },
});