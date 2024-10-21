import React from 'react';
import { Player } from '../types';

interface GameInfoProps {
  currentPlayer: Player;
  movesLeft: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, movesLeft }) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-lg sm:text-xl font-bold">
        Current Player: {currentPlayer === 'double-pieces' ? 'Double Pieces' : 'Double Moves'}
      </p>
      <p className="text-md sm:text-lg">Moves Left: {movesLeft}</p>
    </div>
  );
};

export default GameInfo;