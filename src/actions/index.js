import axios from 'axios'

export const GET_DATA = 'GET_DATA'
export const ADD_TO_CURRENT_LIST = 'ADD_TO_CURRENT_LIST'
export const PLAY_LECTEUR = 'PLAY_LECTEUR'
import * as types from './actionsTypes'
import * as contexts from '../config/context'
import {auth, base} from '../firebase/base'


const API_END_POINT = "https://www.googleapis.com/youtube/v3/search"
const API_KEY = "?key=AIzaSyAsM52E5tQqtI1_aVhdUSRLtoSQCj5r3L4"

export function initApp(){
    return function (dispatch, getState){
        const playlists = getState().playlists.playlists;
        const firstPlaylist = playlists[Object.keys(playlists)[1]].songs;
        let currentSong = firstPlaylist[Object.keys(firstPlaylist)[0]];
        dispatch({type:types.ADD_TO_CURRENT_SONG, payload:currentSong})
    }
}
export function getData(search="the strokes"){
     return function (dispatch) {
        axios.get(`${API_END_POINT}/${API_KEY}&part=snippet&maxResults=10&type=video&q=${search}`)
        .then(function(response){
            dispatch({type:types.ADD_TO_CURRENT_SONG, payload:response.data.items[0]})
            dispatch({type : GET_DATA,payload:response.data.items})
        }) 
    }
}

export function addToCurrentList(item){
    return function(dispatch){
        dispatch({type:ADD_TO_CURRENT_LIST, payload:item})
    }
}


export function addToCurrentSong(item, context=null){
    return (dispatch, getState) => {
        dispatch({type:types.ADD_TO_CURRENT_SONG, payload:item})
        dispatch({type:PLAY_LECTEUR, payload:true})
        dispatch({type:types.CONTEXT_LECTEUR, payload:context})
        const actualContext = getState().contextLecteur;
        if(actualContext){
            if(actualContext.name === contexts.PLAYLIST){    
                var songs = Object.entries(getState().getSongToPlaylist);
                const currentSong = getState().currentSong;
                const index = songs.map(function(song) { return song[1].id.videoId}).indexOf(currentSong.id.videoId);
                const songs_to_add = songs.slice(index);
                songs_to_add.reverse().forEach(function (item) {
                        dispatch({type:ADD_TO_CURRENT_LIST, payload:item[1]})
                });
                const song_to_remove = songs.reverse().slice(songs.length-index);
                song_to_remove.forEach(function (song) {
                    dispatch({type:types.REMOVE_TO_CURRENT_LIST, payload:song[1]})
                });
            }
        }
    }
}

export function gestionLecteur(bool){
    return function(dispatch){
        dispatch({type:PLAY_LECTEUR, payload:bool})
    }
}

export function isConnected(){
    return function (dispatch) {
         auth.onAuthStateChanged((user) => {
            if(user){
                dispatch({type:types.GET_USER, payload:user})
                dispatch({type:types.IS_CONNECTED, payload:true})
            }else{
                dispatch({type:types.IS_CONNECTED, payload:false})
            }
        })
    }
}


export function createPlaylist(user_id,name) {
    return function(dispatch){
        let base_playlist = {name : name};
        // On met à jour
        const rootRef = base.ref();
        var ref = base.ref(user_id+'/playlists/');
        ref.push(base_playlist).then(function(){
            dispatch({type:types.CREATE_PLAYLIST, payload:'success'})
          }).catch(function(error) {
                dispatch({type:types.CREATE_PLAYLIST, payload:error})
        });
    }
}

export function removePlaylist(playlist_id){
    return function(dispatch, getState){
        const user_id = getState().user.uid;
        var ref = base.ref(user_id+'/playlists/'+playlist_id);
        ref.remove().then(function(){
            console.log('deleted')
        }).catch(function(error){
            console.log('error');
        });
    }
}

export function getPlaylists(user_id){
    return function(dispatch){
        const rootRef = base.ref();
        var ref = base.ref(user_id);
        ref.on("value", function(snapshot) {
            dispatch({type:types.GET_PLAYLISTS, payload:snapshot.val()})
          }, function (errorObject) {
          });
    }
}

export function addToPlaylist(user_id,playlist_id, item){
    return function(dispatch){
        const rootRef = base.ref();
            var ref = base.ref(`${user_id}/playlists/${playlist_id}/songs`);
            ref.push(item).then(function(){
            }).catch(function(error) {
            });
    }
}

export function getSongsToPlaylists(user_id,playlist_id){
    return function(dispatch){
        const rootRef = base.ref();
        var ref = base.ref(`${user_id}/playlists/${playlist_id}/songs`);
        ref.on("value", function(snapshot) {
            dispatch({type:types.GET_SONGS_TO_PLAYLIST, payload:snapshot.val()})
          }, function (errorObject) {
          });
    }
}

export function nextSongs(){
    return (dispatch, getState) => {
        var currentList = getState().currentList;
        var currentSong = getState().currentSong;
        const index = currentList.map(function(song) { return song.id.videoId}).indexOf(currentSong.id.videoId);
        if(index <= currentList.length)
            dispatch({type:types.ADD_TO_CURRENT_SONG, payload:currentList[index+1]})
      }
}

export function prevSongs(){
    return (dispatch, getState) => {
        var currentList = getState().currentList;
        var currentSong = getState().currentSong;
        const index = currentList.map(function(song) { return song.id.videoId}).indexOf(currentSong.id.videoId);
            dispatch({type:types.ADD_TO_CURRENT_SONG, payload:currentList[index-1]})
      }
}




