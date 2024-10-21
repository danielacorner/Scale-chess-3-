import React, { useState, useRef } from 'react';
import { Board, Piece } from '../types';

interface ChessBoardProps {
  board: Board;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: [number, number] | null;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board, onSquareClick, selectedSquare }) => {
  const [draggedPiece, setDraggedPiece] = useState<{ row: number; col: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;
    const color = piece.player === 'double-pieces' ? 'text-blue-600' : 'text-red-600';
    const size = piece.player === 'double-pieces' ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';
    return <span className={`${color} ${size}`}>{getPieceSymbol(piece)}</span>;
  };

  const getPieceSymbol = (piece: Piece): string => {
    const symbols: Record<string, string> = {
      pawn: '♟',
      rook: '♜',
      knight: '♞',
      bishop: '♝',
      queen: '♛',
      king: '♚',
    };
    return symbols[piece.type];
  };

  const handleInteraction = (rowIndex: number, colIndex: number) => {
    onSquareClick(rowIndex, colIndex);
  };

  const handleTouchStart = (e: React.TouchEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    setDraggedPiece({ row: rowIndex, col: colIndex });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (draggedPiece && boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const x = touch.clientX - boardRect.left;
      const y = touch.clientY - boardRect.top;
      const squareSize = boardRect.width / 8;
      const toRow = Math.floor(y / squareSize);
      const toCol = Math.floor(x / squareSize);

      if (toRow >= 0 && toRow < 8 && toCol >= 0 && toCol < 8) {
        handleInteraction(draggedPiece.row, draggedPiece.col);
        handleInteraction(toRow, toCol);
      }
    }
    setDraggedPiece(null);
  };

  return (
    <div 
      ref={boardRef}
      className="grid grid-cols-8 gap-0.5 bg-gray-300 p-1 sm:p-2 aspect-square"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`aspect-square flex items-center justify-center ${
              (rowIndex + colIndex) % 2 === 0 ? 'bg-white' : 'bg-gray-400'
            } cursor-pointer hover:bg-yellow-200 transition-colors duration-200 ${
              selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                ? 'bg-yellow-300'
                : ''
            }`}
            onClick={() => handleInteraction(rowIndex, colIndex)}
            onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
          >
            {renderPiece(piece)}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;