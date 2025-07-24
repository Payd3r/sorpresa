import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { quizQuestions } from '../data/quizData';
import { useToast } from '../hooks/use-toast';

const PhotoQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  useEffect(() => {
    setShowAnimation(true);
  }, [currentQuestion]);

  const handleImageClick = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "Corretto! 🎉",
        description: "Hai scelto la risposta giusta!"
      });
    } else {
      toast({
        title: "Ops! 😅",
        description: `La risposta corretta era: ${question.options[question.correctAnswer]}`,
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigate('/final-gift');
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowAnimation(false);
    
    // Reset animation
    setTimeout(() => setShowAnimation(true), 100);
  };

  const getImageClassName = (index) => {
    let baseClass = "w-full h-32 object-cover rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ";
    
    if (!showResult) {
      return baseClass + "hover:ring-4 hover:ring-blue-300";
    }
    
    if (index === question.correctAnswer) {
      return baseClass + "ring-4 ring-green-500 scale-105";
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return baseClass + "ring-4 ring-red-500 opacity-60";
    } else {
      return baseClass + "opacity-40";
    }
  };

  const getLabelClassName = (index) => {
    let baseClass = "text-center p-2 rounded font-medium transition-all duration-300 ";
    
    if (!showResult) {
      return baseClass + "bg-slate-100 text-slate-700";
    }
    
    if (index === question.correctAnswer) {
      return baseClass + "bg-green-100 text-green-800 font-bold";
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return baseClass + "bg-red-100 text-red-800";
    } else {
      return baseClass + "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            📸 Quiz dei Ricordi 📸
          </h1>
          <p className="text-slate-600 mb-4">
            Scegli la foto che corrisponde ai nostri momenti speciali
          </p>
          
          {/* Progress */}
          <div className="flex justify-center items-center space-x-4">
            <Badge variant="outline" className="text-sm">
              Domanda {currentQuestion + 1} di {quizQuestions.length}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Punteggio: {score}/{quizQuestions.length}
            </Badge>
          </div>
        </div>

        {/* Question Card */}
        <Card className={`
          bg-white/90 backdrop-blur-sm shadow-xl mb-6
          transform transition-all duration-500 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }
        `}>
          <CardHeader>
            <CardTitle className="text-lg text-center text-slate-800">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {question.images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <img
                    src={image}
                    alt={question.options[index]}
                    className={getImageClassName(index)}
                    onClick={() => handleImageClick(index)}
                  />
                  <div className={getLabelClassName(index)}>
                    {question.options[index]}
                  </div>
                </div>
              ))}
            </div>

            {/* Result Message */}
            {showResult && (
              <div className={`
                text-center p-4 rounded-lg mb-4 transition-all duration-300
                ${isCorrect 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-red-50 border-2 border-red-200'
                }
              `}>
                <div className="text-4xl mb-2">
                  {isCorrect ? '🎉' : '😅'}
                </div>
                <p className={`font-semibold ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect 
                    ? 'Perfetto! Ricordi sempre tutto! 💕' 
                    : `Era ${question.options[question.correctAnswer]}! Ma non importa, l'importante è il nostro amore! ❤️`
                  }
                </p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <Button
                onClick={handleNext}
                className={`
                  w-full py-3 text-lg font-semibold transition-all duration-300
                  ${isLastQuestion
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  } text-white
                `}
                size="lg"
              >
                {isLastQuestion ? '🎁 Scopri il tuo regalo!' : '➡️ Prossima domanda'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        {!showResult && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <p className="text-sm text-purple-700 text-center">
                💡 <strong>Tocca l'immagine</strong> che corrisponde meglio alla domanda. 
                Ogni foto racchiude un pezzo del nostro cuore! 💕
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PhotoQuiz;