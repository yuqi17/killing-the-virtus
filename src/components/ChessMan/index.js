import React, { Component } from 'react'

import './index.css'

const roles = {
  0:'',
  1:'bat',
  2:'soilder'
}

export default class ChessMan extends Component {

  render() {
    const { roleType } = this.props;

    return (
      <div className={roles[roleType]}>
        !!
      </div>
    )
  }
}
