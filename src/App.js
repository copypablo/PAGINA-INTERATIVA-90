import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import './styles/global.css';
import './styles/futuristic.css';
import './styles/cards.css';
import './styles/animations.css';

function App() {
  // Estado para controlar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para armazenar os dados do usuário atual
  const [currentUser, setCurrentUser] = useState(null);

  // Verificar se há um usuário logado ao carregar a aplicação
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  // Função para lidar com o login
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Efeito de fade-in para a aplicação inteira
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="App">
      <motion.div 
        className="futuristic-container"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        {isAuthenticated ? (
          <DashboardPage user={currentUser} onLogout={handleLogout} />
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </motion.div>
    </div>
  );
}

export default App;
