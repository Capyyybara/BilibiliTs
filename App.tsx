import 'react-native-gesture-handler';
import { StyleSheet, View, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/store';
import PlayBar from './src/component/PlayBar';
import DrawItem from './src/component/DrawItem';

import HomePage from './src/page/HomePage';
import LoginPage from './src/page/LoginPage';
import SearchPage from './src/page/SearchPage';
import AlbumPage from './src/page/AlbumPage';
import MyAlbumPage from './src/page/MyAlbumPage';
import HistoryPage from './src/page/HistoryPage';

import { RootStackParamList } from './src/types';
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <PlayBar></PlayBar>
          <NavigationContainer>
            <StatusBar barStyle={'light-content'} ></StatusBar>
            <Stack.Navigator initialRouteName='HomePage' screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: "#FFFBFF"
              }
            }}>
              <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
              <Stack.Screen name='LoginPage' component={LoginPage}></Stack.Screen>
              <Stack.Screen name='SearchPage' component={SearchPage}></Stack.Screen>
              <Stack.Screen name='AlbumPage' component={AlbumPage}></Stack.Screen>
              <Stack.Screen name='MyAlbumPage' component={MyAlbumPage}></Stack.Screen>
              <Stack.Screen name='HistoryPage' component={HistoryPage}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
          <DrawItem></DrawItem>
        </View>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  },
});
