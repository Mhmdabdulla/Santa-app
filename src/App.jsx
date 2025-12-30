import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import InputCard from './components/InputCard';
import Processing from './components/Processing';
import PolaroidReveal from './components/PolaroidReveal';
import BackgroundMusic from './components/AudioPlayer';
import SleighGame from './components/SleighGame';

function App() {
  const [phase, setPhase] = useState('input'); // input, game, reveal
  const [deed, setDeed] = useState('');

  /* 
     Update flow: 
     Input -> Game -> Processing (3s) -> Reveal 
  */

  const handleDeedSubmit = (userDeed) => {
    setDeed(userDeed);
    // Transition to game instead of processing/reveal
    setPhase('game');
  };

  const handleGameComplete = () => {
    // Show "Checking list..." state
    setPhase('processing');
  };

  // Restore Processing -> Reveal transition
  useEffect(() => {
    if (phase === 'processing') {
      const timer = setTimeout(() => {
        fireConfetti();
        setPhase('reveal');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      const left = 0.5; // Center of screen

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#d42426', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd700', '#d42426', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="snowflake">❅</div>
      <div className="snowflake" style={{ left: '10%', animationDelay: '2s' }}>❆</div>
      <div className="snowflake" style={{ left: '25%', animationDelay: '4s' }}>❅</div>
      <div className="snowflake" style={{ left: '40%', animationDelay: '6s' }}>❆</div>
      <div className="snowflake" style={{ left: '55%', animationDelay: '8s' }}>❅</div>
      <div className="snowflake" style={{ left: '70%', animationDelay: '3s' }}>❆</div>
      <div className="snowflake" style={{ left: '85%', animationDelay: '5s' }}>❅</div>

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      <BackgroundMusic playbackRate={phase === 'game' ? 1.2 : 1.0} />

      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div key="input" exit={{ opacity: 0, y: -20 }} className="z-10 w-full flex justify-center">
            <InputCard onSubmit={handleDeedSubmit} />
          </motion.div>
        )}

        {phase === 'game' && (
          <SleighGame onComplete={handleGameComplete} />
        )}

        {phase === 'processing' && (
          <motion.div key="processing" exit={{ opacity: 0, scale: 1.1 }} className="z-10">
            <Processing />
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div key="reveal" className="z-10 w-full flex justify-center">
            <PolaroidReveal deed={deed} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
