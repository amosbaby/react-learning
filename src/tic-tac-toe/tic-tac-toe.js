import React   from "react";

import './tic-tac-toe.css'

/** 
 * 函数组件：不需要继承React.Component,接收一个props，仅需要返回一个render组件元素就行了。
*/
function Square(props) {
    return (
      <button className="square" onClick={()=>props.onClick()}>
        { props.value }
      </button>
    );
}

class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      step: 0 // 记录当前步数，判断下一步是X还是O
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)}/>;
  }

  handleClick(index){
    // 保证数据的不可变性
    const squares = this.state.squares.slice()
    if(squares[index] === null){
      const step = this.state.step + 1
      squares[index] = step % 2 ? 'X' : 'O'
      this.setState({
        step,squares
      })
    }
  }

  

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
