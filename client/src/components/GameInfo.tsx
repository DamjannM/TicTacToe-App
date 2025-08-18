type GameInfoProps = {
  gameId: number;
  gameState: string;
};
function GameInfo({ gameId, gameState }: GameInfoProps) {
  return (
    <div className="relative m-4 h-32 rounded-3xl bg-indigo-500">
      <p>Game ID: {gameId}</p>
      <p>Game Result: {gameState}</p>
    </div>
  );
}
export default GameInfo;
