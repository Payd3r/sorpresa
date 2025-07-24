import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const CluesList = ({ horizontalClues, verticalClues, onClueClick, selectedWord }) => {
  const ClueItem = ({ word, index }) => {
    const isSelected = selectedWord && selectedWord.number === word.number;
    
    return (
      <Button
        variant={isSelected ? "default" : "ghost"}
        className={`
          w-full text-left p-3 h-auto whitespace-normal justify-start
          transition-all duration-200 mb-2
          ${isSelected 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
          }
        `}
        onClick={() => onClueClick(word)}
      >
        <div className="text-left">
          <span className="font-bold text-sm">
            {word.number}.
          </span>
          <span className="ml-2 text-sm leading-relaxed">
            {word.clue}
          </span>
        </div>
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Orizzontali */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-blue-800 flex items-center">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2">
              →
            </span>
            Orizzontali
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {horizontalClues.map((word, index) => (
            <ClueItem key={`h-${word.number}`} word={word} index={index} />
          ))}
        </CardContent>
      </Card>

      {/* Verticali */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-purple-800 flex items-center">
            <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-2">
              ↓
            </span>
            Verticali
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {verticalClues.map((word, index) => (
            <ClueItem key={`v-${word.number}`} word={word} index={index} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CluesList;