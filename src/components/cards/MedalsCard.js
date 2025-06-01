import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/cards.css';

const MedalsCard = ({ medals, onUnlock }) => {
  // Animações para os elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="medals-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="medals-title">Suas Conquistas</h3>
      
      <div className="medals-grid">
        {medals.map((medal) => (
          <motion.div 
            key={medal.id}
            className={`medal-item ${medal.unlocked ? 'unlocked' : 'locked'}`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => medal.unlocked && onUnlock && onUnlock(medal)}
          >
            <div className="medal-icon">
              {medal.unlocked ? medal.icon : '🔒'}
            </div>
            <div className="medal-info">
              <h4 className="medal-name">{medal.name}</h4>
              <p className="medal-description">{medal.description}</p>
            </div>
            {medal.unlocked && (
              <motion.div 
                className="medal-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="medals-footer">
        <p className="medals-progress">
          {medals.filter(m => m.unlocked).length} de {medals.length} conquistas desbloqueadas
        </p>
        <div className="medals-progress-bar">
          <motion.div 
            className="medals-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(medals.filter(m => m.unlocked).length / medals.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Medalhas padrão para o desafio de emagrecimento
export const defaultMedals = [
  {
    id: 'first_record',
    name: 'Primeiro Registro',
    description: 'Fez seu primeiro registro diário',
    icon: '📝',
    unlocked: false
  },
  {
    id: 'weight_loss_1',
    name: 'Primeiro Quilo',
    description: 'Perdeu seu primeiro quilo',
    icon: '⚖️',
    unlocked: false
  },
  {
    id: 'weight_loss_5',
    name: 'Cinco Quilos',
    description: 'Perdeu 5 quilos desde o início',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'streak_3',
    name: 'Sequência Inicial',
    description: 'Manteve 3 dias consecutivos de registros',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'streak_7',
    name: 'Semana Perfeita',
    description: 'Manteve 7 dias consecutivos de registros',
    icon: '🌟',
    unlocked: false
  },
  {
    id: 'water_goal',
    name: 'Hidratação Perfeita',
    description: 'Atingiu a meta de água por 5 dias',
    icon: '💧',
    unlocked: false
  },
  {
    id: 'sleep_goal',
    name: 'Sono Reparador',
    description: 'Dormiu 8 horas ou mais por 3 dias',
    icon: '😴',
    unlocked: false
  },
  {
    id: 'workout_5',
    name: 'Atleta Dedicada',
    description: 'Completou 5 treinos',
    icon: '💪',
    unlocked: false
  }
];

export default MedalsCard;
