import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {gestionLecteur,nextSongs, prevSongs, initApp} from '../actions/index'
import ReactTouchEvents from "react-touch-events";
import BarProgress from '../components/player/bar_progress'
import Duration from '../components/player/duration'
import {Link } from 'react-router-dom'
import * as routes from '../config/routes'


import DetailCurrent from '../components/player/detail_current'
import MobilePlayer from './mobilePlayer';
const END_POINT = "https://www.youtube.com/watch?v="

class  Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            played : 0,
            duration : 0,
            togglePlayerMobile : false,
          }
    }

    ref = player => {
        this.player = player
    }

    componentWillMount(){
        console.log('player')
        // this.props.initApp();
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

    onSeekMouseDown = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onDuration = (duration) => {
        this.setState({ duration : this.player.getDuration()})
        console.log(this.player.getDuration())
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

    togglePlayerMobile = () => {
        this.setState({togglePlayerMobile: !this.state.togglePlayerMobile
        })
    }

    renderPlayer(){
        const {currentList} = this.props;
        let {currentSong} = this.props;
        const{playlists} = this.props;
        var {player} = this.props;
        var style = {
            width: (this.state.played * 100 + '%')
        }
        if(playlists){
            if(currentSong == false){
                const firstPlaylist = playlists.playlists[Object.keys(playlists.playlists)[0]].songs;
                currentSong = firstPlaylist[Object.keys(firstPlaylist)[0]];
                // this.props.addToCurrentList(currentSong);
            } 
        }
        if(currentSong){
            var id = currentSong.id.videoId;
            return ( 
                <div>
                    <MobilePlayer 
                        visibility={this.state.togglePlayerMobile} 
                        duration={this.state.duration} 
                        played={this.state.played}
                        onSeekMouseDown={this.onSeekMouseDown} 
                        onSeekChange={this.onSeekChange} 
                        onSeekMouseUp={this.onSeekMouseUp} 
                        togglePlayerMobile={this.togglePlayerMobile}/>
                    <div className="current-track">
                        <div>
                        {currentSong ?
                        <span className="d-none d-block d-md-none text-white openMobilePlayer" onClick={this.togglePlayerMobile}>
                            <i className="fa fa-chevron-up"></i>
                        </span>: '' }  
                        </div>
                        <ReactTouchEvents
                            onSwipe={ this.handleSwipe.bind(this) }
                        >
                            <div className="current-track__left col-xs-6 col-md-4 ">                    
                                <DetailCurrent currentDetail={currentSong}/>
                            </div>
                        </ReactTouchEvents>
                        <div className="current-track__actions  col-xs-6 col-md-4 ">
                            <div className="player-controls_buttons">
                                <a onClick={this.prev} className="prev"><i className="fa fa-step-backward"></i></a>
                                <a className="play" onClick={this.playPause}>
                                    {!player? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>}
                                </a>
                                <a  onClick={this.next} className="next"><i className="fa fa-step-forward"></i></a>  
                            </div>
                            <div className="playback-bar d-flex justify-content-between align-items-center hidden_xs">
                                <BarProgress 
                                    duration={this.state.duration} 
                                    played={this.state.played} 
                                    onSeekMouseDown={this.onSeekMouseDown} 
                                    onSeekChange={this.onSeekChange} 
                                    onSeekMouseUp={this.onSeekMouseUp}/>
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
                        onEnded={this.next}
                        onError={e => console.log('onError', e)}
                        /> 
                </div> 
            );
    }
        
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
        playlists : state.playlists,
        player : state.player,
        contextLecteur : state.contextLecteur 
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({gestionLecteur,initApp, nextSongs,prevSongs},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);