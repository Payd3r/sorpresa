// Mock data per il quiz fotografico
// Ogni domanda avrà 4 opzioni di foto, solo una corretta

export const quizQuestions = [
  {
    id: 1,
    question: "In quale città abbiamo fatto questa romantica passeggiata al tramonto?",
    correctAnswer: 0,
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop&auto=format", // Parigi
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop&auto=format", // Londra
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop&auto=format", // Roma
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format"  // Barcellona
    ],
    options: ["Parigi", "Londra", "Roma", "Barcellona"]
  },
  {
    id: 2,
    question: "Quale di questi dolci abbiamo condiviso durante il nostro primo appuntamento?",
    correctAnswer: 1,
    images: [
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&auto=format", // Cheesecake
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format", // Tiramisu
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format", // Gelato
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop&auto=format"  // Croissant
    ],
    options: ["Cheesecake", "Tiramisu", "Gelato", "Croissant"]
  },
  {
    id: 3,
    question: "Dove abbiamo scattato la nostra prima foto insieme?",
    correctAnswer: 2,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format", // Montagna
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&auto=format", // Cinema
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format", // Parco
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format"  // Museo
    ],
    options: ["In montagna", "Al cinema", "Nel parco", "Al museo"]
  },
  {
    id: 4,
    question: "Quale fiore ti ho regalato per la prima volta?",
    correctAnswer: 0,
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&auto=format", // Rose rosse
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&auto=format", // Tulipani
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop&auto=format", // Girasoli
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&h=300&fit=crop&auto=format"  // Orchidee
    ],
    options: ["Rose rosse", "Tulipani", "Girasoli", "Orchidee"]
  },
  {
    id: 5,
    question: "In quale ristorante abbiamo celebrato il nostro primo mese insieme?",
    correctAnswer: 3,
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&auto=format", // Sushi
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&h=300&fit=crop&auto=format", // Pizza
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&auto=format", // Bistrot
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format"  // Italiano
    ],
    options: ["Sushi bar", "Pizzeria", "Bistrot francese", "Ristorante italiano"]
  },
  {
    id: 6,
    question: "Quale attività abbiamo fatto durante la nostra prima vacanza insieme?",
    correctAnswer: 1,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&auto=format", // Escursionismo
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format", // Spiaggia
      "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=400&h=300&fit=crop&auto=format", // Sci
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format"  // Città
    ],
    options: ["Escursionismo", "Relax in spiaggia", "Sci in montagna", "Tour della città"]
  },
  {
    id: 7,
    question: "Quale film abbiamo visto insieme al cinema per la prima volta?",
    correctAnswer: 2,
    images: [
      "https://images.unsplash.com/photo-1489599739443-11c6f6ecd5ac?w=400&h=300&fit=crop&auto=format", // Horror
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop&auto=format", // Commedia
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=300&fit=crop&auto=format", // Romantico
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop&auto=format"  // Azione
    ],
    options: ["Film horror", "Commedia", "Film romantico", "Film d'azione"]
  },
  {
    id: 8,
    question: "Dove abbiamo trascorso il nostro primo San Valentino?",
    correctAnswer: 0,
    images: [
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&auto=format", // Casa
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format", // Ristorante
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format", // Parco
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop&auto=format"  // Città
    ],
    options: ["A casa", "Al ristorante", "Nel parco", "In centro città"]
  },
  {
    id: 9,
    question: "Quale sport abbiamo provato insieme per la prima volta?",
    correctAnswer: 3,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format", // Tennis
      "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=400&h=300&fit=crop&auto=format", // Nuoto
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format", // Trekking
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format"  // Bicicletta
    ],
    options: ["Tennis", "Nuoto", "Trekking", "Bicicletta"]
  },
  {
    id: 10,
    question: "Quale momento rappresenta meglio il nostro amore?",
    correctAnswer: 1,
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop&auto=format", // Tramonto
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&auto=format", // Abbraccio
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format", // Passeggiata
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format"  // Risata
    ],
    options: ["Tramonto romantico", "Il nostro primo abbraccio", "Passeggiata mano nella mano", "Le nostre risate insieme"]
  }
];

export default quizQuestions;