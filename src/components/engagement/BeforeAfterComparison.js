import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Comparativo Antes e Depois
 * 
 * Exibe comparativo visual de antes e depois para acompanhamento de resultados
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.comparison - Dados do comparativo
 * @param {string} props.className - Classes CSS adicionais
 */
const BeforeAfterComparison = ({ 
  comparison = {}, 
  className = '' 
}) => {
  // Valores padrão caso não sejam fornecidos
  const {
    beforeImage = 'https://via.placeholder.com/400x500?text=Foto+Antes',
    afterImage = 'https://via.placeholder.com/400x500?text=Foto+Depois',
    beforeDate = '01/01/2025',
    afterDate = '01/06/2025',
    beforeWeight = 80,
    afterWeight = 70,
    weightUnit = 'kg',
    beforeMeasurements = {
      waist: 90,
      hips: 105,
      thighs: 60
    },
    afterMeasurements = {
      waist: 80,
      hips: 95,
      thighs: 55
    },
    measurementUnit = 'cm'
  } = comparison;

  // Calcular diferenças
  const weightDifference = beforeWeight - afterWeight;
  const waistDifference = beforeMeasurements.waist - afterMeasurements.waist;
  const hipsDifference = beforeMeasurements.hips - afterMeasurements.hips;
  const thighsDifference = beforeMeasurements.thighs - afterMeasurements.thighs;

  return (
    <div className={`before-after-container ${className}`}>
      <motion.h2 
        className="dashboard-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Comparativo Antes e Depois
      </motion.h2>
      
      <div className="before-after-images">
        <motion.div 
          className="before-image-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={beforeImage} 
            alt="Antes" 
            className="before-image"
          />
          <div className="image-label">Antes - {beforeDate}</div>
          <div className="image-weight">{beforeWeight} {weightUnit}</div>
        </motion.div>
        
        <motion.div 
          className="after-image-container"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src={afterImage} 
            alt="Depois" 
            className="after-image"
          />
          <div className="image-label">Depois - {afterDate}</div>
          <div className="image-weight">{afterWeight} {weightUnit}</div>
        </motion.div>
      </div>
      
      <motion.div 
        className="comparison-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="comparison-title">Resultados</div>
        
        <div className="comparison-grid">
          <div className="comparison-item">
            <div className="comparison-label">Peso</div>
            <div className="comparison-values">
              <span className="before-value">{beforeWeight} {weightUnit}</span>
              <span className="arrow">→</span>
              <span className="after-value">{afterWeight} {weightUnit}</span>
              <span className="difference negative">-{weightDifference} {weightUnit}</span>
            </div>
          </div>
          
          <div className="comparison-item">
            <div className="comparison-label">Cintura</div>
            <div className="comparison-values">
              <span className="before-value">{beforeMeasurements.waist} {measurementUnit}</span>
              <span className="arrow">→</span>
              <span className="after-value">{afterMeasurements.waist} {measurementUnit}</span>
              <span className="difference negative">-{waistDifference} {measurementUnit}</span>
            </div>
          </div>
          
          <div className="comparison-item">
            <div className="comparison-label">Quadril</div>
            <div className="comparison-values">
              <span className="before-value">{beforeMeasurements.hips} {measurementUnit}</span>
              <span className="arrow">→</span>
              <span className="after-value">{afterMeasurements.hips} {measurementUnit}</span>
              <span className="difference negative">-{hipsDifference} {measurementUnit}</span>
            </div>
          </div>
          
          <div className="comparison-item">
            <div className="comparison-label">Coxas</div>
            <div className="comparison-values">
              <span className="before-value">{beforeMeasurements.thighs} {measurementUnit}</span>
              <span className="arrow">→</span>
              <span className="after-value">{afterMeasurements.thighs} {measurementUnit}</span>
              <span className="difference negative">-{thighsDifference} {measurementUnit}</span>
            </div>
          </div>
        </div>
        
        <div className="comparison-note">
          <p>Para atualizar as fotos e medidas, edite o código com suas próprias imagens e valores.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BeforeAfterComparison;
