import 'react-native-gesture-handler';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/store';

import HomePage from './src/page/HomePage';
import LoginPage from './src/page/LoginPage';
import SearchPage from './src/page/SearchPage';

import { RootStackParamList } from './src/types';
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Provider store={store}>
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
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height
  },
});
