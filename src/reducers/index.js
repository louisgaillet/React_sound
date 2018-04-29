import { combineReducers } from 'redux';
import data_reducer from './reducer_data'
import currentList from './reducer_add-current-list'
import player_reducer from './reducer_player'
import currentSong from './reducer_current-song'
import * as user from './reducer_account'
import * as playlist from './reducer_playlist'

const rootReducer = combineReducers({
    data : data_reducer,
    currentList : currentList,
    currentSong : currentSong,
    player : player_reducer,
    connected : user.isConnected,
    user : user.getUser,
    createPlaylist : playlist.createPlaylist,
    playlists : playlist.getPlaylists,
    addToPlaylist : playlist.addToPLaylist,
    getSongToPlaylist : playlist.getSongsToPlaylist
});

export default rootReducer;
