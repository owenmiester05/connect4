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
    const newBoard = board.map(row => [...row]);
    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        if (checkWinner(newBoard, row, col)) {
          setWinner(currentPlayer);
        } else {
          changePlayer();
        }
        break;
      }
    }
  }

  return (
    <div className="app">
      <h1>Connect 4</h1>
      {winner && <h2>Winner: {winner}</h2>}
      <Board board={board} winner={winner} onDrop={handleDrop} />
    </div>
  );
}

export default App;
