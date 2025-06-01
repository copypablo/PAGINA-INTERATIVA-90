import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import '../../styles/futuristic.css';

/**
 * Componente de Gráfico de Peso Futurista
 * 
 * Exibe um gráfico interativo de linha para acompanhamento de peso
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.data - Dados para o gráfico
 * @param {string} props.className - Classes CSS adicionais
 */
const WeightChart = ({ data = [], className = '' }) => {
  // Formatar dados para o gráfico
  const chartData = data.map(record => ({
    date: new Date(record.date).toLocaleDateString('pt-BR'),
    peso: parseFloat(record.weight)
  })).reverse();

  return (
    <motion.div 
      className={`chart-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="chart-title">Evolução do Peso</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="#999" 
            tick={{ fill: '#999' }}
            tickLine={{ stroke: '#555' }}
          />
          <YAxis 
            stroke="#999" 
            tick={{ fill: '#999' }}
            tickLine={{ stroke: '#555' }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#333', 
              border: '1px solid #ff8c42',
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="peso" 
            name="Peso (kg)"
            stroke="#ff8c42" 
            strokeWidth={3}
            dot={{ 
              fill: '#ff8c42', 
              stroke: '#ff8c42', 
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{ 
              fill: '#fff', 
              stroke: '#ff8c42', 
              strokeWidth: 2,
              r: 6
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

/**
 * Componente de Gráfico de Água Futurista
 * 
 * Exibe um gráfico interativo de área para acompanhamento de consumo de água
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.data - Dados para o gráfico
 * @param {string} props.className - Classes CSS adicionais
 */
const WaterChart = ({ data = [], className = '' }) => {
  // Formatar dados para o gráfico
  const chartData = data.map(record => ({
    date: new Date(record.date).toLocaleDateString('pt-BR'),
    agua: parseFloat(record.waterIntake)
  })).reverse();

  return (
    <motion.div 
      className={`chart-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="chart-title">Consumo de Água</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="#999" 
            tick={{ fill: '#999' }}
            tickLine={{ stroke: '#555' }}
          />
          <YAxis 
            stroke="#999" 
            tick={{ fill: '#999' }}
            tickLine={{ stroke: '#555' }}
            domain={[0, 'dataMax + 0.5']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#333', 
              border: '1px solid #4cc9f0',
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <defs>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4cc9f0" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4cc9f0" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="agua" 
            name="Água (L)"
            stroke="#4cc9f0" 
            strokeWidth={2}
            fill="url(#waterGradient)" 
            activeDot={{ 
              fill: '#fff', 
              stroke: '#4cc9f0', 
              strokeWidth: 2,
              r: 6
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

/**
 * Componente de Gráfico de Sono Futurista
 * 
 * Exibe um gráfico interativo de barras para acompanhamento de horas de sono
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.data - Dados para o gráfico
 * @param {string} props.className - Classes CSS adicionais
 */
const SleepChart = ({ data = [], className = '' }) => {
  // Formatar dados para o gráfico
  const chartData = data.map(record => ({
    date: new Date(record.date).toLocaleDateString('pt-BR'),
    sono: parseFloat(record.sleepHours)
  })).reverse();

  return (
    <motion.div 
      className={`chart-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="chart-title">Horas de Sono</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="#999" 
            tick={{ fill: '#999' }}
            tickLine={{ stroke: '#555' }}
          />
          <YAxis 
            stroke="#999" 
            tick={{ fill: '#999' }}
            tickLine={{ stroke: '#555' }}
            domain={[0, 'dataMax + 1']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#333', 
              border: '1px solid #7b2cbf',
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <defs>
            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7b2cbf" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#7b2cbf" stopOpacity={0.4}/>
            </linearGradient>
          </defs>
          <Bar 
            dataKey="sono" 
            name="Sono (horas)"
            fill="url(#sleepGradient)" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export { WeightChart, WaterChart, SleepChart };
