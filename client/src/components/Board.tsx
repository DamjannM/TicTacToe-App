import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Patterns } from '../WinningPatterns';
import { Button } from '@mui/material';
type Game = {
  id: number;
  board: string[];
  player: string;
  turn: string;
  game_result: string;
  game_ended: number;
};
type BoardProps = {
  games: Game;
};

function Board({ games }: BoardProps) {
  // console.log(games.id);
  // if (!games) return <div>Loading...</div>;
  const [board, setBoard] = useState(games.board);
  const [player, setPlayer] = useState(games.player);
  const [turn, setTurn] = useState(games.turn);
  const [gameEnded, setGameEnded] = useState(Boolean(games.game_ended));
  // console.log(boardGame, playerGame, turnGame, gameEndedGame);

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);

  useEffect(() => {
    if (games) {
      setBoard(games.board);
      setPlayer(games.player);
      setTurn(games.turn);
      setGameEnded(Boolean(games.game_ended));
    }
  }, [games, games.board, games.player, games.turn, games.game_ended]);

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
      //update DB
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
