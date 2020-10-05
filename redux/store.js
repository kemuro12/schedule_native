import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import tsuReducer from './tsu-reducer';

let reducers = combineReducers({
    tsu: tsuReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;