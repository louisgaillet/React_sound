import React, { Component } from 'react';
import SearchBar from '../containers/SearchBar';
import Main from './main'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <Main />
      </div>
    );
  }
}
