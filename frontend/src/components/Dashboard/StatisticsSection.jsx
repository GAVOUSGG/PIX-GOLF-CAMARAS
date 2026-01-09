import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
const DARK_COLORS = ['#059669', '#2563eb', '#d97706', '#dc2626', '#7c3aed'];

const StatisticsSection = ({ tournaments }) => {
  // Procesamiento de datos para las gráficas
  const stats = useMemo(() => {
    if (!tournaments) return null;

    // 1. Duración de torneos (1 día vs Más días)
    const durationStats = [
      { name: '1 Día', value: 0 },
      { name: 'Más de 1 día', value: 0 }
    ];

    // 2. Distribución de Hoyos
    const holesMap = {};

    // 3. Torneos por Estado
    const stateMap = {};

    // 4. Actividad Mensual (para AreaChart)
    const monthlyActivity = {};

    tournaments.forEach(t => {
      // Duración
      if (t.days === 1) durationStats[0].value++;
      else durationStats[1].value++;

      // Hoyos
      const holeKey = t.holes ? `${t.holes} Hoyos` : 'Sin definir';
      holesMap[holeKey] = (holesMap[holeKey] || 0) + 1;

      // Estado
      if (t.state) {
        stateMap[t.state] = (stateMap[t.state] || 0) + 1;
      }

      // Actividad Mensual
      if (t.date) {
        const date = new Date(t.date);
        const monthYear = `${date.toLocaleString('es-MX', { month: 'short' })} ${date.getFullYear()}`;
        monthlyActivity[monthYear] = (monthlyActivity[monthYear] || 0) + 1;
      }
    });

    // Formatear datos para Recharts
    const holesData = Object.entries(holesMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name));

    const stateData = Object.entries(stateMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 estados

    // Ordenar cronológicamente los meses es complejo solo con string, 
    // pero para este MVP los mostraremos como vienen (idealmente ordenar por fecha real)
    // Una mejora rápida es asumir que el objeto se llena en orden si la DB trae orden, 
    // si no, necesitariamos lógica de ordenamiento de fecha.
    // Vamos a intentar ordenarlos basándonos en los datos del torneo.
    
    // Mejor estrategia para timeline: procesar todos los meses del último año
    const activityData = Object.entries(monthlyActivity)
      .map(([name, value]) => ({ name, value }));

    return {
      duration: durationStats.filter(d => d.value > 0),
      holes: holesData,
      states: stateData,
      activity: activityData
    };
  }, [tournaments]);

  if (!tournaments || tournaments.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Estadísticas de Operación
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Distribución por Duración (Pie) */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h4 className="text-gray-300 font-medium mb-4">Duración de Torneos</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.duration}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.duration.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por Hoyos (Bar) */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h4 className="text-gray-300 font-medium mb-4">Distribución por Hoyos</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.holes} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                />
                <Bar dataKey="value" name="Torneos" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Torneos por Estado (Bar) */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h4 className="text-gray-300 font-medium mb-4">Top Estados con Actividad</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.states} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  interval={0}
                />
                <YAxis stroke="#9ca3af" allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                />
                <Bar dataKey="value" name="Torneos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actividad Reciente (Area) - Opcional si hay datos de fecha */}
        {stats.activity.length > 0 && (
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h4 className="text-gray-300 font-medium mb-4">Actividad Mensual</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.activity}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="Torneos"
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StatisticsSection;
