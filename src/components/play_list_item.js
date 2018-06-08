import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {auth} from '../firebase/base'

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {removePlaylist} from "../actions/index"
import * as routes from '../config/routes'
import axios from 'axios'


class PlayListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      playlist_id : ''
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


  download(){
    axios.post('/download', {id: '_upN0hmAL5A', playlistId: '2' })
            .then(function(res){
               console.log(res);
            })
            .catch(function(res){
                console.log(res);
            })
  }

  deletePlaylist(){
     this.props.removePlaylist(this.props.id)
  }

  handleClick(e, data) {
    console.log(data.foo);
  }

  renderThumbnailPlaylist(){
    const songs = this.props.songs;
    if (songs){
      let pictures = Object.entries(songs).map(([key,song])=>{
        return song.snippet.thumbnails.medium;
      });
      if(pictures.length >= 4){
        pictures = pictures.slice(5);
        return (
          pictures.map(picture => {
            return (
              <div className="wrapper_image" key ={(Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11)).toString(16).substring(1)}>
                <img className="small-picture" src={picture.url}/>
              </div>
            )
          })
        )
      }else{
        return (
                <img className="full-picture" src={pictures[0].url}/>
            )

      }
    }
  }

  renderMenuOptions(playlist_id){
    const id = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    return (
      <div>
        <ContextMenuTrigger ref={(c) => this.contextTrigger = c} id={id}>
          <span onClick={this.toggleMenu} className="text-white mr-4 pl-2 pr-2 open-menu-trigger"><i className="fas fa-ellipsis-v"></i></span>
        </ContextMenuTrigger>

        <ContextMenu id={id}>
          <MenuItem data={{data : 'test'}} onClick = { (e) =>this.deletePlaylist(playlist_id)}>
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
      <div className="item-playlist">
        {this.renderMenuOptions(this.props.id)}
      {this.props.style ?
        <Link to={`${routes.DETAILPLAYLIST}/${this.props.id}`}>{this.props.name}
          <li className="list-group-item bg-transparent d-flex align-items-center  mb-1">
            <div className="thumbnail_playlist mr-3">
              {this.renderThumbnailPlaylist()}
            </div>
          </li>
        </Link>
        : <p onClick={(e) => this.props.callback(this.props.id)}>{this.props.name}</p>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({removePlaylist},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayListItem);

