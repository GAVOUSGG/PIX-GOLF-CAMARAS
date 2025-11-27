import React from "react";
import { X, Calendar, Clock, MapPin, User, Package } from "lucide-react";

const EventModal = ({ event, onClose }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
        return "border-l-blue-500";
      case "tournament":
        return "border-l-purple-500";
      case "return":
        return "border-l-orange-500";
      case "maintenance":
        return "border-l-gray-500";
      default:
        return "border-l-white";
    }
  };

  const renderDetailItem = (icon, label, value) => (
    <div className="flex items-start gap-3 py-3 border-b border-white/10 last:border-b-0">
      <div className="flex-shrink-0 mt-0.5 text-gray-400">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-400 mb-1">{label}</div>
        <div className="text-white text-sm">{value || "No especificado"}</div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className={`bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-hidden border-l-4 ${getTypeColor(
          event.type
        )}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white mb-2 pr-8">
              {event.title}
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                <Package className="w-3 h-3" />
                {getTypeLabel(event.type)}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-3 h-3" />
                {formatDate(event.date)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {event.details && Object.keys(event.details).length > 0 ? (
            <div className="space-y-1">
              {Object.entries(event.details).map(([key, value]) =>
                renderDetailItem(
                  <Clock className="w-4 h-4" />,
                  key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase()),
                  typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : String(value)
                )
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay detalles adicionales disponibles</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono">
              ID: {event.id}
            </span>
            <button
              onClick={onClose}
              className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
