import { Board, Piece, Player, GameState } from '../types';

export const initializeBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));

  // Initialize double-moves player (top)
  const backRowPieces: Piece['type'][] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: backRowPieces[i], player: 'double-moves', hasMoved: false };
    board[1][i] = { type: 'pawn', player: 'double-moves', hasMoved: false };
  }

  // Initialize double-pieces player (bottom)
  for (let i = 0; i < 8; i++) {
    board[7][i] = { type: backRowPieces[i], player: 'double-pieces', hasMoved: false };
    board[6][i] = { type: backRowPieces[i], player: 'double-pieces', hasMoved: false };
  }

  return board;
};

export const isValidMove = (board: Board, fromRow: number, fromCol: number, toRow: number, toCol: number, currentPlayer: Player): boolean => {
  const piece = board[fromRow][fromCol];
  if (!piece || piece.player !== currentPlayer) return false;

  switch (piece.type) {
    case 'pawn':
      if (piece.player === 'double-moves') {
        // Red pawns (double-moves player) can only move down
        const moveDistance = toRow - fromRow;
        if (toCol !== fromCol) return false; // Pawns can only move straight
        if (!piece.hasMoved && moveDistance === 2 && board[fromRow + 1][fromCol] === null && board[toRow][toCol] === null) {
          return true; // First move, can move two squares if both are empty
        }
        return moveDistance === 1 && board[toRow][toCol] === null;
      } else {
        // Blue pawns (double-pieces player) can only move up
        const moveDistance = fromRow - toRow;
        if (toCol !== fromCol) return false; // Pawns can only move straight
        if (!piece.hasMoved && moveDistance === 2 && board[fromRow - 1][fromCol] === null && board[toRow][toCol] === null) {
          return true; // First move, can move two squares if both are empty
        }
        return moveDistance === 1 && board[toRow][toCol] === null;
      }
    case 'rook':
      return fromRow === toRow || fromCol === toCol;
    case 'knight':
      return (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
             (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2);
    case 'bishop':
      return Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);
    case 'queen':
      return fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);
    case 'king':
      return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;
    default:
      return false;
  }
};

export const movePiece = (board: Board, fromRow: number, fromCol: number, toRow: number, toCol: number): Board => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[fromRow][fromCol];
  if (piece) {
    piece.hasMoved = true;
  }
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;
  return newBoard;
};

export const getInitialGameState = (): GameState => ({
  board: initializeBoard(),
  currentPlayer: 'double-moves',
  movesLeft: 2,
});

export const nextTurn = (gameState: GameState): GameState => {
  if (gameState.currentPlayer === 'double-pieces' || gameState.movesLeft === 1) {
    return {
      ...gameState,
      currentPlayer: gameState.currentPlayer === 'double-pieces' ? 'double-moves' : 'double-pieces',
      movesLeft: gameState.currentPlayer === 'double-pieces' ? 2 : 1,
    };
  }
  return {
    ...gameState,
    movesLeft: gameState.movesLeft - 1,
  };
};