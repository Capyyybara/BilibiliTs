import { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import post from '../request';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../types';
import { setStorage } from '../storage/storage';


const LoginPage = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation<RootStackNavigation>();
    const [isError, setIsError] = useState(false);

    const login = () => {
        post("/userInfo/login", {
            username,
            password
        }).then(result => {
            if (result.data.status == "success") {
                setStorage("user", result.data.data as object);
                navigation.navigate("HomePage");
            } else {
                setIsError(true);
            }
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.inputBox}>
                <TextInput label="账号" error={isError} onChangeText={(value) => setUsername(value)}></TextInput>
                <TextInput error={isError} onChangeText={(value) => setPassword(value)} secureTextEntry={showPassword} label="密码" right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}></TextInput>
                <Button mode='contained' onPress={() => login()}>登录</Button>
            </View>
        </ScrollView>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%",
        paddingBottom: "10%"
    },
    inputBox: {
        width: '70%',
        marginTop: 200,
        height: 300,
        justifyContent: "space-around"
    }
});