import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {auth} from '../firebase/base'

import {getSongsToPlaylists, removePlaylist} from "../actions/index"
import ListItem from "../components/list_item"

class detailPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            context : {
                name : "playlist",
                id : this.props.match.params.id
            }
        };
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
            const playlist_id =nextMatch.params.id
            auth.onAuthStateChanged(authUser => {
                this.props.getSongsToPlaylists(authUser.uid, playlist_id)
            });
        }
    }

    deletePlaylist(){
        this.props.removePlaylist(this.props.match.params.id)
    }

    renderSongs(){
        const songs = this.props.songs;
        if(songs){
            return Object.entries(songs).map((result) => {
                return <ListItem key={result[1].id.videoId + Math.floor(Math.random() * 11)} result={result[1]} context={this.state.context}/>
                // console.log(result[1])
            })
        }
    }

    render() {
        return (
            <div >
                <div className="text-right mr-3 mt-3">
                    <span className="badge badge-danger font-weight-bold px-2 py-2" onClick = { (e) => this.deletePlaylist()}>Supprimer la playlist</span>
                </div>
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
    return bindActionCreators({getSongsToPlaylists, removePlaylist}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(detailPlaylist)
