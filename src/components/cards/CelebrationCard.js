import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/cards.css';

const CelebrationCard = ({ achievement, onClose }) => {
  // Variantes para animação
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  // Variantes para confetes
  const confettiVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 100,
      transition: {
        delay: i * 0.02,
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    })
  };

  // Gerar confetes
  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#ff8c42', '#ff5252', '#6a11cb', '#4cc9f0', '#ffd166'];
    
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      
      confetti.push(
        <motion.div
          key={i}
          className="confetti"
          custom={i}
          variants={confettiVariants}
          initial="hidden"
          animate="visible"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size * 1.5}px`,
            backgroundColor: color,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      );
    }
    
    return confetti;
  };

  return (
    <div className="celebration-overlay">
      <div className="confetti-container">
        {renderConfetti()}
      </div>
      
      <motion.div
        className="celebration-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="celebration-icon">
          {achievement.icon || '🎉'}
        </div>
        
        <h2 className="celebration-title">
          {achievement.title || 'Parabéns!'}
        </h2>
        
        <p className="celebration-description">
          {achievement.description || 'Você alcançou uma nova conquista!'}
        </p>
        
        <button 
          className="celebration-button"
          onClick={onClose}
        >
          Continuar
        </button>
        
        <motion.div
          className="celebration-particles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 8 + 4;
            const angle = Math.random() * 360;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <motion.div
                key={i}
                className="celebration-particle"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x, 
                  y, 
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 0]
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`
                }}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CelebrationCard;
