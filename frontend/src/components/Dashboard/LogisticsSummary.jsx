import React, { useMemo } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const LogisticsSummary = ({ shipments }) => {
  const stats = useMemo(() => {
    if (!shipments) return { pending: 0, transit: 0, delivered: 0 };

    const counts = {
      pending: 0,
      transit: 0,
      delivered: 0
    };

    shipments.forEach(s => {
      const status = s.status?.toLowerCase() || '';
      if (status === 'pendiente' || status === 'por enviar') {
        counts.pending++;
      } else if (status === 'en transito' || status === 'enviado' || status === 'en camino') {
        counts.transit++;
      } else if (status === 'entregado' || status === 'recibido') {
        counts.delivered++;
      }
    });

    return counts;
  }, [shipments]);

  if (!shipments) return null;

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6 h-full">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Truck className="w-6 h-6 text-blue-400" />
        Logística y Envíos
      </h3>

      <div className="space-y-4">
        {/* Por Enviar */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Por Enviar</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
        </div>

        {/* En Camino */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Truck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">En Camino</p>
              <p className="text-2xl font-bold text-white">{stats.transit}</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
        </div>

        {/* Entregados */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Entregados</p>
              <p className="text-2xl font-bold text-white">{stats.delivered}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Total de Envíos</span>
          <span className="text-white font-medium">{shipments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LogisticsSummary;
