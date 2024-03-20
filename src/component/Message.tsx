import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useTheme } from 'react-native-paper';
import { useEffect, useRef } from 'react';
import { setShow } from '../store/slice/SnackbarSlice';

const Message = () => {
    const dispatch = useAppDispatch();
    const snackbarSlice = useAppSelector(state => state.SnackbarSlice);
    let theme = useTheme();

    const styles = StyleSheet.create({
        messageBox: {
            position: "absolute",
            marginTop: 20,
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

    useEffect(() => {
        let timerRef: any;
        if (snackbarSlice.show) {
            timerRef = setTimeout(() => {
                dispatch(setShow(""));
            }, 2000);
        }

        return () => {
            clearTimeout(timerRef);
        };
    }, [snackbarSlice.show]);

    return (
        <View style={[styles.messageBox, { display: snackbarSlice.show ? 'flex' : 'none' }]}>
            <View style={styles.message}><Text style={{ fontSize: 16 }}>{snackbarSlice.message}</Text></View>
        </View>
    );
};

export default Message;