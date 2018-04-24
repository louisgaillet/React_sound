import React, { Component } from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {Link } from 'react-router-dom'

import ListItem from "../components/list_item"
import * as routes from '../config/routes'

class CurrentList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    renderCurrentList(){
        var results = this.props.currentList
        if (results) {
            return (results.map((result) => {
                return <ListItem key={Math.random()} result={result} clickOnItem={true}/>
            }))
        }
    }

    render() {
        return (
            <div>
                {this.props.currentList.length > 0 ? <h2> <Link to={routes.CURRENTLIST}>Liste d'attente </Link></h2>:''}
                <ul className="current_list tracks">
                    {this.renderCurrentList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentList: state.currentList
    }
}

export default connect(mapStateToProps)(CurrentList);