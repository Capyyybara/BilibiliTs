import { Audio } from "expo-av";
import { useEffect, useState, useRef } from "react";
import { Image, StyleSheet, Text, View, Modal } from 'react-native';
import { useAppSelector, useAppDispatch } from "../store/hooks";
import bilibili from "../api/bilibili";
import post from "../request";
import { Source, UserInfo } from "../types";
import { Feather } from "@expo/vector-icons";
import { setPlay, setMusicInfo, setArtwork } from "../store/slice/PlayBarSlice";
import { TouchableRipple } from "react-native-paper";
import { getStorage } from "../storage/storage";

const PlayBar = () => {
    const dispatch = useAppDispatch();
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);
    const [status, setStatus] = useState(0);
    const [visible, setVisible] = useState(false);
    const getSource = async () => {
        console.log(playBarSlice.musicInfo?.cid);

        const source = await bilibili.getMediaSource({
            aid: playBarSlice.musicInfo?.aid,
            bvid: playBarSlice.musicInfo?.bvid,
            cid: playBarSlice.musicInfo?.cid,
        },
            "low"
        ) as Source;
        return source;
    };

    const soundRef = useRef<Audio.Sound | null>(null);

    const playSound = () => {
        console.log(playBarSlice.musicInfo?.title);
        dispatch(setPlay(true));
        soundRef.current?.playAsync();
        console.log("开始播放");
    };

    const pauseSound = () => {
        dispatch(setPlay(false));
        soundRef.current?.pauseAsync();
        console.log("暂停播放");
    };

    const unloadSound = async () => {
        try {
            await soundRef.current?.unloadAsync();
            console.log("音乐卸载完成");
            setPlay(false);
        } catch (error) {
            console.log("Error unloading sound:", error);
            console.log("音乐卸载失败");
        }
    };

    const createSound = async () => {
        const musicInfo = await getSource();
        console.log("创建音乐");

        Audio.setAudioModeAsync({ staysActiveInBackground: true });

        const { sound } = await Audio.Sound.createAsync({
            headers: musicInfo.headers,
            uri: musicInfo.url,
        });

        sound.setOnPlaybackStatusUpdate((status: any) => {
            setStatus(status.positionMillis);
            if (status.isLoaded && status.didJustFinish) {
                console.log('音频已经播放完毕');
                dispatch(setPlay(false));
            }
        });

        soundRef.current = sound;

        if (playBarSlice.play) {
            playSound();
        }
    };

    const getLastMusicHistory = async () => {
        let userInfo = await getStorage("user") as null | UserInfo;
        let result = await post("/musicHistoryInfo/getLastMusicHistory", {
            userId: userInfo?.user_id
        });
        dispatch(setMusicInfo(result.data.data[0]));
        dispatch(setArtwork(result.data.data[0].artwork));
    };

    const addMusicHistory = async () => {

        if (playBarSlice.play) {
            let user = await getStorage("user");
            post("musicHistoryInfo/addMusicHistory", { ...playBarSlice.musicInfo, artwork: playBarSlice.artwork, userId: user.user_id });
        }
    };

    useEffect(() => {
        if (playBarSlice.musicInfo?.cid != null) {
            createSound();
        }
        addMusicHistory();
        return () => {
            unloadSound();
        };
    }, [playBarSlice.musicInfo]);

    useEffect(() => {
        getLastMusicHistory();
    }, []);

    const [width, setWidth] = useState<number>();
    const [size, setSize] = useState<number>();
    const [modalImage, setModalImage] = useState<number>();

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
            marginTop: size,
            borderRadius: 5
        },
        box: {
            flex: 1,
            height: "100%",
            width: "auto",
            marginRight: size,
            marginTop: size,
            marginBottom: size,
            flexDirection: "row"
        },
        btnBox: {
            height: "100%",
            flexDirection: "row",
            alignItems: "center"
        },
        contentBox: {
            flex: 1,
            borderWidth: 1,
        },
        modal: {
            height: "100%",
            width: "100%",
            backgroundColor: "#FFFBFF",
            position: "absolute",
            bottom: 0,
            elevation: 70,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 30,
            alignItems: "center"
        },
        modalImage: {
            height: "30%",
            width: modalImage,
            marginTop: 50,
            borderRadius: 5,
        },
        text: {
            height: 100,
            width: 100
        }
    });

    return (
        <View style={styles.playBar}
            onLayout={(e) => {
                setSize(e.nativeEvent.layout.height * 0.1);
            }}>
            <TouchableRipple
                rippleColor="rgba(0, 0, 0, .32)"
                onPress={() => {
                    setVisible(true);
                }}
            >
                {playBarSlice.artwork ? (
                    <Image
                        source={{
                            uri: playBarSlice.artwork,
                        }}
                        style={styles.image}
                        onLayout={(e) => {
                            setWidth(e.nativeEvent.layout.height);
                        }}
                    />
                ) : <View />}
            </TouchableRipple>
            <View style={styles.box}>
                <View style={styles.contentBox}><Text>{status}</Text></View>
                <View style={styles.btnBox}>
                    <Feather name="skip-back" size={30} color="black" />
                    {playBarSlice.play ? (
                        <Feather
                            name="pause-circle"
                            size={30}
                            color="black"
                            onPress={() => pauseSound()}
                        />
                    ) : (
                        <Feather
                            name="play-circle"
                            size={30}
                            color="black"
                            onPress={() => playSound()}
                        />
                    )}
                    <Feather name="skip-forward" size={30} color="black"
                        onPress={() => {
                            soundRef.current?.getStatusAsync().then(status => {
                                if (status.isLoaded) {
                                    const newPosition = status.positionMillis + 5000;
                                    soundRef.current?.setPositionAsync(newPosition);
                                }
                            });
                        }}
                    />
                </View>
            </View>
            <Modal
                hardwareAccelerated
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modal}>
                    <Image
                        source={{
                            uri: playBarSlice.artwork
                        }}
                        onLayout={(e) => setModalImage(e.nativeEvent.layout.height)}
                        style={styles.modalImage}
                        resizeMethod="resize"
                        resizeMode="cover"
                    ></Image>
                    <Text numberOfLines={1} style={styles.text}>{playBarSlice.musicInfo?.title}</Text>
                </View>
            </Modal>
        </View>
    );
};

export default PlayBar;
