import { Card, List, ListItem, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const times = ["8:45 - 10:20", "10:35 - 12:10", "12:25 - 14:00", "14:45 - 16:20", "16:35 - 18:10", "18:25 - 20:00","20:15 - 21:50"]
const colorsOfTypes = {
    "lection" : {backgroundColor:"red"},
    "lab" : {backgroundColor:"rgb(46,196,228)"},
    "practic" : {backgroundColor:"rgb(41,109,144)"},
    "seminar" : {backgroundColor:"rgb(255,162,0)"}
}

const ScheduleWeek = (props) => {
    return (
        <Card>
            <List>
                {props.schedule && props.schedule.map((s,count) => 
                    <ListItem key={count} style={styles.listItem}>
                        <Text style={styles.times}>{times[count]}</Text>
                        <Text style={styles.room}>{s.room}</Text>
                        <Text style={styles.name}>{s.name}</Text>
                        <Text style={styles.group}>{s.group}</Text>
                        <View style={[styles.type, colorsOfTypes[s.type]]}>
                            <View style={styles.contr}></View>
                        </View>
                    </ListItem>
                )}
            </List>
            
        </Card>
    )
}

const styles = StyleSheet.create({
    listItem:{
        marginLeft:0
    },
    name:{
        paddingLeft:15
    },
    times:{
        position:'absolute',
        fontSize:10,
        top:0,
        left:3,
        color:'grey'
    },
    room:{
        position:'absolute',
        fontSize:12,
        bottom:0,
        right:5,
        color:'grey'
    },
    type:{
        position:'absolute',
        fontSize:12,
        top:0,
        right:0,
        width:15,
        height:15
    },
    group:{
        position:'absolute',
        fontSize:10,
        bottom:0,
        left:3,
        color:'grey'
    },
    contr:{
        position:'absolute',
        backgroundColor:'white',
        top:6,
        right:-1,
        width:23,
        height:12,
        transform:[{rotate: '45deg'}]
    }
});

export default ScheduleWeek;