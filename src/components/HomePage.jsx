import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const heartEmojis = ['💕', '💖', '💝', '💗', '💓', '💞', '💘', '❤️'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Cuori animati in background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={`absolute animate-pulse text-xl opacity-20 ${
            showAnimation ? 'animate-bounce' : ''
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
        </div>
      ))}

      {/* Contenuto principale */}
      <Card className={`
        max-w-lg w-full bg-white/90 backdrop-blur-sm shadow-2xl
        transform transition-all duration-1000 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }
      `}>
        <CardContent className="p-8 text-center">
          {/* Titolo animato */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-0 animate-pulse pb-2">
              💕 Ciao Cucciola! 💕
            </h1>
          </div>

          {/* Messaggio introduttivo */}
          <div className="space-y-6 mb-8">
            <p className="text-xl font-semibold text-slate-800 leading-relaxed">
              Sembra incredibile ma è già il secondo anno che festeggiamo il tuo compleanno insieme. Sono successe e cambiate tantissime cose ma noi comunque siamo più forti che mai, saranno probabilmente stati quei quattro mesi in Canada ad aiutare. Non ho tanto da dirti oltre che ti amo tantissimo e questa cosa non cambierà mai, che sei sempre fantastica in qualsiasi situazione e che ai miei occhi non hai difetti. Giusto un piccolo reminder che ogni tanto ci sta sempre.   
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Ho preparato per te una serie di sfide speciali piene dei nostri ricordi più belli. 
              Ogni sfida superata ti porterà sempre più vicina alla sorpresa, vedi di non sbagliare altrimenti ti toccherà aspettare l'anno prossimo!
            </p>
            
            {/* Info sulle sfide */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 pt-2 pb-6 px-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-800 mb-3">🎮 Le tue sfide:</h3>
              <div className="space-y-2 text-left">
                <div className="flex items-center text-blue-700">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span>Cruciverba dei nostri ricordi</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span>Quiz fotografico</span>
                </div>
                <div className="flex items-center text-pink-700">
                  <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span>La tua sorpresa finale!</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottone di inizio */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/crossword')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 text-lg transform hover:scale-105 transition-all duration-200"
              size="lg"
            >
              🚀 Inizia la prima sfida!
            </Button>
            
          </div>

          {/* Decorazioni */}
          <div className="absolute top-3 right-3 text-2xl animate-spin">✨</div>
          <div className="absolute bottom-3 left-3 text-2xl animate-ping">⭐</div>
          <div className="absolute top-1/3 right-6 text-xl animate-pulse">🌟</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;