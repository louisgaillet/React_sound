import * as types from '../actions/actionsTypes'

export  function createPlaylist(state='',action){
    switch(action.type){
        case types.CREATE_PLAYLIST:
            return {
                ...state,
                playlist : action.payload
            }
    }
    return state
}

export  function getPlaylists(state=null,action){
    switch(action.type){
        case types.GET_PLAYLISTS:
            return (
                action.payload
            )
    }
    return state
}

export function addToPLaylist(state=null, action){
    switch (action.type){
        case types.ADD_TO_PLAYLIST:
        return (
            action.payload
        )
    }
    return state
}

export function getSongsToPlaylist(state=null, action){
    switch (action.type){
        case types.GET_SONGS_TO_PLAYLIST:
        return (
            action.payload
        )
    }
    return state
}

