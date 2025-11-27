import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "./EventCard";

const Timeline = ({ events, onEventClick, zoomLevel }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="bg-black/20 rounded-2xl border border-white/10 p-8 lg:col-span-3">
        <div className="text-center text-gray-400">
          <p className="text-lg">No hay eventos en el historial de esta cámara</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 rounded-2xl border border-white/10 p-6">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Historial de Eventos</h2>
        <div className="text-sm text-gray-400">{events.length} eventos</div>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg transition-all"
            title="Scroll izquierda"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg transition-all"
            title="Scroll derecha"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Timeline */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4 px-2 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "left center" }}
              className="flex-shrink-0"
            >
              <EventCard event={event} onClick={() => onEventClick(event)} />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">{events.length}</div>
          <div className="text-xs text-gray-400">Total eventos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {events.filter((e) => e.type === "shipment").length}
          </div>
          <div className="text-xs text-gray-400">Envíos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {events.filter((e) => e.type === "tournament").length}
          </div>
          <div className="text-xs text-gray-400">Torneos</div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
