import { StyleSheet, Text, View } from 'react-native';
import bili from '../api/bilibili';
import post from '../request';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackNavigation, UserElementType, RootStackParamList, MusicInfoItem } from '../types';
import { getStorage } from '../storage/storage';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setShow } from '../store/slice/SnackbarSlice';
import Message from '../component/Message';
import { MusicInfoList } from '../types';
import MusicList from '../component/MusicList';


const SearchPage = () => {
    const snackbarSlice = useAppSelector(state => state.SnackbarSlice);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<RootStackNavigation>();
    const route = useRoute<RouteProp<RootStackParamList, "SearchPage">>();
    let user: UserElementType;

    const getUserInfo = async () => {
        user = await getStorage("user") as UserElementType;
    };
    const addHistory = async () => {
        await getUserInfo();
        post("/historyInfo/addHistory", {
            userId: user.user_id,
            content: route.params.searchQuery
        });
    };

    const [MusicInfoList, setMusicInfoList] = useState<Array<MusicInfoItem>>();
    const getMusicInfo = async () => {
        bili.search(route.params.searchQuery, 1, "album").then((result: MusicInfoList) => {
            setMusicInfoList(result.data);
        }).catch((error: Error) => {
            dispatch(setShow("网络错误"));
        });
    };

    useEffect(() => {
        addHistory();
        getMusicInfo();
    }, []);

    return (
        <View style={styles.container}>
            <Message></Message>
            {MusicInfoList ? <MusicList data={MusicInfoList}></MusicList> : null}
        </View>
    );
};

export default SearchPage;

const styles = StyleSheet.create({
    container: {}
});