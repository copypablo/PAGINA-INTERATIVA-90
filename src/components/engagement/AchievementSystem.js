import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Sistema de Conquistas e Badges
 * 
 * Exibe e gerencia as conquistas e badges do usuário
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.records - Registros do usuário
 * @param {string} props.className - Classes CSS adicionais
 */
const AchievementSystem = ({ 
  records = [], 
  className = '' 
}) => {
  // Definição das conquistas possíveis
  const achievements = [
    {
      id: 'first_record',
      title: 'Primeiro Passo',
      description: 'Registrou seu primeiro dia no desafio',
      icon: '🏆',
      condition: (records) => records.length >= 1,
      unlocked: false
    },
    {
      id: 'week_streak',
      title: 'Semana Consistente',
      description: 'Registrou 7 dias consecutivos',
      icon: '🔥',
      condition: (records) => calculateStreak(records) >= 7,
      unlocked: false
    },
    {
      id: 'water_master',
      title: 'Hidratação Perfeita',
      description: 'Consumiu pelo menos 2L de água por 5 dias',
      icon: '💧',
      condition: (records) => records.filter(r => r.waterIntake >= 2).length >= 5,
      unlocked: false
    },
    {
      id: 'sleep_well',
      title: 'Sono Reparador',
      description: 'Dormiu pelo menos 7 horas por 5 dias',
      icon: '😴',
      condition: (records) => records.filter(r => r.sleepHours >= 7).length >= 5,
      unlocked: false
    },
    {
      id: 'weight_loss',
      title: 'Progresso Visível',
      description: 'Perdeu pelo menos 2kg desde o início',
      icon: '⚖️',
      condition: (records) => {
        if (records.length < 2) return false;
        const initialWeight = records[records.length - 1].weight;
        const currentWeight = records[0].weight;
        return initialWeight - currentWeight >= 2;
      },
      unlocked: false
    },
    {
      id: 'diet_master',
      title: 'Alimentação Exemplar',
      description: 'Manteve dieta boa ou excelente por 5 dias',
      icon: '🥗',
      condition: (records) => records.filter(r => 
        r.dietQuality === 'boa' || r.dietQuality === 'excelente'
      ).length >= 5,
      unlocked: false
    },
    {
      id: 'month_challenge',
      title: 'Desafio Mensal',
      description: 'Completou 30 dias de registros',
      icon: '🌟',
      condition: (records) => records.length >= 30,
      unlocked: false
    }
  ];

  // Função para calcular streak (dias consecutivos)
  const calculateStreak = (records) => {
    if (records.length === 0) return 0;
    
    let streak = 1;
    let maxStreak = 1;
    
    // Ordenar registros por data (mais recente primeiro)
    const sortedRecords = [...records].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    for (let i = 0; i < sortedRecords.length - 1; i++) {
      const currentDate = new Date(sortedRecords[i].date);
      const nextDate = new Date(sortedRecords[i + 1].date);
      
      // Verificar se as datas são consecutivas (diferença de 1 dia)
      const diffTime = Math.abs(currentDate - nextDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 1;
      }
    }
    
    return maxStreak;
  };

  // Verificar quais conquistas foram desbloqueadas
  const unlockedAchievements = achievements.map(achievement => ({
    ...achievement,
    unlocked: achievement.condition(records)
  }));

  // Contar conquistas desbloqueadas
  const unlockedCount = unlockedAchievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  return (
    <motion.div 
      className={`achievements-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="achievements-title">Suas Conquistas</h3>
      
      <div className="achievements-progress">
        <div className="progress-text">
          {unlockedCount} de {totalCount} conquistas
        </div>
        <div className="futuristic-progress">
          <div 
            className="futuristic-progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="achievements-grid">
        {unlockedAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: achievement.unlocked ? 1 : 0.9, 
              opacity: achievement.unlocked ? 1 : 0.6 
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              scale: achievement.unlocked ? 1.05 : 0.95,
              y: achievement.unlocked ? -5 : 0
            }}
          >
            <div className="badge-icon">{achievement.icon}</div>
            <div className="badge-title">{achievement.title}</div>
            <div className="badge-description">{achievement.description}</div>
            {!achievement.unlocked && (
              <div className="badge-locked">🔒</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementSystem;
