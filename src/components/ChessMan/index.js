import React, { Component } from 'react'

import './index.css'

const roles = {
  0:'ground',
  1:'bat',
  2:'swords'
}

export default class ChessMan extends Component {

  render() {
    const { roleType } = this.props;
    return (
      <div className={`chessMan ${roles[roleType]}`}/>
    )
  }
}
