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
        this.state = { search : '' };
    }


    search(e){
        this.setState({search:e.target.value});
        setTimeout(function(e) { 
            this.props.getData(this.state.search)
            this.props.history.push(routes.RESULTS);
        }.bind(this), 800);
    }

    prev(){
        this.props.history.goBack();
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
            <div className="header flex layout horizontal">
                <div className="mr-2 go-back" onClick= {(e) => this.prev()}>
                    <i className="fas fa-chevron-left"></i>
                </div>
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