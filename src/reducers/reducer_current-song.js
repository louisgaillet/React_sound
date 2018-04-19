import * as types from '../actions/actionsTypes'

export default function (state=false,action){
    switch(action.type){
        case types.ADD_TO_CURRENT_SONG:
            return (
                action.payload
            )
    }
    return state
}
