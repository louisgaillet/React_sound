import * as types from '../actions/actionsTypes'

export  function isConnected(state=false,action){
    switch(action.type){
        case types.IS_CONNECTED:
            return (
                action.payload
            )
    }
    return state
}

export function getUser(state=false,action){
    switch(action.type){
        case types.GET_USER:
            return (
                action.payload
            )
    }
    return state
}
