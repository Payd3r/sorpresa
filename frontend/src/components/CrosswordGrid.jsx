import React from 'react';
import { Card } from './ui/card';

const CrosswordGrid = ({ 
  grid, 
  words, 
  userAnswers, 
  onCellClick, 
  selectedWord, 
  selectedCell 
}) => {
  // Crea mappa delle celle con numeri
  const createCellMap = () => {
    const cellMap = {};
    words.forEach(word => {
      const key = `${word.row}-${word.col}`;
      if (!cellMap[key]) {
        cellMap[key] = [];
      }
      cellMap[key].push(word.number);
    });
    return cellMap;
  };

  const cellNumbers = createCellMap();

  const getCellNumber = (row, col) => {
    const key = `${row}-${col}`;
    return cellNumbers[key] ? Math.min(...cellNumbers[key]) : null;
  };

  const isCellSelected = (row, col) => {
    if (!selectedWord) return false;
    
    if (selectedWord.direction === 'horizontal') {
      return row === selectedWord.row && 
             col >= selectedWord.col && 
             col < selectedWord.col + selectedWord.word.length;
    } else {
      return col === selectedWord.col && 
             row >= selectedWord.row && 
             row < selectedWord.row + selectedWord.word.length;
    }
  };

  const isCurrentCell = (row, col) => {
    return selectedCell && selectedCell.row === row && selectedCell.col === col;
  };

  const getCellValue = (row, col) => {
    const key = `${row}-${col}`;
    return userAnswers[key] || '';
  };

  return (
    <Card className="p-1 bg-gradient-to-br from-slate-50 to-blue-50 shadow-xl">
      <div className="crossword-grid">
        <div 
          className="grid gap-[1px] mx-auto"
          style={{
            gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)`,
            maxWidth: '95vw',
            width: 'fit-content'
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isBlack = cell === null;
              const cellNumber = getCellNumber(rowIndex, colIndex);
              const isSelected = isCellSelected(rowIndex, colIndex);
              const isCurrent = isCurrentCell(rowIndex, colIndex);
              const cellValue = getCellValue(rowIndex, colIndex);

              const getCellSize = () => {
                const screenWidth = window.innerWidth;
                const gridCols = grid[0]?.length || 1;
                const availableWidth = Math.min(screenWidth * 0.95, 400);
                const cellSize = Math.floor(availableWidth / gridCols) - 1;
                return Math.max(18, Math.min(cellSize, 35));
              };

              const cellSize = getCellSize();

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    relative text-xs font-bold cursor-pointer flex-shrink-0
                    transition-all duration-200 border border-slate-300
                    ${isBlack 
                      ? 'bg-slate-800 border-slate-700' 
                      : `bg-white hover:border-blue-400
                         ${isSelected ? 'bg-blue-100 border-blue-500' : ''}
                         ${isCurrent ? 'bg-blue-200 border-blue-600 ring-1 ring-blue-400' : ''}
                        `
                    }
                  `}
                  onClick={() => !isBlack && onCellClick(rowIndex, colIndex)}
                  style={{ 
                    width: `${cellSize}px`, 
                    height: `${cellSize}px`
                  }}
                >
                  {!isBlack && (
                    <>
                      {cellNumber && (
                        <span className="absolute top-0 left-0 text-[6px] leading-none text-blue-700 font-semibold px-0.5">
                          {cellNumber}
                        </span>
                      )}
                      <div className="flex items-center justify-center h-full pt-1">
                        <span className="text-slate-800 font-bold" style={{ fontSize: `${Math.max(8, Math.min(14, (90 * window.innerWidth / 100) / grid[0].length / 2))}px` }}>
                          {cellValue}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
};

export default CrosswordGrid;