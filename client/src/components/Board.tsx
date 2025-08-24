import { useEffect, useRef, useState } from 'react';
import Square from './Square';
import { Patterns } from '../WinningPatterns';

type Game = {
  id: number;
  board: string[];
  player: string;
  turn: string;
  game_result: string;
  game_ended: boolean;
};
type BoardProps = {
  games: Game;
  onUpdate: () => void;
};

function Board({ games, onUpdate }: BoardProps) {
  const [board, setBoard] = useState(games.board);
  const [player, setPlayer] = useState(games.player);
  const [turn, setTurn] = useState(games.turn);
  const [gameEnded, setGameEnded] = useState(games.game_ended);
  const gameEndedRef = useRef(gameEnded);

  useEffect(() => {
    gameEndedRef.current = gameEnded;
    const winnerFound = checkWin();
    if (!winnerFound) {
      checkIfTie();
      onUpdate();
    }

    console.log(gameEnded);
    if (gameEnded) {
      onUpdate();
      console.log('test');
    }
  }, [gameEnded, board]);

  useEffect(() => {
    if (games) {
      setBoard(games.board);
      setPlayer(games.player);
      setTurn(games.turn);
      setGameEnded(games.game_ended);
    }
  }, [games]);

  useEffect(() => {
    if (!gameEnded && turn == 'O') {
      function aiMove(board: string[]) {
        if (gameEnded) return null;
        const emptySquare = board
          .map((cell, index) => (cell === '' ? index : null))
          .filter((index) => index !== null) as number[];
        if (emptySquare.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * emptySquare.length);
        setTimeout(() => {
          if (!gameEndedRef.current) chooseSquare(emptySquare[randomIndex]);
        }, 500);
      }
      aiMove(board);
    }
  }, [gameEnded, turn]);

  const checkWin = () => {
    let foundWinningPattern = false;

    Patterns.forEach(async (currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == '') return;
      let isWinningPattern = true;
      currPattern.forEach((i) => {
        if (board[i] != firstPlayer) {
          isWinningPattern = false;
        }
      });
      if (isWinningPattern) {
        foundWinningPattern = true;
        alert(`Winner ${board[currPattern[0]]}`);
        setGameEnded(true);

        //update game result
        try {
          const token = localStorage.getItem('token');
          const game_result = {
            game_ended: true,
            game_result: `${board[currPattern[0]]} won`,
          };
          const response = await fetch(
            `http://localhost:5000/game/${games.id}/result`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: token } : {}),
              },
              body: JSON.stringify(game_result),
            }
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update game ${errorText}`);
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
    return foundWinningPattern;
  };

  const checkIfTie = async () => {
    if (!Array.isArray(board)) {
      console.warn('Board is not an array:', board);
      return;
    }
    let filled = true;
    board.forEach((square) => {
      if (square == '') {
        filled = false;
      }
    });

    if (filled) {
      alert(`Game tied `);
      setGameEnded(true);
      try {
        const token = localStorage.getItem('token');
        const game_result = {
          game_ended: true,
          game_result: `Tie`,
        };
        const response = await fetch(
          `http://localhost:5000/game/${games.id}/result`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: token } : {}),
            },
            body: JSON.stringify(game_result),
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update game ${errorText}`);
        }
      } catch (err) {
        console.error(err);
      }
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
        game_ended: false,
      };

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
    <div className="mt-24 flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <Square
          val={board[0]}
          onClick={() => chooseSquare(0)}
          gameEnded={gameEnded}
          turn={turn}
        />
        <Square
          val={board[1]}
          onClick={() => chooseSquare(1)}
          gameEnded={gameEnded}
          turn={turn}
        />
        <Square
          val={board[2]}
          onClick={() => chooseSquare(2)}
          gameEnded={gameEnded}
          turn={turn}
        />
      </div>
      <div className="flex flex-row">
        <Square
          val={board[3]}
          onClick={() => chooseSquare(3)}
          gameEnded={gameEnded}
          turn={turn}
        />
        <Square
          val={board[4]}
          onClick={() => chooseSquare(4)}
          gameEnded={gameEnded}
          turn={turn}
        />
        <Square
          val={board[5]}
          onClick={() => chooseSquare(5)}
          gameEnded={gameEnded}
          turn={turn}
        />
      </div>
      <div className="flex flex-row">
        <Square
          val={board[6]}
          onClick={() => chooseSquare(6)}
          gameEnded={gameEnded}
          turn={turn}
        />
        <Square
          val={board[7]}
          onClick={() => chooseSquare(7)}
          gameEnded={gameEnded}
          turn={turn}
        />
        <Square
          val={board[8]}
          onClick={() => chooseSquare(8)}
          gameEnded={gameEnded}
          turn={turn}
        />
      </div>
    </div>
  );
}

export default Board;
