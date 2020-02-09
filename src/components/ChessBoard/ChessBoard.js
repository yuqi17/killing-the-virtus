

import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
import ChessMan from '../ChessMan/ChessMan'


// update state  to render 不能和直接操作dom动画同时存在
// 点击格子而不是棋盘和棋子事件保证准确触发
// 二维数组若要做备忘录模式，需要深拷贝[...arr],slice(0) 都是浅拷贝
// 事件是先从子元素开始冒泡的,如果子元素停止冒泡,父组件同样的事件不会触发
// js 无法多线程操作,不可能存在两个关联的动画
// 鼠标的client 坐标是相对于页面可视区说的

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
  edgeArr = []

  componentDidMount(){
    for(let row = 0;row < LENGTH;row++){
      for(let col = 0;col < LENGTH;col++){
        if(this.mapArr[row][col] === 1){
          this.edgeArr.push({row,col})
        }
      }
    }
  }

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
      
      if(type1 === 0)//先点击空白格子，没有意义
      {
        this.selectedChessMan = null
        return console.log('0')
      }

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

  process(direction, i){
    if(direction < 0){
      if(this.memo.length - i < 0){
        this.count = 1
        return true
      }
      this.memoLastStep(this.memo.length - i)
    } else{
      if(i - 1 >= this.memo.length){
        this.count = 1
        return true
      }
      this.memoNextStep(i - 1)
    }
    return false
  }

  count = 1

  startMemo = (direction, play) =>{
    if(play === 1){
      const timer = setInterval(() => {
        if(this.process(direction, this.count))
        {
          this.count = 1
          window.clearInterval(timer)
        } else {
          this.count++;
        }
      }, 300);
    } else {
      if(!this.process(direction, this.count))
        this.count ++;
    }
  }


  dictArr = []

  takeSnapshot(){
    const dict = []
    for(let row = 0;row < LENGTH;row++){
      for(let col = 0;col < LENGTH;col++){
        if((row > 4 && row < LENGTH - 4 - 1 )&& (col > 4 && col < LENGTH - 4 - 1) && this.mapArr[row][col] === 1){
          dict.push({row,col})
        }
      }
    }
    this.dictArr.push(dict)
    console.log(this.dictArr)
  }

  // 随机自定个数的二维数组项
  getRandomArr(arr , size){
    const { random, floor } = Math;
    const box = []
    const unique = {}
    // 二维随机的想法
    // const x = floor(random() * arr.length)
    // const y = floor(random() * arr.length)
    // const { row, col }  = arr[x][y]
    
    while(box.length !== size){
      const { row, col } = arr[floor(random() * arr.length)]
      if(!unique[`${row}${col}`])
        box.push({row, col})
    } 
    return box;
  }


  autoPlay(){
    // const total = this.dictArr.reduce((sum, cur) => sum + cur.length, 0)
    // 总随机边缘项
    // const randomEdgeArr = this.getRandomArr(this.edgeArr, total)
    // let i = 0
    // while(i < this.dictArr.length){
    //   // 第一个字
    //   let word = this.dictArr[i]
    //   // 笔画用定时器取出
    //   let j = 0

    //     while(j < word.length)// 执行移动操作
    //     {
    //       const { row:row1 , col:col1 } = randomEdgeArr[j]
    //       const {  row , col } = word[j]
          
    //       const view = ReactDOM.findDOMNode(this.refs[`${row1}-${col1}`])
    //       console.log(view, row1 , col1,row , col)
          
    //       this.moveChessMan(view, row1 , col1)
    //       this.moveChessMan(view, row , col)

    //       j ++;
    //     }

    //   i++
    // }
  }

  render() {
    return (
      <div id="board" style={{height:`${BOARD_SIZE}px`, width:`${BOARD_SIZE}px`}}>
      {
        this.mapArr.map((_,col)=><div className='col' key={col}>
        {
          _.map((_,row) => <div onClick={this.handleChessBoardCellClick} className='cell' id={`${row}-${col}`} ref={`${row}-${col}`} key={`${row}-${col}`}>
            <ChessMan size={CELL_SIZE} roleType={this.mapArr[row][col]}/>
          </div>)
        }
        </div>)
      }
      </div>
    )
  }
}
