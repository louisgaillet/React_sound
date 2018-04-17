import {ADD_TO_CURRENT_LIST} from "../actions/index.js"

export default function (state=[],action){
    switch(action.type){
        case ADD_TO_CURRENT_LIST:
        const newArray = [action.payload,
            ...state]
        const uniKeys = [...(new Set(newArray.map((id) => id)))];
        return (uniKeys)
    }
    return state
}
