import React from "react";
import { Package, MapPin, Trophy, Truck, AlertCircle } from "lucide-react";

const EventCard = ({ event, onClick }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "shipment":
        return <Truck className="w-5 h-5" />;
      case "tournament":
        return <Trophy className="w-5 h-5" />;
      case "return":
        return <MapPin className="w-5 h-5" />;
      case "maintenance":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "shipment":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      case "tournament":
        return "bg-purple-500/20 border-purple-500/30 text-purple-400";
      case "return":
        return "bg-orange-500/20 border-orange-500/30 text-orange-400";
      case "maintenance":
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
      default:
        return "bg-white/5 border-white/10 text-gray-400";
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
        w-72 p-4 rounded-xl border cursor-pointer
        transition-all hover:scale-105 hover:shadow-lg
        ${getTypeColor(event.type)}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{getTypeIcon(event.type)}</div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-white mb-1 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-xs opacity-75 mb-2">{formatDate(event.date)}</p>
          <div className="inline-block px-2 py-1 bg-white/10 rounded text-xs">
            {event.type}
          </div>
        </div>
      </div>
    </button>
  );
};

export default EventCard;
