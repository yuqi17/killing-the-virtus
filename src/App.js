import ChessBoard from './components/ChessBoard/ChessBoard';
import React, { Component } from 'react'

export default class App extends Component {

  handleBackClick = () => {
    this.refs.board.startMemo(-1)
  }

  handleForwardClick = () => {
    this.refs.board.startMemo(1)
  }

  render() {
    return (
      <div className="App">
        <ChessBoard ref='board'/>
        <button onClick={this.handleBackClick}>back</button>
        <button onClick={this.handleForwardClick}>forward</button>
      </div>
    )
  }
}

