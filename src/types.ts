import { PieceType, Player } from '../types';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type Player = 'double-pieces' | 'double-moves';

export interface Piece {
  type: PieceType;
  player: Player;
  hasMoved?: boolean; // Add this line
}

export type Board = (Piece | null)[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  movesLeft: number;
}