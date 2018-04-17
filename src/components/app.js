import React, { Component } from 'react';
import SearchBar from '../containers/SearchBar';
import Resultat from '../containers/Resultat'
import Player from '../containers/Player'
import CurrentList from '../containers/currentList'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <div className="content layout horizontal">
          <div className="nav-bar-container col-lg-2 col-md-3">
            <CurrentList/>
          </div>
          <div className="main-view-container col-lg-10 col-md-9">
            <Resultat/>
          </div>
        </div>
        <Player />
      </div>
    );
  }
}
