import ChessBoard from './components/ChessBoard/ChessBoard';
import React, { Component } from 'react'

export default class App extends Component {

  handleClick = () => {
    this.refs.board.startMemo()
  }

  render() {
    return (
      <div className="App">
        <ChessBoard ref='board'/>
        <button onClick={this.handleClick}>反演</button>
      </div>
    )
  }
}

