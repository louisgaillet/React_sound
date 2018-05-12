import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {gestionLecteur,nextSongs, prevSongs} from '../actions/index'
import Duration from '../components/player/duration'
import BarProgress from '../components/player/bar_progress'
import ReactTouchEvents from "react-touch-events"

class MobilePlayer extends Component {
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
    
    handleSwipe (direction) {
    
        switch (direction) {
            case "left":
                this.props.nextSongs();
            break;
            case "right":
                this.props.prevSongs();
            break;
        
        }
    }

    render() {
        const {currentSong} = this.props;
        var {player} = this.props;
    
        if(currentSong && this.props.visibility === true){
            return (
                <ReactTouchEvents
                onSwipe={ this.handleSwipe.bind(this) }
                >
                <div className="text-white layout vertical center player-mobile">
                    <span className = 'closeMobilePlayer'  onClick={this.props.togglePlayerMobile}><i className="fa fa-chevron-down"></i></span>
                    <div>
                        <img className="" src={currentSong.snippet.thumbnails.high.url}/>                    
                    </div>
                    <div style={{width :80 + '%'}} className="text-center" > 
                        <div >
                            <span>
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
                        <div className='playback-bar d-flex justify-content-between align-items-center col-xs-12 mt-5'>
                            <BarProgress duration={this.props.duration} played={this.props.played} onSeekMouseDown={this.props.onSeekMouseDown} onSeekChange={this.props.onSeekChange} onSeekMouseUp={this.onSeekMouseUp}/>
                        </div> 
                    </div>
                </div>
                </ReactTouchEvents>
            );
        }else{
            return <div >
                
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

export default connect(mapStateToProps, mapDispatchToProps)(MobilePlayer);
