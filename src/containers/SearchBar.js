import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import { withRouter } from "react-router-dom";

import {auth, base} from '../firebase/base'
import {getData} from "../actions/index"
import ListItem from "../components/list_item"
import * as routes from '../config/routes'

class SearchBar extends Component{
    constructor(props){
        super(props);
    }


    search(e){
        this.props.getData(e.target.value)
        this.props.history.push(routes.RESULTS);
    }
    
    renderResult(){
        const results = this.props.results;
        if(results){
            return results.map((result) => {
                return <ListItem key={result.id.videoId} result={result}/>
            })}
        }

    render(){
        return (
            <div className="header">
                <div className="search">
                    <input type="text" onChange={(e) => this.search(e)} placeholder="Rechercher ..."/>
                </div>
            </div>
        )
    }

    componentWillUnmount(){
        this.removeAuthListener();
    }
}
function mapStateToProps(state) {
    return {
        results: state.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar))