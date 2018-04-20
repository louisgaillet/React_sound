import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import wrapperApp from './wrapperApp'
import * as routes from '../config/routes'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path={routes.app} component={wrapperApp}/>
    </Switch>
  </main>
)

export default Main