import React from 'react';
import { Camera } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  return (
    <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PixGolf</h1>
              <p className="text-sm text-gray-400">Camaras</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-300">Hola, {user.username}</span>
                <button 
                  onClick={onLogout}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
            <div className="text-right">
              <p className="text-sm text-gray-400">Hoy</p>
              <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;