import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import Board from './components/Board.tsx';
import { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import NavBar from './components/NavBar.tsx';

type Game = {
  id: number;
  board: string[];
  player: string;
  turn: string;
  game_result: string;
  game_ended: number;
};

type FetchMode = 'login' | 'create' | 'update' | 'render';

function App() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(false);

  const [games, setGames] = useState<Game[]>([]);
  const [gameId, setGameId] = useState(1);
  const [currentGame, setCurrentGame] = useState(1);
  const [fetchedGameId, setFetchedGameId] = useState<Game>({
    id: 1,
    board: ['', '', '', '', '', '', '', '', ''],
    player: 'X',
    turn: 'X',
    game_result: 'In progress',
    game_ended: 0,
  });

  useEffect(() => {
    if (!isLogedIn) {
      setFetchedGameId({
        id: 1,
        board: ['', '', '', '', '', '', '', '', ''],
        player: 'X',
        turn: 'X',
        game_result: 'In progress',
        game_ended: 0,
      });
    }
  }, [isLogedIn]);

  const fetchGame = async (mode: FetchMode) => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const response = await fetch('http://localhost:5000/game', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? token : '',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }
      const data = await response.json();

      const parsedGames = data.map((g: { board: string }) => ({
        ...g,
        board: JSON.parse(g.board),
      }));
      if (mode === 'login') {
        setGames(parsedGames);
        setFetchedGameId(parsedGames[0]);
        setCurrentGame(data[0].id);
      }
      if (mode === 'create') {
        setGames(parsedGames);
        setFetchedGameId(parsedGames[data.length - 1]);
        setCurrentGame(data[data.length - 1].id);
      }
      if (mode === 'update') {
        setGames(parsedGames);
        const currentGameId = games.findIndex((game) => game.id === gameId);
        if (gameId !== games[currentGameId].id) return;
        else setFetchedGameId(parsedGames[currentGameId]);
      }
      if (mode === 'render') {
        setGames(parsedGames);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCurrentGame = () => {
    fetchGame('update');
    const currentGameId = games.findIndex((game) => game.id === gameId);

    if (currentGameId == -1) return alert(`Game doesn't exist`);
    else {
      setCurrentGame(games[currentGameId].id);
      setFetchedGameId(games[currentGameId]);
    }
  };

  const handleLogOut = () => {
    setIsLogedIn(false);
    localStorage.removeItem('token');
  };

  const handleNewGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({
          board: ['', '', '', '', '', '', '', '', ''],
          player: 'X',
          turn: 'X',
          game_result: 'In progress',
          game_ended: 0,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      fetchGame('create');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLogedIn) {
      fetchGame('login');
    }
  }, [isLogedIn]);

  const token = localStorage.getItem('token') || '';

  return (
    <>
      <div className="relative h-screen bg-indigo-950 text-center text-xl font-semibold text-indigo-100">
        <p>TicTacToe</p>
        {isLogedIn ? (
          <>
            <NavBar handleLogOut={handleLogOut} />
            <Layout
              setGameId={setGameId}
              currentGame={currentGame}
              handleCurrentGame={handleCurrentGame}
              handleNewGame={handleNewGame}
              games={games}
            />
            {games.length > 0 ? (
              <Board
                games={fetchedGameId}
                onUpdate={() => fetchGame('render')}
              />
            ) : (
              <p>Loading game...</p>
            )}
          </>
        ) : isRegistered ? (
          <Login
            token={token}
            setIsRegistered={setIsRegistered}
            setIsLogedIn={setIsLogedIn}
          />
        ) : (
          <SignUp token={token} setIsRegistered={setIsRegistered} />
        )}
      </div>
    </>
  );
}
export default App;
