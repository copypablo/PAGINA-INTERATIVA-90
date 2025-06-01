import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/cards.css';

const MotivationCard = () => {
  // Estado para armazenar a frase atual
  const [currentQuote, setCurrentQuote] = useState(null);
  // Estado para controlar a animação de transição
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Efeito para inicializar a frase motivacional
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
    
    // Configurar intervalo para trocar a frase a cada 30 segundos
    const interval = setInterval(() => {
      changeQuote();
    }, 30000);
    
    // Limpar intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  // Função para obter uma frase aleatória
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  // Função para trocar a frase com animação
  const changeQuote = () => {
    // Iniciar animação de saída
    setIsTransitioning(true);
    
    // Após a animação de saída, trocar a frase
    setTimeout(() => {
      let newQuote = getRandomQuote();
      // Garantir que a nova frase seja diferente da atual
      while (newQuote === currentQuote) {
        newQuote = getRandomQuote();
      }
      setCurrentQuote(newQuote);
      
      // Iniciar animação de entrada
      setIsTransitioning(false);
    }, 500);
  };

  // Variantes para animação
  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Renderizar o componente
  return (
    <div className="motivation-card">
      <div className="motivation-header">
        <h3 className="motivation-title">Motivação Diária</h3>
        <button 
          className="motivation-refresh" 
          onClick={changeQuote}
          aria-label="Trocar frase motivacional"
        >
          <span className="refresh-icon">🔄</span>
        </button>
      </div>
      
      <div className="motivation-content">
        {currentQuote && (
          <motion.div
            key={currentQuote.quote} // Importante para a animação
            className="quote-container"
            initial="hidden"
            animate={isTransitioning ? "exit" : "visible"}
            variants={quoteVariants}
            transition={{ duration: 0.5 }}
          >
            <p className="quote-text">"{currentQuote.quote}"</p>
            <p className="quote-author">— {currentQuote.author}</p>
          </motion.div>
        )}
      </div>
      
      <div className="motivation-footer">
        <div className="motivation-indicator">
          {motivationalQuotes.map((_, index) => (
            <span 
              key={index} 
              className={`indicator-dot ${currentQuote === motivationalQuotes[index] ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Banco de frases motivacionais para emagrecimento
const motivationalQuotes = [
  {
    quote: "Sua disciplina de hoje é a chave para o seu sucesso de amanhã.",
    author: "Jim Rohn"
  },
  {
    quote: "O sucesso não é imediato, mas a cada dia você está mais perto dele.",
    author: "Anônimo"
  },
  {
    quote: "Não desista. Resultados levam tempo.",
    author: "Anônimo"
  },
  {
    quote: "Sua saúde é um investimento, não uma despesa.",
    author: "Anônimo"
  },
  {
    quote: "Pequenas mudanças podem levar a grandes resultados.",
    author: "Anônimo"
  },
  {
    quote: "Você não precisa ser perfeita, só precisa ser consistente.",
    author: "Anônimo"
  },
  {
    quote: "Cada escolha saudável é uma vitória. Celebre-as.",
    author: "Anônimo"
  },
  {
    quote: "O melhor projeto em que você pode trabalhar é você mesma.",
    author: "Anônimo"
  },
  {
    quote: "Não compare sua jornada com a de outras pessoas. Cada corpo é único.",
    author: "Anônimo"
  },
  {
    quote: "Transformação não é sobre mudar seu corpo, é sobre mudar sua mentalidade.",
    author: "Anônimo"
  },
  {
    quote: "Você é mais forte do que suas desculpas.",
    author: "Anônimo"
  },
  {
    quote: "Foco no progresso, não na perfeição.",
    author: "Anônimo"
  }
];

export default MotivationCard;
