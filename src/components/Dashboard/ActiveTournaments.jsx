import React from 'react';
import StatusBadge from '../UI/StatusBadge';

const ActiveTournaments = ({ tournaments }) => {
  const activeTournaments = tournaments.filter(t => t.status === 'activo');

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Torneos Activos</h3>
      <div className="space-y-4">
        {activeTournaments.map(tournament => (
          <div key={tournament.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"> {/* Key aquí */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <StatusBadge status={tournament.status} />
                <div>
                  <h4 className="font-semibold text-white">{tournament.name}</h4>
                  <p className="text-gray-400 text-sm">{tournament.location}, {tournament.state}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{tournament.worker}</p>
                <p className="text-gray-400 text-sm">Cámaras: {tournament.cameras.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTournaments;