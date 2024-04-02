import { StyleSheet, Text, View } from 'react-native';
import bili from '../api/bilibili';
import post from '../request';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackNavigation, UserElementType, RootStackParamList, AlbumInfoItem, MusicInfoItem } from '../types';
import { getStorage } from '../storage/storage';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setShow } from '../store/slice/SnackbarSlice';
import Message from '../component/Message';
import { AlbumInfoList } from '../types';
import AlbumList from '../component/AlbumList';


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
        }).catch(() => console.log("历史出错"));
    };

    const [MusicInfoList, setMusicInfoList] = useState<Array<AlbumInfoItem>>();
    const getMusicInfo = async () => {
        bili.search(route.params.searchQuery, 1, "album").then((result: AlbumInfoList) => {
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
            {MusicInfoList ? <AlbumList data={MusicInfoList}></AlbumList> : null}
        </View>
    );
};

export default SearchPage;

const styles = StyleSheet.create({
    container: {
        paddingTop: "10%",
        // paddingBottom: "5%",
        marginBottom: 75

    }
});