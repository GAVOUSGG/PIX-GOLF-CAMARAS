import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { MapPin, Camera, Users, Trophy } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Coordenadas aproximadas de los estados principales de México
const stateCoordinates = {
  'CDMX': [19.4326, -99.1332],
  'Jalisco': [20.6597, -103.3496],
  'Nuevo León': [25.6866, -100.3161],
  'Yucatán': [20.9801, -89.6247],
  'Baja California': [32.6245, -115.4523],
  'Quintana Roo': [21.1619, -86.8515],
  'Estado de México': [19.4969, -99.7233],
  'Puebla': [19.0414, -98.2063],
  'Veracruz': [19.1738, -96.1342],
  'Guerrero': [17.4392, -99.5451],
  'Chiapas': [16.7569, -93.1292],
  'Oaxaca': [17.0732, -96.7266],
  'Michoacán': [19.5665, -101.7068],
  'Guanajuato': [21.0190, -101.2574],
  'Sonora': [29.2972, -110.3309],
  'Chihuahua': [28.6330, -106.0691],
  'Coahuila': [27.0587, -101.7068],
  'Tamaulipas': [24.2669, -98.8363],
  'Sinaloa': [25.1721, -107.4795],
  'Durango': [24.0277, -104.6532]
};

const MexicoMap = ({ tournaments, workers, cameras }) => {
  // Agrupar datos por estado
  const getStateData = (state) => {
    const stateTournaments = tournaments.filter(t => t.state === state);
    const stateWorkers = workers.filter(w => w.state === state);
    const stateCameras = cameras.filter(c => c.location === state && c.status === 'en uso');
    
    return {
      tournaments: stateTournaments,
      workers: stateWorkers,
      cameras: stateCameras,
      activeTournaments: stateTournaments.filter(t => t.status === 'activo').length
    };
  };

  const getMarkerColor = (stateData) => {
    if (stateData.activeTournaments > 0) return 'bg-red-500';
    if (stateData.tournaments.length > 0) return 'bg-yellow-500';
    if (stateData.workers.length > 0) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Mapa de Operaciones - México</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Torneos Activos</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Torneos Programados</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Personal Disponible</span>
          </div>
        </div>
      </div>

      <div className="h-96 rounded-lg overflow-hidden border border-white/10">
        <MapContainer
          center={[23.6345, -102.5528]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {Object.entries(stateCoordinates).map(([state, coords]) => {
            const stateData = getStateData(state);
            if (stateData.tournaments.length === 0 && stateData.workers.length === 0) return null;
            
            return (
              <Marker key={state} position={coords}>
                <Popup>
                  <div className="p-2 min-w-48">
                    <h4 className="font-bold text-lg mb-2">{state}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span>{stateData.tournaments.length} torneo(s)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{stateData.workers.length} trabajador(es)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-green-500" />
                        <span>{stateData.cameras.length} cámara(s) en uso</span>
                      </div>
                      {stateData.activeTournaments > 0 && (
                        <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                          {stateData.activeTournaments} torneo(s) activo(s)
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
                <Tooltip permanent direction="top">
                  <div className={`px-2 py-1 rounded-full text-white text-xs font-bold ${getMarkerColor(stateData)}`}>
                    {state}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-white font-semibold">Total Torneos</span>
          </div>
          <p className="text-2xl font-bold text-white">{tournaments.length}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-white font-semibold">Estados con Operación</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {new Set([...tournaments.map(t => t.state), ...workers.map(w => w.state)]).size}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Camera className="w-5 h-5 text-green-500" />
            <span className="text-white font-semibold">Cámaras Desplegadas</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {cameras.filter(c => c.status === 'en uso').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MexicoMap;