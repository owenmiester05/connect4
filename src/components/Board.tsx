import "./Board.css";
import Cell from "./Cell";

type BoardProps = {
    board: string[][];
    winner: string;
    onDrop: (col: number) => void
}

export default function Board({ board, winner, onDrop }: BoardProps) {
    return (
        <div className="board">
        {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  value={cell}
                  onClick={() => !winner && onDrop(colIndex)}
                />
            ))}
            </div>
        ))}
        </div>
    )
}