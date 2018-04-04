import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {getData} from "../actions/index"

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:this.props.data,
         }
    }

    componentWillMount(){
        this.props.getData()
    }

    search(e){
        console.log(e);
    }

    render(){
        return (
            <div>
                <input type="text" onChange={(e) => this.search(e)}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)