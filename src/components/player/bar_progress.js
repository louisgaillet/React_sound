import React from 'react';
import Duration from './duration'

const BarProgress = ({duration, played, onSeekMouseDown, onSeekChange, onSeekMouseUp}) => {
        return (
            <div className="layout horizontal flex center">
                <div className="playback-bar__progress-time"> <Duration seconds={duration * played} /></div>
                <div className="custom-progress-bar flex">
                    <input
                        className = "with-progress"
                        type='range' min={0} max={1} step='any'
                        progess max = {1}
                        value={played}
                        onMouseDown={onSeekMouseDown}
                        onChange={onSeekChange}
                        onMouseUp={onSeekMouseUp}
                    />
                    <div className="progress">
                        <div className="progress-bar  bg-success" role="progressbar" style={{width :played * 100 + '%'}} aria-valuenow={played *100} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div className="playback-bar__progress-time"> <Duration seconds={duration} /></div>
            </div>
        );
}

export default BarProgress;