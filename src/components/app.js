import React, { Component } from 'react';
import {Router, Route, Link, browserHistory, IndexRoute} from  'react-router'
import SearchBar from '../containers/SearchBar';
import Header from '../containers/header'
import Main from './main'


export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main />
      </div>
    );
  }
}
