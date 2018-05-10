import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {gestionLecteur,nextSongs, prevSongs} from '../actions/index'
import Duration from '../components/player/duration'

class mobilePLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    playPause = () => {
        this.setState({playing: !this.state.playing}, () => {
            this.props.gestionLecteur(!this.props.player);
        })
    }

    next = () => {
        this.props.nextSongs();
    }

    prev = () => {
        this.props.prevSongs();
    }
    render() {
        const {currentSong} = this.props;
        var {player} = this.props;
        if(currentSong){
            return (
                <div className="text-white layout vertical center player-mobile">
                    <div>
                        <img className="" src={currentSong.snippet.thumbnails.high.url}/>                    
                    </div> 
                    <div>
                        <span className="track__title layout vertical center-center mt-4 ">
                            {currentSong.snippet.title.toLowerCase()}    
                        </span>
                    </div>
                    
                    <div className="current-track__actions mt-5">
                        <div className="player-controls_buttons">
                                <a onClick={this.prev}><i className="fa fa-step-backward"></i></a>
                                <a className="play" onClick={this.playPause}>
                                    {!player? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>}
                                </a>
                                <a  onClick={this.next}><i className="fa fa-step-forward"></i></a>  
                        </div>
                    </div>
                </div>
            );
        }else{
            return <div>

            </div>;
        }
    }
}



function mapStateToProps(state) {
    return {
        currentList: state.currentList,
        currentSong: state.currentSong,
        player : state.player,
        contextLecteur : state.contextLecteur 
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({gestionLecteur, nextSongs,prevSongs},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(mobilePLayer);
