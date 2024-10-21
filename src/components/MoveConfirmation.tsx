import React from 'react';

interface MoveConfirmationProps {
  from: [number, number];
  to: [number, number];
  onConfirm: () => void;
  onCancel: () => void;
}

const MoveConfirmation: React.FC<MoveConfirmationProps> = ({ from, to, onConfirm, onCancel }) => {
  const getSquareName = (row: number, col: number) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return `${files[col]}${ranks[row]}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Move</h2>
        <p className="mb-4">
          Move from {getSquareName(from[0], from[1])} to {getSquareName(to[0], to[1])}?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveConfirmation;