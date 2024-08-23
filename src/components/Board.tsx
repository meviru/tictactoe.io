import Block from "./Block";

function Board({ squares, onClick }: any) {
  return (
    <div className="board">
      {squares.map((square: any, i: number) => (
        <Block key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

export default Board;
