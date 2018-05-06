import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Auth/login'
import {auth, base} from '../firebase/base'
import wrapperApp from './wrapperApp'
import * as routes from '../config/routes'


const Main = () => (
  <main>
    <Switch>
      <Route exact path={routes.HOME} component={Login}/>
      {/* else */} 
      
      <Route path={routes.APP} component={wrapperApp}/>
    </Switch>
  </main>
)

export default Main