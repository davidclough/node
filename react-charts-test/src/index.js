import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LineGraph from './LineGraph';




import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   how: "How do you want your egg today?",
   boiledEgg: "Boiled egg",
   softBoiledEgg: "Soft-boiled egg",
   choice: "How to choose the egg"
 },
 "it": {
   how: "Come vuoi il tuo uovo oggi?",
   boiledEgg: "Uovo sodo",
   softBoiledEgg: "Uovo alla coque",
   choice: "Come scegliere l'uovo"
 },
 "it-IT": {
   softBoiledEgg: "Uovo fritto",
 }
});




function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div>
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

class Game extends React.Component {
  constructor(props) {
    super(props);

    //strings.setLanguage('it-IT');
    strings.setLanguage(Math.random() < 0.5 ? 'en' : 'it-IT');
        
    this.state = {
      gameId: Math.random() * 1000000,
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = this.generateMoves(history);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game-container">
        <div className="game" style={{display:'none'}}>
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>

        <LineGraph graphId={this.state.gameId} />
        <div>{strings.softBoiledEgg}</div>
      </div>
    );
  }

  generateMoves(history) {
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={this.state.gameId + '-' + move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return moves;
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
}

// ========================================

const games = [];
const numberOfGames = 6;//Math.random() * 25 + 3;
for (let i = 0; i < numberOfGames; i++) {
  games.push(<Game key={i} />);
}

ReactDOM.render(
  <div>
    {games}
  </div>,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    // Rows.
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns.
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonals.
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
