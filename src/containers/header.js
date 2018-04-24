import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from "react-redux"

import {isConnected} from '../actions/index'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
        this.props.isConnected();
    }

    render() {
        if(this.props.isConnected){
            return (
                <div className ="user">
                    {this.props.user.email}
                </div>
            );
        }else{
            return (
                <div className = "user">
                    Je suis non connecté
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        connected: state.connected,
        user : state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({isConnected},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);