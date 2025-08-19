import React, { useEffect, useState } from 'react';

const EasterEggPage: React.FC = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-400 via-fuchsia-500 to-purple-600">
      <style>{`
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-15px) translateX(5px) rotate(2deg);
          }
          50% { 
            transform: translateY(-10px) translateX(-5px) rotate(-1deg);
          }
          75% { 
            transform: translateY(-20px) translateX(3px) rotate(1deg);
          }
        }
        
        @keyframes smoothPulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        }
        
        @keyframes slideInFromBottom {
          0% { 
            opacity: 0; 
            transform: translateY(100px) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.02);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes textReveal {
          0% { 
            opacity: 0; 
            transform: translateY(20px);
            filter: blur(5px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes heartGlow {
          0%, 100% { 
            transform: scale(1);
            text-shadow: 0 0 10px rgba(255,182,193,0.5);
          }
          50% { 
            transform: scale(1.1);
            text-shadow: 0 0 20px rgba(255,182,193,0.8), 0 0 30px rgba(255,105,180,0.6);
          }
        }
        
        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes backgroundShift {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
        }
        
        .gentle-float { animation: gentleFloat 6s ease-in-out infinite; }
        .smooth-pulse { animation: smoothPulse 3s ease-in-out infinite; }
        .slide-in { animation: slideInFromBottom 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .text-reveal { animation: textReveal 0.8s ease-out; }
        .heart-glow { animation: heartGlow 2s ease-in-out infinite; }
        .particle-float { animation: particleFloat 8s linear infinite; }
        .background-shift { 
          background: linear-gradient(-45deg, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 400% 400%;
          animation: backgroundShift 15s ease infinite;
        }
      `}</style>
      
      {/* Animated Background */}
      <div className="absolute inset-0 background-shift"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute particle-float"
            style={{
              left: `${particle.x}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${Math.random() * 4 + 6}s`
            }}
          >
            {['💖', '💕', '💗', '💘', '💝', '💞'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center p-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg mx-4 slide-in gentle-float border border-white/20">
          
          {/* Main Heart Icon */}
          <div 
            className="text-8xl mb-6 heart-glow"
            style={{ animationDelay: '0.3s' }}
          >
            💕
          </div>
          
          {/* Title */}
          <h1 
            className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 text-reveal"
            style={{ animationDelay: '0.6s' }}
          >
            hehe
          </h1>
          
          {/* Main Message */}
          <div className="relative mb-8">
            <p 
              className="text-xl text-gray-700 italic font-medium text-reveal"
              style={{ 
                animationDelay: '0.9s',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              "Ben bu kıza aşığım amk"
            </p>
          </div>
          
          {/* Bottom Heart */}
          <div 
            className="text-6xl heart-glow smooth-pulse"
            style={{ animationDelay: '1.2s' }}
          >
            ❤️
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 text-pink-400 text-2xl animate-spin" style={{ animationDuration: '10s' }}>✨</div>
          <div className="absolute -top-4 -right-4 text-purple-400 text-2xl animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>✨</div>
          <div className="absolute -bottom-4 -left-4 text-pink-400 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌟</div>
          <div className="absolute -bottom-4 -right-4 text-purple-400 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🌟</div>
        </div>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 text-white/30 text-6xl gentle-float" style={{ animationDelay: '2s' }}>💖</div>
      <div className="absolute top-10 right-10 text-white/30 text-6xl gentle-float" style={{ animationDelay: '3s' }}>💖</div>
      <div className="absolute bottom-10 left-10 text-white/30 text-6xl gentle-float" style={{ animationDelay: '4s' }}>💖</div>
      <div className="absolute bottom-10 right-10 text-white/30 text-6xl gentle-float" style={{ animationDelay: '5s' }}>💖</div>
    </div>
  );
};

export default EasterEggPage;
