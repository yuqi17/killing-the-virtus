import React, { Component } from 'react'

export default class ChessMan extends Component {

  render() {
    const { roleType } = this.props;

    if(roleType === 1)
      return <div>
        @@
      </div>

    return (
      <div>
        !!
      </div>
    )
  }
}
