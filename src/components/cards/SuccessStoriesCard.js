import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/cards.css';

const SuccessStoriesCard = () => {
  // Estado para controlar a história atual
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  // Estado para controlar a animação de transição
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Efeito para alternar histórias automaticamente a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextStory();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  // Função para ir para a próxima história
  const nextStory = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStoryIndex((prevIndex) => 
        prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  // Função para ir para a história anterior
  const prevStory = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStoryIndex((prevIndex) => 
        prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  // Variantes para animação
  const storyVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  // Obter a história atual
  const currentStory = successStories[currentStoryIndex];

  return (
    <div className="success-stories-card">
      <h3 className="success-stories-title">Histórias de Sucesso</h3>
      
      <div className="success-stories-content">
        {currentStory && (
          <motion.div
            key={currentStory.id}
            className="story-container"
            initial="hidden"
            animate={isTransitioning ? "exit" : "visible"}
            variants={storyVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="story-image-container">
              <img 
                src={currentStory.image} 
                alt={`${currentStory.name} antes e depois`} 
                className="story-image"
              />
            </div>
            
            <div className="story-details">
              <h4 className="story-name">{currentStory.name}</h4>
              
              <div className="story-stats">
                <div className="story-stat">
                  <span className="stat-label">Perda de Peso</span>
                  <span className="stat-value">-{currentStory.weightLoss} kg</span>
                </div>
                
                <div className="story-stat">
                  <span className="stat-label">Tempo</span>
                  <span className="stat-value">{currentStory.duration}</span>
                </div>
              </div>
              
              <p className="story-description">{currentStory.description}</p>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="success-stories-navigation">
        <button 
          className="nav-button prev-button" 
          onClick={prevStory}
          aria-label="História anterior"
        >
          &#8249;
        </button>
        
        <div className="story-indicators">
          {successStories.map((_, index) => (
            <span 
              key={index} 
              className={`story-indicator ${index === currentStoryIndex ? 'active' : ''}`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentStoryIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
            />
          ))}
        </div>
        
        <button 
          className="nav-button next-button" 
          onClick={nextStory}
          aria-label="Próxima história"
        >
          &#8250;
        </button>
      </div>
      
      <div className="success-stories-footer">
        <p className="success-stories-note">
          Estas são histórias reais de alunas que participaram do desafio.
        </p>
      </div>
    </div>
  );
};

// Histórias de sucesso de exemplo (substituir por histórias reais)
const successStories = [
  {
    id: 'story1',
    name: 'Ana Silva',
    weightLoss: 12.5,
    duration: '3 meses',
    description: 'Após três meses de dedicação ao programa, consegui perder 12,5kg e recuperar minha autoestima. A combinação de alimentação balanceada e exercícios regulares fez toda a diferença!',
    image: 'https://via.placeholder.com/300x400?text=Antes+e+Depois'
  },
  {
    id: 'story2',
    name: 'Carla Oliveira',
    weightLoss: 8.7,
    duration: '2 meses',
    description: 'Em apenas dois meses, perdi 8,7kg seguindo o plano à risca. Além da perda de peso, notei uma melhora significativa na minha disposição e qualidade do sono.',
    image: 'https://via.placeholder.com/300x400?text=Antes+e+Depois'
  },
  {
    id: 'story3',
    name: 'Patrícia Mendes',
    weightLoss: 15.3,
    duration: '4 meses',
    description: 'Minha transformação foi além do físico. Perdi 15,3kg em 4 meses e ganhei uma nova relação com a comida e com meu corpo. Agora me sinto mais confiante e saudável!',
    image: 'https://via.placeholder.com/300x400?text=Antes+e+Depois'
  }
];

export default SuccessStoriesCard;
