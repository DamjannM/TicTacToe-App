function Square({
  onClick,
  val,
  gameEnded,
  turn,
}: {
  onClick: () => void;
  val: string;
  gameEnded: boolean;
  turn: string;
}) {
  return (
    <div
      className={`m-1 flex size-24 cursor-pointer items-center justify-center rounded-xl bg-indigo-900 hover:bg-indigo-400 ${gameEnded || turn == 'O' ? 'pointer-events-none opacity-50' : ''} ${val !== '' ? 'pointer-events-none opacity-50' : ''}`}
      onClick={onClick}
    >
      {val}
    </div>
  );
}

export default Square;
