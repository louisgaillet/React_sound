import axios from 'axios'
export const GET_DATA = 'GET_DATA'
export const ADD_TO_CURRENT_LIST = 'ADD_TO_CURRENT_LIST'
export const PLAY_LECTEUR = 'PLAY_LECTEUR'

const API_END_POINT = "https://www.googleapis.com/youtube/v3/search"
const API_KEY = "?key=AIzaSyAsM52E5tQqtI1_aVhdUSRLtoSQCj5r3L4"

export function getData(search){
     return function (dispatch) {
        axios.get(`${API_END_POINT}/${API_KEY}&part=snippet&maxResults=25&type=video&q=${search}`)
        .then(function(response){
            dispatch({type : GET_DATA,payload:response.data.items})
        })
          
    }
}

export function addToCurrentList(item){
    return function(dispatch){
        dispatch({type:ADD_TO_CURRENT_LIST, payload:item})
        dispatch({type:PLAY_LECTEUR, payload:true})
    }
}

export function gestionLecteur(bool){
    return function(dispatch){
        dispatch({type:PLAY_LECTEUR, payload:bool})
    }
}



