import {Text, View } from 'native-base';
import React from 'react';
import HeaderPage from '../Header/HeaderPage';
import BackgroundImageTsu from '../BackgroundImageTsu/BackgroundImageTsu';

const Home = (props) => {
    return (
        <>
            <HeaderPage navigation={props.navigation} />
            <BackgroundImageTsu />
        </>
        
    )
}

export default Home;