import React, { Component } from 'react'

import './index.css'

const roles = {
  0:'',
  1:'bat',
  2:'swords'
}

export default class ChessMan extends Component {

  handleClick = (e)=>{
    // e.stopPropagation();
    const { roleType } = this.props;
    this.props.onClick(roleType)
  }

  render() {
    const { roleType } = this.props;
    return (
      <div onClick={this.handleClick} className={roles[roleType]}/>
    )
  }
}
