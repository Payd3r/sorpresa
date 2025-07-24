import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const CongratulationsPage = ({ onRestart }) => {
  const [showAnimation, setShowAnimation] = useState(false);

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
              🎉 CONGRATULAZIONI! 🎉
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
            <p className="text-lg text-slate-600 leading-relaxed">
              Ogni parola che hai risolto è un ricordo speciale che condividiamo insieme. 
              Grazie per aver condiviso tutti questi momenti meravigliosi con me! 💕
            </p>
            
            {/* Messaggio romantico */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-2 border-pink-200">
              <p className="text-base text-pink-800 font-medium italic">
                "Ogni cruciverba ha una soluzione, proprio come ogni giorno con te ha un motivo per sorridere. Ti amo! ❤️"
              </p>
            </div>
          </div>

          {/* Statistiche fittizie carine */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">47</div>
              <div className="text-sm text-blue-800">Parole d'amore</div>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">∞</div>
              <div className="text-sm text-pink-800">Ricordi insieme</div>
            </div>
          </div>

          {/* Bottoni */}
          <div className="space-y-3">
            <Button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              size="lg"
            >
              💕 Rigioca il cruciverba
            </Button>
            
            <div className="text-xs text-slate-500 mt-4">
              Fatto con ❤️ per te
            </div>
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