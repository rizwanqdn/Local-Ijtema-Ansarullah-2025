// app/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Countdown from './components/Countdown';
import ParticlesBackground from './components/ParticlesBackground';

// Define a type for a single theme
type Theme = {
  background: string;
  borderColor: string;
  textColor: string;
  containerGradient: string;
  linkHoverBg: string; // New property for link hover effects
};

// Define your curated list of modern themes
const themes: Theme[] = [
  // A modern, dark indigo theme with glassmorphism
  {
    background: "/backgrounds/background1.jpg",
    borderColor: "border-indigo-400/40",
    textColor: "text-indigo-200",
    containerGradient: 'bg-gradient-to-br from-indigo-950/10 to-zinc-950/10',
    linkHoverBg: 'hover:bg-indigo-700/60',
  },
  // A sleek, light silver theme with glassmorphism
  {
    background: "/backgrounds/background2.jpg",
    borderColor: "border-gray-500/40",
    textColor: "text-gray-300",
    containerGradient: 'bg-gradient-to-br from-gray-950/10 to-gray-900/10',
    linkHoverBg: 'hover:bg-gray-700/60',
  },
  // A vibrant, dark teal theme with glassmorphism
  {
    background: "/backgrounds/background3.jpg",
    borderColor: "border-teal-400/40",
    textColor: "text-teal-200",
    containerGradient: 'bg-gradient-to-br from-teal-950/10 to-slate-900/10',
    linkHoverBg: 'hover:bg-teal-700/60',
  },
  // A warm, golden theme with glassmorphism
  {
    background: "/islamic-pattern.jpg",
    borderColor: "border-yellow-300/40",
    textColor: "text-yellow-300",
    containerGradient: 'bg-gradient-to-br from-amber-950/10 to-stone-900/10',
    linkHoverBg: 'hover:bg-yellow-700/60',
  },
  {
    background: "/backgrounds/background4.jpg",
    borderColor: "border-indigo-400/40",
    textColor: "text-yellow-300",
    containerGradient: 'bg-gradient-to-br from-indigo-950/10 to-zinc-950/10',
    linkHoverBg: 'hover:bg-indigo-700/60',
  },
  {
    background: "/backgrounds/background5.jpg",
    borderColor: "border-indigo-400/40",
    textColor: "text-yellow-300",
    containerGradient: 'bg-gradient-to-br from-indigo-950/10 to-zinc-950/10',
    linkHoverBg: 'hover:bg-indigo-700/60',
  },
  {
    background: "/black-pattern.jpg",
    borderColor: "border-indigo-400/40",
    textColor: "text-yellow-300",
    containerGradient: 'bg-gradient-to-br from-indigo-950/10 to-zinc-950/10',
    linkHoverBg: 'hover:bg-indigo-700/60',
  },
  {
    background: "/white-pattern.jpg",
    borderColor: "border-indigo-400/40",
    textColor: "text-yellow-300",
    containerGradient: 'bg-gradient-to-br from-indigo-950/10 to-zinc-950/10',
    linkHoverBg: 'hover:bg-indigo-700/60',
  },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetDate = new Date('2025-09-25T00:00:00');
  const totalCards = 4;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * themes.length);
    setCurrentTheme(themes[randomIndex]);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play();
      } else {
        audioRef.current.muted = true;
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleNextClick = () => {
    setCardIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };
  
  const handleBackClick = () => {
    setCardIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  };

  if (!currentTheme) {
    return null;
  }

  const transformValue = `translateX(-${cardIndex * 100}%)`;
  const isLastCard = cardIndex === totalCards - 1;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 text-white text-center font-sans overflow-hidden">
      {/* Background Layer with image and a subtle gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed animate-ken-burns" 
        style={{ backgroundImage: `url('${currentTheme.background}')` }}
      >
        <div className="absolute inset-0 bg-black/70 animate-pulse-subtle"></div> 
      </div>

      {/* Particles Background - positioned above the image and its dimming overlay */}
      <ParticlesBackground />
      
      {/* Audio Element: Controls the volume based on state */}
      <audio ref={audioRef} autoPlay loop muted={isMuted}>
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio Control Button */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-3xl transition-colors text-white shadow-lg border border-white/20"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? (
            // Muted Speaker Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.81 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.4.05-.63zM19 12c0 .9-.23 1.74-.63 2.5l1.62 1.62C20.47 14.88 21 13.49 21 12c0-4.48-3.03-8.21-7-9.28v2.06c2.89.81 5 3.54 5 6.72zm-2.5 5c0 1.77-1.02 3.29-2.5 4.03v-2.21l2.45-2.45c.03.2.05.4.05.63zM14 3.23v2.06c2.89.81 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
        ) : (
            // Unmuted Speaker Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.81 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
        )}
      </button>

      {/* Main Content Container with gradient border and blur */}
      <div 
        className={`relative z-10 w-full max-w-2xl backdrop-blur-3xl ${currentTheme.containerGradient} p-6 sm:p-10 rounded-3xl shadow-3xl min-h-[500px] flex flex-col items-center justify-between overflow-hidden transition-all duration-300`}>
        
        {/* Fixed Header Content (Always Visible) */}
        <div className="flex flex-col items-center">
            <h1 className={`text-4xl sm:text-5xl font-extrabold my-1 ${currentTheme.textColor} drop-shadow-lg font-jost`}>Local Ijtema</h1>
            <h1 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${currentTheme.textColor} drop-shadow-lg font-jost`}>Majlis Ansarullah Qadian 2025</h1>
        </div>

        {/* Inner container for sliding cards */}
        <div className="relative w-full h-full flex-grow overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out w-full h-full"
            style={{ transform: transformValue }}
          >
            {/* Card 1: Logo and Urdu Headings */}
            <div className="flex-shrink-0 w-full flex flex-col items-center justify-center p-4">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4">
                <Image
                  src="/ansarullah-logo.png"
                  alt="Majlis Ansarullah Logo"
                  fill
                  className="rounded-full border-6 border-yellow-300 shadow-lg object-contain"
                />
              </div>
              {/* Urdu Headings */}
              <div className="mt-4">
                  <h1 style={{ fontFamily: "'Jameel Noori Nastaleeq', sans-serif" }} className={`text-6xl sm:text-7xl font-extrabold my-1 ${currentTheme.textColor} drop-shadow-lg`}>لوکل اجتماع </h1>
                  <h1 style={{ fontFamily: "'Jameel Noori Nastaleeq', sans-serif" }} className={`text-5xl sm:text-6xl font-extrabold my-1 ${currentTheme.textColor} drop-shadow-lg`}>مجلس انصار اللہ قادیان</h1>
                  <h1 className={`text-4xl sm:text-5xl font-extrabold my-1 ${currentTheme.textColor} drop-shadow-lg`}>2025</h1>
              </div>
            </div>
            
            {/* Card 2: Countdown */}
            <div className="flex-shrink-0 w-full flex flex-col items-center justify-center p-4">
              <h2 className={`text-4xl font-bold ${currentTheme.textColor} mb-2 font-jost`}>Countdown begins! </h2>
              <Countdown targetDate={targetDate} />
               <p className={`text-lg font-bold ${currentTheme.textColor} mt-4 font-jost`}>Time left until this inspiring and memorable event.</p>
               <h3 className={`text-2xl font-bold ${currentTheme.textColor} mt-4 font-jost`}>JOIN US</h3>

            </div>
            
            {/* Card 3: Dates and Location */}
            <div className="flex-shrink-0 w-full flex flex-col items-center justify-center p-4">
              <h2 className={`text-4xl font-bold ${currentTheme.textColor} mb-6 font-jost`}>Event Details</h2>
              <p className="text-xl sm:text-2xl font-extrabold text-amber-200 mb-2 font-lato">🗓️ Dates: 25 | 26 | 27 | 28 September 2025</p>
              <p className="text-lg sm:text-xl font-extrabold text-gray-300 mb-6 font-lato">📍 Location: Qadian, Punjab, India</p>
              <p className="text-xl sm:text-xl leading-relaxed text-yellow-300 mb-6 font-lato">Mark your calendars for a weekend of spiritual enlightenment and brotherhood.</p>
            </div>
            
            {/* Card 4: Useful Links */}
            <div className="flex-shrink-0 w-full flex flex-col items-center justify-center p-4">
              <h2 className={`text-4xl font-bold ${currentTheme.textColor} mb-6 font-jost`}>Usefull Links</h2>
              <div className="flex flex-col items-center justify-center gap-4 mt-4 w-full">
                  <a href="https://ansarullahbharat.in" target="_blank" rel="noopener noreferrer" className={`w-full max-w-xs text-sm sm:text-base font-medium px-4 py-2 rounded-full text-white backdrop-blur-3xl transition-all duration-300 transform hover:scale-105 ${currentTheme.containerGradient} border border-white/20 hover:border-white/40`}>ansarullahbharat.in</a>
                  <a href="https://ahmadiyyamuslimjamaat.in/" target="_blank" rel="noopener noreferrer" className={`w-full max-w-xs text-sm sm:text-base font-medium px-4 py-2 rounded-full text-white backdrop-blur-3xl transition-all duration-300 transform hover:scale-105 ${currentTheme.containerGradient} border border-white/20 hover:border-white/40`}>ahmadiyyamuslimjamaat.in</a>
                  <a href="https://www.alislam.org/" target="_blank" rel="noopener noreferrer" className={`w-full max-w-xs text-sm sm:text-base font-medium px-4 py-2 rounded-full text-white backdrop-blur-3xl transition-all duration-300 transform hover:scale-105 ${currentTheme.containerGradient} border border-white/20 hover:border-white/40`}>www.alislam.org</a>
                  <a href="https://lightofislam.in/" target="_blank" rel="noopener noreferrer" className={`w-full max-w-xs text-sm sm:text-base font-medium px-4 py-2 rounded-full text-white backdrop-blur-3xl transition-all duration-300 transform hover:scale-105 ${currentTheme.containerGradient} border border-white/20 hover:border-white/40`}>lightofislam.in</a>
                  <a href="https://akhbarbadr.in/" target="_blank" rel="noopener noreferrer" className={`w-full max-w-xs text-sm sm:text-base font-medium px-4 py-2 rounded-full text-white backdrop-blur-3xl transition-all duration-300 transform hover:scale-105 ${currentTheme.containerGradient} border border-white/20 hover:border-white/40`}>akhbarbadr.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* The new navigation buttons container */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Back button, only visible on cards after the first */}
          {cardIndex > 0 && (
            <button
              onClick={handleBackClick}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 transform ${currentTheme.containerGradient} border border-white/20 hover:border-white/40 hover:scale-110`}
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Next button, hidden on the last card */}
          {!isLastCard && (
            <button
              onClick={handleNextClick}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 transform ${currentTheme.containerGradient} border border-white/20 hover:border-white/40 hover:scale-110`}
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}