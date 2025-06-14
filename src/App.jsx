import { useState, useEffect } from 'react';
import './App.css';
import Particles from './components/background/Particles';
import BlurText from './components/text/BlurText.jsx';
import ShiftingDropDown from './components/nav/ShiftingDropDown';
import { motion, AnimatePresence } from 'framer-motion';
import TextPressure from './components/text/TextPressure';
import ChromaGrid from './components/album/ChromaGrid'

const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com"
  }
  
];

function App() {
  const [showText, setShowText] = useState(true);
  const [showTextPressure, setShowTextPressure] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 6000); // hide BlurText after 6s

    const pressureTimeout = setTimeout(() => {
      setShowTextPressure(true);
    }, 7000); // show TextPressure after 7s

    return () => {
      clearTimeout(timeout);
      clearTimeout(pressureTimeout);
    };
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <>
      <ShiftingDropDown />

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

      {/* Blur Text with Fade */}
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

      {/* TextPressure Appears After 7s and Centered */}
      {showTextPressure && (
            <div className="flex justify-center items-center py-100 h-screen overflow-hidden">
              <TextPressure
                text="Hey there, Welcome!"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={48}
              />
            </div>
          
      )}



    <div className="py-16 px-4">
      <ChromaGrid 
        items={items}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
    </>
  );
}

export default App;
