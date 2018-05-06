import * as types from '../actions/actionsTypes'

export function play (state=false,action){
    switch(action.type){
        case types.PLAY_LECTEUR:
            return (
                action.payload
            )
    }
    return state
}

export function context ( state = false, action){
    switch(action.type){
        case types.CONTEXT_LECTEUR:
            return (
                action.payload
            )
    }
    return state
}

export function next (state=false,action){
    switch(action.type){
        case types.NEXT_SONG:
            return (
                action.payload
            )
    }
    return state
}

