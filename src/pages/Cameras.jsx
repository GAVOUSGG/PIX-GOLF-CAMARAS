import React from 'react';
import CamerasTable from '../components/Cameras/CamerasTable';

const Cameras = ({ camerasData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Inventario de Cámaras Solares Hikvision</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors">
          Agregar Cámara
        </button>
      </div>
      
      <CamerasTable cameras={camerasData} />
    </div>
  );
};

export default Cameras;