

import React, { Component } from 'react'
import './index.css'
import ChessMan from '../ChessMan'

const CELL_SIZE = 60;

// update state  to render 不能和直接操作dom动画同时存在

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

  // 用点击格子保证准确触发
  handleChessBoardCellClick = (e)=>{
    const col = Math.floor(e.clientX / CELL_SIZE)
    const row = Math.floor(e.clientY / CELL_SIZE)
    if(!this.selectedChessMan)
    {
      this.selectedChessMan = {
        view:e.currentTarget.firstChild,
        type:this.mapArr[row][col], row, col
      };
    } else {

      const type = this.mapArr[row][col];
      const { type:type1, row:row1, col:col1 } = this.selectedChessMan
      
      console.log(row1, col1, row, col)
      if(row1 === row && col1 === col){
        this.selectedChessMan = null
        return console.log('1')
      }
        
      if(type1 === type){
        this.selectedChessMan = null
        return console.log(2)
      }

      console.log(this.mapArr)
      //change
      this.mapArr = this.calc(this.mapArr, row1, col1, row, col)
      console.log(this.mapArr)

      this.selectedChessMan.view.style.transform += `translate(${(col - col1) * CELL_SIZE}px,${(row - row1) * CELL_SIZE}px)`
      this.selectedChessMan = null
    }
  }


  render() {
    return (
      <div id="board">
      {
        this.mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <div onClick={this.handleChessBoardCellClick} className='cell' key={`${row}-${col}`}>
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
