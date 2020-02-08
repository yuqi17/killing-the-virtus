

import React, { Component } from 'react'
import './index.css'

import ChessMan from '../ChessMan'

function Cell({row,col,onClick,children}){
  return <div className='cell' onClick={()=>onClick(row,col)}>{children}</div>
}

export default class ChessBoard extends Component {

  state = {
    mapArr:[
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

  handleCellClick = (row,col) => {
    console.log(row,col)
  }

  handleChessManClick = (type)=>{
    console.log(type)
  }

  render() {
    const { mapArr } = this.state;
    return (
      <div id="board">
      {
        mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <Cell onClick={this.handleCellClick} row={row} col={col} key={`${row}-${col}`}>
            <ChessMan roleType={mapArr[row][col]} onClick={this.handleChessManClick}/>
          </Cell>)
        }
        </div>)
      }
      </div>
    )
  }
}
