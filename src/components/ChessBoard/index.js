

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import ChessMan from '../ChessMan'

const CELL_SIZE = 60;

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

  calc(arr, row1,col1,row,col){
    const newArr = JSON.parse(JSON.stringify(arr))//arr.slice(0)//[...arr];
    newArr[row][col] = newArr[row1][col1]
    newArr[row1][col1] = 0
    return newArr
  }

  handleChessManClick = (row, col)=>{
    console.log(row,col)
    if(!this.selectedChessMan)
    {
      console.log(this.mapArr)
      console.log(row, col,this.mapArr[row][col],'=====')
      this.selectedChessMan = {
        type:this.mapArr[row][col], row, col
      };
    } else {
      console.log(this.mapArr)
      const type = this.mapArr[row][col];
      const { type:type1, row:row1, col:col1 } = this.selectedChessMan
      if(row1 === row && col1 === col)
        return console.log('2')
      if(type1 === type)
        return console.log('3',type1, type)
      
      //change
      this.mapArr = this.calc(this.mapArr, row1, col1, row, col)
      console.log(this.mapArr)
      const dom = ReactDOM.findDOMNode(this.refs[`${row1}-${col1}`])
      dom.style.transform = `translate(${(col - col1) * CELL_SIZE}px,${(row - row1) * CELL_SIZE}px)`
      this.selectedChessMan = null
    }
  }

  render() {
    return (
      <div id="board">
      {
        this.mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <div className='cell' onClick={()=>this.handleChessManClick(row,col)} key={`${row}-${col}`}>
            <ChessMan ref={`${row}-${col}`}
              roleType={this.mapArr[row][col]} 
              />
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
