import { combineReducers } from 'redux';
import menuReducer from './menu-reducer';
import commonReducer from './common-reducer';

const allReducers = {
    menu:menuReducer,
    common:commonReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;