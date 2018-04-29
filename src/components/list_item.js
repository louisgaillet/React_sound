import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {addToCurrentList, addToCurrentSong} from "../actions/index"

class ListItem extends Component{
    constructor(props){
        super(props);
        const {clickOnItem} = this.props;
        this.state = {
            dropdownVisible :false
        }
    }

    playAndAdd(item){
        this.props.addToCurrentList(item);
        this.props.addToCurrentList(item);
    }

    play(item){
        this.props.addToCurrentSong(item);
    }

    addToCurrentList(item){
        this.props.addToCurrentList(item);
    }

    render(){
        const result = this.props.result;
        const {clickOnItem} = this.props;

        if(!clickOnItem){
            return(
                <li className="list-group-item  track d-flex flex-row align-items-center">
                    <span className="play layout vertical center center-center"
                        onClick={(e) => this.play(this.props.result)}>
                        <i className="fa fa-play"></i>
                    </span>  
                    <span className=""> 
                        <span className="wrapper-image">
                            <img className="small-picture" src={result.snippet.thumbnails.default.url}/>
                        </span> 
                    </span>
                    <span className="track__title text-truncate large">
                        {result.snippet.title.toLowerCase()}    
                    </span>
                    <button className="no-background no-border text-white ml-1 options"
                    onClick={(e) => this.addToCurrentList(this.props.result)}>
                    <i className="fas fa-hand-point-right"></i>
                    </button>
                    <button className="no-background no-border text-white ml-1 options"
                    onClick={(e) => this.props.menuContext(this.props.result)}>
                    <i className="fas fa-plus"></i>
                    </button>
                </li>
            )
        }else{
            return(
                <li className="list-group-item  track d-flex flex-row align-items-center"
                onClick={(e) => this.play(this.props.result)}> 
                    <span className=""> 
                        <span className="wrapper-image">
                            <img className="small-picture" src={result.snippet.thumbnails.default.url}/>
                        </span> 
                    </span>
                    <span className="track__title">
                        {result.snippet.title.toLowerCase()}    
                    </span>
                </li>
            )
        }
    }
};

function mapStateToProps(state) {
    return {
        play: state.play
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCurrentList, addToCurrentSong},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);