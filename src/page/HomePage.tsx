import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Modal, TouchableHighlight, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { getStorage, removeStorage } from '../storage/storage';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackNavigation, UserInfo, AlbumInfo } from '../types';
import { Button, Searchbar } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setShow } from '../store/slice/SnackbarSlice';
import { useTheme } from 'react-native-paper';
import Message from '../component/Message';
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import post from '../request';
import { setUserInfo } from '../store/slice/UserInfoSlice';
import { setAlbumInfo } from '../store/slice/AlbumSlice';

const HomePage = () => {
  const snackbarSlice = useAppSelector(state => state.SnackbarSlice);
  const [modal, setModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  let theme = useTheme();
  const [album, setAlbum] = useState<string>();
  const [user, setUser] = useState<UserInfo>();
  const [albumId, setAlbumId] = useState<number>();
  const albumSlice = useAppSelector(state => state.AlbumSlice);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
        paddingTop: "10%",
        paddingBottom: "10%"
      },
      text: {
        fontSize: 16,
        width: "80%"
      },
      searchBox: {
        width: "80%",
        marginLeft: "10%"
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
      },
      btnBox: {
        // borderWidth: 1,
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
        height: 80,

      },
      btn: {
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(178,178,178,0.3)",
      },
      modal: {
        height: 200,
        width: 300,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 10,
        elevation: 15
      },
      albumName: {
        width: 250,
        height: 35,
        borderWidth: 1,
        borderColor: "#dbdde1",
        marginTop: 40,
        paddingLeft: 10,
      },
      btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        position: "absolute",
        bottom: 0,
        height: 50,
        borderColor: "#dbdde1",
      },
      enter: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
      },
      cancel: {
        borderRightWidth: 1,
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#dbdde1",
      },
      albumBox: { width: "100%", alignItems: "center" },
      albumContent: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#E9DFEB"
      },
      albumItem: {
        height: 60,
        justifyContent: "space-between",
        paddingLeft: "10%",
        paddingRight: "10%",
        borderTopWidth: 1,
        borderTopColor: "#E9DFEB",
        flexDirection: "row",
        alignItems: "center"
      },
      icon: {
        // width: "auto"
      }
    });
  }, [theme, snackbarSlice]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation<RootStackNavigation>();
  const dispatch = useAppDispatch();

  const getAllAlbumInfo = async (userInfo: UserInfo) => {
    await post("/albumInfo/getAllAlbum", {
      userId: userInfo.user_id
    }).then((result) => {
      dispatch(setAlbumInfo(result.data.data));
    });
  };

  const getUserInfo = async () => {
    let userInfo = await getStorage("user") as null | UserInfo;
    if (!userInfo) {
      navigation.replace("LoginPage");
    } else {
      dispatch(setUserInfo(userInfo)!);
      setUser(userInfo);
      getAllAlbumInfo(userInfo);
    }
  };

  useFocusEffect(useCallback(() => {
    getUserInfo();
  }, []));

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <View style={styles.container}>
      <Message></Message>
      <View style={styles.searchBox}>
        <Searchbar
          placeholder='探索一下吧!'
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => navigation.navigate("SearchPage", { searchQuery })}
        ></Searchbar>
      </View>
      <View style={styles.btnBox}>
        <TouchableWithoutFeedback onPress={async () => {


        }} >
          <View style={styles.btn}>
            <AntDesign name="heart" size={24} color="#ff6666" />
            <Text>喜欢</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {

        }}>
          <View style={styles.btn}>
            <AntDesign
              name="clockcircleo"
              size={24}
              color="black"
            />
            <Text>历史</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { setModal(true); }}>
          <View style={styles.btn}>
            <AntDesign
              name="plussquareo"
              size={24}
              color="black"
            />
            <Text>创建</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.albumBox}>
        {albumSlice.albumInfo ? <FlatList data={albumSlice.albumInfo} style={styles.albumContent} renderItem={(item) => {
          return (
            <TouchableOpacity onPress={() => { }}>
              <View style={styles.albumItem}>
                <Text numberOfLines={1} style={styles.text}>{item.item.album_name}</Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setAlbumId(item.item.album_id);
                    setVisible(true);
                  }}
                >
                  <View style={styles.icon}>
                    <AntDesign
                      name="delete"
                      size={24}
                      color="black"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          );
        }}></FlatList> : null}
      </View>
      <Button onPress={() => {
        removeStorage("user");
        navigation.replace("LoginPage");
      }}>登出</Button>
      <Modal
        animationType="none"
        onRequestClose={() => setModal(false)}
        visible={modal}
        hardwareAccelerated={true}
        transparent={true}
        style={styles.modalContainer}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {/* <KeyboardAvoidingView behavior="height"> */}
          <View style={styles.modal}>
            <View>
              <TextInput
                style={styles.albumName}
                value={album}
                placeholder='请输入歌单名'
                onChangeText={(value) => {
                  setAlbum(value);
                }}
              ></TextInput>
            </View>
            <View style={styles.btnContainer}>
              <TouchableHighlight
                activeOpacity={0.6}
                style={styles.cancel}
                onPress={() => {
                  setModal(false);
                }}
                underlayColor="#DDDDDD"
              >
                <Text>取消</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.6}
                style={styles.enter}
                onPress={() => {
                  post("/albumInfo/addAlbum", {
                    albumName: album,
                    userId: user!["user_id"]
                  }).then(() => {
                    getUserInfo();
                    setModal(false);
                    setAlbum("");
                  });
                }}
                underlayColor="#DDDDDD"
              >
                <Text>确定</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal >
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>删除歌单</Dialog.Title>
          <Dialog.Content>
            <Text>确定要删除该歌单吗</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              post("/albumInfo/deleteAlbum", { albumId }).then(() => {
                getAllAlbumInfo(user!);
              });

              setVisible(false);
            }}>确定</Button>
            <Button onPress={() => setVisible(false)}>取消</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default HomePage;

