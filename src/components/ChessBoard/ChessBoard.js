

import React, { Component } from 'react'
import './index.css'
import ChessMan from '../ChessMan/ChessMan'

const CELL_SIZE = 60;

// update state  to render 不能和直接操作dom动画同时存在
// 点击格子事件保证准确触发
// 二维数组若要做备忘录模式，需要深拷贝[...arr],slice(0) 都是浅拷贝
// 事件是先从子元素开始冒泡的,如果子元素停止冒泡,父组件同样的事件不会触发

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
  memo = []

  calc(arr, row1,col1,row,col){
    const newArr = JSON.parse(JSON.stringify(arr))//arr.slice(0)//[...arr];
    newArr[row][col] = newArr[row1][col1]
    newArr[row1][col1] = 0
    return newArr
  }

  handleChessBoardCellClick = (e)=>{
    
    const col = Math.floor(e.clientX / CELL_SIZE)
    const row = Math.floor(e.clientY / CELL_SIZE)
    const chessManView = e.currentTarget.firstChild
    if(!this.selectedChessMan)
    {
      this.selectedChessMan = {
        view:chessManView,
        type:this.mapArr[row][col], row, col
      };
    } else {

      const type = this.mapArr[row][col];
      const { type:type1, row:row1, col:col1 } = this.selectedChessMan
      
      if(row1 === row && col1 === col){
        this.selectedChessMan = null
        return console.log('1')
      }
        
      if(type1 === type){
        this.selectedChessMan = null
        return console.log('2')
      }

      
      if(this.memo.length === 0){
        this.memo.push({
          map:this.mapArr,
          actions:[
            {
              target:this.selectedChessMan.view,
              op: 'move'
            }
          ]
        })
      }
      
      //change data
      this.mapArr = this.calc(this.mapArr, row1, col1, row, col)
      //change view
      this.selectedChessMan.view.style.transform += `translate(${(col - col1) * CELL_SIZE}px,${(row - row1) * CELL_SIZE}px)`
      if(type !== 0){
        chessManView.style.display = 'none'
        this.memo.push({
          map:this.mapArr,
          actions:[
            {
              target:this.selectedChessMan.view,
              op: 'move'
            },
            {
              target:chessManView,
              op:'kill'
            },
          ]
        })
      }
      else{
        this.memo.push({
          map:this.mapArr,
          actions:[
            {
              target:this.selectedChessMan.view,
              op: 'move'
            }
          ]
        })
      }
      this.selectedChessMan = null
    }
  }

  moveBack(target){
    const arr = target.style.transform.replace(/, /g,'*').split(' ')
    arr.pop()
    target.style.transform = arr.map(t => t.replace('*', ',')).join(' ')
  }

  memoLastStep(){
      const { actions, map } = this.memo.pop()

      this.mapArr = map

      actions.forEach(action =>{
        const { target, op} = action
        if(op === 'kill')
        {
          target.style.display = 'block'
        } else {
          this.moveBack(target)
        }
      })
  }

  startMemo = () =>{
    console.log(this.memo.length)
    const timer = setInterval(() => {
      if(this.memo.length === 0){
        return window.clearInterval(timer)
      }
      this.memoLastStep()
    }, 1000);
  }

  render() {
    return (
      <div id="board">
      {
        this.mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <div onClick={this.handleChessBoardCellClick} className='cell' key={`${row}-${col}`}>
            <ChessMan roleType={this.mapArr[row][col]}/>
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
