import React, { useState } from "react";
import Board from "./components/Board";
import "./styles/root.scss";
import { calculateWinner } from './helpers';
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];


const App = () => {

  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];
  const [isXNext, setIsXNext] = useState(false);

  const { winner, winningSquares } = calculateWinner(current.board);


  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {

      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }

        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext })

    });
    setCurrentMove(prev => prev + 1)
    setIsXNext(prev => !prev);
  };


  const moveTo = (move) => {
    setCurrentMove(move);
  }

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };
  return (

    <div className="app">
      <h1>TIC <span className="text-green">TAC</span>  TOE</h1>
      <h2><StatusMessage winner={winner} current={current} /></h2>
      <Board winningSquares={winningSquares} handleSquareClick={handleSquareClick} board={current.board} />
      <button className={`btn-reset ${winner ? 'active' : ''}`} type="button" onClick={onNewGame}>Start new game</button>
      <h2 style={{fontWeight:'normal'}}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>

  )


}

export default App;