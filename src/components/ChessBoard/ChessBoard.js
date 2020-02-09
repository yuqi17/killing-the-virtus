

import React, { Component } from 'react'
import './index.css'
import ChessMan from '../ChessMan/ChessMan'


// update state  to render 不能和直接操作dom动画同时存在
// 点击格子事件保证准确触发
// 二维数组若要做备忘录模式，需要深拷贝[...arr],slice(0) 都是浅拷贝
// 事件是先从子元素开始冒泡的,如果子元素停止冒泡,父组件同样的事件不会触发

const LENGTH = 26
const CELL_SIZE = 25;
const BOARD_SIZE = CELL_SIZE * LENGTH;


export default class ChessBoard extends Component {

  mapArr = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    
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
    this.moveChessMan(chessManView, row, col)
  }

  moveChessMan = (chessManView, row, col)=>{
    
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
              op: 'init'
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
              op: 'move',
              path:this.selectedChessMan.view.style.transform
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
              op: 'move',
              path:this.selectedChessMan.view.style.transform
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

  memoLastStep(i){
      const { actions, map } = this.memo[i]

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

  moveForward(target, path){
    target.style.transform = path
  }

  memoNextStep(i){
    const { actions, map } = this.memo[i]
    this.mapArr = map
    actions.forEach(action =>{
      const { target, op, path } = action
      if(op === 'kill')
      {
        target.style.display = 'block'
      } else {
        this.moveForward(target, path)
      }
    })
  }

  startMemo = (direction) =>{
    let i = 1
    const timer = setInterval(() => {
      if(direction < 0){
        if(this.memo.length - i < 0){
          return window.clearInterval(timer)
        }
        this.memoLastStep(this.memo.length - i)
      } else{
        if(i - 1 === this.memo.length){
          return window.clearInterval(timer)
        }
        this.memoNextStep(i - 1)
      }
      i++;
    }, 1000);
  }

  render() {
    return (
      <div id="board" style={{height:`${BOARD_SIZE}px`, width:`${BOARD_SIZE}px`}}>
      {
        this.mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <div onClick={this.handleChessBoardCellClick} className='cell' key={`${row}-${col}`}>
            <ChessMan size={CELL_SIZE} roleType={this.mapArr[row][col]}/>
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
