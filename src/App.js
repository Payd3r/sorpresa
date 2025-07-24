import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CrosswordGame from "./components/CrosswordGame";
import PhotoQuiz from "./components/PhotoQuiz";
import FinalGiftPage from "./components/FinalGiftPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crossword" element={<CrosswordGame />} />
          <Route path="/photo-quiz" element={<PhotoQuiz />} />
          <Route path="/final-gift" element={<FinalGiftPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
