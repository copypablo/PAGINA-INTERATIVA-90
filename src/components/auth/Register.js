import React, { useState } from 'react';
import '../../styles/auth.css';

// Componente de Cadastro
const Register = ({ onSwitchToLogin, onRegister }) => {
  // Estados para armazenar os valores dos campos e mensagens
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [initialWeight, setInitialWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!name || !email || !password || !confirmPassword || !initialWeight) {
      setErrorMessage('Por favor, preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }
    
    // Buscar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar se o email já está cadastrado
    if (users.some(user => user.email === email)) {
      setErrorMessage('Este email já está cadastrado');
      return;
    }
    
    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      initialWeight,
      registeredAt: new Date().toISOString(),
      records: [] // Array vazio para armazenar os registros diários
    };
    
    // Adicionar novo usuário à lista
    users.push(newUser);
    
    // Salvar no localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Exibir mensagem de sucesso
    setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para o login...');
    setErrorMessage('');
    
    // Limpar campos
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setInitialWeight('');
    
    // Redirecionar para login após 2 segundos
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  };

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <h1>Saúde<span>Tracker</span></h1>
      </div>
      <h2 className="auth-title">Cadastro</h2>
      <p className="auth-subtitle">Crie sua conta para começar a monitorar seus avanços.</p>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="auth-input"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          className="auth-input"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="number"
          className="auth-input"
          placeholder="Seu peso inicial (kg)"
          value={initialWeight}
          onChange={(e) => setInitialWeight(e.target.value)}
        />
        <button type="submit" className="auth-button">Cadastrar</button>
      </form>
      
      <p className="auth-link" onClick={onSwitchToLogin}>
        Já tem uma conta? Faça login
      </p>
    </div>
  );
};

export default Register;
