import React, { useState } from 'react';
import StatusBadge from '../UI/StatusBadge';
import { Eye } from 'lucide-react';
import TournamentDetailsModal from './TournamentDetailsModal';

const ActiveTournaments = ({ tournaments }) => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const activeTournaments = tournaments ? tournaments.filter(t => t.status === 'activo') : [];

  return (
    <>
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6 h-full">
        <h3 className="text-xl font-semibold text-white mb-6">Torneos Activos</h3>
        <div className="space-y-4">
          {activeTournaments.length > 0 ? (
            activeTournaments.map(tournament => (
              <div key={tournament.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <StatusBadge status={tournament.status} />
                    <div>
                      <h4 className="font-semibold text-white">{tournament.name}</h4>
                      <p className="text-gray-400 text-sm">{tournament.location}, {tournament.state}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-white font-medium">{tournament.worker}</p>
                      <p className="text-gray-400 text-sm">
                        {tournament.cameras?.length || 0} Cámaras
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedTournament(tournament)}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-500/20"
                      title="Ver Detalles"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-8 text-gray-500">
               No hay torneos activos en este momento.
             </div>
          )}
        </div>
      </div>

      {sessionStorage && (
         <TournamentDetailsModal 
           tournament={selectedTournament} 
           onClose={() => setSelectedTournament(null)} 
         />
      )}
    </>
  );
};

export default ActiveTournaments;