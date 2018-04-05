import {GET_DATA} from "../actions/index.js"

export default function (state=[],action){
    switch(action.type){
        case GET_DATA:
            return action.payload
    }
    return state
}