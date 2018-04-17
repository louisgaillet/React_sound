import React, { Component } from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import ListItem from "../components/list_item"

class CurrentList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    renderCurrentList(){
        var results = this.props.currentList
        if (results) {
            return (results.map((result) => {
                // return <ListItem key={result.id.videoId} result={result} clickOnItem={true}/>
                return 'yoo'
            }))
        }
    }

    render() {
        return (
            <div>
                {this.props.currentList.length > 0 ? <h2>Liste d'attente</h2>:''}
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