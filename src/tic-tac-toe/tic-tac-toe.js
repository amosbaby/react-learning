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

function Board(props) {

  function renderSquare (i){
    return <Square value={props.squares[i]} onClick={()=>props.onClick(i)}/>;
  } 

  const winner =  calculateWinner(props.squares)
  const status = winner ? 'Winner is: ' + winner : 'Next player: ' + (props.xIsNext ? 'X' : 'O');
  
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );

}

export class Game extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      history:[{
        squares: Array(9).fill(null),
      }],
      xIsNext: true // ，判断下一步是X还是O
    }
  }

  handleClick(index){
    // 保证数据的不可变性
    const history = this.state.history.slice()
    const current = history[history.length - 1]
    if(calculateWinner(current.squares) || current.squares[index]){
      return
    }
    current.squares[index] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat({
        squares: current.squares
      }),
      xIsNext: !this.state.xIsNext
    })
    console.log(this.state.history)
  }
  render() {

    const history = this.state.history
    const current = history[history.length - 1]

    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={this.state.xIsNext} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
