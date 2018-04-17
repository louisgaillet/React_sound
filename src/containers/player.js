import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Nouislider from 'react-nouislider';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {gestionLecteur} from '../actions/index'
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
        var {player} = this.props;
        if(currentList.length >= 1 ){
            var id = currentList[0].id.videoId;
        }else{
            var id = 'oUFJJNQGwhk';
        }
        return ( 
            <div>
                <div className="current-track">
                    <div className="current-track__left">
                        <DetailCurrent currentDetail={currentList[0]}/>
                    </div>
                    <div className="current-track__actions">
                        <div className="player-controls_buttons">
                            <a><i className="fa fa-step-backward"></i></a>
                            <a className="play" onClick={this.playPause}>
                                {!player? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>}
                            </a>
                            <a><i className="fa fa-step-forward"></i></a>  
                        </div>
                        <div className="playback-bar d-flex justify-content-between ">
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
                                <progress  max={1} value={this.state.played} />
                            </div>
                            <div className="playback-bar__progress-time"> <Duration seconds={this.state.duration} /></div> 
                        </div>
                    </div>
                
                    <div className="current-track__right"></div>
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
        player : state.player
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({gestionLecteur},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);