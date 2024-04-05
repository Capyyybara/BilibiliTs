import { useState } from 'react';
import { Button, Text, Modal, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOpen } from '../store/slice/AlbumSlice';
import { AlbumInfo } from '../types';
import post from '../request';

export default function DrawerExample() {
    const dispatch = useAppDispatch();
    const albumSlice = useAppSelector(state => state.AlbumSlice);
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);
    const musicInfoSlice = useAppSelector(state => state.MusicInfoSlice);

    const getArtificailAlbum = (item: AlbumInfo, index: number) => {
        if (item.album_data == null) {
            return (
                <TouchableOpacity key={index} onPress={() => {
                    dispatch(setOpen());
                    post("/musicInfo/addMusic", {
                        ...musicInfoSlice.musicInfo,
                        artwork: playBarSlice.artwork,
                        albumId: item.album_id
                    });
                }}>
                    <View>
                        <View style={styles.item} >
                            <Text numberOfLines={1}>{item.album_name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };
    return (
        <Modal
            hardwareAccelerated
            animationType="slide"
            transparent={true}
            visible={albumSlice.open}
            onRequestClose={() => dispatch(setOpen())}
        >
            <View style={styles.container}>
                <ScrollView style={styles.modal}>

                    {albumSlice.albumInfo ? albumSlice.albumInfo.map((item, index) => {
                        return getArtificailAlbum(item, index);
                    }) : null}
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        elevation: 1,
    },
    modal: {
        height: 750,
        width: "100%",
        backgroundColor: "#FFFBFF",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        elevation: 70,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
    },
    item: {
        height: 45,
        borderBottomColor: "#ECECEC",
        borderBottomWidth: 1,
        justifyContent: "center"
    }
});