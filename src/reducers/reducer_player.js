
import {PLAY_LECTEUR} from "../actions/index.js"

export default function (state=false,action){
    switch(action.type){
        case PLAY_LECTEUR:
            return (
                action.payload
            )
    }
    return state
}
