import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text, View } from 'native-base';

const BackgroundImageTsu = (props) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/tsu.png')}
                style={styles.image}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      position:'absolute',
      width:'100%'
    },
    image: {
        width:240,
        resizeMode:'contain'
    }
});

export default BackgroundImageTsu;