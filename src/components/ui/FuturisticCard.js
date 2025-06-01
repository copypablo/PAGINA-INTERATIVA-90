import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Card Futurista
 * 
 * Um componente de card com design moderno e efeitos visuais
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {string} props.title - Título do card
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.glowEffect - Se deve aplicar efeito de brilho
 * @param {boolean} props.neomorphic - Se deve aplicar efeito neomórfico
 */
const FuturisticCard = ({ 
  children, 
  title, 
  className = '', 
  glowEffect = false,
  neomorphic = false
}) => {
  // Classes condicionais
  const cardClasses = `
    futuristic-card 
    ${glowEffect ? 'glow-effect' : ''} 
    ${neomorphic ? 'neomorphic' : ''}
    ${className}
  `;

  return (
    <motion.div 
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {title && (
        <motion.h3 
          className="text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
      )}
      <div className="card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default FuturisticCard;
