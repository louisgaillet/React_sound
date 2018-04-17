import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {addToCurrentList} from "../actions/index"

class ListItem extends Component{
    constructor(props){
        super(props);
        const {clickOnItem} = this.props;
    }

    play(item){
        console.log('yoo');
        this.props.addToCurrentList(item);
    }

    render(){
        const result = this.props.result;
        const {clickOnItem} = this.props;
        return(
            <li 
                className="list-group-item  track d-flex flex-row align-items-center">
            {!clickOnItem ? 
                    <span className="play layout vertical center center-center"
                        onClick={(e) => this.play(this.props.result)}>
                        <i className="fa fa-play"></i>
                    </span>  
            :''} 
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
};

function mapStateToProps(state) {
    return {
        play: state.play
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCurrentList},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);