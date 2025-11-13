import { useState, useEffect } from 'react';

export const useTournamentForm = (workers, cameras) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    location: '',
    field: '',
    holes: [],
    days: 1,
    startDate: '',
    endDate: '',
    status: 'pendiente',
    workerId: '',
    selectedHoles: []
  });

  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [requiredCameras, setRequiredCameras] = useState(0);

  // Filtrar trabajadores por estado seleccionado
  useEffect(() => {
    if (formData.state) {
      const workersInState = workers.filter(worker => 
        worker.state === formData.state && worker.status === 'disponible'
      );
      setAvailableWorkers(workersInState);
      setFormData(prev => ({ ...prev, workerId: '' }));
    } else {
      setAvailableWorkers([]);
    }
  }, [formData.state, workers]);

  // Calcular cámaras requeridas y disponibles
  useEffect(() => {
    const camerasNeeded = formData.selectedHoles.length * 2;
    setRequiredCameras(camerasNeeded);

    const available = cameras.filter(camera => 
      camera.status === 'disponible' && camera.location === 'Almacén'
    ).slice(0, camerasNeeded);
    
    setAvailableCameras(available);
  }, [formData.selectedHoles, cameras]);

  // Generar fechas basadas en días
  useEffect(() => {
    if (formData.startDate && formData.days > 0) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + formData.days - 1);
      
      setFormData(prev => ({
        ...prev,
        endDate: end.toISOString().split('T')[0]
      }));
    }
  }, [formData.startDate, formData.days]);

  // Actualizar estado automáticamente basado en fecha
  useEffect(() => {
    if (formData.startDate) {
      const today = new Date();
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      let newStatus = 'pendiente';
      if (today >= startDate && today <= endDate) {
        newStatus = 'activo';
      } else if (today > endDate) {
        newStatus = 'terminado';
      }
      
      setFormData(prev => ({ ...prev, status: newStatus }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoleSelection = (holeNumber) => {
    setFormData(prev => {
      const isSelected = prev.selectedHoles.includes(holeNumber);
      const selectedHoles = isSelected
        ? prev.selectedHoles.filter(h => h !== holeNumber)
        : [...prev.selectedHoles, holeNumber].sort((a, b) => a - b);
      
      return { ...prev, selectedHoles };
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      state: '',
      location: '',
      field: '',
      holes: [],
      days: 1,
      startDate: '',
      endDate: '',
      status: 'pendiente',
      workerId: '',
      selectedHoles: []
    });
  };

  return {
    formData,
    availableWorkers,
    availableCameras,
    requiredCameras,
    handleInputChange,
    handleHoleSelection,
    resetForm
  };
};