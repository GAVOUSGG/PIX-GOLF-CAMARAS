import React from 'react';
import ShipmentsList from '../components/Logistics/ShipmentsList';

const Logistics = ({ shipmentsData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Logística - Cámaras Solares</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors">
          Nuevo Envío
        </button>
      </div>
      
      <ShipmentsList shipments={shipmentsData} />
    </div>
  );
};

export default Logistics;