import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Medidores Visuais Avançados
 * 
 * Exibe medidores visuais para peso, sono, água e treinos
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.data - Dados para os medidores
 * @param {string} props.className - Classes CSS adicionais
 */
const AdvancedMeters = ({ 
  data = {}, 
  className = '' 
}) => {
  // Valores padrão caso não sejam fornecidos
  const {
    weight = {
      current: 70,
      initial: 80,
      goal: 65,
      unit: 'kg'
    },
    sleep = {
      average: 7.2,
      goal: 8,
      unit: 'horas'
    },
    water = {
      current: 1.5,
      goal: 2,
      unit: 'L'
    },
    workout = {
      completed: 3,
      goal: 5,
      unit: 'treinos/semana'
    }
  } = data;

  // Calcular progresso para cada medidor
  const calculateProgress = (current, goal, initial = null) => {
    if (initial !== null) {
      // Para peso, onde menor é melhor
      const totalChange = initial - goal;
      const currentChange = initial - current;
      return Math.min(Math.max((currentChange / totalChange) * 100, 0), 100);
    } else {
      // Para outros medidores, onde maior é melhor
      return Math.min((current / goal) * 100, 100);
    }
  };

  // Calcular diferença de peso
  const weightDifference = weight.initial - weight.current;
  const weightProgress = calculateProgress(weight.current, weight.goal, weight.initial);
  
  // Calcular progresso de sono
  const sleepProgress = calculateProgress(sleep.average, sleep.goal);
  
  // Calcular progresso de água
  const waterProgress = calculateProgress(water.current, water.goal);
  
  // Calcular progresso de treinos
  const workoutProgress = calculateProgress(workout.completed, workout.goal);

  return (
    <div className={`advanced-meters-container ${className}`}>
      <motion.h2 
        className="dashboard-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Medidores de Progresso
      </motion.h2>
      
      <div className="futuristic-grid">
        {/* Medidor de Peso */}
        <motion.div 
          className="meter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="meter-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3>Peso</h3>
          </div>
          
          <div className="meter-value">
            {weight.current} <span className="meter-unit">{weight.unit}</span>
            {weightDifference > 0 && (
              <span className="meter-change positive">-{weightDifference.toFixed(1)} {weight.unit}</span>
            )}
          </div>
          
          <div className="meter-progress">
            <motion.div 
              className="meter-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${weightProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
          
          <div className="meter-labels">
            <span>Atual: {weight.current} {weight.unit}</span>
            <span>Meta: {weight.goal} {weight.unit}</span>
          </div>
          
          <div className="meter-info">
            <div className="meter-stat">
              <span className="meter-stat-label">Inicial</span>
              <span className="meter-stat-value">{weight.initial} {weight.unit}</span>
            </div>
            <div className="meter-stat">
              <span className="meter-stat-label">Progresso</span>
              <span className="meter-stat-value">{weightProgress.toFixed(0)}%</span>
            </div>
          </div>
        </motion.div>
        
        {/* Medidor de Sono */}
        <motion.div 
          className="meter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="meter-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 17h5v-2h-5v2zm-10 0h5v-2H7v2zm10-6h5V9h-5v2zM7 11h5V9H7v2zm10-6h5V3h-5v2zM7 5h5V3H7v2z"></path>
            </svg>
            <h3>Sono</h3>
          </div>
          
          <div className="meter-value">
            {sleep.average} <span className="meter-unit">{sleep.unit}</span>
          </div>
          
          <div className="meter-progress">
            <motion.div 
              className="meter-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${sleepProgress}%` }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.div>
          </div>
          
          <div className="meter-labels">
            <span>Média: {sleep.average} {sleep.unit}</span>
            <span>Ideal: {sleep.goal} {sleep.unit}</span>
          </div>
          
          <div className="meter-info">
            <div className="meter-quality">
              {sleepProgress >= 90 ? (
                <span className="quality-badge excellent">Excelente</span>
              ) : sleepProgress >= 75 ? (
                <span className="quality-badge good">Bom</span>
              ) : sleepProgress >= 50 ? (
                <span className="quality-badge average">Regular</span>
              ) : (
                <span className="quality-badge poor">Insuficiente</span>
              )}
            </div>
            <div className="meter-tip">
              <span className="meter-tip-text">
                {sleepProgress < 75 ? "Tente dormir mais cedo hoje" : "Continue com o bom trabalho!"}
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Medidor de Água */}
        <motion.div 
          className="meter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="meter-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <h3>Água</h3>
          </div>
          
          <div className="meter-value">
            {water.current} <span className="meter-unit">{water.unit}</span>
          </div>
          
          <div className="meter-progress water-meter">
            <motion.div 
              className="meter-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${waterProgress}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            ></motion.div>
          </div>
          
          <div className="meter-labels">
            <span>Atual: {water.current} {water.unit}</span>
            <span>Meta: {water.goal} {water.unit}</span>
          </div>
          
          <div className="meter-info">
            <div className="water-bottles">
              {[...Array(Math.floor(water.goal))].map((_, i) => (
                <div 
                  key={i} 
                  className={`water-bottle ${i < Math.floor(water.current) ? 'filled' : ''}`}
                  title={`${i+1} ${water.unit}`}
                >
                  <div className="water-level"></div>
                </div>
              ))}
            </div>
            <div className="meter-remaining">
              {water.current < water.goal ? (
                <span>Faltam {(water.goal - water.current).toFixed(1)} {water.unit}</span>
              ) : (
                <span>Meta atingida! 🎉</span>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Medidor de Treinos */}
        <motion.div 
          className="meter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="meter-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M6 8h-1a4 4 0 0 0 0 8h1"></path>
              <path d="M8 6v12"></path>
              <path d="M16 6v12"></path>
              <path d="M8 12h8"></path>
            </svg>
            <h3>Treinos</h3>
          </div>
          
          <div className="meter-value">
            {workout.completed} <span className="meter-unit">de {workout.goal}</span>
          </div>
          
          <div className="meter-progress">
            <motion.div 
              className="meter-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${workoutProgress}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            ></motion.div>
          </div>
          
          <div className="meter-labels">
            <span>Realizados: {workout.completed}</span>
            <span>Meta: {workout.goal}</span>
          </div>
          
          <div className="meter-info">
            <div className="workout-days">
              {[...Array(workout.goal)].map((_, i) => (
                <div 
                  key={i} 
                  className={`workout-day ${i < workout.completed ? 'completed' : ''}`}
                >
                  {i < workout.completed ? '✓' : ''}
                </div>
              ))}
            </div>
            <div className="meter-remaining">
              {workout.completed < workout.goal ? (
                <span>Faltam {workout.goal - workout.completed} treinos esta semana</span>
              ) : (
                <span>Meta semanal atingida! 🎉</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedMeters;
