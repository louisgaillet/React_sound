import { Switch, Route, Redirect, replace } from 'react-router-dom'
import Home from './Home'
import Login from './Auth/login'
import {auth, base} from '../firebase/base'
import wrapperApp from './wrapperApp'
import * as routes from '../config/routes'
import React, { Component } from 'react';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: routes.LOGIN, state: {from: props.location}}} />}
    />
  )
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
    };
  }

  componentDidMount () {
    this.removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
}

  render() {
    
    return this.state.loading === true ? <h1>Loading</h1> : (
      <main>
        <Switch>
          <PrivateRoute exact path={routes.LOGIN}  component={Login}/>
          <PrivateRoute path={routes.APP} authed={this.state.authed}  component={wrapperApp}  />
        </Switch>
      </main>
    );
  }
}

export default Main