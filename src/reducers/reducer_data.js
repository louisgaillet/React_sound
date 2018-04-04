import {GET_DATA} from "../actions/index.js"

export default function (state=null,action){
    switch(action.type){
        case GET_DATA:
            console.log('reducer');
            return action.payload
    }
    return state
}