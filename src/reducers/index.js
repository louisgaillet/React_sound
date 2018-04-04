import { combineReducers } from 'redux';
import data_reducer from './reducer_data'

const rootReducer = combineReducers({
    data : data_reducer
});

export default rootReducer;
