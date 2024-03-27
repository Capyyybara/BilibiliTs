import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MusicInfoItem } from '../types';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMusicInfo } from '../store/slice/PlayBarSlice';

const MusicItem = ({ data }: { data: MusicInfoItem; }) => {
    const navigation = useNavigation<RootStackNavigation>();
    const dispatch = useAppDispatch();
    return (
        <TouchableOpacity onPress={() => {
            dispatch(setMusicInfo(data));
        }}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text>{data.title}</Text>
                </View>
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
    }
});