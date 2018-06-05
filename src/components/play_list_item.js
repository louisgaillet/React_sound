import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import * as routes from '../config/routes'
import axios from 'axios'

class PlayListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  download(){
    axios.post('/download', {id: '_upN0hmAL5A', playlistId: '2' })
            .then(function(res){
               console.log(res);
            })
            .catch(function(res){
                console.log(res);
            })
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
              <div className="wrapper_image">
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
  render() {
    return (
      <div>
        {/* <span onClick={ (e) => this.download()}> Download</span> */}
      {this.props.style ?
        <li className="list-group-item bg-transparent d-flex align-items-center  mb-1">
        <div className="thumbnail_playlist mr-3">
          {this.renderThumbnailPlaylist()}
        </div>
        
        <Link to={`${routes.DETAILPLAYLIST}/${this.props.id}`}>{this.props.name}</Link></li>
        : <p onClick={(e) => this.props.callback(this.props.id)}>{this.props.name}</p>
      }
      </div>
    );
  }
}

export default PlayListItem
