import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/cards.css';

const ProgressCard = ({ title, currentValue, initialValue, goalValue, unit, icon, color = 'orange' }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calcular progresso quando os valores mudarem
  useEffect(() => {
    if (initialValue === goalValue) return;
    
    // Se o objetivo é perder peso (goalValue < initialValue)
    if (goalValue < initialValue) {
      // Quanto mais próximo do objetivo, maior o progresso
      const totalChange = initialValue - goalValue;
      const currentChange = initialValue - currentValue;
      const calculatedProgress = (currentChange / totalChange) * 100;
      setProgress(Math.min(Math.max(calculatedProgress, 0), 100));
    } 
    // Se o objetivo é ganhar peso ou outra métrica (goalValue > initialValue)
    else {
      // Quanto mais próximo do objetivo, maior o progresso
      const totalChange = goalValue - initialValue;
      const currentChange = currentValue - initialValue;
      const calculatedProgress = (currentChange / totalChange) * 100;
      setProgress(Math.min(Math.max(calculatedProgress, 0), 100));
    }
  }, [currentValue, initialValue, goalValue]);

  // Efeito para animar o progresso quando o componente for visível
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calcular a diferença entre o valor atual e o inicial
  const calculateDifference = () => {
    const difference = (currentValue - initialValue).toFixed(1);
    const sign = difference > 0 ? '+' : '';
    return `${sign}${difference} ${unit}`;
  };

  // Calcular quanto falta para atingir o objetivo
  const calculateRemaining = () => {
    const remaining = Math.abs(currentValue - goalValue).toFixed(1);
    return `${remaining} ${unit}`;
  };

  // Determinar a cor do progresso com base no valor
  const getProgressColor = () => {
    if (color === 'orange') return '#ff8c42';
    if (color === 'green') return '#4caf50';
    if (color === 'blue') return '#2196f3';
    if (color === 'purple') return '#9c27b0';
    return color;
  };

  // Determinar a mensagem de status com base no progresso
  const getStatusMessage = () => {
    if (progress >= 100) return 'Meta atingida! 🎉';
    if (progress >= 75) return 'Quase lá! 💪';
    if (progress >= 50) return 'Bom progresso! 👍';
    if (progress >= 25) return 'Continue assim! 👏';
    return 'Você começou! 🚀';
  };

  return (
    <motion.div 
      className="progress-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="progress-card-header">
        <div className="progress-card-title">
          {icon && <span className="progress-card-icon">{icon}</span>}
          <h3>{title}</h3>
        </div>
        <div className="progress-card-status">{getStatusMessage()}</div>
      </div>

      <div className="progress-card-body">
        <div className="progress-values">
          <div className="progress-current">
            <span className="progress-label">Atual</span>
            <span className="progress-value">{currentValue} {unit}</span>
          </div>
          <div className="progress-goal">
            <span className="progress-label">Meta</span>
            <span className="progress-value">{goalValue} {unit}</span>
          </div>
        </div>

        <div className="progress-bar-container">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${progress}%` : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ backgroundColor: getProgressColor() }}
          />
        </div>

        <div className="progress-details">
          <div className="progress-difference">
            <span className="progress-label">Desde o início</span>
            <span className="progress-value">{calculateDifference()}</span>
          </div>
          <div className="progress-remaining">
            <span className="progress-label">Faltam</span>
            <span className="progress-value">{calculateRemaining()}</span>
          </div>
        </div>
      </div>

      <motion.div 
        className="progress-percentage"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
      >
        <svg viewBox="0 0 100 100" className="progress-circle">
          <circle cx="50" cy="50" r="45" className="progress-circle-bg" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="45" 
            className="progress-circle-fill" 
            style={{ stroke: getProgressColor() }}
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <text x="50" y="50" className="progress-circle-text">
            {Math.round(progress)}%
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ProgressCard;
