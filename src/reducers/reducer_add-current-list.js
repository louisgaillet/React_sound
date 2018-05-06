import {ADD_TO_CURRENT_LIST,} from "../actions/index.js"
import * as types from '../actions/actionsTypes'

export default function (state=[],action){
    switch(action.type){
        case ADD_TO_CURRENT_LIST:
        const newArray = [action.payload,
            ...state]
        const uniKeys = [...(new Set(newArray.map((id) => id)))];
        return (uniKeys)
        break;

        case types.REMOVE_TO_CURRENT_LIST:
        let collection = state;
        collection = collection.filter(function(el) {
           if(el.id.videoId !== action.payload.id.videoId)
            return el;
        });
        // Supprimer null

        return (collection)
    }
    return state
}
