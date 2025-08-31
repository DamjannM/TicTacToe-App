import { Button, Container, TextField } from '@mui/material';
import GameInfo from './GameInfo';
import BurgerIcon from '../../public/burger-menu.svg';
import closeCircle from '../../public/close-circle.svg';
import { useState } from 'react';

type Game = {
  id: number;
  board: string[];
  player: string;
  turn: string;
  game_result: string;
  game_ended: boolean;
};
type LayoutProps = {
  setGameId: React.Dispatch<React.SetStateAction<number>>;
  currentGame: number;
  handleCurrentGame: () => void;
  handleNewGame: () => void;
  games: Game[];
};

function Layout({
  setGameId,
  currentGame,
  handleCurrentGame,
  handleNewGame,
  games,
}: LayoutProps) {
  const [hideBar, setHideBar] = useState(true);
  return (
    <>
      <Container>
        <div className="lg:hidden">
          <img
            src={BurgerIcon}
            className="w-8"
            onClick={() => setHideBar(false)}
          />
        </div>
        <div
          className={`scrollbar-hide absolute top-2 bottom-2 z-999 w-80 overflow-y-auto rounded-3xl bg-indigo-900 sm:top-10 sm:bottom-10 sm:left-5 md:left-5 lg:left-10 lg:block ${hideBar ? 'hidden' : ''}`}
        >
          <img
            src={closeCircle}
            className="absolute top-1 right-2 z-1000 w-8 lg:hidden"
            onClick={() => setHideBar(true)}
          />
          {games.map((game) => (
            <GameInfo
              key={game.id}
              gameId={game.id}
              gameState={game.game_result}
            />
          ))}
        </div>
      </Container>
      <div className="grid justify-center gap-1 sm:mt-3 sm:flex sm:gap-4">
        <TextField
          size="small"
          type="number"
          onChange={(e) => {
            setGameId(Number(e.target.value));
          }}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '2rem',
              '&.Mui-focused fieldset': { borderColor: '#3f50b5' },
              '&:hover fieldset': {
                borderColor: '#3f50b5',
              },
              '& fieldset': {
                borderColor: '#3f50b5',
              },
            },
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                display: 'none',
              },
          }}
          slotProps={{ input: { inputProps: { min: 1 } } }}
        />
        <Button
          className="!rounded-4xl !bg-indigo-600 !text-white hover:!bg-indigo-700"
          onClick={handleCurrentGame}
        >
          Join Game
        </Button>
        <p>or</p>
        <Button
          className="!rounded-4xl !bg-indigo-600 !text-white hover:!bg-indigo-700"
          onClick={handleNewGame}
        >
          New Game
        </Button>
      </div>
      <p>Current Game ID: {currentGame}</p>
    </>
  );
}
export default Layout;
