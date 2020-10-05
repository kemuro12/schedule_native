import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home/Home';
import Schedule from './components/Schedule/Schedule';
import DrawerBar from './components/DrawerBar/DrawerBar';
import { Icon } from 'native-base';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Root } from "native-base";

const App = (props)=>{
  const [loaded] = Font.useFonts({
    Roboto_medium: require('./assets/RobotoMedium.ttf'),
  }); 

  const Drawer = createDrawerNavigator();

  if(!loaded) return <AppLoading />
  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={ props => <DrawerBar {...props} /> } initialRouteName="Schedule" >
            <Drawer.Screen name="Главная" component={Home} />
            <Drawer.Screen name="Расписание" component={Schedule} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    </Root>
    
  );
}

export default App;