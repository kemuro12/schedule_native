import { AsyncStorage } from 'react-native';

export const setItemStorage = async (key, value) => {
    try{
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch(e) {
        console.log(e)
    }
}

export const getItemStorage = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key);
        if (value !== null) return value;
    } catch(e) {
        console.log(e)
    }
}

export const removeItemStorage = async (key) => {
    try{
        await AsyncStorage.removeItem(key);
    } catch(e) {
        console.log(e)
    }
}

export const clearItemStorage = async () => {
    try{
        await AsyncStorage.clear();
    } catch(e) {
        console.log(e)
    }
}