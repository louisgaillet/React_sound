import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {isConnected, createPlaylist, getPlaylists, addToPlaylist} from "../actions/index"
import {auth, base} from '../firebase/base'

import PlayListItem from '../components/play_list_item'

class PlayLists extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        auth.onAuthStateChanged(authUser => {
            this.props.getPlaylists(authUser.uid)
        });
    }

    render(){
        return (
            <div>
                {this.props.playlists ? 
                <div>
                    <h2 className="pl-1">Playlists</h2>
                    <ul className="text-white playlists-list">
                        {this.renderPlaylists()}
                    </ul>
                </div>    
                : 'Aucune playlist'}
            </div>
        )
    }

    renderPlaylists(){
        const playlists = this.props.playlists.playlists;
        return Object.entries(playlists).map(([key,playlist])=>{
            return <PlayListItem key={key} id={key} name={playlist.name} callback='' style="list"/> 
        }) 
    }
};

function mapStateToProps(state) {
    return {
        user : state.user,
        playlists : state.playlists
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({createPlaylist, getPlaylists, addToPlaylist}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayLists);