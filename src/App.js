import ChessBoard from './components/ChessBoard/ChessBoard';
import React, { Component } from 'react'

export default class App extends Component {

  handleBackClick = () => {
    this.refs.board.startMemo(-1,0)
  }

  handleForwardClick = () => {
    this.refs.board.startMemo(1,0)
  }

  handleBackPlayClick = () => {
    this.refs.board.startMemo(-1,1)
  }

  handleForwardPlayClick = () => {
    this.refs.board.startMemo(1,1)
  }

  handleTakeSnapshotClick = ()=> {
    this.refs.board.takeSnapshot()
  }

  handleAutoPlay = () => {
    this.refs.board.autoPlay()
  }


  render() {
    return (
      <div className="App">
        <ChessBoard ref='board'/>
        <div className='controlBar'>
          <button onClick={this.handleBackClick}>上一步</button>
          <button onClick={this.handleForwardClick}>下一步</button>
          <button onClick={this.handleBackPlayClick}>过程反演</button>
          <button onClick={this.handleForwardPlayClick}>过程正演</button>
          {/* <button onClick={this.handleTakeSnapshotClick}>编排快照</button>
          <button onClick={this.handleAutoPlay}>自动编排演示</button> */}
        </div>
      </div>
    )
  }
}

