import React, { useEffect, useState } from 'react';
import Square from './Square';
import { Patterns } from '../WinningPatterns';

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
  const [board, setBoard] = useState(games.board);
  const [player, setPlayer] = useState(games.player);
  const [turn, setTurn] = useState(games.turn);
  const [gameEnded, setGameEnded] = useState(Boolean(games.game_ended));

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
  }, [games]);

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
    if (!Array.isArray(board)) {
      console.warn('Board is not an array:', board);
      return;
    }
    let filled = true;
    console.log(board);
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

  const chooseSquare = async (square: number) => {
    if (turn !== player || board[square] !== '') return;
    const newBoard = board.map((val, i) => (i === square ? player : val));
    const newTurn = player === 'X' ? 'O' : 'X';
    const newPlayer = newTurn;
    setBoard(newBoard);
    setTurn(newTurn);
    setPlayer(newPlayer);

    try {
      const token = localStorage.getItem('token');
      const updatedGame = {
        board: newBoard,
        player: newPlayer,
        turn: newTurn,
        game_result: 'In progress',
        game_ended: 0,
      };
      console.log(updatedGame.player, updatedGame.turn);

      const response = await fetch(`http://localhost:5000/game/${games.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify(updatedGame),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update game ${errorText}`);
      }
    } catch (err) {
      console.error(err);
    }
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
    </div>
  );
}

export default Board;
