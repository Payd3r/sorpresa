import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const CongratulationsPage = ({ onRestart, showNextButton = false }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const heartEmojis = ['💕', '💖', '💝', '💗', '💓', '💞', '💘', '❤️'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Cuori animati in background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute animate-pulse text-2xl opacity-30 ${
            showAnimation ? 'animate-bounce' : ''
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
        </div>
      ))}

      {/* Contenuto principale */}
      <Card className={`
        max-w-lg w-full bg-white/90 backdrop-blur-sm shadow-2xl
        transform transition-all duration-1000 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }
      `}>
        <CardContent className="p-8 text-center">
          {/* Titolo animato */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2 animate-pulse">
              CONGRATULAZIONI! 
            </h1>
            <div className="text-6xl mb-4 animate-bounce">
              💖
            </div>
          </div>

          {/* Messaggio */}
          <div className="space-y-4 mb-6">
            <p className="text-xl font-semibold text-slate-800">
              Hai completato il cruciverba!
            </p>        
          </div>
          {/* Bottoni */}
          <div className="space-y-3">
            {/* Bottone principale - cambia in base a showNextButton */}
            {showNextButton ? (
              <Button
                onClick={() => navigate('/photo-quiz')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 text-lg"
                size="lg"
              >
                🚀 Prosegui per la sfida successiva!
              </Button>
            ) : (
              <Button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
                size="lg"
              >
                💕 Rigioca il cruciverba
              </Button>
            )}
            
            {/* Bottone secondario */}
            {showNextButton && (
              <Button
                onClick={onRestart}
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold py-2"
                size="lg"
              >
                🔄 Rigioca il cruciverba
              </Button>
            )}
          
          </div>

          {/* Effetto scintille */}
          <div className="absolute top-2 right-2 text-2xl animate-spin">✨</div>
          <div className="absolute bottom-2 left-2 text-2xl animate-ping">⭐</div>
          <div className="absolute top-1/2 right-4 text-xl animate-pulse">🌟</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CongratulationsPage;