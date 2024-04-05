import { StyleSheet, FlatList } from 'react-native';
import MusicItem from './MusicItem';
import { MusicInfoItem } from '../types';

const MusicList = ({ data }: { data: MusicInfoItem[]; }) => {
    return (
        <FlatList data={data} renderItem={(item) => {
            return <MusicItem data={item.item} albumInfo={data} key={item.index}></MusicItem>;
        }}></FlatList>
    );
};
export default MusicList;

const styles = StyleSheet.create({});