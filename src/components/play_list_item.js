import React from 'react'
import {Link } from 'react-router-dom'
import * as routes from '../config/routes'

const PlayListItem = (props) => (
  <div>{props.style ?
    <li className="list-group-item bg-transparent">
    <Link to={`${routes.DETAILPLAYLIST}/${props.id}`}>{props.name}</Link></li>
    : <p onClick={(e) => props.callback(props.id)}>{props.name}</p>
  }
  </div>
)

export default PlayListItem
