import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Accordion, ActionSheet, Badge, Form, Icon, Input, Item, List, ListItem, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {setItemStorage, getItemStorage, removeItemStorage, clearItemStorage} from '../../localStorage/localStorage';

const dataArray = [
    {title:"Расписание", content: "Pizda 1"},
]

const BUTTONS = [
    {
        text: "Удалить", icon: "trash", iconColor:'red'
    }, 
    {
        text: "Закрыть", icon: "close", iconColor:'grey'
    }];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;


const DrawerBar = (props) => {
    console.log("DRAWER RENDER")
    const [inputValue, setInputValue] = useState("");
    const [myGroups, setMyGroups] = useState([]);

    useEffect(()=>{
        getItemStorage("myGroups").then(g => {
            if(g) setMyGroups(JSON.parse(JSON.parse(g)))
        });
    },[])
    
    const onAddGroup = () => {
        setMyGroups([...myGroups, +inputValue]);
        setItemStorage("myGroups", JSON.stringify([...myGroups, +inputValue]))
        setInputValue("");
    }

    const onDeleteGroup = (g) => {
        setMyGroups(myGroups.filter(mg => mg !== g))
        setItemStorage("myGroups", JSON.stringify(myGroups.filter(mg => mg !== g)))
    }
    
    return (
        <DrawerContentScrollView {...props}>
            
            <DrawerItem label="Главная" icon={
                ({focused, color, size}) => <Icon name="home" style={{fontSize:size, color:color}}/>} 
                onPress={() => props.navigation.navigate('Главная')}
            />

            <Accordion dataArray={dataArray} renderContent={() => 
                <List>
                    
                    {myGroups ? 
                    
                    myGroups.map((g,counter) => <ListItem key={counter} style={styles.listItemLeft} onPress={() => props.navigation.navigate('Расписание',{group: g})} onLongPress={() => ActionSheet.show({
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: `Управление '${g}'`
                            },
                            buttonIndex => {
                                if(buttonIndex === 0){
                                    onDeleteGroup(g)
                                }else return;
                            })}>
                        <Text style={styles.listItemLeftText} >
                            {g}
                        </Text>
                    </ListItem>)
                    : null}

                    <View>
                        <Form>
                            <Item style={styles.item} onPress={onAddGroup}>
                                <Input placeholder="Номер Группы" value={inputValue} onChangeText={text => setInputValue(text)} style={styles.input}/>

                                <Badge success style={styles.addBudge} >
                                    <Icon name="add" style={styles.add} />
                                </Badge>
                            </Item>
                        </Form>
                    </View>
     
                </List>} 
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    listItem: {
      width:'100%',
      color:'green',
      paddingLeft:20,
      marginLeft:-1
    },
    listItemLeft:{
        marginLeft:0,
        width:'100%'
    },  
    listItemLeftText:{
        marginLeft:15
    },
    text:{
        fontSize:19
    },
    input:{
        marginRight:15,
        marginLeft:10
    },
    add:{
        color: 'white',
        fontSize:32
    },
    item:{
        width:'100%',
        marginLeft:0
    },
    addBudge:{
        width:32,
        borderRadius:100,
        height:32,
        marginRight:8,
        marginTop:9,
        zIndex:300
    }
  });

export default DrawerBar;