import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProgressCard from '../components/cards/ProgressCard';
import MedalsCard, { defaultMedals } from '../components/cards/MedalsCard';
import MotivationCard from '../components/cards/MotivationCard';
import SuccessStoriesCard from '../components/cards/SuccessStoriesCard';
import CelebrationCard from '../components/cards/CelebrationCard';
import '../styles/futuristic.css';
import '../styles/dashboard.css';
import '../styles/cards.css';
import '../styles/animations.css';

// Componente principal do Dashboard
const DashboardPage = ({ user, onLogout }) => {
  // Estados para os formulários de registro
  const [sleepHours, setSleepHours] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [dietQuality, setDietQuality] = useState('boa');
  const [dietNotes, setDietNotes] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [workoutDone, setWorkoutDone] = useState(false);
  const [workoutNotes, setWorkoutNotes] = useState('');
  
  // Estado para armazenar os registros do usuário
  const [records, setRecords] = useState([]);
  
  // Estado para armazenar o usuário atual
  const [currentUser, setCurrentUser] = useState(user);

  // Estado para controlar a contagem de streak
  const [streakCount, setStreakCount] = useState(0);
  
  // Estado para controlar a visualização de seções
  const [activeSection, setActiveSection] = useState('dashboard');

  // Estado para controlar medalhas
  const [medals, setMedals] = useState(defaultMedals);

  // Estado para controlar celebrações
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Carregar registros do usuário ao montar o componente
  useEffect(() => {
    loadUserRecords();
  }, []);

  // Calcular streak quando os registros mudarem
  useEffect(() => {
    if (records.length > 0) {
      const streak = calculateStreak(records);
      setStreakCount(streak);
    }
  }, [records]);

  // Função para carregar os registros do usuário do localStorage
  const loadUserRecords = () => {
    // Buscar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Encontrar o usuário atual
    const updatedUser = users.find(u => u.id === user.id);
    
    if (updatedUser) {
      setCurrentUser(updatedUser);
      setRecords(updatedUser.records || []);
      
      // Verificar e atualizar medalhas
      updateMedals(updatedUser, updatedUser.records || []);
    }
  };

  // Função para calcular streak (dias consecutivos)
  const calculateStreak = (records) => {
    if (records.length === 0) return 0;
    
    // Verificar se há um registro para hoje
    const today = new Date().setHours(0, 0, 0, 0);
    const hasToday = records.some(record => {
      const recordDate = new Date(record.date).setHours(0, 0, 0, 0);
      return recordDate === today;
    });
    
    // Se não há registro hoje, começar contagem do zero
    if (!hasToday) return 0;
    
    let streak = 1;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // Ordenar registros por data (mais recente primeiro)
    const sortedRecords = [...records].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    // Verificar dias consecutivos
    for (let i = 1; i < 100; i++) { // Limite de 100 dias para evitar loop infinito
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      prevDate.setHours(0, 0, 0, 0);
      
      const hasPrevDay = sortedRecords.some(record => {
        const recordDate = new Date(record.date).setHours(0, 0, 0, 0);
        return recordDate === prevDate.getTime();
      });
      
      if (hasPrevDay) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Função para atualizar medalhas
  const updateMedals = (user, records) => {
    let updatedMedals = [...medals];
    let newAchievements = [];
    
    // Verificar medalha de primeiro registro
    if (records.length > 0 && !medals.find(m => m.id === 'first_record').unlocked) {
      updatedMedals = updatedMedals.map(medal => 
        medal.id === 'first_record' ? { ...medal, unlocked: true } : medal
      );
      newAchievements.push({
        id: 'first_record',
        title: 'Primeiro Registro!',
        description: 'Você fez seu primeiro registro diário. Continue assim!',
        icon: '📝'
      });
    }
    
    // Verificar medalha de perda de peso
    if (records.length > 0) {
      const initialWeight = parseFloat(user.initialWeight);
      const latestWeight = parseFloat(records[0].weight);
      const weightLoss = initialWeight - latestWeight;
      
      if (weightLoss >= 1 && !medals.find(m => m.id === 'weight_loss_1').unlocked) {
        updatedMedals = updatedMedals.map(medal => 
          medal.id === 'weight_loss_1' ? { ...medal, unlocked: true } : medal
        );
        newAchievements.push({
          id: 'weight_loss_1',
          title: 'Primeiro Quilo!',
          description: 'Você perdeu seu primeiro quilo. Parabéns pelo progresso!',
          icon: '⚖️'
        });
      }
      
      if (weightLoss >= 5 && !medals.find(m => m.id === 'weight_loss_5').unlocked) {
        updatedMedals = updatedMedals.map(medal => 
          medal.id === 'weight_loss_5' ? { ...medal, unlocked: true } : medal
        );
        newAchievements.push({
          id: 'weight_loss_5',
          title: 'Cinco Quilos!',
          description: 'Você perdeu 5 quilos desde o início. Que conquista incrível!',
          icon: '🏆'
        });
      }
    }
    
    // Verificar medalha de streak
    if (streakCount >= 3 && !medals.find(m => m.id === 'streak_3').unlocked) {
      updatedMedals = updatedMedals.map(medal => 
        medal.id === 'streak_3' ? { ...medal, unlocked: true } : medal
      );
      newAchievements.push({
        id: 'streak_3',
        title: 'Sequência de 3 Dias!',
        description: 'Você manteve registros por 3 dias consecutivos. Sua consistência é admirável!',
        icon: '🔥'
      });
    }
    
    if (streakCount >= 7 && !medals.find(m => m.id === 'streak_7').unlocked) {
      updatedMedals = updatedMedals.map(medal => 
        medal.id === 'streak_7' ? { ...medal, unlocked: true } : medal
      );
      newAchievements.push({
        id: 'streak_7',
        title: 'Semana Perfeita!',
        description: 'Você manteve registros por 7 dias consecutivos. Uma semana inteira de dedicação!',
        icon: '🌟'
      });
    }
    
    // Atualizar estado das medalhas
    setMedals(updatedMedals);
    
    // Mostrar celebração para a primeira conquista nova (se houver)
    if (newAchievements.length > 0) {
      setCurrentAchievement(newAchievements[0]);
      setShowCelebration(true);
    }
  };

  // Função para adicionar um novo registro
  const handleAddRecord = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!sleepHours || !waterIntake || !currentWeight) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Criar novo registro
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sleepHours: parseFloat(sleepHours),
      waterIntake: parseFloat(waterIntake),
      dietQuality,
      dietNotes,
      weight: parseFloat(currentWeight),
      workoutDone,
      workoutNotes
    };
    
    // Buscar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Encontrar e atualizar o usuário atual
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        // Adicionar novo registro ao início do array
        const updatedRecords = [newRecord, ...(u.records || [])];
        return { ...u, records: updatedRecords };
      }
      return u;
    });
    
    // Salvar no localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Atualizar estado local
    loadUserRecords();
    
    // Limpar formulário
    setSleepHours('');
    setWaterIntake('');
    setDietQuality('boa');
    setDietNotes('');
    setCurrentWeight('');
    setWorkoutDone(false);
    setWorkoutNotes('');
    
    // Mostrar mensagem de sucesso com animação
    const successMessage = document.createElement('div');
    successMessage.className = 'success-popup';
    successMessage.textContent = 'Registro adicionado com sucesso!';
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      successMessage.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      successMessage.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 500);
    }, 3000);
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calcular progresso de água (considerando 2L como meta)
  const calculateWaterProgress = (intake) => {
    const progress = (intake / 2) * 100;
    return Math.min(progress, 100); // Limitar a 100%
  };

  // Calcular variação de peso
  const calculateWeightChange = () => {
    if (!currentUser || !records || records.length === 0) return 0;
    
    const initialWeight = parseFloat(currentUser.initialWeight);
    const latestWeight = parseFloat(records[0]?.weight || initialWeight);
    
    return (latestWeight - initialWeight).toFixed(1);
  };

  // Mapear qualidade da dieta para texto
  const getDietQualityText = (quality) => {
    const qualities = {
      'ruim': 'Ruim',
      'regular': 'Regular',
      'boa': 'Boa',
      'excelente': 'Excelente'
    };
    return qualities[quality] || quality;
  };

  // Animações para elementos da página
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Preparar dados para os medidores avançados
  const metersData = {
    weight: {
      current: records.length > 0 ? records[0].weight : currentUser.initialWeight,
      initial: currentUser.initialWeight,
      goal: currentUser.weightGoal || (currentUser.initialWeight * 0.9), // Meta padrão: 90% do peso inicial
      unit: 'kg'
    },
    sleep: {
      average: records.length > 0 
        ? records.reduce((sum, record) => sum + record.sleepHours, 0) / records.length
        : 7,
      goal: 8,
      unit: 'horas'
    },
    water: {
      current: records.length > 0 ? records[0].waterIntake : 0,
      goal: 2,
      unit: 'L'
    },
    workout: {
      completed: records.filter(r => r.workoutDone && new Date(r.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
      goal: 5,
      unit: 'treinos/semana'
    }
  };

  // Renderizar seção ativa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div 
            className="dashboard-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Card de Motivação */}
            <motion.div variants={itemVariants} className="grid-item grid-item-full">
              <MotivationCard />
            </motion.div>
            
            {/* Card de Progresso de Peso */}
            <motion.div variants={itemVariants} className="grid-item">
              <ProgressCard 
                title="Progresso de Peso"
                currentValue={metersData.weight.current}
                initialValue={metersData.weight.initial}
                goalValue={metersData.weight.goal}
                unit="kg"
                icon="⚖️"
                color="orange"
              />
            </motion.div>
            
            {/* Card de Progresso de Água */}
            <motion.div variants={itemVariants} className="grid-item">
              <ProgressCard 
                title="Consumo de Água"
                currentValue={metersData.water.current}
                initialValue={0}
                goalValue={metersData.water.goal}
                unit="L"
                icon="💧"
                color="blue"
              />
            </motion.div>
            
            {/* Card de Progresso de Sono */}
            <motion.div variants={itemVariants} className="grid-item">
              <ProgressCard 
                title="Qualidade do Sono"
                currentValue={metersData.sleep.average}
                initialValue={0}
                goalValue={metersData.sleep.goal}
                unit="horas"
                icon="😴"
                color="purple"
              />
            </motion.div>
            
            {/* Card de Progresso de Treinos */}
            <motion.div variants={itemVariants} className="grid-item">
              <ProgressCard 
                title="Treinos Semanais"
                currentValue={metersData.workout.completed}
                initialValue={0}
                goalValue={metersData.workout.goal}
                unit="treinos"
                icon="💪"
                color="green"
              />
            </motion.div>
            
            {/* Card de Medalhas */}
            <motion.div variants={itemVariants} className="grid-item grid-item-full">
              <MedalsCard 
                medals={medals}
                onUnlock={(medal) => {
                  setCurrentAchievement({
                    id: medal.id,
                    title: medal.name,
                    description: medal.description,
                    icon: medal.icon
                  });
                  setShowCelebration(true);
                }}
              />
            </motion.div>
            
            {/* Card de Histórias de Sucesso */}
            <motion.div variants={itemVariants} className="grid-item grid-item-full">
              <SuccessStoriesCard />
            </motion.div>
          </motion.div>
        );
        
      case 'register':
        return (
          <motion.div 
            className="register-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="register-card">
              <h2 className="register-title">Registrar Progresso Diário</h2>
              
              <form className="register-form" onSubmit={handleAddRecord}>
                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="currentWeight">Peso Atual (kg) *</label>
                    <input
                      type="number"
                      id="currentWeight"
                      className="futuristic-input"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      step="0.1"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="sleepHours">Horas de Sono *</label>
                    <input
                      type="number"
                      id="sleepHours"
                      className="futuristic-input"
                      value={sleepHours}
                      onChange={(e) => setSleepHours(e.target.value)}
                      step="0.5"
                      min="0"
                      max="24"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="waterIntake">Consumo de Água (L) *</label>
                    <input
                      type="number"
                      id="waterIntake"
                      className="futuristic-input"
                      value={waterIntake}
                      onChange={(e) => setWaterIntake(e.target.value)}
                      step="0.1"
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="dietQuality">Qualidade da Alimentação</label>
                    <select
                      id="dietQuality"
                      className="futuristic-input"
                      value={dietQuality}
                      onChange={(e) => setDietQuality(e.target.value)}
                    >
                      <option value="ruim">Ruim</option>
                      <option value="regular">Regular</option>
                      <option value="boa">Boa</option>
                      <option value="excelente">Excelente</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="dietNotes">Observações sobre Alimentação</label>
                    <textarea
                      id="dietNotes"
                      className="futuristic-input"
                      value={dietNotes}
                      onChange={(e) => setDietNotes(e.target.value)}
                      placeholder="O que você comeu hoje?"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <div className="checkbox-group">
                      <label htmlFor="workoutDone">
                        <input
                          type="checkbox"
                          id="workoutDone"
                          checked={workoutDone}
                          onChange={(e) => setWorkoutDone(e.target.checked)}
                        />
                        <span className="checkbox-label">Realizei atividade física hoje</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="workoutNotes">Detalhes do Treino</label>
                    <textarea
                      id="workoutNotes"
                      className="futuristic-input"
                      value={workoutNotes}
                      onChange={(e) => setWorkoutNotes(e.target.value)}
                      placeholder="Que exercícios você fez?"
                      disabled={!workoutDone}
                    />
                  </div>
                </div>
                
                <button type="submit" className="register-button">Salvar Registro</button>
              </form>
            </motion.div>
          </motion.div>
        );
        
      case 'history':
        return (
          <motion.div 
            className="history-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="history-card">
              <h2 className="history-title">Histórico de Registros</h2>
              
              {records.length === 0 ? (
                <div className="no-records">
                  <p>Você ainda não tem registros. Comece a registrar seu progresso diário!</p>
                </div>
              ) : (
                <div className="records-list">
                  {records.map(record => (
                    <div key={record.id} className="record-item">
                      <div className="record-date">{formatDate(record.date)}</div>
                      
                      <div className="record-details">
                        <div className="record-detail">
                          <div className="record-detail-label">Peso</div>
                          <div className="record-detail-value">{record.weight} kg</div>
                        </div>
                        
                        <div className="record-detail">
                          <div className="record-detail-label">Sono</div>
                          <div className="record-detail-value">{record.sleepHours} horas</div>
                        </div>
                        
                        <div className="record-detail">
                          <div className="record-detail-label">Água</div>
                          <div className="record-detail-value">{record.waterIntake} L</div>
                        </div>
                        
                        <div className="record-detail">
                          <div className="record-detail-label">Alimentação</div>
                          <div className="record-detail-value">{getDietQualityText(record.dietQuality)}</div>
                        </div>
                        
                        <div className="record-detail">
                          <div className="record-detail-label">Treino</div>
                          <div className="record-detail-value">{record.workoutDone ? 'Sim' : 'Não'}</div>
                        </div>
                      </div>
                      
                      {(record.dietNotes || record.workoutNotes) && (
                        <div className="record-notes">
                          {record.dietNotes && (
                            <div className="note-item">
                              <div className="note-label">Notas de Alimentação:</div>
                              <div className="note-text">{record.dietNotes}</div>
                            </div>
                          )}
                          
                          {record.workoutNotes && (
                            <div className="note-item">
                              <div className="note-label">Notas de Treino:</div>
                              <div className="note-text">{record.workoutNotes}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        );
        
      case 'success':
        return (
          <motion.div 
            className="success-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="grid-item grid-item-full">
              <SuccessStoriesCard />
            </motion.div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo">
            <h1>Desafio<span className="text-gradient">Fitness</span></h1>
          </div>
          
          <div className="dashboard-user-info">
            <div className="dashboard-user-name">Olá, {currentUser.name}</div>
            <button className="logout-button" onClick={onLogout}>Sair</button>
          </div>
        </div>
      </header>
      
      {/* Navegação */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'register' ? 'active' : ''}`}
            onClick={() => setActiveSection('register')}
          >
            <span className="nav-icon">✏️</span>
            <span className="nav-text">Registrar</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'history' ? 'active' : ''}`}
            onClick={() => setActiveSection('history')}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-text">Histórico</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'success' ? 'active' : ''}`}
            onClick={() => setActiveSection('success')}
          >
            <span className="nav-icon">🏆</span>
            <span className="nav-text">Sucesso</span>
          </button>
        </div>
      </nav>
      
      {/* Conteúdo principal */}
      <main className="dashboard-content">
        {renderActiveSection()}
      </main>
      
      {/* Celebração de conquistas */}
      {showCelebration && currentAchievement && (
        <CelebrationCard 
          achievement={currentAchievement}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
