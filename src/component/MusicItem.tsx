import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { MusicInfoItem } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMusicInfo, setPlay } from '../store/slice/PlayBarSlice';
import { Feather } from "@expo/vector-icons";


const MusicItem = ({ data }: { data: MusicInfoItem; }) => {
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);
    const dispatch = useAppDispatch();
    return (
        <TouchableOpacity onPress={() => {
            if (playBarSlice.musicInfo?.cid != data.cid) {
                dispatch(setMusicInfo(data));
                dispatch(setPlay(true));
            }
        }}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text>{data.title}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(data);
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