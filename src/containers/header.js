import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from "react-redux"
import {auth, base} from '../firebase/base'

import {isConnected, getPlaylists, initApp} from '../actions/index'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        this.props.isConnected();
        auth.onAuthStateChanged(authUser => {
            this.props.getPlaylists(authUser.uid);
        });
    }

    render() {
        if(this.props.isConnected){
            return (
                <div className ="user">
                    {/* {this.props.user.email} */}
                </div>
            );
        }else{
            return (
                <div className = "user">
                    {/* Se connecter */}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        connected: state.connected,
        user : state.user,
        playlists : state.playlists,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({isConnected, getPlaylists, initApp},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);