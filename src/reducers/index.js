import { combineReducers } from 'redux';
import data_reducer from './reducer_data'
import currentList from './reducer_add-current-list'
import currentSong from './reducer_current-song'
import * as user from './reducer_account'
import * as playlist from './reducer_playlist'
import * as player from './reducer_player'

const rootReducer = combineReducers({
    data : data_reducer,
    currentList : currentList,
    currentSong : currentSong,
    player : player.play,
    connected : user.isConnected,
    user : user.getUser,
    createPlaylist : playlist.createPlaylist,
    playlists : playlist.getPlaylists,
    addToPlaylist : playlist.addToPLaylist,
    getSongToPlaylist : playlist.getSongsToPlaylist,
    contextLecteur : player.context
});

export default rootReducer;
