import axios from 'axios';

const SET_SCHEDULE = "tsu/SET_SCHEDULE";
const TOGGLE_IS_LOADING = "tsu/TOGGLE_IS_LOADING";

const sepDay = new Date (2020, 8, 1);

const getWeekNum = () => {
    let nowDate = new Date();
    return Math.ceil(((nowDate.getDate() + nowDate.getMonth() * 30) - (1 + 8 * 30))/7)
}

let initialState = {
    schedule: null,
    isLoading: false,
    date: "",
    weekNum: getWeekNum(),
    myGroups: [931804, 93180]
}

const tsuReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCHEDULE:{
            return {
                ...state,
                schedule: action.schedule,
                weekNum: action.weekNum,
                date: action.date
            }
        }
        case TOGGLE_IS_LOADING: {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }
        
        default:
            return state
    }
}

export const setSchedule = (schedule, weekNum, date) => {
    return {
        type: SET_SCHEDULE,
        schedule,
        weekNum,
        date
    }
}

export const setIsLoading = () => {
    return {
        type: TOGGLE_IS_LOADING
    }
}

const groupsIds = {
    93180 : 36426,
    931801 : 36427,
    931802 : 36428,
    931803 : 36429,
    931804 : 36430
}

export const getSchedule = (groupid, weekNum) => {
    return async (dispatch) => {
        dispatch(setIsLoading());
        await axios.get(`http://schedule.tsu.ru/students_schedule?faculty_id=243&group_id=${groupsIds[groupid]}&week_num=${weekNum}`)
        .then(data => {
            let date = data.data.match(/\d\d\.\d\d\.\d\d\d\d - \d\d\.\d\d\.\d\d\d\d/)[0]

            let html = data.data.split('<div class="weekday_line');
            html.shift()
            
            let datas = [];
            html[5] = html[5].split('Список групп')[0];
            const typesOfLessons = {
                "#ff0000;" : "lection",
                "#ffa200;" : "seminar",
                "#2ec4e4;" : "lab",
                "#296d90;" : "practic"
            }
            let labelRegxp = (/<label>([\s\S]*?)<\/label>/)
            let groupRegxp = (/<div class="groups">(\d{1,}[\s\S]?\d{1,}?[\s\S]?\/?[\s\S]{1,5})<\/div>/)
            let roomRegxp = (/<div class="au1 auditories">(\d{1,6}?|[\s\S]{1,8})<\/div>/)
            let colorRegxp = (/#[\s\S]{1,}?;/)

            
            html.map(w => { 
                let schedule = w.split('class="lessons_cell');
                schedule.shift()
                let mas = [];
                schedule.forEach(s =>{
                    if(s.length < 200) {
                        mas.push({name: null})
                        return
                    }
                   
                    mas.push({
                        name: s.match(labelRegxp)[1],
                        group: s.match(groupRegxp)[1],
                        room: s.match(roomRegxp)[1],
                        type: typesOfLessons[s.match(colorRegxp)[0]]
                    })
                })
                datas.push(mas)
            })
            dispatch(setSchedule(datas, weekNum, date)) 
            dispatch(setIsLoading());
        }
    )}
}

export default tsuReducer;