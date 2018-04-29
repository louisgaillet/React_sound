import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {auth} from '../firebase/base'

import {getSongsToPlaylists} from "../actions/index"
import ListItem from "../components/list_item"

class detailPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount(){
        const playlist_id =this.props.match.params.id
        auth.onAuthStateChanged(authUser => {
            this.props.getSongsToPlaylists(authUser.uid, playlist_id)
        });
    }

    componentWillReceiveProps(nextProps) {
        const { match } = this.props
        const { match: nextMatch } = nextProps
    
        if ( match.params.id !== nextMatch.params.id ) {
            const playlist_id =this.props.match.params.id
            auth.onAuthStateChanged(authUser => {
                this.props.getSongsToPlaylists(authUser.uid, playlist_id)
            });
        }
    }


    renderSongs(){
        const songs = this.props.songs;
        if(songs){
            return Object.entries(songs).map((result) => {
                return <ListItem key={result[1].id.videoId + Math.floor(Math.random() * 11)} result={result[1]} />
                // console.log(result[1])
            })
        }
    }

    render() {
        return (
            <div>
                <ul className='tracks'>
                    {this.renderSongs()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        songs: state.getSongToPlaylist
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getSongsToPlaylists}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(detailPlaylist)
