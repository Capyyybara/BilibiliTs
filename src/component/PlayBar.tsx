import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppSelector, useAppDispatch } from "../store/hooks";
import bilibili from "../api/bilibili";
import { Source } from "../types";

const PlayBar = () => {
    const dispatch = useAppDispatch();
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);
    const getSource = async () => {
        const source = await bilibili.getMediaSource({
            aid: playBarSlice.musicInfo?.aid,
            bvid: playBarSlice.musicInfo?.bvid,
            cid: playBarSlice.musicInfo?.cid,
        },
            "low"
        ) as Source;
        return source;
    };
    let Sound: Audio.Sound;
    const createSound = async () => {
        const musicInfo = await getSource();
        Audio.setAudioModeAsync({ staysActiveInBackground: true });
        const { sound } = await Audio.Sound.createAsync({
            headers: musicInfo.headers,
            uri: musicInfo.url.url,
        });
        console.log("bbb");
        Sound = sound;

        sound.playAsync().then(() => {
            console.log("ccc");
        }).catch(() => {
            console.log("播放错误");

        });
    };

    useEffect(() => {
        console.log("aaa");

        createSound();
        // Sound.playAsync();
        return () => {
            // Sound.unloadAsync();
        };
    }, [playBarSlice.musicInfo]);
    const [width, setWidth] = useState<number>();
    const [size, setSize] = useState<number>();


    const styles = StyleSheet.create({
        playBar: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 75,
            borderTopWidth: 1,
            borderColor: "#f5f5f5",
            zIndex: 100,
            backgroundColor: "white",
            justifyContent: "center",
            flexDirection: "row"
        },
        image: {
            height: '80%',
            width,
            marginLeft: size,
            marginRight: size,
            marginTop: size
        },
        box: {
            flex: 1,
            borderWidth: 1,
            height: "100%",
            width: "auto",
            marginRight: size,
            marginTop: size
        }
    });
    return (
        <View style={styles.playBar}
            onLayout={(e) => {
                setSize(e.nativeEvent.layout.height * 0.1);
            }}>
            {playBarSlice.artwork ? <Image
                source={{
                    uri: playBarSlice.artwork,
                }}
                style={styles.image}
                onLayout={(e) => {
                    setWidth(e.nativeEvent.layout.height);
                }}
            ></Image> : null}
            <View style={styles.box}>

            </View>
        </View>
    );
};

export default PlayBar;
