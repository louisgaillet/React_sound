import {ADD_TO_CURRENT_LIST} from "../actions/index.js"

export default function (state=[],action){
    switch(action.type){
        case ADD_TO_CURRENT_LIST:
            return [
                action.payload,
                ...state
            ]
    }
    return state
}
