import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { tournaments as mockTournaments, workers as mockWorkers, cameras as mockCameras, shipments as mockShipments, tasks as mockTasks } from '../data/mockData';

export const useAppState = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [tournamentsData, setTournamentsData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [camerasData, setCamerasData] = useState([]);
  const [shipmentsData, setShipmentsData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  // Función para generar ID consecutivo
  const generateConsecutiveId = () => {
    if (tournamentsData.length === 0) {
      return 1;
    }
    
    const maxId = Math.max(...tournamentsData.map(t => t.id));
    return maxId + 1;
  };

  // Función para verificar si la API está disponible
  const checkApiAvailability = async () => {
    try {
      console.log('🔍 Verificando disponibilidad de API...');
      const response = await fetch('http://127.0.0.1:3001/tournaments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const isAvailable = response.ok;
      console.log('🔍 API disponible:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.log('🔍 API no disponible:', error.message);
      return false;
    }
  };

  // NUEVA FUNCIÓN MEJORADA: Verificar necesidades de cámaras con más detalle
  const checkWorkerCameraNeeds = (workerId, tournamentId, holesCount, camerasData) => {
    const worker = workersData.find(w => w.id === parseInt(workerId));
    const camerasNeeded = holesCount * 2;
    
    if (!worker) return null;
    
    // Obtener cámaras actualmente asignadas al trabajador
    const assignedCameras = worker.camerasAssigned || [];
    
    // Verificar cámaras disponibles en el almacén
    const availableCameras = camerasData.filter(camera => 
      camera.status === 'disponible' && camera.location === 'Almacén'
    );
    
    if (assignedCameras.length === 0) {
      return {
        needsCameras: true,
        camerasNeeded: camerasNeeded,
        assignedCameras: [],
        availableCameras: availableCameras,
        reason: 'Trabajador sin cámaras asignadas',
        canFulfill: availableCameras.length >= camerasNeeded
      };
    }
    
    // Si tiene cámaras pero no suficientes
    if (assignedCameras.length < camerasNeeded) {
      const additionalNeeded = camerasNeeded - assignedCameras.length;
      return {
        needsCameras: true,
        camerasNeeded: additionalNeeded,
        assignedCameras: assignedCameras,
        availableCameras: availableCameras,
        reason: `Trabajador tiene ${assignedCameras.length} cámaras, necesita ${additionalNeeded} más`,
        canFulfill: availableCameras.length >= additionalNeeded
      };
    }
    
    return { 
      needsCameras: false,
      assignedCameras: assignedCameras,
      availableCameras: []
    };
  };

  // NUEVA FUNCIÓN MEJORADA: Crear tarea de envío con información de cámaras
  const createShipmentTask = (tournament, worker, cameraCheck) => {
    const taskId = Date.now();
    const dueDate = new Date(tournament.date);
    dueDate.setDate(dueDate.getDate() - 2);
    
    const newTask = {
      id: taskId,
      type: 'camera_shipment',
      title: `Envío de cámaras para ${tournament.name}`,
      description: `${worker.name} necesita ${cameraCheck.camerasNeeded} cámaras para ${tournament.name} en ${tournament.location}`,
      assignedTo: worker.name,
      workerId: worker.id,
      workerPhone: worker.phone,
      tournamentId: tournament.id,
      tournamentName: tournament.name,
      tournamentLocation: tournament.location,
      state: worker.state,
      camerasNeeded: cameraCheck.camerasNeeded,
      assignedCameras: cameraCheck.assignedCameras || [],
      availableCameras: cameraCheck.availableCameras || [],
      selectedCameras: [],
      priority: cameraCheck.canFulfill ? 'media' : 'alta',
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };
    
    setTasksData(prev => {
      const newData = [...prev, newTask];
      localStorage.setItem('pixgolf-tasks', JSON.stringify(newData));
      return newData;
    });
    
    console.log('📋 Nueva tarea de envío creada:', newTask);
    return newTask;
  };

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        const isApiAvailable = await checkApiAvailability();
        setApiAvailable(isApiAvailable);

        if (isApiAvailable) {
          console.log('✅ API disponible, cargando datos desde JSON Server...');
          const [tournaments, workers, cameras, shipments] = await Promise.all([
            apiService.getTournaments(),
            apiService.getWorkers(),
            apiService.getCameras(),
            apiService.getShipments()
          ]);

          setTournamentsData(tournaments);
          setWorkersData(workers);
          setCamerasData(cameras);
          setShipmentsData(shipments);

          localStorage.setItem('pixgolf-tournaments', JSON.stringify(tournaments));
          localStorage.setItem('pixgolf-workers', JSON.stringify(workers));
          localStorage.setItem('pixgolf-cameras', JSON.stringify(cameras));
        } else {
          throw new Error('API no disponible');
        }
      } catch (error) {
        console.warn('❌ No se pudo conectar con la API, usando datos locales:', error.message);
        
        const savedTournaments = localStorage.getItem('pixgolf-tournaments');
        const savedWorkers = localStorage.getItem('pixgolf-workers');
        const savedCameras = localStorage.getItem('pixgolf-cameras');
        const savedTasks = localStorage.getItem('pixgolf-tasks');

        if (savedTournaments && savedTournaments !== '[]' && savedTournaments !== 'null') {
          console.log('📁 Cargando datos desde localStorage...');
          setTournamentsData(JSON.parse(savedTournaments));
          setWorkersData(JSON.parse(savedWorkers || JSON.stringify(mockWorkers)));
          setCamerasData(JSON.parse(savedCameras || JSON.stringify(mockCameras)));
        } else {
          console.log('🔄 Usando datos mock iniciales...');
          setTournamentsData(mockTournaments);
          setWorkersData(mockWorkers);
          setCamerasData(mockCameras);
        }

        if (savedTasks && savedTasks !== '[]' && savedTasks !== 'null') {
          setTasksData(JSON.parse(savedTasks));
        } else {
          setTasksData(mockTasks);
        }

        setShipmentsData(mockShipments);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Torneos - Con IDs consecutivos y detección MEJORADA de cámaras
  const createTournament = (tournament) => {
    const newTournament = { ...tournament, id: Date.now() };
    setTournamentsData(prev => [newTournament, ...(prev || [])]);
  };

  const updateTournament = (id, patch) => {
    setTournamentsData(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
    if (selectedTournament && selectedTournament.id === id) {
      setSelectedTournament(prev => prev ? { ...prev, ...patch } : prev);
    }
  };

  const deleteTournament = (id) => {
    setTournamentsData(prev => prev.filter(t => t.id !== id));
    if (selectedTournament && selectedTournament.id === id) {
      setSelectedTournament(null);
    }
  };

  // Trabajadores
  const updateWorker = async (id, updates) => {
    setWorkersData(prev => {
      const newData = prev.map(w => w.id === id ? { ...w, ...updates } : w);
      localStorage.setItem('pixgolf-workers', JSON.stringify(newData));
      return newData;
    });

    if (apiAvailable) {
      try {
        await apiService.updateWorker(id, updates);
      } catch (apiError) {
        console.warn('Error actualizando trabajador en API:', apiError);
      }
    }
  };

  // Cámaras
  const updateCamera = async (id, updates) => {
    setCamerasData(prev => {
      const newData = prev.map(c => c.id === id ? { ...c, ...updates } : c);
      localStorage.setItem('pixgolf-cameras', JSON.stringify(newData));
      return newData;
    });

    if (apiAvailable) {
      try {
        await apiService.updateCamera(id, updates);
      } catch (apiError) {
        console.warn('Error actualizando cámara en API:', apiError);
      }
    }
  };

  // NUEVA FUNCIÓN: Completar tarea
  const completeTask = async (taskId) => {
    setTasksData(prev => {
      const newData = prev.map(task => 
        task.id === taskId ? { ...task, status: 'completada' } : task
      );
      localStorage.setItem('pixgolf-tasks', JSON.stringify(newData));
      return newData;
    });
  };

  // NUEVA FUNCIÓN: Crear envío desde tarea
  const createShipmentFromTask = async (task, selectedCameras) => {
    const newShipment = {
      id: `ENV-${Date.now()}`,
      cameras: selectedCameras,
      destination: `${task.tournamentLocation}, ${task.state}`,
      recipient: task.assignedTo,
      recipientPhone: task.workerPhone,
      sender: "Almacén Central",
      date: new Date().toISOString().split('T')[0],
      status: 'pendiente',
      trackingNumber: `TRK${Date.now()}`,
      tournamentId: task.tournamentId,
      tournamentName: task.tournamentName,
      taskId: task.id
    };

    setShipmentsData(prev => {
      const newData = [...prev, newShipment];
      localStorage.setItem('pixgolf-shipments', JSON.stringify(newData));
      return newData;
    });

    // Actualizar estado de cámaras a "en uso"
    selectedCameras.forEach(cameraId => {
      updateCamera(cameraId, { status: 'en uso', location: task.state });
    });

    // Completar la tarea
    completeTask(task.id);

    return newShipment;
  };

  return {
    // Estado
    activeTab,
    setActiveTab,
    selectedTournament,
    setSelectedTournament,
    tournamentsData,
    workersData,
    camerasData,
    shipmentsData,
    tasksData,
    loading,
    apiAvailable,
    
    // Acciones
    createTournament,
    updateTournament,
    deleteTournament,
    updateWorker,
    updateCamera,
    completeTask,
    createShipmentFromTask,
    
    // Setters
    setTournamentsData,
    setWorkersData,
    setCamerasData,
    setShipmentsData,
    setTasksData
  };
};