import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import FuturisticCard from '../components/ui/FuturisticCard';
import '../styles/futuristic.css';
import '../styles/auth.css';

// Página de Autenticação que gerencia os componentes de Login e Cadastro
const AuthPage = ({ onLogin }) => {
  // Estado para controlar qual componente mostrar (login ou cadastro)
  const [showLogin, setShowLogin] = useState(true);

  // Função para alternar para o componente de Login
  const switchToLogin = () => {
    setShowLogin(true);
  };

  // Função para alternar para o componente de Cadastro
  const switchToRegister = () => {
    setShowLogin(false);
  };

  // Animações para transição entre login e cadastro
  const pageVariants = {
    initial: { opacity: 0, x: showLogin ? -100 : 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: showLogin ? 100 : -100 }
  };

  return (
    <div className="auth-container futuristic-container">
      <motion.div
        className="auth-content"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <FuturisticCard className="auth-card-wrapper" glowEffect>
          {showLogin ? (
            <Login 
              onSwitchToRegister={switchToRegister} 
              onLogin={onLogin} 
            />
          ) : (
            <Register 
              onSwitchToLogin={switchToLogin} 
              onRegister={switchToLogin} 
            />
          )}
        </FuturisticCard>
      </motion.div>
      
      {/* Elementos decorativos de fundo */}
      <div className="auth-background">
        <motion.div 
          className="bg-circle circle-1"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="bg-circle circle-2"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;
