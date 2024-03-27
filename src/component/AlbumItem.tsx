import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AlbumInfoItem } from '../types';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../types';
import { useAppDispatch } from '../store/hooks';
import { setArtwork } from '../store/slice/PlayBarSlice';

const AlbumItem = ({ data }: { data: AlbumInfoItem; }) => {
    const navigation = useNavigation<RootStackNavigation>();
    const dispatch = useAppDispatch();

    const getComponent = () => {
        if (data.bvid == "") {
            return null;
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    dispatch(setArtwork(data.artwork));
                    navigation.navigate("AlbumPage", {
                        AlbumInfo: data
                    });
                }}>
                    <View style={styles.container}>
                        {data.artwork ? <Image
                            source={{
                                uri: data.artwork,
                            }}
                            style={styles.image}
                        ></Image> : null}

                        <View style={styles.box}>
                            <Text>{data.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };
    return getComponent();
};

export default AlbumItem;

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
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