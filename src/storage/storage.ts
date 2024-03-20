import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = (name: string, data: any) => {
    let json = JSON.stringify(data);
    AsyncStorage.setItem(name, json);
};

export const getStorage = async (name: string) => {
    let json = await AsyncStorage.getItem(name);
    if (json) {
        return JSON.parse(json);
    } else {
        return null;
    }
};

export const removeStorage = (name: string) => {
    AsyncStorage.removeItem(name);
};