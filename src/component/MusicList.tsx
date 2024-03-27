import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import MusicItem from './MusicItem';
import { MusicInfoItem } from '../types';

const MusicList = ({ data }: { data: MusicInfoItem[]; }) => {

    return (
        <FlatList data={data} renderItem={(item) => {
            return <MusicItem data={item.item}></MusicItem>;
        }}></FlatList>
    );
};

export default MusicList;

const styles = StyleSheet.create({});