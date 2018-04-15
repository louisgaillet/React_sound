import React from 'react';

const DetailCurrent = (props) => {
    const {currentDetail} = props;
    if(currentDetail){
        return (
            <div className="layout horizontal">
                <img className="medium-picture" src={currentDetail.snippet.thumbnails.default.url}/>
                <span className="track__title layout vertical center-center">
                    {currentDetail.snippet.title.toLowerCase()}    
                </span>
            </div>
        );
    }else{
        return (
            <div>
               
            </div>
        );
    }
}

export default DetailCurrent