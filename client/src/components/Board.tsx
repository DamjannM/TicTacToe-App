import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Patterns } from '../WinningPatterns';
import { Button } from '@mui/material';

function Board({ boardGame }: { boardGame: string[] }) {
  const [board, setBoard] = useState(boardGame);
  const [player, setPlayer] = useState('X');
  const [turn, setTurn] = useState('X');
  const [gameEnded, setGameEnded] = useState(false);
  console.log(boardGame);

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);

  useEffect(() => {
    if (boardGame) {
      setBoard(boardGame);
    }
  }, [boardGame]);

  const gameReset = () => {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setGameEnded(false);
    setTurn('X');
    setPlayer('X');
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == '') return;
      let foundWinningPattern = true;
      currPattern.forEach((i) => {
        if (board[i] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        alert(`Winner ${board[currPattern[0]]}`);
        setGameEnded(true);
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == '') {
        filled = false;
      }
    });

    if (filled) {
      alert(`Game tied `);
      setGameEnded(true);
    }
  };

  const chooseSquare = (square: number) => {
    if (turn === player && board[square] === '') {
      setTurn(player === 'X' ? 'O' : 'X');

      setBoard(
        board.map((val, i) => {
          if (i === square && val === '') {
            return player;
          }
          return val;
        })
      );
    }
    if (player === 'X') setPlayer('O');
    else if (player === 'O') setPlayer('X');
  };

  return (
    <div className="mt-36 flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <Square
          val={board[0]}
          onClick={() => chooseSquare(0)}
          gameEnded={gameEnded}
        />
        <Square
          val={board[1]}
          onClick={() => chooseSquare(1)}
          gameEnded={gameEnded}
        />
        <Square
          val={board[2]}
          onClick={() => chooseSquare(2)}
          gameEnded={gameEnded}
        />
      </div>
      <div className="flex flex-row">
        <Square
          val={board[3]}
          onClick={() => chooseSquare(3)}
          gameEnded={gameEnded}
        />
        <Square
          val={board[4]}
          onClick={() => chooseSquare(4)}
          gameEnded={gameEnded}
        />
        <Square
          val={board[5]}
          onClick={() => chooseSquare(5)}
          gameEnded={gameEnded}
        />
      </div>
      <div className="flex flex-row">
        <Square
          val={board[6]}
          onClick={() => chooseSquare(6)}
          gameEnded={gameEnded}
        />
        <Square
          val={board[7]}
          onClick={() => chooseSquare(7)}
          gameEnded={gameEnded}
        />
        <Square
          val={board[8]}
          onClick={() => chooseSquare(8)}
          gameEnded={gameEnded}
        />
      </div>
      <Button onClick={gameReset}>New Game</Button>
    </div>
  );
}

export default Board;
