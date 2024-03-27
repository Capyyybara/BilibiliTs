import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import AlbumItem from './AlbumItem';
import { AlbumInfoItem } from '../types';

const AlbumList = ({ data }: { data: AlbumInfoItem[]; }) => {
    return (
        <FlatList data={data} renderItem={(item) => {
            return <AlbumItem data={item.item}></AlbumItem>;
        }}></FlatList>
    );
};

export default AlbumList;