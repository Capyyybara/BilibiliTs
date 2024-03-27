import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AlbumInfoItem, MusicInfoItem, RootStackParamList } from '../types';
import bili from '../api/bilibili';
import MusicList from '../component/MusicList';
import { useEffect, useState } from 'react';

const AlbumPage = () => {
    const route = useRoute<RouteProp<RootStackParamList, "AlbumPage">>();
    const [musicList, setMusicList] = useState<Array<MusicInfoItem>>();
    useEffect(() => {
        bili.getAlbumInfo({
            bvid: route.params.AlbumInfo.bvid,
            aid: route.params.AlbumInfo.aid,
        }).then((result: any) => {
            let musicList = result.musicList as Array<MusicInfoItem>;
            if (result.musicList.length > 1) {
                setMusicList(musicList);
            } else {
                setMusicList([{
                    aid: route.params.AlbumInfo.aid,
                    bvid: route.params.AlbumInfo.bvid,
                    duration: route.params.AlbumInfo.duration,
                    id: parseInt(route.params.AlbumInfo.id),
                    title: route.params.AlbumInfo.title,
                }]);
            }
        }).catch(() => {
            console.log("歌单请求出错");
        });
    }, []);



    return (
        <View style={styles.container}>
            {musicList ? <MusicList data={musicList}></MusicList> : null}
        </View>
    );
};

export default AlbumPage;

const styles = StyleSheet.create({
    container: {
        paddingTop: "10%",
        paddingBottom: "10%"
    }
});