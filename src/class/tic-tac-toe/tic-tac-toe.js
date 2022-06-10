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
    return <Square key={i} value={props.squares[i]} onClick={()=>props.onClick(i)}/>;
  } 

  
  const rows = Array(3).fill(0).map((_,rowIndex)=> {
    const cols =  Array(3).fill(0).map((_,colIndex) => renderSquare(rowIndex * 3 + colIndex) )
    return (
      <div className="board-row" key={rowIndex}>
        {cols}
      </div>
    )
  } )

  return (
    <div>
      { rows }
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
      move:0,
      xIsNext: true // ，判断下一步是X还是O
    }
  }

  handleClick(index){
    // 保证数据的不可变性,如果返回到某一步再走一步，则之前的记录失效了，因此只截取最新的
    const history = this.state.history.slice(0,this.state.move + 1)
    const squares = history[history.length - 1].squares.slice()
    if(calculateWinner(squares) || squares[index] || this.state.move < history.length - 1){
      return
    }
    squares[index] = this.state.xIsNext ? 'X' : 'O'
    this.setState((state)=>{
      return {
        history: history.concat({
          squares
        }),
        xIsNext: !state.xIsNext,
        move: history.length
      }
    })
  }

  /**
   * 跳转到指定步骤
   * @param {*} move 
   */
  jumpTo(move){
    this.setState({move,xIsNext: move % 2 === 0})
  }

  render() {
    
    const {history,move} = this.state
    const current = history[move]
    const winner =  calculateWinner(current.squares)
    const status = winner ? 'Winner is: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    const moves = history.map((_,move)=>{
      const desc = move ? 'Go to move# ' + move : 'Go to game start'
      return (
        <li key={desc}>
          <button onClick={()=>this.jumpTo(move)}> { desc } </button>
        </li>
      )
    })
    
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={this.state.xIsNext} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{ moves }</ol>
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
