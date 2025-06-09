import { useState, useEffect } from 'react';
import './App.css';
import Particles from './components/background/Particles';
import BlurText from './components/text/blurText.jsx';
import ShiftingDropDown from './components/nav/ShiftingDropDown.jsx';
import { motion, AnimatePresence } from 'framer-motion';



function App() {
  const [showText, setShowText] = useState(true);

  // Hide text after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 6000); // 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  
  

  return (
    <>
      <ShiftingDropDown  />
      {/* Background Particles */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          filter: 'blur(6px)',
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Particles
          particleColors={['#0000ff', '#1e90ff', '#87cefa', '#add8e6']}
          particleCount={200}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          />
      </div>

      {/* Blur Text with Fade + Big Size */}
      <AnimatePresence>
        {showText && (
         <motion.div
         className="flex justify-center items-center h-screen overflow-hidden"
         initial={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
       >
         <BlurText
           text="Beneath every click, a spell. Behind every pixel, a purpose."
           delay={200}
           animateBy="words"
           direction="top"
           onAnimationComplete={handleAnimationComplete}
           className="text-2xl font-extrabold text-white text-center max-w-5xl leading-tight px-4"
         />
       </motion.div>
       
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
