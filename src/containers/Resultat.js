import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {getData} from "../actions/index"
import ListItem from "../components/list_item"

class Resultat extends Component{
    constructor(props){
        super(props);
    }

    
    renderResult(){
        const results = this.props.results;
        if(results){ 
            return results.map((result) => {
                return <ListItem key={result.id.videoId + Math.floor(Math.random() * 11)} result={result}/>
            })}
        }

    render(){
        return (
            <div className="tracks">
                <ul className="list-group">
                    {this.renderResult()}
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        results: state.data
    }
}


export default connect(mapStateToProps)(Resultat)