import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getStorage, removeStorage } from '../storage/storage';
import { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../types';
import { Button, Searchbar } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setShow } from '../store/slice/SnackbarSlice';
import { useTheme } from 'react-native-paper';
import Message from '../component/Message';

const HomePage = () => {

  const snackbarSlice = useAppSelector(state => state.SnackbarSlice);
  let theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
        paddingTop: "10%",
        paddingBottom: "10%"
      },
      searchBox: {
        width: "80%",
      },
      messageBox: {
        position: "absolute",
        zIndex: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: snackbarSlice.show ? "flex" : "none",
      },
      message: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
      }
    });
  }, [theme, snackbarSlice]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation<RootStackNavigation>();
  const dispatch = useAppDispatch();

  const getUserInfo = async () => {
    let user = await getStorage("user") as null | object;
    if (!user) {
      navigation.replace("LoginPage");
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Message></Message>
      <View style={styles.searchBox}>
        <Searchbar
          placeholder='探索一下吧!'
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => navigation.navigate("SearchPage", { searchQuery })}
        ></Searchbar>
      </View>
      <Button onPress={() => {
        removeStorage("user");
        navigation.replace("LoginPage");
      }}>登出</Button>
    </ScrollView>
  );
};

export default HomePage;

