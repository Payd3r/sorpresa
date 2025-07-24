import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const FinalGiftPage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const heartEmojis = ['💕', '💖', '💝', '💗', '💓', '💞', '💘', '❤️', '🎁', '✨'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Elementi animati in background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className={`absolute animate-pulse text-2xl opacity-30 ${
            showAnimation ? 'animate-bounce' : ''
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
        </div>
      ))}

      {/* Contenuto principale */}
      <Card className={`
        max-w-lg w-full bg-white/95 backdrop-blur-sm shadow-2xl
        transform transition-all duration-1000 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }
      `}>
        <CardContent className="p-8 text-center">
          {/* Titolo principale */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 animate-pulse">
              🎁 ECCO IL TUO REGALO! 🎁
            </h1>
            <div className="text-8xl mb-6 animate-bounce">
              💖
            </div>
          </div>

          {/* Messaggio principale */}
          <div className="space-y-6 mb-8">
            <p className="text-2xl font-bold text-slate-800">
              Hai completato tutte le sfide!
            </p>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
              <p className="text-lg text-pink-800 font-medium leading-relaxed mb-4">
                "Ogni momento con te è un regalo, ogni ricordo un tesoro, ogni giorno insieme una benedizione."
              </p>
              <p className="text-base text-purple-700 italic">
                Il vero regalo sei tu nella mia vita ❤️
              </p>
            </div>

            {/* Area personalizzabile per il regalo vero */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎁</div>
                <p className="text-xl font-bold text-orange-800 mb-2">
                  Il tuo regalo speciale
                </p>
                <p className="text-orange-700">
                  [Qui puoi inserire il tuo regalo personalizzato]
                </p>
                <div className="mt-4 text-sm text-orange-600 italic">
                  Questo spazio è tutto tuo per la sorpresa finale! 💝
                </div>
              </div>
            </div>

            {/* Statistiche finali */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-blue-800">Sfide completate</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-pink-600">∞</div>
                <div className="text-sm text-pink-800">Amore per te</div>
              </div>
            </div>
          </div>

          {/* Bottoni finali */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              size="lg"
            >
              💕 Torna all'inizio
            </Button>
            
            <Button
              onClick={() => navigate('/crossword')}
              variant="outline"
              className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold py-3"
              size="lg"
            >
              🔄 Rigioca il cruciverba
            </Button>
            
            <div className="text-xs text-slate-500 mt-6">
              Creato con tutto il mio amore per te ❤️
            </div>
          </div>

          {/* Decorazioni animate */}
          <div className="absolute top-4 right-4 text-3xl animate-spin">✨</div>
          <div className="absolute bottom-4 left-4 text-3xl animate-ping">⭐</div>
          <div className="absolute top-1/2 right-6 text-2xl animate-pulse">🌟</div>
          <div className="absolute top-1/4 left-6 text-2xl animate-bounce">💫</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalGiftPage;