import React, { Component } from 'react';
import SearchBar from '../containers/SearchBar';
import Resultat from '../containers/Resultat'
import Player from '../containers/Player'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <div className="content layout horizontal">
        <div className="nav-bar-container col-md-2">
        </div>
        <div className="main-view-container col-md-10">
          <Resultat/>
        </div>
        </div>
        <Player />
      </div>
    );
  }
}
