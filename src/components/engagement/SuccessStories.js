import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Histórias de Sucesso
 * 
 * Exibe histórias de sucesso de alunas com fotos e descrições
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.stories - Array de histórias de sucesso
 * @param {string} props.className - Classes CSS adicionais
 */
const SuccessStories = ({ 
  stories = [], 
  className = '' 
}) => {
  // Se não houver histórias, usar exemplos padrão
  const defaultStories = [
    {
      id: 'story1',
      name: 'Ana Silva',
      weightLoss: 15.5,
      duration: '3 meses',
      description: 'Consegui mudar meus hábitos alimentares e incluir exercícios na minha rotina. O resultado foi incrível!',
      imagePlaceholder: 'https://via.placeholder.com/300x400?text=Foto+Antes+e+Depois'
    },
    {
      id: 'story2',
      name: 'Carla Oliveira',
      weightLoss: 12,
      duration: '2 meses',
      description: 'O acompanhamento diário me ajudou a manter o foco e a disciplina necessária para alcançar meus objetivos.',
      imagePlaceholder: 'https://via.placeholder.com/300x400?text=Foto+Antes+e+Depois'
    },
    {
      id: 'story3',
      name: 'Patrícia Mendes',
      weightLoss: 20,
      duration: '4 meses',
      description: 'Nunca pensei que conseguiria perder tanto peso! As dicas e o suporte fizeram toda a diferença.',
      imagePlaceholder: 'https://via.placeholder.com/300x400?text=Foto+Antes+e+Depois'
    }
  ];
  
  // Usar histórias fornecidas ou as padrão
  const displayStories = stories.length > 0 ? stories : defaultStories;

  return (
    <div className={`success-stories-container ${className}`}>
      <motion.h2 
        className="dashboard-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Histórias de Sucesso
      </motion.h2>
      
      <div className="success-stories-grid">
        {displayStories.map((story, index) => (
          <motion.div 
            key={story.id}
            className="success-story-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <img 
              src={story.image || story.imagePlaceholder} 
              alt={`Resultado de ${story.name}`} 
              className="success-story-image"
            />
            <div className="success-story-content">
              <h3 className="success-story-title">{story.name}</h3>
              <div className="success-story-weight">
                <span className="text-gradient">-{story.weightLoss} kg</span> em {story.duration}
              </div>
              <p className="success-story-description">{story.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Seção para adicionar nova história */}
      <motion.div 
        className="success-story-card add-story"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: displayStories.length * 0.1 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
      >
        <div className="add-story-placeholder">
          <div className="add-icon">+</div>
          <p>Adicionar nova história de sucesso</p>
          <small>Edite o código para adicionar fotos reais de suas alunas</small>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessStories;
