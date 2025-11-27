import React from "react";
import { X } from "lucide-react";

const EventModal = ({ event, onClose }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      shipment: "Envío",
      tournament: "Torneo",
      return: "Devolución",
      maintenance: "Mantenimiento",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "shipment":
        return "text-blue-400";
      case "tournament":
        return "text-purple-400";
      case "return":
        return "text-orange-400";
      case "maintenance":
        return "text-gray-400";
      default:
        return "text-white";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
            <p className={`text-sm ${getTypeColor(event.type)} font-semibold`}>
              {getTypeLabel(event.type)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Date */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Fecha y Hora</h3>
            <p className="text-white">{formatDate(event.date)}</p>
          </div>

          {/* Details */}
          {event.details && Object.keys(event.details).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Detalles</h3>
              <div className="space-y-2">
                {Object.entries(event.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span className="text-white font-medium text-right max-w-xs break-words">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event ID */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500">ID: {event.id}</p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
