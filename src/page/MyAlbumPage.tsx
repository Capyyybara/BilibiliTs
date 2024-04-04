// import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { useRoute, RouteProp } from '@react-navigation/native';
// import { RootStackParamList, MyAlbumMusicInfo, AlbumInfoItem, MusicInfoItem } from '../types';
// import { useEffect, useState } from 'react';
// import post from '../request';
// import bili from '../api/bilibili';
// import MusicList from '../component/MusicList';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { setArtwork, setMusicInfo, setPlay } from '../store/slice/PlayBarSlice';
// import { AntDesign } from "@expo/vector-icons";




// const MyAlbumPage = () => {
//     const route = useRoute<RouteProp<RootStackParamList, "MyAlbumPage">>();
//     const albumInfo = route.params?.albumInfo;
//     const [albumData, setAlbumData] = useState<MyAlbumMusicInfo[]>();
//     const [musicList, setMusicList] = useState<Array<MusicInfoItem>>([]);
//     const playBarSlice = useAppSelector(state => state.PlayBarSlice);
//     const dispatch = useAppDispatch();
//     useEffect(() => {
//         const fetchAlbumInfo = async () => {
//             if (albumInfo?.album_data == null) {
//                 const result = await post("/albumInfo/getMusic", {
//                     albumId: albumInfo?.album_id
//                 });
//                 setAlbumData(result.data.data as MyAlbumMusicInfo[]);
//             } else {
//                 let albumObj = JSON.parse(albumInfo.album_data) as AlbumInfoItem;

//                 const result = await bili.getAlbumInfo({
//                     bvid: albumObj.bvid,
//                     aid: albumObj.aid,
//                 });
//                 let fetchedMusicList = result.musicList as Array<MusicInfoItem>;

//                 if (fetchedMusicList.length > 1) {
//                     setMusicList(fetchedMusicList);
//                 } else {
//                     setMusicList([
//                         {
//                             aid: albumObj.aid,
//                             bvid: albumObj.bvid,
//                             duration: albumObj.duration,
//                             id: parseInt(albumObj.id),
//                             title: albumObj.title,
//                         },
//                     ]);
//                 }
//             }
//         };

//         fetchAlbumInfo();
//     }, [albumInfo]);

//     const renderMusicItems = () => {
//         if (albumData) {
//             return albumData.map((item, index) => (
//                 <TouchableOpacity key={index} onPress={() => {
//                     dispatch(setArtwork(item.artwork));
//                     dispatch(setMusicInfo(item));
//                     dispatch(setPlay(true));
//                 }}>
//                     <View style={styles.container}>

//                         <View style={styles.box}>
//                             <Text>{item.title}</Text>
//                         </View>
//                         <TouchableWithoutFeedback
//                             onPress={async () => {
//                                 post("/musicInfo/deleteMusic", {
//                                     musicId: item.music_id
//                                 });
//                                 const result = await post("/albumInfo/getMusic", {
//                                     albumId: albumInfo?.album_id
//                                 });
//                                 setAlbumData(result.data.data as MyAlbumMusicInfo[]);
//                             }}
//                         >
//                             <View style={styles.plus}>

//                                 <AntDesign
//                                     name="delete"
//                                     size={24}
//                                     color="black"
//                                 />
//                             </View>
//                         </TouchableWithoutFeedback>
//                     </View>
//                 </TouchableOpacity>
//             ));
//         }
//         return null;
//     };

//     return (
//         <View>
//             {renderMusicItems()}
//             {musicList && <MusicList data={musicList} />}
//         </View>
//     );
// };

// export default MyAlbumPage;

// const styles = StyleSheet.create({
//     container: {
//         height: 70,
//         alignItems: "center",
//         paddingLeft: 30,
//         paddingRight: 30,
//         flexDirection: "row"
//     },
//     image: {
//         height: 50,
//         width: 50,
//         marginRight: 10,
//         borderRadius: 3,
//     },
//     box: {
//         flex: 1,
//         // borderWidth: 1,
//         height: "100%",
//         flexDirection: "row",
//         alignItems: "center"
//     },
//     plus: {
//         right: 0,
//         top: -2,
//         justifyContent: "center",
//         height: "100%",
//         marginLeft: "5%",
//         marginRight: "5%"
//     },
// });
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, MyAlbumMusicInfo, AlbumInfoItem, MusicInfoItem } from '../types';
import { useEffect, useState } from 'react';
import post from '../request';
import bili from '../api/bilibili';
import MusicList from '../component/MusicList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setArtwork, setMusicInfo, setPlay } from '../store/slice/PlayBarSlice';
import { AntDesign } from "@expo/vector-icons";

const MyAlbumPage = () => {
    const route = useRoute<RouteProp<RootStackParamList, "MyAlbumPage">>();
    const albumInfo = route.params?.albumInfo;
    const [albumData, setAlbumData] = useState<MyAlbumMusicInfo[]>([]);
    const [musicList, setMusicList] = useState<Array<MusicInfoItem>>([]);
    const playBarSlice = useAppSelector(state => state.PlayBarSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchAlbumInfo = async () => {
            if (albumInfo?.album_data == null) {
                const result = await post("/albumInfo/getMusic", {
                    albumId: albumInfo?.album_id
                });
                setAlbumData(result.data.data as MyAlbumMusicInfo[]);
            } else {
                let albumObj = JSON.parse(albumInfo.album_data) as AlbumInfoItem;

                const result = await bili.getAlbumInfo({
                    bvid: albumObj.bvid,
                    aid: albumObj.aid,
                });
                let fetchedMusicList = result.musicList as Array<MusicInfoItem>;

                if (fetchedMusicList.length > 1) {
                    setMusicList(fetchedMusicList);
                } else {
                    setMusicList([
                        {
                            aid: albumObj.aid,
                            bvid: albumObj.bvid,
                            duration: albumObj.duration,
                            id: parseInt(albumObj.id),
                            title: albumObj.title,
                        },
                    ]);
                }
            }
        };

        fetchAlbumInfo();
    }, [albumInfo]);

    const handleDeleteMusic = async (musicId: number) => {
        await post("/musicInfo/deleteMusic", { musicId });

        const result = await post("/albumInfo/getMusic", {
            albumId: albumInfo?.album_id
        });
        setAlbumData(result.data.data as MyAlbumMusicInfo[]);
    };

    const renderMusicItems = () => {
        if (albumData) {
            return albumData.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    dispatch(setArtwork(item.artwork));
                    dispatch(setMusicInfo(item));
                    dispatch(setPlay(true));
                }}>
                    <View style={styles.container}>

                        <View style={styles.box}>
                            <Text>{item.title}</Text>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => handleDeleteMusic(item.music_id)}
                        >
                            <View style={styles.plus}>

                                <AntDesign
                                    name="delete"
                                    size={24}
                                    color="black"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            ));
        }
        return null;
    };

    return (
        <View>
            {renderMusicItems()}
            {musicList && <MusicList data={musicList} />}
        </View>
    );
};

export default MyAlbumPage;

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
    plus: {
        right: 0,
        top: -2,
        justifyContent: "center",
        height: "100%",
        marginLeft: "5%",
        marginRight: "5%"
    },
});