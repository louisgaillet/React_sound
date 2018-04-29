import axios from 'axios'

export const GET_DATA = 'GET_DATA'
export const ADD_TO_CURRENT_LIST = 'ADD_TO_CURRENT_LIST'
export const PLAY_LECTEUR = 'PLAY_LECTEUR'
import * as types from './actionsTypes'
import {auth, base} from '../firebase/base'


const API_END_POINT = "https://www.googleapis.com/youtube/v3/search"
const API_KEY = "?key=AIzaSyAsM52E5tQqtI1_aVhdUSRLtoSQCj5r3L4"

export function getData(search="the strokes"){
     return function (dispatch) {
        axios.get(`${API_END_POINT}/${API_KEY}&part=snippet&maxResults=10&type=video&q=${search}`)
        .then(function(response){
            dispatch({type : GET_DATA,payload:response.data.items})
        }) 
    }
}

export function addToCurrentList(item){
    return function(dispatch){
        // dispatch({type:types.ADD_TO_CURRENT_SONG, payload:item})
        dispatch({type:ADD_TO_CURRENT_LIST, payload:item})
        // dispatch({type:PLAY_LECTEUR, payload:true})
    }
}

export function addToCurrentSong(item){
    return function(dispatch){
        dispatch({type:types.ADD_TO_CURRENT_SONG, payload:item})
        dispatch({type:PLAY_LECTEUR, payload:true})
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



