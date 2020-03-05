

import io from "socket.io-client";
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ChessMan from '../ChessMan/ChessMan'

const names = {
  1: '蝙蝠',
  2: '骑士'
}

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

  myRole = 1
  turn = 1
  selectedChessMan = null
  socket = null
  nickname = null
  receiver = null

  componentDidMount() {

    // 下面这个写法链接不上，还必须有path
    // var socket = io.connect(`http://localhost:3001/game`)

    this.nickname = prompt("Please enter your name","")

    this.socket = io('http://192.168.1.16:8080/game',{
      query:{
        nickname:this.nickname
      }
    });

    this.socket.on('connection', data =>{
      console.log(data)
    })

    this.socket.on('offline', function (data) {
      console.log(data)
    });

    this.socket.on('identified-receiver',  ({ role, receiver }) =>{
      this.myRole = role
      this.receiver = receiver
      this.forceUpdate()
    });

    this.socket.on('message',  data => {
      this.receiveData(data)
    });
  }

  /**
   * 
   * {
   *  receiver,
   *  type:move|turn,
   *  data:{
   *      row,col | turn,
   *  }
   * }
   */
  receiveData({ type, data }) {
    if (type ==='choose') {
      const { row, col } = data
      this.moveChessMan(row, col)
    } else if (type === 'move') {
      const { row, col } = data
      this.moveChessMan(row, col)
    } else if(type === 'notification'){
      alert(data.message)
    }
  }

  handleChessBoardCellClick = e => {

    if (this.myRole !== this.turn) {
        return console.log('不该你先走')
    }

    const col = Math.floor(e.clientX / CELL_SIZE)
    const row = Math.floor(e.clientY / CELL_SIZE)
    const type = this.mapArr[row][col];

    if(!this.selectedChessMan && type !== this.myRole){
        return console.log('不可移动非你移动的棋子')
    }
    const step = this.moveChessMan(row, col)
    if(!step)return;
    if(step === 1){
      this.socket.emit('message',{
        type:'choose',
        receiver: this.receiver,
        data:{
          row,
          col
        }
      })
    }
    else if(step === 2){//如果step = 2 还要发送轮流的标志
      this.socket.emit('message',{
        type:'move',
        receiver: this.receiver,
        data:{
          row,
          col
        }
      })
    }
  }


  moveChessMan = (row, col) => {
    
    const chessManView = ReactDOM.findDOMNode(this.refs[`${row}-${col}`]).firstChild//e.currentTarget.firstChild
    const type = this.mapArr[row][col];

    if (!this.selectedChessMan) {
      this.selectedChessMan = {
        view: chessManView,
        type, 
        row, 
        col
      };

      return 1// 第一步
    } else {
      const { type: type1, row: row1, col: col1 } = this.selectedChessMan
      if (type1 === 0)//先点击空白格子，没有意义
      {
        this.selectedChessMan = null
        return console.log('不可先点击空白位置')
      }

      if (row1 === row && col1 === col) {
        this.selectedChessMan = null
        return console.log('没有移动')
      }
    //   if (type1 === type) {
    //     this.selectedChessMan = null
    //     return console.log('同角色不可叠加')
    //   }

      const dx = col1 - col
      const dy = row1 - row
      const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

      if (distance > 1 && distance < 2) {
        this.selectedChessMan = null
        return console.log('非法移动')
      }

      if (distance > 2) {
        this.selectedChessMan = null
        return console.log('不可斜走')
      }

      if (type1 === 1) {
        if (distance === 2) {
          this.selectedChessMan = null
          return console.log('蝙蝠不可大于2步')
        }
        if (type === 2) {
          this.selectedChessMan = null
          return console.log('不能吃')
        }
      }

      if (type1 === 2) {

        if (distance === 2 && type !== 1) {
          this.selectedChessMan = null
          return console.log('不能吃')
        }
        if (distance === 1 && type === 1) {
          this.selectedChessMan = null
          return console.log('一步不能吃')
        }
      }

      //change data
      this.mapArr[row][col] = this.mapArr[row1][col1]
      this.mapArr[row1][col1] = 0
      this.turn = this.turn === 1 ? 2 : 1

      //change view
      this.forceUpdate()

      // check win
      const role = this.checkWin(this.mapArr)
      if (role !== 0) {
        const message = names[role] + ' wined'
        alert(message)
        this.socket.emit('message',{
          type:'notification',
          receiver: this.receiver,
          data:{
            message
          }
        })
      }

      this.selectedChessMan = null
      return 2
    }
  }


  updatedMapArr(arr, row1, col1, row, col) {
    const newArr = JSON.parse(JSON.stringify(arr))//arr.slice(0)//[...arr];
    newArr[row][col] = newArr[row1][col1]
    newArr[row1][col1] = 0
    return newArr
  }

  checkWin(arr) {
    const amtMonster = arr.flat().filter(item => item === 1).length
    if (amtMonster < 4) {
      return 2
    }
    let sum = 0;
    const len = arr.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (arr[i][j] === 2) {
          if (i - 1 >= 0 && arr[i - 1][j] !== 0) {
            sum += 1
          }
          if (i + 1 < len && arr[i + 1][j] !== 0) {
            sum += 1
          }
          if (i - 1 >= 0 && arr[i][j - 1] !== 0) {
            sum += 1
          }
          if (i + 1 < len && arr[i][j + 1] !== 0) {
            sum += 1
          }
        }
      }
    }

    if (sum === 8) {
      return 1
    }

    return 0
  }

  
  render() {
    return (
      <div>
        <div id="board">
          {
            this.mapArr.map((_, col) => <div className='col' key={col}>
              {
                _.map((_, row) => <div onClick={this.handleChessBoardCellClick} className='cell' ref={`${row}-${col}`} key={`${row}-${col}`}>
                  <ChessMan roleType={this.mapArr[row][col]} />
                </div>)
              }
            </div>)
          }
        </div>
        <div>
            <p>昵称：{this.nickname}</p>
            <p>角色：{names[this.myRole]}</p>
            <p>对手：{this.receiver}</p>
            <p>谁走：{names[this.turn]}</p>
        </div>
      </div>
      
    )
  }
}
