import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Sistema de Streaks (Sequência de Dias)
 * 
 * Exibe e gerencia a contagem de dias consecutivos de registros
 * 
 * @param {Object} props - Propriedades do componente
 * @param {number} props.streakCount - Número de dias consecutivos
 * @param {string} props.className - Classes CSS adicionais
 */
const StreakCounter = ({ 
  streakCount = 0, 
  className = '' 
}) => {
  // Determinar mensagem baseada no número de dias
  const getStreakMessage = (count) => {
    if (count === 0) return "Comece hoje sua sequência!";
    if (count === 1) return "Primeiro dia! Continue assim!";
    if (count < 5) return "Ótimo começo! Continue firme!";
    if (count < 10) return "Você está criando um hábito!";
    if (count < 20) return "Impressionante consistência!";
    if (count < 30) return "Você está dominando isso!";
    return "Incrível! Você é imparável!";
  };

  return (
    <motion.div 
      className={`streak-container ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="streak-counter">
        <motion.div 
          className="streak-number"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2
          }}
        >
          {streakCount}
        </motion.div>
        <div className="streak-label">Dias consecutivos</div>
        <motion.div 
          className="streak-message"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {getStreakMessage(streakCount)}
        </motion.div>
      </div>
      
      {/* Chamas animadas para streaks maiores */}
      {streakCount >= 5 && (
        <div className="streak-flames">
          {[...Array(Math.min(5, Math.floor(streakCount / 5)))].map((_, i) => (
            <motion.div 
              key={i}
              className="flame"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StreakCounter;
