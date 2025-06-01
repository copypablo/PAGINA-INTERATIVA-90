import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Sistema de Frases Motivacionais
 * 
 * Exibe frases motivacionais aleatórias para desafios de emagrecimento
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.className - Classes CSS adicionais
 * @param {number} props.interval - Intervalo em segundos para trocar a frase (0 para desativar)
 */
const MotivationalSystem = ({ 
  className = '',
  interval = 0
}) => {
  // Banco de frases motivacionais para emagrecimento
  const motivationalQuotes = [
    {
      quote: "Cada pequeno passo te leva mais perto do seu objetivo. Continue avançando!",
      author: "Foco Diário"
    },
    {
      quote: "Sua disciplina de hoje será sua vitória de amanhã.",
      author: "Desafio Fitness"
    },
    {
      quote: "Não limite seus desafios – desafie seus limites!",
      author: "Motivação Fitness"
    },
    {
      quote: "O corpo alcança o que a mente acredita.",
      author: "Pensamento Positivo"
    },
    {
      quote: "Sua transformação é uma jornada, não um destino.",
      author: "Saúde em Foco"
    },
    {
      quote: "Dolorido hoje, forte amanhã!",
      author: "Desafio Fitness"
    },
    {
      quote: "Eu perco peso de forma sistemática, saudável e feliz.",
      author: "Afirmação Positiva"
    },
    {
      quote: "Treinar não fica mais fácil, é você que fica mais forte.",
      author: "Motivação Diária"
    },
    {
      quote: "Seja mais forte do que suas desculpas.",
      author: "Foco no Objetivo"
    },
    {
      quote: "Pequenas mudanças diárias levam a grandes resultados.",
      author: "Transformação Contínua"
    },
    {
      quote: "Você não precisa ser perfeito para começar, mas precisa começar para ser perfeito.",
      author: "Primeiro Passo"
    },
    {
      quote: "Adoro desafios que me façam ficar saudável.",
      author: "Mentalidade Positiva"
    },
    {
      quote: "Disciplina é a ponte entre metas e realizações.",
      author: "Caminho do Sucesso"
    },
    {
      quote: "Sua saúde é um investimento, não uma despesa.",
      author: "Vida Saudável"
    },
    {
      quote: "O que não te desafia, não te transforma.",
      author: "Evolução Pessoal"
    }
  ];

  // Estado para armazenar a frase atual
  const [currentQuote, setCurrentQuote] = useState({});
  
  // Função para selecionar uma frase aleatória
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };
  
  // Inicializar com uma frase aleatória e configurar intervalo se necessário
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
    
    // Configurar intervalo para trocar a frase se interval > 0
    let quoteInterval;
    if (interval > 0) {
      quoteInterval = setInterval(() => {
        setCurrentQuote(getRandomQuote());
      }, interval * 1000);
    }
    
    // Limpar intervalo ao desmontar o componente
    return () => {
      if (quoteInterval) clearInterval(quoteInterval);
    };
  }, [interval]);

  return (
    <motion.div 
      className={`motivational-system ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        key={currentQuote.quote} // Chave para animar quando a frase mudar
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="motivational-quote"
      >
        <p className="quote-text">{currentQuote.quote}</p>
        {currentQuote.author && (
          <p className="quote-author">— {currentQuote.author}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MotivationalSystem;
