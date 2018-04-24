import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Auth/login'
import wrapperApp from './wrapperApp'
import * as routes from '../config/routes'


const Main = () => (
  <main>
    <Switch>
    {/* <Route  path={routes.Home} component={Home}/> */}
      <Route path={routes.LOGIN} component={Login}/>
      <Route path={routes.APP} component={wrapperApp}/>
    </Switch>
  </main>
)

export default Main