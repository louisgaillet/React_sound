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
  render() {
    return (
      <div>
        {/* <span onClick={ (e) => this.download()}> Download</span> */}
      {this.props.style ?
        <li className="list-group-item bg-transparent">
        <Link to={`${routes.DETAILPLAYLIST}/${this.props.id}`}>{this.props.name}</Link></li>
        : <p onClick={(e) => this.props.callback(this.props.id)}>{this.props.name}</p>
      }
      </div>
    );
  }
}

export default PlayListItem
