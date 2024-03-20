import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MusicInfoItem } from '../types';

const MusicItem = ({ data }: { data: MusicInfoItem; }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: data.artwork,
                    }}
                    style={styles.image}
                ></Image>
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