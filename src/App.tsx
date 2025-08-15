import { useState } from 'react';
import Board from "./components/Board";
import "./App.css"

function createEmptyBoard(): string[][] {
  return Array.from({ length: 6 }, () => Array(7).fill(""));
}

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [winner, setWinner] = useState("");
  const [mode, setMode] = useState<"local" | "bot" | null>(null);

  if (!mode) {
    return (
      <div className="app">
        <h1>Connect 4</h1>
        <button onClick={() => setMode("local")}>Local</button>
        <button onClick={() => setMode("bot")}>Bot</button>
      </div>
    )
  }

  function botMove(boardState: string[][]) {
    const openColumns = boardState[0].map((_, colIndex) => colIndex).filter(col => boardState[0][col] === "");
    if (openColumns.length === 0) {return};
    const randomColumn = openColumns[Math.floor(Math.random() * openColumns.length)]
    const newBoard = boardState.map(row => [...row]);
    let placedRow = -1;

    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (!newBoard[row][randomColumn]) {
        newBoard[row][randomColumn] = "Y";
        placedRow = row;
        break;
      }
    }

    if (placedRow === -1) {
      return
    }

    setBoard(newBoard);
    if (checkWinner(newBoard, placedRow, randomColumn)) {
      setWinner("Y");
      return;
    } else {
      setCurrentPlayer("R");    
    }
  }


  function changePlayer() {
    setCurrentPlayer(currentPlayer === "Y" ? "R" : "Y");
  }

  function checkWinner(grid: string[][], row: number, col: number): boolean {
    // Horizontal checks
    for (let i = 0; i < 4; i++) {
      if (grid[row][i] && grid[row][i] === grid[row][i + 1] && grid[row][i] === grid[row][i + 2] && grid[row][i] === grid[row][i + 3]) {
        return true;
      }
    }

    // Vertical checks
    for (let j = 0; j < 3; j++) {
      if (grid[j][col] !== "" && grid[j][col] === grid[j + 1][col] && grid[j][col] === grid[j + 2][col] && grid[j][col] === grid[j + 3][col]) {
        return true;
      }
    }

    // Diaganol checks
    for (let i = 0; i < 4; i++) {
      if (col - i >= 0 && col - i + 3 < grid[0].length && row + i < grid.length && row + i - 3 >= 0 ) {
        if (
        grid[row + i][col - i] &&
        grid[row + i][col - i] === grid[row + i - 1][col - i + 1] &&
        grid[row + i][col - i] === grid[row + i - 2][col - i + 2] &&
        grid[row + i][col - i] === grid[row + i - 3][col - i + 3]
    ) {
      return true
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      if (col - i >= 0 && col - i + 3 < grid[0].length && row - i + 3 < grid.length && row - i >= 0 ) {
        if (
        grid[row - i][col - i] &&
        grid[row - i][col - i] === grid[row - i + 1][col - i + 1] &&
        grid[row - i][col - i] === grid[row - i + 2][col - i + 2] &&
        grid[row - i][col - i] === grid[row - i + 3][col - i + 3]
    ) {
      return true
        }
      }
    }
    return false;
  }

  function handleDrop(col: number) {
    if (winner) {
      return
    }

    const newBoard = board.map(row => [...row]);
    let placedRow = -1;
    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        placedRow = row;
        break;
      }
    }
    if (placedRow === -1) {
      return
    }

    setBoard(newBoard)
    if (checkWinner(newBoard, placedRow, col)) {
      setWinner(currentPlayer);
      return;
    }

    const nextPlayer = currentPlayer === "Y" ? "R": "Y";
    setCurrentPlayer(nextPlayer);

    if (mode === "bot" && nextPlayer === "Y") {
      setTimeout(() => botMove(newBoard), 500)
    }
  }

  function resetGame() {
    setBoard(createEmptyBoard())
    setCurrentPlayer("R")
    setWinner("")
  }

  return (
    <div className="app">
      <h1>Connect 4</h1>
      {winner && <h2>Winner: {winner}</h2>}
      <button onClick={resetGame}>Reset</button>
      <Board board={board} winner={winner} onDrop={handleDrop} />
    </div>
  );
}

export default App;
