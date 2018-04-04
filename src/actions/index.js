import axios from 'axios'
export const GET_DATA = 'GET_DATA'

export function getData($search){
     return function (dispatch) {
           dispatch({type : GET_DATA,payload:'datat'})
    }
}
