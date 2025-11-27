import React, { useMemo } from "react";
import { MapPin, User, Calendar, TrendingUp } from "lucide-react";

const HistoryPanel = ({ camera, history, onBack }) => {
  const stats = useMemo(() => {
    return {
      totalEvents: history.length,
      shipments: history.filter((e) => e.type === "shipment").length,
      tournaments: history.filter((e) => e.type === "tournament").length,
      returns: history.filter((e) => e.type === "return").length,
      lastEvent: history[0] || null,
      nextEvent: history.length > 1 ? history[history.length - 1] : null,
    };
  }, [history]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Hoy";
      if (diffDays === 1) return "Ayer";
      if (diffDays < 7) return `Hace ${diffDays} días`;
      return date.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      {/* Camera Status Card */}
      <div className="bg-black/20 rounded-2xl border border-white/10 p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Estado Actual</h3>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-3 h-3 rounded-full ${
              camera.status === "disponible"
                ? "bg-green-500"
                : camera.status === "en envio"
                ? "bg-blue-500"
                : camera.status === "en uso"
                ? "bg-purple-500"
                : "bg-gray-500"
            }`}
          />
          <span className="text-white font-medium capitalize">{camera.status}</span>
        </div>

        {/* Location */}
        {camera.location && (
          <div className="flex items-start gap-2 text-sm mb-3">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-400">Ubicación</div>
              <div className="text-white">{camera.location}</div>
            </div>
          </div>
        )}

        {/* Assigned To */}
        {camera.assignedTo && (
          <div className="flex items-start gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-gray-400">Asignada a</div>
              <div className="text-white">{camera.assignedTo}</div>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-black/20 rounded-2xl border border-white/10 p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Estadísticas
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total eventos</span>
            <span className="text-white font-bold">{stats.totalEvents}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Envíos</span>
            <span className="text-blue-400 font-bold">{stats.shipments}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Torneos</span>
            <span className="text-purple-400 font-bold">{stats.tournaments}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Devoluciones</span>
            <span className="text-orange-400 font-bold">{stats.returns}</span>
          </div>
        </div>
      </div>

      {/* Last Event */}
      {stats.lastEvent && (
        <div className="bg-black/20 rounded-2xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Último Evento</h3>
          <div className="space-y-2">
            <p className="text-white text-sm font-medium line-clamp-2">
              {stats.lastEvent.title}
            </p>
            <p className="text-gray-400 text-xs">
              {formatDate(stats.lastEvent.date)}
            </p>
            <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
              {stats.lastEvent.type}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Volver a Cámaras
        </button>
      </div>
    </div>
  );
};

export default HistoryPanel;
