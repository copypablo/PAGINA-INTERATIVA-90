import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/futuristic.css';

/**
 * Componente de Calendário de Hábitos
 * 
 * Exibe um calendário para acompanhamento de hábitos diários
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.records - Registros do usuário
 * @param {string} props.className - Classes CSS adicionais
 */
const HabitsCalendar = ({ 
  records = [], 
  className = '' 
}) => {
  // Obter data atual
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Gerar dias do mês atual
  const generateCalendarDays = () => {
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const days = [];
    
    // Adicionar dias vazios para alinhar com o dia da semana correto
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, date: null });
    }
    
    // Adicionar dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      
      // Verificar se há registro para este dia
      const hasRecord = records.some(record => {
        const recordDate = new Date(record.date);
        return recordDate.toISOString().split('T')[0] === dateString;
      });
      
      days.push({
        day: i,
        date: date,
        isToday: date.getTime() === today.getTime(),
        hasRecord: hasRecord
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthName = today.toLocaleDateString('pt-BR', { month: 'long' });
  
  return (
    <div className={`habits-calendar-container ${className}`}>
      <motion.h3 
        className="calendar-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Calendário de Hábitos - {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
      </motion.h3>
      
      <div className="calendar-week-days">
        {weekDays.map((day, index) => (
          <div key={index} className="week-day">{day}</div>
        ))}
      </div>
      
      <div className="habits-calendar">
        {calendarDays.map((day, index) => (
          day.day ? (
            <motion.div
              key={index}
              className={`calendar-day ${day.isToday ? 'today' : ''} ${day.hasRecord ? 'completed' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              whileHover={{ scale: 1.1 }}
            >
              {day.day}
              <div className="tooltip">
                {day.isToday ? 'Hoje' : day.date.toLocaleDateString('pt-BR')}
                {day.hasRecord ? ' - Registro completo' : ''}
              </div>
            </motion.div>
          ) : (
            <div key={index} className="calendar-day empty"></div>
          )
        ))}
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color completed"></div>
          <span>Registro realizado</span>
        </div>
        <div className="legend-item">
          <div className="legend-color today"></div>
          <span>Hoje</span>
        </div>
        <div className="legend-item">
          <div className="legend-color"></div>
          <span>Sem registro</span>
        </div>
      </div>
    </div>
  );
};

export default HabitsCalendar;
