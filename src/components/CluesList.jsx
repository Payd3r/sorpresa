import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

const CluesList = ({ 
  horizontalClues, 
  verticalClues, 
  onClueClick, 
  selectedWord, 
  completedWords = [], 
  soloOrizzontali, 
  soloVerticali 
}) => {
  const ClueItem = ({ word }) => {
    const isSelected = selectedWord && selectedWord.number === word.number && selectedWord.direction === word.direction;
    const isCompleted = completedWords.some(w => w.number === word.number && w.direction === word.direction);

    // Se la parola ha un'immagine, usa l'accordion
    if (word.image) {
      return (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`item-${word.number}-${word.direction}`} className="border-none">
            <div className={`
              flex items-center w-full text-left p-0
              transition-all duration-200 mb-1 rounded-lg
              ${isSelected ? 'ring-2 ring-blue-500' : ''}
              ${isCompleted ? 'bg-gray-50' : 'bg-white'}
              border border-slate-200
            `}>
              <div className="flex-grow">
                <Button
                  variant="ghost"
                  className={`
                    w-full text-left p-3 h-auto whitespace-normal justify-start text-sm
                    ${isCompleted ? 'line-through text-gray-400' : 'text-slate-800'}
                  `}
                  onClick={() => onClueClick(word)}
                >
                  <div className="flex items-start">
                    <span className="font-bold mr-2">{word.number}.</span>
                    <span className="leading-snug">{word.clue}</span>
                  </div>
                </Button>
              </div>
              <AccordionTrigger className="p-2 text-blue-600 hover:text-blue-800 w-auto">
                Vedi Img
              </AccordionTrigger>
            </div>
            <AccordionContent className="p-2">
              <img 
                src={`/img/${word.image}`} 
                alt={`Immagine per la definizione: ${word.clue}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    // Altrimenti, usa il pulsante normale
    return (
      <Button
        variant={isSelected ? "default" : "ghost"}
        className={`
          w-full text-left p-3 h-auto whitespace-normal justify-start text-sm
          transition-all duration-200 mb-1 rounded-lg
          ${isSelected 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white hover:bg-blue-50 text-slate-800 border border-slate-200'
          }
          ${isCompleted ? 'line-through text-gray-400 bg-gray-50' : ''}
        `}
        onClick={() => onClueClick(word)}
      >
        <div className="flex items-start">
          <span className="font-bold mr-2">{word.number}.</span>
          <span className="leading-snug">{word.clue}</span>
        </div>
      </Button>
    );
  };

  const renderClues = (clues, title, icon, gradient, type) => (
    <Card className={`shadow-lg flex flex-col h-full ${gradient}`}>
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className={`text-lg font-bold flex items-center ${type === 'h' ? 'text-blue-800' : 'text-purple-800'}`}>
          <span className={`bg-${type === 'h' ? 'blue' : 'purple'}-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-lg mr-3`}>
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 overflow-y-auto custom-scrollbar pr-2">
        {clues.map((word) => (
          <ClueItem key={`${type}-${word.number}`} word={word} />
        ))}
      </CardContent>
    </Card>
  );

  if (soloOrizzontali) {
    return renderClues(horizontalClues, 'Orizzontali', '→', 'bg-gradient-to-r from-blue-50 to-indigo-50', 'h');
  }

  if (soloVerticali) {
    return renderClues(verticalClues, 'Verticali', '↓', 'bg-gradient-to-r from-purple-50 to-pink-50', 'v');
  }

  return (
    <div className="space-y-4">
      {renderClues(horizontalClues, 'Orizzontali', '→', 'bg-gradient-to-r from-blue-50 to-indigo-50', 'h')}
      {renderClues(verticalClues, 'Verticali', '↓', 'bg-gradient-to-r from-purple-50 to-pink-50', 'v')}
    </div>
  );
};

export default CluesList;
