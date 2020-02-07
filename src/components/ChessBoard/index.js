

import React, { Component } from 'react'
import './index.css'

import ChessMan from '../ChessMan'

export default class ChessBoard extends Component {

  state = {
    mapArr:[
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

  render() {
    const { mapArr } = this.state;
    return (
      <div id="board">
      {
        mapArr.map((row,i)=><div className='row'>
        {
          row.map((cell,j) => <div className='cell'>
            <ChessMan roleType={cell}/>
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
