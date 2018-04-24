import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {auth} from '../../firebase/base'
import * as routes from '../../config/routes'

class Login extends Component {
    constructor(props) {
        super(props);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
        this.state = {
        };
    }

    authWithEmailPassword(event){
        event.preventDefault();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            this.props.history.push(routes.APP);
        })
        .catch(error => {
            console.log(error);
        //   this.setState(updateByPropertyName('error', error));
        });
  
    }
    render() {
        return (
            <div className="container">
                <div className="card col-md-6 offset-md-3 mt-5 p-5">
                    <form onSubmit={(event) => {this.authWithEmailPassword(event)} } ref={(form) => {this.loginForm = form}}>
                        <div className="form-group">
                            <input className="form-control" name="email" type="email" placeholder="email"
                                ref={(input) => {this.emailInput = input}}></input>
                        </div>
                        <div className="form-group">
                        <input className="form-control" name="password" type="password" placeholder="password"
                                ref={(input) => {this.passwordInput = input}}></input>
                        </div>
                        <div className="form-group">
                        <input type="submit" className="btn btn-primary"></input>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);