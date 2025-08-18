import { Button, Container, TextField } from '@mui/material';
import GameInfo from './GameInfo';
type Game = {
  id: number;
  board: string[];
  player: string;
  turn: string;
  game_result: string;
  game_ended: number;
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
  return (
    <>
      <Container maxWidth="sm">
        <div className="max-h scrollbar-hide absolute top-10 bottom-10 left-10 w-80 overflow-y-auto rounded-3xl bg-indigo-900">
          {games.map((game) => (
            <GameInfo
              key={game.id}
              gameId={game.id}
              gameState={game.game_result}
            />
          ))}
        </div>
      </Container>
      <div className="mt-3 flex justify-center gap-4">
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
          className="!bg-indigo-600 !text-white hover:!bg-indigo-700"
          onClick={handleCurrentGame}
        >
          Join Game
        </Button>
        <p>or</p>
        <Button
          className="!bg-indigo-600 !text-white hover:!bg-indigo-700"
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
