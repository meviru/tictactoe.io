import { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Effect to handle computer's move
  useEffect(() => {
    if (!isXNext && !calculateWinner(squares)) {
      const bestMove: any = getBestMove(squares);
      handleMove(bestMove, "O");
    }
  }, [isXNext]);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    handleMove(i, "X");
  };

  const handleMove = (i: number, player: any) => {
    const newSquares = squares.slice();
    newSquares[i] = player;
    setSquares(newSquares);
    setIsXNext(player === "X" ? false : true);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
}

function getBestMove(squares: any) {
  // AI prioritizes winning, then blocking, then center, then corners, then sides
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for a winning move
  for (let [a, b, c] of lines) {
    if (squares[a] === "O" && squares[b] === "O" && !squares[c]) return c;
    if (squares[a] === "O" && squares[c] === "O" && !squares[b]) return b;
    if (squares[b] === "O" && squares[c] === "O" && !squares[a]) return a;
  }

  // Check for a blocking move
  for (let [a, b, c] of lines) {
    if (squares[a] === "X" && squares[b] === "X" && !squares[c]) return c;
    if (squares[a] === "X" && squares[c] === "X" && !squares[b]) return b;
    if (squares[b] === "X" && squares[c] === "X" && !squares[a]) return a;
  }

  // Pick center if available
  if (!squares[4]) return 4;

  // Pick a corner if available
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (!squares[corner]) return corner;
  }

  // Pick a random side if available
  const sides = [1, 3, 5, 7];
  for (let side of sides) {
    if (!squares[side]) return side;
  }

  return null;
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
