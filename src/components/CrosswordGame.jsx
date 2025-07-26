import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import CrosswordGrid from './CrosswordGrid';
import CluesList from './CluesList';
import CongratulationsPage from './CongratulationsPage';
import { CrosswordGenerator } from '../utils/crosswordGenerator';
import { crosswordData } from '../data/crosswordData';
import { useToast } from '../hooks/use-toast';

const CrosswordGame = () => {
  const [crosswordLayout, setCrosswordLayout] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  // Genera il cruciverba all'avvio
  useEffect(() => {
    const generator = new CrosswordGenerator(crosswordData.words);
    const layout = generator.generate();
    setCrosswordLayout(layout);
    console.log('Cruciverba generato:', layout);
  }, []);

  // Gestisce click su cella
  const handleCellClick = useCallback((row, col) => {
    if (!crosswordLayout) return;

    // Trova le parole che passano per questa cella
    const wordsAtCell = crosswordLayout.words.filter(word => {
      if (word.direction === 'horizontal') {
        return row === word.row && col >= word.col && col < word.col + word.word.length;
      } else {
        return col === word.col && row >= word.row && row < word.row + word.word.length;
      }
    });

    if (wordsAtCell.length === 0) return;

    // Se c'è già una parola selezionata e la cella appartiene ad un'altra parola, cambia selezione
    let newSelectedWord;
    if (selectedWord && wordsAtCell.length > 1) {
      const currentIndex = wordsAtCell.findIndex(w => w.number === selectedWord.number);
      newSelectedWord = wordsAtCell[(currentIndex + 1) % wordsAtCell.length];
    } else {
      newSelectedWord = wordsAtCell[0];
    }

    setSelectedWord(newSelectedWord);
    setSelectedCell({ row, col });
  }, [crosswordLayout, selectedWord]);

  // Gestisce click su domanda e porta alla cella corrispondente
  const handleClueClick = useCallback((word) => {
    setSelectedWord(word);
    setSelectedCell({ row: word.row, col: word.col });

    // Scroll alla griglia se necessario
    setTimeout(() => {
      const gridElement = document.querySelector('.crossword-grid');
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }, []);

  // Gestisce input da tastiera
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!selectedWord || !selectedCell) return;

      const key = event.key.toUpperCase();

      if (key === 'BACKSPACE') {
        // Cancella carattere corrente e vai indietro
        const cellKey = `${selectedCell.row}-${selectedCell.col}`;
        setUserAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[cellKey];
          return newAnswers;
        });

        moveToPreviousCell();
      } else if (key.match(/[A-Z]/)) {
        // Inserisci carattere
        const cellKey = `${selectedCell.row}-${selectedCell.col}`;
        setUserAnswers(prev => ({
          ...prev,
          [cellKey]: key
        }));

        moveToNextCell();
      } else if (key === 'ARROWLEFT' || key === 'ARROWRIGHT' ||
        key === 'ARROWUP' || key === 'ARROWDOWN') {
        event.preventDefault();
        handleArrowKeys(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedWord, selectedCell]);

  // Muovi alla cella successiva
  const moveToNextCell = useCallback(() => {
    if (!selectedWord || !selectedCell) return;

    let nextRow = selectedCell.row;
    let nextCol = selectedCell.col;

    if (selectedWord.direction === 'horizontal') {
      nextCol++;
      if (nextCol >= selectedWord.col + selectedWord.word.length) {
        return; // Fine della parola
      }
    } else {
      nextRow++;
      if (nextRow >= selectedWord.row + selectedWord.word.length) {
        return; // Fine della parola
      }
    }

    setSelectedCell({ row: nextRow, col: nextCol });
  }, [selectedWord, selectedCell]);

  // Muovi alla cella precedente
  const moveToPreviousCell = useCallback(() => {
    if (!selectedWord || !selectedCell) return;

    let prevRow = selectedCell.row;
    let prevCol = selectedCell.col;

    if (selectedWord.direction === 'horizontal') {
      prevCol--;
      if (prevCol < selectedWord.col) {
        return; // Inizio della parola
      }
    } else {
      prevRow--;
      if (prevRow < selectedWord.row) {
        return; // Inizio della parola
      }
    }

    setSelectedCell({ row: prevRow, col: prevCol });
  }, [selectedWord, selectedCell]);

  // Gestisce frecce direzionali
  const handleArrowKeys = useCallback((key) => {
    if (!selectedCell || !crosswordLayout) return;

    let newRow = selectedCell.row;
    let newCol = selectedCell.col;

    switch (key) {
      case 'ARROWUP':
        newRow = Math.max(0, newRow - 1);
        break;
      case 'ARROWDOWN':
        newRow = Math.min(crosswordLayout.grid.length - 1, newRow + 1);
        break;
      case 'ARROWLEFT':
        newCol = Math.max(0, newCol - 1);
        break;
      case 'ARROWRIGHT':
        newCol = Math.min(crosswordLayout.grid[0].length - 1, newCol + 1);
        break;
    }

    // Controlla che la nuova cella non sia nera
    if (crosswordLayout.grid[newRow][newCol] !== null) {
      handleCellClick(newRow, newCol);
    }
  }, [selectedCell, crosswordLayout, handleCellClick]);

  // Debug: riempi tutte le celle
  const fillAllCells = useCallback(() => {
    if (!crosswordLayout) return;

    const newAnswers = {};
    crosswordLayout.words.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        let row, col;
        if (word.direction === 'horizontal') {
          row = word.row;
          col = word.col + i;
        } else {
          row = word.row + i;
          col = word.col;
        }
        const cellKey = `${row}-${col}`;
        newAnswers[cellKey] = word.word[i];
      }
    });

    setUserAnswers(newAnswers);
    toast({
      title: "Debug attivato! 🔧",
      description: "Tutte le celle sono state riempite automaticamente."
    });
  }, [crosswordLayout, toast]);

  // Controlla se il cruciverba è completato
  const checkCompletion = useCallback(() => {
    if (!crosswordLayout) return false;

    return crosswordLayout.words.every(word => {
      for (let i = 0; i < word.word.length; i++) {
        let row, col;
        if (word.direction === 'horizontal') {
          row = word.row;
          col = word.col + i;
        } else {
          row = word.row + i;
          col = word.col;
        }
        const cellKey = `${row}-${col}`;
        const userChar = userAnswers[cellKey];
        if (!userChar || userChar !== word.word[i]) {
          return false;
        }
      }
      return true;
    });
  }, [crosswordLayout, userAnswers]);

  // Controlla completamento quando cambiano le risposte
  useEffect(() => {
    const completed = checkCompletion();
    setIsCompleted(completed);
  }, [userAnswers, checkCompletion]);

  // Conferma cruciverba
  const handleConfirm = () => {
    if (isCompleted) {
      setShowCongratulations(true);
      toast({
        title: "Congratulazioni! 🎉",
        description: "Hai completato il cruciverba con successo!"
      });
    } else {
      toast({
        title: "Cruciverba incompleto",
        description: "Completa tutte le parole prima di confermare.",
        variant: "destructive"
      });
    }
  };

  if (showCongratulations) {
    return <CongratulationsPage
      onRestart={() => {
        setShowCongratulations(false);
        setUserAnswers({});
        setSelectedWord(null);
        setSelectedCell(null);
        setIsCompleted(false);
      }}
      showNextButton={true}
    />;
  }

  if (!crosswordLayout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg">Generando il tuo cruciverba speciale...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedWords = crosswordLayout.words.filter(word => {
    for (let i = 0; i < word.word.length; i++) {
      let row, col;
      if (word.direction === 'horizontal') {
        row = word.row;
        col = word.col + i;
      } else {
        row = word.row + i;
        col = word.col;
      }
      const cellKey = `${row}-${col}`;
      if (!userAnswers[cellKey] || userAnswers[cellKey] !== word.word[i]) {
        return false;
      }
    }
    return true;
  });

  // --- NUOVO LAYOUT A TRE COLONNE NON SCORRIBILE ---
  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col lg:flex-row lg:overflow-hidden items-stretch justify-center gap-6 p-4 lg:p-8">

      {/* Colonna centrale: Griglia e controlli (Prima su mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 order-1 lg:order-2">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-indigo-800/90 mb-2 px-4 flex-shrink-0">
          Così ti prepari alla settimana enigmistica...
        </h2>
        
        <div className="w-full flex justify-center items-center flex-grow overflow-auto p-2">
          <CrosswordGrid
            grid={crosswordLayout.grid}
            words={crosswordLayout.words}
            userAnswers={userAnswers}
            onCellClick={handleCellClick}
            selectedWord={selectedWord}
            selectedCell={selectedCell}
          />
        </div>
        
        <div className="flex gap-4 w-full max-w-sm mt-2 flex-shrink-0">
          <Button
            onClick={handleConfirm}
            className={`flex-1 text-lg py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              isCompleted
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isCompleted ? '🎉 Conferma!' : 'Conferma'}
          </Button>
          {/* <Button
            onClick={fillAllCells}
            variant="outline"
            className="text-sm py-3 px-4 rounded-lg shadow-md border-orange-400 text-orange-700 hover:bg-orange-50 transition-transform transform hover:scale-105"
          >
            🔧 Debug
          </Button> */}
        </div>
      </div>

      {/* Colonna sinistra: Domande orizzontali (Seconda su mobile) */}
      <div className="w-full lg:w-1/4 order-2 lg:order-1 flex flex-col min-h-0">
        <div className="overflow-y-auto">
            <CluesList
              horizontalClues={crosswordLayout.horizontalClues}
              verticalClues={[]}
              onClueClick={handleClueClick}
              selectedWord={selectedWord}
              completedWords={completedWords.filter(w => w.direction === 'horizontal')}
              soloOrizzontali
            />
        </div>
      </div>

      {/* Colonna destra: Domande verticali (Terza su mobile) */}
      <div className="w-full lg:w-1/4 order-3 lg:order-3 flex flex-col min-h-0">
        <div className="overflow-y-auto">
            <CluesList
              horizontalClues={[]}
              verticalClues={crosswordLayout.verticalClues}
              onClueClick={handleClueClick}
              selectedWord={selectedWord}
              completedWords={completedWords.filter(w => w.direction === 'vertical')}
              soloVerticali
            />
        </div>
      </div>
    </div>
  );
};

export default CrosswordGame;