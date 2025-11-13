import React from 'react';
import WorkersTable from '../components/Workers/WorkersTable';

const Workers = ({ workersData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Trabajadores</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors">
          Agregar Trabajador
        </button>
      </div>
      
      <WorkersTable workers={workersData} />
    </div>
  );
};

export default Workers;