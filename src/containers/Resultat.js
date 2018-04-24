import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {getData} from "../actions/index"
import ListItem from "../components/list_item"

class Resultat extends Component{
    constructor(props){
        super(props);
        this.state = {
            menuContext : false,
            menuPositon : {

            }
        }
    }

    menuContext(e){
        console.log(e.target);
        var xPosition = e.clientX;
        var yPosition = e.clientY;
        console.log(xPosition);
        console.log(yPosition);
        
        this.setState({
            menuContext : !this.state.menuContext,
            menuPositon : {top: yPosition - 50}
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
        if(this.state.menuContext === true){
            return (
                <div className="context-menu" style ={this.state.menuPositon}>
                    Menu        
                </div>
            )
        }
    }

    render(){
        return (
            <div className="tracks">
             {this.renderMenuContext()}
                <ul className="list-group">
                    {this.renderResult()}
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        results: state.data
    }
}


export default connect(mapStateToProps)(Resultat)