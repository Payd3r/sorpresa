// Algoritmo avanzato per generazione cruciverba con intersezioni ottimali
export class CrosswordGenerator {
  constructor(words, gridSize = 25) {
    this.words = words.map(w => ({
      ...w,
      word: w.word.toUpperCase(),
      placed: false,
      row: -1,
      col: -1,
      number: 0
    }));
    this.gridSize = gridSize;
    this.grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
    this.placedWords = [];
    this.clueNumbers = [];
  }

  // Trova intersezioni tra due parole
  findIntersections(word1, word2) {
    const intersections = [];
    for (let i = 0; i < word1.length; i++) {
      for (let j = 0; j < word2.length; j++) {
        if (word1[i] === word2[j]) {
          intersections.push({ pos1: i, pos2: j, char: word1[i] });
        }
      }
    }
    return intersections;
  }

  // Controlla se una parola può essere piazzata
  canPlaceWord(word, row, col, direction) {
    if (direction === 'horizontal') {
      if (col + word.word.length > this.gridSize) return false;
      
      // Controlla spazio prima e dopo
      if (col > 0 && this.grid[row][col - 1] !== null) return false;
      if (col + word.word.length < this.gridSize && this.grid[row][col + word.word.length] !== null) return false;
      
      // Controlla ogni cella
      for (let i = 0; i < word.word.length; i++) {
        const currentCell = this.grid[row][col + i];
        if (currentCell !== null && currentCell !== word.word[i]) return false;
        
        // Controlla celle sopra e sotto
        if (currentCell === null) {
          if (row > 0 && this.grid[row - 1][col + i] !== null) return false;
          if (row < this.gridSize - 1 && this.grid[row + 1][col + i] !== null) return false;
        }
      }
    } else { // vertical
      if (row + word.word.length > this.gridSize) return false;
      
      // Controlla spazio prima e dopo
      if (row > 0 && this.grid[row - 1][col] !== null) return false;
      if (row + word.word.length < this.gridSize && this.grid[row + word.word.length][col] !== null) return false;
      
      // Controlla ogni cella
      for (let i = 0; i < word.word.length; i++) {
        const currentCell = this.grid[row + i][col];
        if (currentCell !== null && currentCell !== word.word[i]) return false;
        
        // Controlla celle a sinistra e destra
        if (currentCell === null) {
          if (col > 0 && this.grid[row + i][col - 1] !== null) return false;
          if (col < this.gridSize - 1 && this.grid[row + i][col + 1] !== null) return false;
        }
      }
    }
    return true;
  }

  // Piazza una parola nella griglia
  placeWord(word, row, col, direction) {
    word.row = row;
    word.col = col;
    word.direction = direction;
    word.placed = true;

    if (direction === 'horizontal') {
      for (let i = 0; i < word.word.length; i++) {
        this.grid[row][col + i] = word.word[i];
      }
    } else {
      for (let i = 0; i < word.word.length; i++) {
        this.grid[row + i][col] = word.word[i];
      }
    }

    this.placedWords.push(word);
  }

  // Trova la migliore posizione per una word che interseca con quelle già piazzate
  findBestPlacement(word) {
    const placements = [];

    for (const placedWord of this.placedWords) {
      const intersections = this.findIntersections(word.word, placedWord.word);
      
      for (const intersection of intersections) {
        if (word.direction !== placedWord.direction) {
          let newRow, newCol;
          
          if (word.direction === 'horizontal') {
            newRow = placedWord.row + intersection.pos2;
            newCol = placedWord.col - intersection.pos1;
          } else {
            newRow = placedWord.row - intersection.pos1;
            newCol = placedWord.col + intersection.pos2;
          }

          if (newRow >= 0 && newCol >= 0 && 
              this.canPlaceWord(word, newRow, newCol, word.direction)) {
            placements.push({
              row: newRow,
              col: newCol,
              intersections: intersections.length,
              word: word
            });
          }
        }
      }
    }

    // Ordina per numero di intersezioni (più intersezioni = meglio)
    placements.sort((a, b) => b.intersections - a.intersections);
    return placements[0];
  }

  // Genera la griglia completa
  generate() {
    // Ordina le parole per lunghezza (più lunghe prima per miglior layout)
    const sortedWords = [...this.words].sort((a, b) => b.word.length - a.word.length);
    
    // Piazza la prima parola al centro
    const firstWord = sortedWords[0];
    const centerRow = Math.floor(this.gridSize / 2);
    const centerCol = Math.floor((this.gridSize - firstWord.word.length) / 2);
    this.placeWord(firstWord, centerRow, centerCol, firstWord.direction);

    // Piazza le altre parole
    for (let i = 1; i < sortedWords.length; i++) {
      const word = sortedWords[i];
      const placement = this.findBestPlacement(word);
      
      if (placement) {
        this.placeWord(word, placement.row, placement.col, word.direction);
      } else {
        // Se non trova intersezioni, prova a piazzare dove possibile
        let placed = false;
        for (let row = 0; row < this.gridSize && !placed; row++) {
          for (let col = 0; col < this.gridSize && !placed; col++) {
            if (this.canPlaceWord(word, row, col, word.direction)) {
              this.placeWord(word, row, col, word.direction);
              placed = true;
            }
          }
        }
      }
    }

    this.generateClueNumbers();
    return this.getCompactGrid();
  }

  // Genera numerazione per le domande
  generateClueNumbers() {
    const startPositions = new Map();
    
    for (const word of this.placedWords) {
      const key = `${word.row}-${word.col}`;
      if (!startPositions.has(key)) {
        startPositions.set(key, []);
      }
      startPositions.get(key).push(word);
    }

    let clueNumber = 1;
    const sortedPositions = Array.from(startPositions.entries())
      .sort(([a], [b]) => {
        const [aRow, aCol] = a.split('-').map(Number);
        const [bRow, bCol] = b.split('-').map(Number);
        return aRow === bRow ? aCol - bCol : aRow - bRow;
      });

    for (const [position, words] of sortedPositions) {
      for (const word of words) {
        word.number = clueNumber;
      }
      clueNumber++;
    }
  }

  // Ottieni griglia compatta (rimuovi righe/colonne vuote)
  getCompactGrid() {
    let minRow = this.gridSize, maxRow = -1;
    let minCol = this.gridSize, maxCol = -1;

    // Trova bounds della griglia utilizzata
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col] !== null) {
          minRow = Math.min(minRow, row);
          maxRow = Math.max(maxRow, row);
          minCol = Math.min(minCol, col);
          maxCol = Math.max(maxCol, col);
        }
      }
    }

    // Crea griglia compatta
    const compactGrid = [];
    for (let row = minRow; row <= maxRow; row++) {
      const newRow = [];
      for (let col = minCol; col <= maxCol; col++) {
        newRow.push(this.grid[row][col]);
      }
      compactGrid.push(newRow);
    }

    // Aggiorna posizioni delle parole
    for (const word of this.placedWords) {
      word.row -= minRow;
      word.col -= minCol;
    }

    return {
      grid: compactGrid,
      words: this.placedWords,
      horizontalClues: this.placedWords.filter(w => w.direction === 'horizontal')
        .sort((a, b) => a.number - b.number),
      verticalClues: this.placedWords.filter(w => w.direction === 'vertical')
        .sort((a, b) => a.number - b.number)
    };
  }
}

export default CrosswordGenerator;