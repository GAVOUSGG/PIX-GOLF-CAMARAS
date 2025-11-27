import React from "react";
import {
  Package,
  MapPin,
  Trophy,
  Truck,
  Settings,
  ArrowRight,
} from "lucide-react";

const EventCard = ({ event, onClick }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "shipment":
        return <Truck className="w-4 h-4" />;
      case "tournament":
        return <Trophy className="w-4 h-4" />;
      case "return":
        return <MapPin className="w-4 h-4" />;
      case "maintenance":
        return <Settings className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "shipment":
        return "bg-blue-500/20 border-blue-500/30 hover:border-blue-400/50";
      case "tournament":
        return "bg-purple-500/20 border-purple-500/30 hover:border-purple-400/50";
      case "return":
        return "bg-orange-500/20 border-orange-500/30 hover:border-orange-400/50";
      case "maintenance":
        return "bg-gray-500/20 border-gray-500/30 hover:border-gray-400/50";
      default:
        return "bg-white/5 border-white/10 hover:border-white/20";
    }
  };

  const getTypeTextColor = (type) => {
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
        return "text-gray-400";
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-72 p-4 rounded-xl border text-left
        transition-all duration-300 hover:scale-105 hover:shadow-xl
        backdrop-blur-sm group
        ${getTypeColor(event.type)}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg bg-white/5 ${getTypeTextColor(
              event.type
            )}`}
          >
            {getTypeIcon(event.type)}
          </div>
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${getTypeTextColor(
              event.type
            )}`}
          >
            {event.type}
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      </div>

      <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-emerald-50 transition-colors">
        {event.title}
      </h3>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          {formatDate(event.date)}
        </p>
        <div className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded group-hover:bg-white/20 transition-colors">
          Ver detalles
        </div>
      </div>
    </button>
  );
};

export default EventCard;
