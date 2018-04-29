import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {auth, base} from '../firebase/base'

import {isConnected} from "../actions/index"
import GestionPlaylist from './gestionPlaylist'
import ListItem from "../components/list_item"
import PlayListItem from '../components/play_list_item'

class Resultat extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuContext : false,
            menuAddPlaylist : false,
            item_selected : '',
            playlist_selected : '',
        }
    }

    menuContext(item){
        this.setState({
            menuContext : !this.state.menuContext,
            item_selected : item
        })
    }

    closeMenu(){
        this.setState({
            menuContext : false,
        })
    }


    renderResult(){
        const results = this.props.results;
        if(results){ 
            return results.map((result) => {
                return <ListItem key={result.id.videoId + Math.floor(Math.random() * 11)} result={result} menuContext= {this.menuContext.bind(this)}/>
            })}
    }

    renderMenuContext(){
        if(this.state.menuContext){
            return (
                <GestionPlaylist item_selected = {this.state.item_selected} gestionMenu={this.closeMenu.bind(this)}/>
            )
        }
    }

    render(){
        return (
            <div>
                {this.renderMenuContext()}
                <div className="tracks">
                    <ul className="list-group">
                        {this.renderResult()}
                    </ul>
                </div>
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        results: state.data,
    }
}

export default connect(mapStateToProps)(Resultat)