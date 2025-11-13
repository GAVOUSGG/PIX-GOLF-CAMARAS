import React, { useState } from 'react';
import { Calendar, User, MapPin, Camera, Clock, CheckCircle, Truck, ChevronDown, ChevronUp } from 'lucide-react';

const TasksList = ({ tasks, onCompleteTask, onShipCameras }) => {
  const [expandedTask, setExpandedTask] = useState(null);
  const [selectedCameras, setSelectedCameras] = useState({});

  const pendingTasks = tasks.filter(task => task.status === 'pendiente');
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'media': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'baja': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTaskIcon = (type) => {
    switch(type) {
      case 'camera_shipment': return <Camera className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const toggleTaskExpansion = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleCameraSelection = (taskId, cameraId) => {
    setSelectedCameras(prev => {
      const currentSelection = prev[taskId] || [];
      const isSelected = currentSelection.includes(cameraId);
      
      const newSelection = isSelected 
        ? currentSelection.filter(id => id !== cameraId)
        : [...currentSelection, cameraId];
      
      return {
        ...prev,
        [taskId]: newSelection
      };
    });
  };

  const handleShipWithSelection = (task) => {
    const camerasToShip = selectedCameras[task.id] || [];
    if (camerasToShip.length === 0) {
      alert('Por favor selecciona al menos una cámara para enviar');
      return;
    }
    
    if (camerasToShip.length < task.camerasNeeded) {
      if (!confirm(`Solo seleccionaste ${camerasToShip.length} cámaras, pero se necesitan ${task.camerasNeeded}. ¿Continuar?`)) {
        return;
      }
    }
    
    onShipCameras({
      ...task,
      selectedCameras: camerasToShip
    });
  };

  if (pendingTasks.length === 0) {
    return (
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Tareas Pendientes</h3>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-gray-400">No hay tareas pendientes</p>
          <p className="text-gray-500 text-sm">¡Todo bajo control!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Tareas Pendientes</h3>
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
          {pendingTasks.length}
        </span>
      </div>
      
      <div className="space-y-4">
        {pendingTasks.map(task => (
          <div key={task.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div 
              className="flex items-start justify-between mb-3 cursor-pointer"
              onClick={() => toggleTaskExpansion(task.id)}
            >
              <div className="flex items-center space-x-3">
                {getTaskIcon(task.type)}
                <div>
                  <h4 className="font-semibold text-white">{task.title}</h4>
                  <p className="text-gray-400 text-sm">{task.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </div>
                {expandedTask === task.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
            
            {/* Información básica siempre visible */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{task.assignedTo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{task.state}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Necesita: {task.camerasNeeded}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{task.dueDate}</span>
              </div>
            </div>
            
            {/* Información expandida */}
            {expandedTask === task.id && (
              <div className="mt-4 space-y-4">
                {/* Cámaras asignadas actualmente */}
                {task.assignedCameras && task.assignedCameras.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Cámaras ya asignadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {task.assignedCameras.map(cameraId => (
                        <span key={cameraId} className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                          {cameraId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Selección de cámaras disponibles */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">
                    Cámaras disponibles en almacén ({task.availableCameras.length}):
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {task.availableCameras.map(camera => (
                      <label key={camera.id} className="flex items-center space-x-2 p-2 bg-white/5 rounded border border-white/10 hover:bg-white/10 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(selectedCameras[task.id] || []).includes(camera.id)}
                          onChange={() => handleCameraSelection(task.id, camera.id)}
                          className="rounded border-white/20"
                        />
                        <span className="text-white text-sm">{camera.id}</span>
                        <span className="text-gray-400 text-xs">({camera.model})</span>
                      </label>
                    ))}
                  </div>
                  {task.availableCameras.length === 0 && (
                    <p className="text-yellow-400 text-sm">No hay cámaras disponibles en almacén</p>
                  )}
                </div>
                
                {/* Resumen de selección */}
                <div className="bg-white/5 rounded p-3">
                  <p className="text-gray-400 text-sm">
                    Seleccionadas: {(selectedCameras[task.id] || []).length} de {task.camerasNeeded} necesarias
                  </p>
                  {(selectedCameras[task.id] || []).length > 0 && (
                    <p className="text-white text-sm">
                      Cámaras a enviar: {(selectedCameras[task.id] || []).join(', ')}
                    </p>
                  )}
                </div>
                
                {/* Botones de acción */}
                <div className="flex space-x-3">
                  {task.type === 'camera_shipment' && (
                    <button
                      onClick={() => handleShipWithSelection(task)}
                      disabled={(selectedCameras[task.id] || []).length === 0}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Enviar Cámaras Seleccionadas</span>
                    </button>
                  )}
                  <button
                    onClick={() => onCompleteTask(task.id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Marcar Completada
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;