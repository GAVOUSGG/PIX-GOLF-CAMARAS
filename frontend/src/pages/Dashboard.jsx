import React from "react";
import StatsGrid from "../components/Dashboard/StatsGrid";
import StatisticsSection from "../components/Dashboard/StatisticsSection";
import ActiveTournaments from "../components/Dashboard/ActiveTournaments";
import LogisticsSummary from "../components/Dashboard/LogisticsSummary";
import MexicoMap from "../components/Map/MexicoMap";
import TasksList from "../components/Tasks/TasksList";

const Dashboard = ({ tournamentsData, camerasData, workersData, shipmentsData }) => {
  return (
    <div className="space-y-8 pb-8">
      {/* 1. KPIs Principales - Visión General Inmediata */}
      <section>
        <StatsGrid
          tournaments={tournamentsData}
          cameras={camerasData}
          workers={workersData}
        />
      </section>

      {/* 2. Operación Activa y Logística - El "Ahora" */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActiveTournaments tournaments={tournamentsData} />
        </div>
        <div className="lg:col-span-1">
          <LogisticsSummary shipments={shipmentsData} />
        </div>
      </section>

      {/* 3. Mapa de Operaciones - Contexto Geográfico */}
      <section>
         <h3 className="text-xl font-semibold text-white mb-4 ml-1">Mapa de Cobertura</h3>
         <MexicoMap
          tournaments={tournamentsData}
          workers={workersData}
          cameras={camerasData}
          shipments={shipmentsData}
        />
      </section>

      {/* 4. Análisis Detallado - Datos Históricos y Distribución */}
      <section className="pt-4 border-t border-white/10">
        <StatisticsSection tournaments={tournamentsData} />
      </section>
    </div>
  );
};

export default Dashboard;
