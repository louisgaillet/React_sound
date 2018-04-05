import axios from 'axios'
export const GET_DATA = 'GET_DATA'

const API_END_POINT = "https://www.googleapis.com/youtube/v3/search"

export function getData(search){
     return function (dispatch) {
        axios.get(`${API_END_POINT}/${search}`)
        .then(function(response){
            dispatch({type : GET_DATA,payload:response.data.items})
        })
          
    }
}
