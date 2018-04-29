import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {auth, base} from '../firebase/base'

import {isConnected, createPlaylist, getPlaylists, addToPlaylist} from "../actions/index"
import ListItem from "../components/list_item"
import PlayListItem from '../components/play_list_item'

class GestionPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            menuAddPlaylist : false,
            item_selected : '',
            playlist_selected : '',
         };
    }

    componentDidMount() {
        auth.onAuthStateChanged(authUser => {
            this.props.getPlaylists(authUser.uid)
        });
    }

    openMenuAddPlaylist(){
        this.setState({
            menuAddPlaylist : true,
        })
    }

    closeMenuAddPlaylist(){
        this.setState({
            menuAddPlaylist : false,
        })
    }

    createPlaylist(){
        this.props.createPlaylist(this.props.user.uid,this.refs.playlistName.value);
        this.closeMenuAddPlaylist();
    }

    callbackAjoutPlaylist(playlist_selected){
        this.props.addToPlaylist(this.props.user.uid,playlist_selected,this.props.item_selected)
        this.props.gestionMenu();
    }

    
    
    render() {
        return (
            <div className="context-menu text-center">
                    <div className="layout vertical text-white pt-4 pb-4">
                        <button className="btn btn-transparent" onClick = { () => this.props.gestionMenu()}><svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Close</title><path d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143" fill="#FFF" fill-rule="evenodd"></path></svg></button>
                        <div className="layout horizontal center-center pb-4">
                            <h1 className="mr-2"> Ajouter à la playlist</h1>  
                            <button type="button" className="btn btn-success ml-2 btn-rounded" onClick = { () => this.openMenuAddPlaylist()}>NOUVELLE PLAYLIST</button>
                        </div>
                        { this.state.menuAddPlaylist === true &&
                        <div className="">
                                <div className="bg-grey p-5 text-left">
                                    <p>Nom de la playlist</p>
                                    <input type="text" className="inputBox-input" placeholder="Commencez à taper…" ref="playlistName"/>
                                </div>
                                <div className="layout horizontal center-center mt-5">
                                    <button type="button" className="btn btn-rounded mr-2 btn-outline-light text-uppercase" onClick = { () => this.closeMenuAddPlaylist()}>Annuler</button>
                                    <button type="button" className="btn btn-success ml-2 btn-rounded text-uppercase" onClick={() => this.createPlaylist()}>Créer</button>
                                </div>
                        </div>
                        }
                    </div>
                    <div>
                       {this.props.playlists ? 
                        this.renderPlaylists()
                       : 'Aucune playlist'}
                    </div>      
                </div>
        );
    }

    renderPlaylists(){
        const playlists = this.props.playlists.playlists;
        return Object.entries(playlists).map(([key,playlist])=>{
            return <PlayListItem key={key} id={key} name={playlist.name} callback={this.callbackAjoutPlaylist.bind(this)}/> 
        }) 
    }

}

function mapStateToProps(state) {
    return {
        results: state.data,
        createPlaylist : state.createPlaylist,
        user : state.user,
        playlists : state.playlists
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({createPlaylist, getPlaylists, addToPlaylist}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(GestionPlaylist)
