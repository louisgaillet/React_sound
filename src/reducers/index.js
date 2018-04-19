import { combineReducers } from 'redux';
import data_reducer from './reducer_data'
import currentList from './reducer_add-current-list'
import player_reducer from './reducer_player'
import currentSong from './reducer_current-song'

const rootReducer = combineReducers({
    data : data_reducer,
    currentList : currentList,
    currentSong : currentSong,
    player : player_reducer
});

export default rootReducer;
