import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import React from 'react';

const HeaderPage = (props) => {
    return (
        <Header style={{backgroundColor:'rgb(12,98,167)'}}>

            <Left>
                <Button transparent onPress={ props.navigation.openDrawer }>
                    <Icon name='menu' />
                </Button>
            </Left>

            <Body>
                <Title style={{width:200}}>Расписание ТГУ</Title>
            </Body>

            <Right>
                
            </Right>
            
        </Header>
    )
}

export default HeaderPage