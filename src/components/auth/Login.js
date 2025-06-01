import React, { useState } from 'react';
import '../../styles/auth.css';

// Componente de Login
const Login = ({ onSwitchToRegister, onLogin }) => {
  // Estados para armazenar os valores dos campos e mensagens
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos');
      return;
    }
    
    // Buscar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar se o usuário existe
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Salvar usuário logado no localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Chamar função de login passada como prop
      onLogin(user);
    } else {
      setErrorMessage('Email ou senha incorretos');
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <h1>PROTOCOLO<span> 12 SEMANAS</span></h1>
      </div>
      <h2 className="auth-title">Login</h2>
      <p className="auth-subtitle">Faça login para acessar sua evolução.</p>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth-input"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-button">Entrar</button>
      </form>
      
      <p className="auth-link" onClick={onSwitchToRegister}>
        Não tem uma conta? Cadastre-se.
      </p>
    </div>
  );
};

export default Login;
