import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import { apiService } from "../../../services/api";
import Timeline from "./Timeline";
import EventModal from "./EventModal";
import HistoryPanel from "./HistoryPanel";

const CameraInspector = ({ cameraId, onBack }) => {
  const [camera, setCamera] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [cameraRes, historyRes] = await Promise.all([
          apiService.getCamera(cameraId),
          apiService.getCameraHistoryById(cameraId),
        ]);

        setCamera(cameraRes);
        setHistory(historyRes.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error("Error loading camera inspector data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [cameraId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-white text-xl">Cargando Inspector de Cámara...</div>
      </div>
    );
  }

  if (!camera) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 gap-4">
        <div className="text-white text-xl">Cámara no encontrada</div>
        <button
          onClick={onBack}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          Volver a Cámaras
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-white/10"
            title="Volver"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{camera.id}</h1>
            <p className="text-gray-400 text-sm">{camera.model}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-gray-400 text-sm">Zoom:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-gray-400 text-sm w-10">{(zoomLevel * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline Section */}
        <div className="lg:col-span-3">
          <Timeline
            events={history}
            onEventClick={setSelectedEvent}
            zoomLevel={zoomLevel}
          />
        </div>

        {/* Right Panel */}
        <div>
          <HistoryPanel camera={camera} history={history} onBack={onBack} />
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default CameraInspector;
