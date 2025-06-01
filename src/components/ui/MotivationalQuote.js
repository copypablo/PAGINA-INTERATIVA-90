import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Citação Motivacional
 * 
 * Exibe uma frase motivacional com estilo futurista
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.quote - A frase motivacional
 * @param {string} props.author - O autor da frase (opcional)
 * @param {string} props.className - Classes CSS adicionais
 */
const MotivationalQuote = ({ 
  quote, 
  author = '', 
  className = '' 
}) => {
  return (
    <motion.div 
      className={`motivational-quote ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p 
        className="quote-text"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {quote}
      </motion.p>
      
      {author && (
        <motion.p 
          className="quote-author"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          — {author}
        </motion.p>
      )}
    </motion.div>
  );
};

export default MotivationalQuote;
