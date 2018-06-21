import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {auth} from '../firebase/base'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import {getSongsToPlaylists, removePlaylist, randomPlaylist} from "../actions/index"
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

    ref = contextTrigger => {
        this.contextTrigger = contextTrigger
      }
    
      toggleMenu = e => {
        if(this.contextTrigger) {
            this.contextTrigger.handleContextClick(e);
        }
      };
    
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
        // On redirige
        this.props.removePlaylist(this.props.match.params.id)
        this.props.history.goBack();
    }

    randomPlaylist(){
        this.props.randomPlaylist(this.props.match.params.id)
    }

    handleClick(e, data) {
        console.log(data.foo);
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

    renderMenuOptions(){
        const id = 'toggleMenu';
        return (
          <div>
            <ContextMenuTrigger ref={(c) => this.contextTrigger = c} id={id}>
              <span onClick={this.toggleMenu} className="text-mutted mr-4 pl-2  open-menu-trigger"><i className="fas fa-ellipsis-v"></i></span>
            </ContextMenuTrigger>
    
            <ContextMenu id={id}>
              <MenuItem  onClick = { (e) =>this.deletePlaylist()}>
                Supprimer
              </MenuItem>
              <MenuItem onClick={this.handleClick}>
                Synchroniser
              </MenuItem>
          </ContextMenu>
          </div>
        )
      }

    render() {
        return (
            <div >
                <div className="text-right mr-3 mt-3 text-white">
                    {this.renderMenuOptions()}
                </div>
                <div className="text-center">
                <button type="button" className="btn btn-success ml-2 btn-rounded btn-lg" onClick = { () => this.randomPlaylist()}>LECTURE ALEATOIRE</button>
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
    return bindActionCreators({getSongsToPlaylists, removePlaylist, randomPlaylist}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(detailPlaylist)
