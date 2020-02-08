

import React, { Component, ReactDOM } from 'react'
import './index.css'

import ChessMan from '../ChessMan'

export default class ChessBoard extends Component {

  mapArr = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]

  selectedChessMan = null

  handleChessManClick = (type, row, col)=>{
    if(!this.selectedChessMan)
    {
      this.selectedChessMan = {
        type, row, col
      };
    } else {
      const { type1, row:row1, col:col1 } = this.selectedChessMan

      if(type1 === 0)
        return
      if(row1 === row && col1 === col)
        return

      if(type1 === type)
        return
      
      //change
      this.mapArr[row1][col1] = 0
      this.mapArr[row][col] = type

      ReactDOM.findDOMNode(this.refs[`${row1}-${col1}`])
  
      // this.setState({
      //   mapArr
      // })
      
      this.selectedChessMan = null
    }
  }

  render() {
    return (
      <div id="board">
      {
        this.mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <div className='cell' key={`${row}-${col}`}>
            <ChessMan ref={`${row}-${col}`}
              roleType={this.mapArr[row][col]} 
              row={row} col={col} 
              onClick={this.handleChessManClick}/>
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
