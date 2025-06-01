import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Botão Futurista
 * 
 * Um botão estilizado com efeitos visuais modernos
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {string} props.type - Tipo do botão (button, submit, reset)
 * @param {function} props.onClick - Função de clique
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.outline - Se deve usar estilo outline
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {boolean} props.fullWidth - Se o botão deve ocupar toda a largura
 */
const FuturisticButton = ({ 
  children, 
  type = 'button', 
  onClick, 
  className = '', 
  outline = false,
  disabled = false,
  fullWidth = false
}) => {
  // Classes condicionais
  const buttonClasses = `
    futuristic-button 
    ${outline ? 'futuristic-button-outline' : ''} 
    ${fullWidth ? 'w-100' : ''}
    ${className}
  `;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default FuturisticButton;
