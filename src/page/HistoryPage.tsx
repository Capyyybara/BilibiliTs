import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import post from '../request';
import { useEffect, useState } from 'react';
import { MusicHistory } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMusicInfo, setPlay, setArtwork } from '../store/slice/PlayBarSlice';
import { getStorage } from '../storage/storage';

const HistoryPage = () => {
    const [history, setHistory] = useState<MusicHistory[]>();

    const getHistory = async () => {
        let user = await getStorage("user");
        post("/musicHistoryInfo/getAllHisotry", {
            userId: user.user_id
        }).then((result: any) => {
            setHistory(result.data.data);
        });
    };
    useEffect(() => {
        getHistory();
    }, []);
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);

    const dispatch = useAppDispatch();
    return (
        <ScrollView>
            {history ? history.map((data, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => {
                        if (playBarSlice.musicInfo?.cid != data.cid) {
                            dispatch(setMusicInfo(data));
                            dispatch(setPlay(true));
                            dispatch(setArtwork(data.artwork));
                        }
                    }}>
                        <View style={styles.container}>
                            <View style={styles.box}>
                                <Text>{data.title}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }) : null}
        </ScrollView>
    );
};

export default HistoryPage;

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: "row"
    },
    box: {
        flex: 1,
        // borderWidth: 1,
        height: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
});