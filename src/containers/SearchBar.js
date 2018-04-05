import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {getData} from "../actions/index"

class SearchBar extends Component{
    constructor(props){
        super(props);
    }

    search(e){
        this.props.getData(e.target.value)
    }
    
    
    render(){
        return (
            <div>
                <input type="text" onChange={(e) => this.search(e)}/>
                <div>
                    {this.props.results.map((result) => {
                                return <p key={result.id.cideoId}>{result.snippet.title}</p>
                            })}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        results: state.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)