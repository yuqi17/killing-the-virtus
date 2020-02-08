

import React, { Component } from 'react'
import './index.css'

import ChessMan from '../ChessMan'

export default class ChessBoard extends Component {

  state = {
    mapArr:[
      [1, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
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
        mapArr.map((_,col)=><div className='col'>
        {
          _.map((_,row) => <div className='cell'>
            <ChessMan roleType={mapArr[row][col]}/>
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
