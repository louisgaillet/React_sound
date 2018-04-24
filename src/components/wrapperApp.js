import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import SearchBar from '../containers/SearchBar'
import Resultat from '../containers/Resultat'
import Player from '../containers/Player'
import CurrentList from '../containers/currentList'
import * as routes from '../config/routes'

const wrapperApp = () => (
<div>
      <SearchBar/>
      <div className="content layout horizontal">
          <div className="nav-bar-container col-lg-3 col-md-3">
            <CurrentList/>
          </div>
          <div className="main-view-container col-lg-9 col-md-9">
                <Switch>
                    <Route exact path={routes.RESULTS} component={Resultat}/> 
                    <Route exact path={routes.CURRENTLIST} component={CurrentList}/>
                </Switch>
          </div>
      </div>
        <Player />
</div>
)

export default wrapperApp
