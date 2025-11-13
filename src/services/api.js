const API_BASE = 'http://127.0.0.1:3001';

// Función helper mejorada para manejar errores
const handleResponse = async (response) => {
  console.log('🌐 [API] Response status:', response.status, response.statusText);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  
  // Para respuestas DELETE que no tienen contenido
  if (response.status === 204) {
    return null;
  }
  
  return await response.json();
};

export const apiService = {
  // Torneos
  async getTournaments() {
    console.log('🔄 [API] GET /tournaments');
    const response = await fetch(`${API_BASE}/tournaments`);
    return await handleResponse(response);
  },

  async getTournament(id) {
    console.log(`🔄 [API] GET /tournaments/${id}`);
    const response = await fetch(`${API_BASE}/tournaments/${id}`);
    return await handleResponse(response);
  },

  async createTournament(tournament) {
    console.log('🌐 [API] POST /tournaments - Enviando:', tournament);
    
    try {
      const response = await fetch(`${API_BASE}/tournaments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournament),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [API] Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('🎉 [API] Torneo creado exitosamente:', result);
      return result;
    } catch (error) {
      console.error('💥 [API] Error en createTournament:', error);
      throw error;
    }
  },

  async updateTournament(id, tournament) {
    console.log(`✏️ [API] PUT /tournaments/${id}`, tournament);
    const response = await fetch(`${API_BASE}/tournaments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournament),
    });
    return await handleResponse(response);
  },

  async deleteTournament(id) {
    console.log(`🗑️ [API] DELETE /tournaments/${id}`);
    const response = await fetch(`${API_BASE}/tournaments/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  },

  // Trabajadores
  async getWorkers() {
    console.log('🔄 [API] GET /workers');
    const response = await fetch(`${API_BASE}/workers`);
    return await handleResponse(response);
  },

  async getWorker(id) {
    const response = await fetch(`${API_BASE}/workers/${id}`);
    return await handleResponse(response);
  },

  async createWorker(worker) {
    const response = await fetch(`${API_BASE}/workers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worker),
    });
    return await handleResponse(response);
  },

  async updateWorker(id, worker) {
    const response = await fetch(`${API_BASE}/workers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worker),
    });
    return await handleResponse(response);
  },

  // Cámaras
  async getCameras() {
    console.log('🔄 [API] GET /cameras');
    const response = await fetch(`${API_BASE}/cameras`);
    return await handleResponse(response);
  },

  async getCamera(id) {
    const response = await fetch(`${API_BASE}/cameras/${id}`);
    return await handleResponse(response);
  },

  async updateCamera(id, camera) {
    const response = await fetch(`${API_BASE}/cameras/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(camera),
    });
    return await handleResponse(response);
  },

  // Envíos
  async getShipments() {
    const response = await fetch(`${API_BASE}/shipments`);
    return await handleResponse(response);
  },

  async createShipment(shipment) {
    const response = await fetch(`${API_BASE}/shipments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipment),
    });
    return await handleResponse(response);
  },

  async updateShipment(id, shipment) {
    const response = await fetch(`${API_BASE}/shipments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipment),
    });
    return await handleResponse(response);
  }
};