import React from 'react';
import { CheckCircle, Clock, Camera, AlertCircle, Send } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      activo: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      pendiente: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
      terminado: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: CheckCircle },
      'en uso': { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Camera },
      disponible: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      mantenimiento: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: AlertCircle },
      enviado: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Send }
    };
    
    return configs[status] || { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: AlertCircle };
  };

  const { color, icon: Icon } = getStatusConfig(status);

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 w-fit ${color}`}>
      <Icon className="w-4 h-4" />
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default StatusBadge;