import { Button, Spinner, Tab, Tabs, Text, View } from 'native-base';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getSchedule } from '../../redux/tsu-reducer';
import HeaderPage from '../Header/HeaderPage';
import BackgroundImageTsu from '../BackgroundImageTsu/BackgroundImageTsu';
import { StyleSheet } from 'react-native';
import ScheduleWeek from '../ScheduleWeek/ScheduleWeek';

const weeks = ["Пн","Вт","Ср","Чт","Пт","Сб"];

const Schedule = React.memo((props) => {

    const dispatch = useDispatch();
    const schedule = useSelector(state => state.tsu.schedule);
    const date = useSelector(state => state.tsu.date);
    const weekNum = useSelector(state => state.tsu.weekNum);
    const loading = useSelector(state => state.tsu.isLoading);

    useEffect(() => {
        dispatch(getSchedule(props.route.params.group, weekNum));
    },[props.route.params.group])
    
    return (
        <>
            <HeaderPage navigation={props.navigation} />
            <BackgroundImageTsu />  

            {loading ?
                <Spinner color="blue"/> 
            :
            <>
                <Tabs style={styles.tabs}>
                    {
                        weeks.map((w,count) => 
                            <Tab key={count} heading={w} tabStyle={styles.tab} textStyle={styles.tabText} activeTabStyle={styles.active} activeTextStyle={styles.activeText}>
                                <Text style={styles.dateText}>{date}</Text>
                                <ScheduleWeek schedule={schedule && schedule[count] } />
                            </Tab>    
                        )
                    }
                </Tabs>

               
                

                <View style={styles.bottom}>
                    <Button style={styles.buttonBlue} onPress={ () => dispatch(getSchedule(props.route.params.group, weekNum-1)) }>
                        <Text>Пред. неделя</Text>
                    </Button>

                    <Button style={styles.buttonBlue} onPress={ () => dispatch(getSchedule(props.route.params.group, weekNum+1)) }>
                        <Text>След. неделя</Text>
                    </Button>
                </View>
            </>
            }
        </>
    )
})

const styles = StyleSheet.create({
    tab:{
        backgroundColor:'rgb(12,98,167)'
    },
    tabText:{
        color:'white'
    },
    activeText:{
        color:'rgb(12,98,167)'
    },
    active:{
        backgroundColor:'white'
    },
    bottom:{
        position:'absolute',
        bottom:0,
        flex:1,
        flexDirection:"row",
        width:'100%',
        justifyContent:'space-between'
    },
    buttonBlue:{
        backgroundColor:'rgb(12,98,167)'
    },
    dateText:{
        fontSize:14,
        padding:4
    }
});

export default Schedule