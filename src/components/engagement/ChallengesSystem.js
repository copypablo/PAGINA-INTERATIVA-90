import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Desafios Temáticos
 * 
 * Exibe desafios temáticos para engajamento do usuário
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.challenges - Lista de desafios
 * @param {string} props.className - Classes CSS adicionais
 */
const ChallengesSystem = ({ 
  challenges = [], 
  className = '' 
}) => {
  // Se não houver desafios, usar exemplos padrão
  const defaultChallenges = [
    {
      id: 'challenge1',
      title: 'Desafio 7 Dias de Água',
      description: 'Beba pelo menos 2L de água todos os dias durante uma semana.',
      progress: 5,
      total: 7,
      reward: 'Medalha Hidratação Perfeita',
      type: 'water'
    },
    {
      id: 'challenge2',
      title: 'Desafio Sono Reparador',
      description: 'Durma pelo menos 7 horas por 5 dias consecutivos.',
      progress: 3,
      total: 5,
      reward: 'Medalha Energia Renovada',
      type: 'sleep'
    },
    {
      id: 'challenge3',
      title: 'Desafio Perda de Peso',
      description: 'Perca 2kg em 30 dias com alimentação saudável e exercícios.',
      progress: 15,
      total: 30,
      reward: 'Medalha Transformação',
      type: 'weight'
    }
  ];
  
  // Usar desafios fornecidos ou os padrão
  const displayChallenges = challenges.length > 0 ? challenges : defaultChallenges;

  // Função para calcular porcentagem de progresso
  const calculateProgress = (progress, total) => {
    return Math.min((progress / total) * 100, 100);
  };

  // Função para obter ícone baseado no tipo de desafio
  const getChallengeIcon = (type) => {
    switch (type) {
      case 'water':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
        );
      case 'sleep':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 17h5v-2h-5v2zm-10 0h5v-2H7v2zm10-6h5V9h-5v2zM7 11h5V9H7v2zm10-6h5V3h-5v2zM7 5h5V3H7v2z"></path>
          </svg>
        );
      case 'weight':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
    }
  };

  return (
    <div className={`challenges-container ${className}`}>
      <motion.h2 
        className="dashboard-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Desafios Ativos
      </motion.h2>
      
      <div className="challenges-list">
        {displayChallenges.map((challenge, index) => (
          <motion.div 
            key={challenge.id}
            className="challenge-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="challenge-icon">
              {getChallengeIcon(challenge.type)}
            </div>
            
            <h3 className="challenge-title">{challenge.title}</h3>
            <p className="challenge-description">{challenge.description}</p>
            
            <div className="challenge-progress-container">
              <div className="challenge-progress">
                <motion.div 
                  className="challenge-progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress(challenge.progress, challenge.total)}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                ></motion.div>
              </div>
              
              <div className="challenge-stats">
                <span>{challenge.progress} de {challenge.total} dias</span>
                <span>{calculateProgress(challenge.progress, challenge.total).toFixed(0)}% concluído</span>
              </div>
            </div>
            
            <div className="challenge-reward">
              <span className="reward-label">Recompensa:</span>
              <span className="reward-value">{challenge.reward}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="add-challenge-button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: displayChallenges.length * 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <button className="futuristic-button">
          <span className="button-icon">+</span>
          Iniciar Novo Desafio
        </button>
      </motion.div>
    </div>
  );
};

export default ChallengesSystem;
