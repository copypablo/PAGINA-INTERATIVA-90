import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Campo de Entrada Futurista
 * 
 * Um campo de entrada estilizado com efeitos visuais modernos
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.type - Tipo do input (text, number, email, etc)
 * @param {string} props.name - Nome do campo
 * @param {string} props.value - Valor do campo
 * @param {function} props.onChange - Função de alteração
 * @param {string} props.label - Rótulo do campo
 * @param {string} props.placeholder - Texto de placeholder
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.required - Se o campo é obrigatório
 */
const FuturisticInput = ({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  label, 
  placeholder = '', 
  className = '', 
  required = false,
  min,
  max,
  step
}) => {
  return (
    <motion.div 
      className={`input-group ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <motion.input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="futuristic-input"
        required={required}
        min={min}
        max={max}
        step={step}
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default FuturisticInput;
