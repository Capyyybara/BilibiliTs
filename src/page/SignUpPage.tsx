import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../types';
import { useState } from 'react';
import post from '../request';
import { setShow } from '../store/slice/SnackbarSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Message from '../component/Message';

const SignUpPage = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [showPassword, setShowPassword] = useState(true);
    let [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const navigation = useNavigation<RootStackNavigation>();
    const [isError, setIsError] = useState(false);
    const dispatch = useAppDispatch();
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.message}>
                <Message></Message>
            </View>
            <View style={styles.inputBox}>
                <TextInput label="账号" error={isError} onChangeText={(value) => setUsername(value)}></TextInput>
                <TextInput error={isError} onChangeText={(value) => setPassword(value)} secureTextEntry={showPassword} label="密码" right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}></TextInput>
                <TextInput
                    error={isError}
                    onChangeText={(value) => setConfirmPassword(value)} secureTextEntry={showConfirmPassword}
                    label="确认密码"
                    right={<TextInput.Icon icon="eye" onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}>
                </TextInput>
                <View style={styles.btnBox}>
                    <Button mode="text" onPress={() => {
                        navigation.goBack();
                    }}>
                        取消
                    </Button>
                    <Button mode="contained" onPress={() => {
                        post("/userInfo/signUp", {
                            username,
                            password
                        }).then(result => {
                            if (result.data.status == "success") {
                                navigation.goBack();
                            } else {
                                dispatch(setShow(result.data.msg));
                            }
                        });
                    }}>
                        注册账号
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpPage;

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
    },
    btnBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    message: {
        position: "absolute",
        top: "5%",
        width: "100%"
    }
});