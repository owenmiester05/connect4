import React, { useState } from 'react';
import './App.css';

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

  function checkWinner(row: number, col: number): boolean {
    // Horizontal checks
    for (let i = 0; i < 4; i++) {
      if (board[row][i] !== "" && board[row][i] === board[row][i + 1] && board[row][i] === board[row][i + 2] && board[row][i] === board[row][i + 3]) {
        return true;
      }
    }

    // Vertical checks
    for (let j = 0; j < 3; j++) {
      if (board[j][col] !== "" && board[j][col] === board[j + 1][col] && board[j][col] === board[j + 2][col] && board[j][col] === board[j + 3][col]) {
        return true;
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
        if (checkWinner(row, col)) {
          setWinner(currentPlayer);
        } else {
          changePlayer();
        }
        break;
      }
    }
  }

  return (
  <div>
    Connect 4
  </div>
  );
}

export default App;
