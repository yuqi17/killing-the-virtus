import React, { Component } from 'react'

import './index.css'

const roles = {
  0:'ground',
  1:'bat',
  2:'swords'
}

export default class ChessMan extends Component {

  handleClick = (e)=>{
    const { roleType, row, col } = this.props;
    this.props.onClick(roleType, row, col)
  }

  render() {
    const { roleType } = this.props;
    return (
      <div onClick={this.handleClick} className={`chessMan ${roles[roleType]}`}/>
    )
  }
}
