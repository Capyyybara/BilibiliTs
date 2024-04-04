import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { AlbumInfoItem, UserInfo } from '../types';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../types';
import { useAppDispatch } from '../store/hooks';
import { setArtwork } from '../store/slice/PlayBarSlice';
import { Feather } from "@expo/vector-icons";
import { getStorage } from '../storage/storage';
import post from '../request';

const AlbumItem = ({ data }: { data: AlbumInfoItem; }) => {
    const navigation = useNavigation<RootStackNavigation>();
    const dispatch = useAppDispatch();

    const getComponent = () => {
        if (data.bvid == "") {
            return null;
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    console.log(data.artwork);

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
                            <Text numberOfLines={2}>{data.title}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={async () => {
                            let user = await getStorage("user") as UserInfo;
                            post("/albumInfo/addAlbum", {
                                albumName: data.title,
                                userId: user.user_id,
                                albumData: JSON.stringify(data)
                            });
                        }}>
                            <View style={styles.plus}>
                                <Feather name="plus-square" size={22} color="black" />
                            </View>
                        </TouchableWithoutFeedback>
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