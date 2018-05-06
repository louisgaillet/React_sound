import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Nouislider from 'react-nouislider';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {gestionLecteur,nextSongs, prevSongs} from '../actions/index'
import Duration from '../components/player/duration'

import DetailCurrent from '../components/player/detail_current'
const END_POINT = "https://www.youtube.com/watch?v="

class  Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            played : 0,
            duration : 0
          }
    }
    
    ref = player => {
        this.player = player
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

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
    }
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }
    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onDuration = (duration) => {
        this.setState({ duration })
    }


    renderPlayer(){
        const {currentList} = this.props;
        const {currentSong} = this.props;
        var {player} = this.props;
        var style = {
            width: (this.state.played * 100 + '%')
        }
        if(currentSong){
            var id = currentSong.id.videoId;
        }else{
            var id = 'oUFJJNQGwhk';
        }
        return ( 
            <div>
                <div className="current-track">
                    <div className="current-track__left col-xs-6 col-md-4 ">
                        <DetailCurrent currentDetail={currentSong}/>
                    </div>
                    <div className="current-track__actions  col-xs-6 col-md-4 ">
                        <div className="player-controls_buttons">
                            <a onClick={this.prev}><i className="fa fa-step-backward"></i></a>
                            <a className="play" onClick={this.playPause}>
                                {!player? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>}
                            </a>
                            <a  onClick={this.next}><i className="fa fa-step-forward"></i></a>  
                        </div>
                        <div className="playback-bar d-flex justify-content-between align-items-center">
                            <div className="playback-bar__progress-time"> <Duration seconds={this.state.duration * this.state.played} /></div>
                           
                            <div className="custom-progress-bar flex">
                                <input
                                    className = "with-progress"
                                    type='range' min={0} max={1} step='any'
                                    progess max = {1}
                                    value={this.state.played}
                                    onMouseDown={this.onSeekMouseDown}
                                    onChange={this.onSeekChange}
                                    onMouseUp={this.onSeekMouseUp}
                                />
                                 <div className="progress">
                                    <div className="progress-bar  bg-success" role="progressbar" style={style} aria-valuenow={this.state.played *100} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div className="playback-bar__progress-time"> <Duration seconds={this.state.duration} /></div> 
                        </div>
                    </div>
                </div> 
                <ReactPlayer 
                    ref={this.ref}
                    className='react-player' 
                    url={`${END_POINT}${id}`}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    playing={player}
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.onEnded}
                    onError={e => console.log('onError', e)}
                    /> 
            </div> 
        );
        
    }
    render() {
        return (
            <div className="player">
                 {this.renderPlayer()}
            </div>
        )
    
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
    return bindActionCreators({gestionLecteur, nextSongs,},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);