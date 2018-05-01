import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import SearchBar from '../containers/SearchBar'
import Resultat from '../containers/Resultat'
import Player from '../containers/player'
import CurrentList from '../containers/currentList'
import detailPlaylist from '../containers/detailPlaylist'
import MobileNav from '../containers/mobileNav'
import PlayLists from '../containers/playlists'
import * as routes from '../config/routes'

const wrapperApp = () => (
<div>
      <SearchBar/>
      <div className="content layout horizontal no-wrap">
          <div className="nav-bar-container  d-none  d-md-block">
            <PlayLists/>
            <CurrentList/>
          </div>
          <div className="main-view-container">
                <Switch>
                    <Route exact path={routes.HOME} component={Resultat}/> 
                    <Route exact path={routes.RESULTS} component={Resultat}/> 
                    <Route exact path={routes.CURRENTLIST} component={CurrentList}/>
                    <Route  path={routes.DETAILPLAYLIST+'/:id'} component={detailPlaylist}/>
                </Switch>
          </div>
      </div>
        <MobileNav/>
        <Player />
</div>
)

export default wrapperApp
