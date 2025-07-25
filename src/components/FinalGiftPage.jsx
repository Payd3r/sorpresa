import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, Plane, Home, MapPin, Camera, Landmark, Utensils, Heart, Ship } from 'lucide-react';

const FinalGiftPage = () => {

  const itinerary = [
    {
      day: "Giorno 1: Mercoledì 07 Novembre",
      title: "Arrivo e Magia a Montmartre",
      activities: [
        { text: "Partenza da Milano Malpensa (MXP) e arrivo a Parigi (BVA).", icon: <Plane className="h-5 w-5 text-blue-500" /> },
        { text: "Trasferimento in treno verso il nostro appartamento.", icon: <Home className="h-5 w-5 text-green-500" /> },
        { text: "Esplorazione del quartiere Le Marais, tra negozi unici e piazze storiche.", icon: <MapPin className="h-5 w-5 text-red-500" /> },
        { text: "Serata a Montmartre: passeggiata fino alla Basilica del Sacro Cuore per un tramonto mozzafiato.", icon: <MapPin className="h-5 w-5 text-red-500" /> },
        { text: "Cena romantica in un bistrot tipico nella Place du Tertre.", icon: <Utensils className="h-5 w-5 text-orange-500" /> },
      ],
      imagePlaceholder: "/img/img1.jpg"
    },
    {
      day: "Giorno 2: Giovedì 08 Novembre",
      title: "Arte, Giardini e la Dama di Ferro",
      activities: [
        { text: "Mattinata al Museo del Louvre: alla scoperta di capolavori come la Gioconda e la Venere di Milo.", icon: <Landmark className="h-5 w-5 text-purple-500" /> },
        { text: "Passeggiata rilassante nei Giardini delle Tuileries.", icon: <MapPin className="h-5 w-5 text-red-500" /> },
        { text: "Pomeriggio al Museo d'Orsay, per ammirare i capolavori dell'Impressionismo.", icon: <Landmark className="h-5 w-5 text-purple-500" /> },
        { text: "Crociera serale sui Bateaux-Mouches per ammirare Parigi dal fiume. ", icon: <Ship className="h-5 w-5 text-teal-500" /> },        
        { text: "Serata magica: la Tour Eiffel e la Senna!", icon: <Heart className="h-5 w-5 text-pink-500" /> },
      ],
      imagePlaceholder: "/img/img2.jpg"
    },
    {
      day: "Giorno 3: Domenica 09 Novembre",
      title: "Ultimi Sguardi e Arrivederci",
      activities: [
        { text: "Visita alla Cattedrale di Notre-Dame (esterno) e alla Sainte-Chapelle con le sue vetrate gotiche.", icon: <Landmark className="h-5 w-5 text-purple-500" /> },
        { text: "Colazione con croissant freschi in una boulangerie locale.", icon: <Utensils className="h-5 w-5 text-orange-500" /> },
        { text: "Ultimo giro per souvenir o una visita alla libreria Shakespeare and Company.", icon: <MapPin className="h-5 w-5 text-red-500" /> },
        { text: "Trasferimento verso l'aeroporto (BVA).", icon: <Plane className="h-5 w-5 text-blue-500" /> },
        { text: "Rientro a Milano Malpensa tutti tristi.", icon: <Heart className="h-5 w-5 text-pink-500" /> },
      ],
      imagePlaceholder: "/img/img3.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 p-4 md:p-8 lg:p-12">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Hero Section --- */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
            La nostra prossima avventura...
          </h1>
          <motion.h2
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mt-2 pb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
          >
            Parigi!
          </motion.h2>
          <p className="mt-4 text-lg text-gray-600">Vediamo se Duolingo ti ha insegnato abbastanza bene il francese</p>
        </motion.div>

        {/* --- Dettagli del Viaggio --- */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-2xl rounded-2xl overflow-hidden mb-12 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-bold text-gray-700">Dettagli del Regalo</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-8 text-center p-6">
              <div className="flex flex-col items-center">
                <Plane className="h-10 w-10 text-blue-500 mb-2" />
                <h3 className="font-bold text-lg">Volo A/R</h3>
                <p className="text-gray-600">Milano (MXP) ↔ Parigi (BVA)</p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-10 w-10 text-red-500 mb-2" />
                <h3 className="font-bold text-lg">Date</h3>
                <p className="text-gray-600">07 - 09 Novembre 2024</p>
              </div>
              <div className="flex flex-col items-center">
                <Home className="h-10 w-10 text-green-500 mb-2" />
                <h3 className="font-bold text-lg">Alloggio</h3>
                <p className="text-gray-600">Un romantico appartamento tutto per noi</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- Itinerario --- */}
        <motion.h3 variants={itemVariants} className="text-3xl font-bold text-center text-gray-800 mb-8">
          Il Nostro Itinerario
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {itinerary.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Card className="shadow-xl rounded-xl bg-white/80 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-800">{item.day}</CardTitle>
                  <p className="text-md text-purple-600">{item.title}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {item.activities.map((activity, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">{activity.icon}</div>
                        <span>{activity.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 bg-gray-200 rounded-lg h-48 flex items-center justify-center overflow-hidden">                    
                    <img 
                      src={item.imagePlaceholder || '/img/placeholder.jpg'} 
                      alt="Immagine regalo" 
                      className="w-full h-full object-cover rounded shadow"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Mappa --- */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-bold text-gray-700">Dove Saremo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.75768122233!2d2.27701964621727!3d48.85895068132428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParigi%2C%20Francia!5e0!3m2!1sit!2sit!4v1689262104015!5m2!1sit!2sit"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa di Parigi"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- Messaggio Finale --- */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700">Pronta a spaccarti di cultura dentro i musei insieme a me?</p>
          <Button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Non vedo l'ora!
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalGiftPage;
