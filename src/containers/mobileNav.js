import React, { Component } from 'react';
import * as routes from '../config/routes'
import { Switch, Route, Link } from 'react-router-dom'

class mobileNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="navbar-mobile d-none d-block d-md-none">
                <ul className="text-white layout horizontal no-wrap center-center">
                    <li>
                    <Link to={routes.APP} className="layout vertical center center">
                        <i className="fas fa-home"></i>
                        <span>Accueil</span>
                    </Link>
                    </li>
                    <li>
                    <Link to={routes.LISTPLAYLISTS} className="layout vertical center center">
                        <i className="fas fa-music"></i>
                        <span>Playlists</span>
                    </Link>
                    </li>
                    {/* <li className="layout vertical center center">
                        <i className="fas fa-users"></i>
                        <span>Amis</span>
                    </li> */}
                    <li>
                    <Link to={routes.CURRENTLIST} className="layout vertical center center">
                        <i className="fas fa-hand-point-right"></i>
                        <span>Attente</span>
                    </Link>
                    </li>
                </ul>
            </div>
        );
    }
}


export default mobileNav;