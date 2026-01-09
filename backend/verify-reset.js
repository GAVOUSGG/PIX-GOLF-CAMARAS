import { sequelize, Camera, Worker, Tournament } from './db.js';

const verifyAssignments = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        const cameras = await Camera.findAll();
        const nonAlmacenCameras = cameras.filter(c => c.location !== 'Almacén' || c.assignedTo !== null || c.status !== 'disponible');

        if (nonAlmacenCameras.length > 0) {
            console.error('FAILED: Found cameras not in Almacén or with assignments:', nonAlmacenCameras.map(c => c.id));
        } else {
            console.log('SUCCESS: All cameras are in Almacén, status available, and unassigned.');
        }

        const workers = await Worker.findAll();
        const workersWithCameras = workers.filter(w => w.camerasAssigned && w.camerasAssigned.length > 0);
        
        if (workersWithCameras.length > 0) {
             console.error('FAILED: Found workers with assigned cameras:', workersWithCameras.map(w => w.name));
        } else {
            console.log('SUCCESS: No workers have cameras assigned.');
        }

        const tournaments = await Tournament.findAll();
        const tournamentsWithCameras = tournaments.filter(t => t.cameras && t.cameras.length > 0);

        if (tournamentsWithCameras.length > 0) {
            console.error('FAILED: Found tournaments with assigned cameras:', tournamentsWithCameras.map(t => t.name));
        } else {
            console.log('SUCCESS: No tournaments have cameras assigned.');
        }

    } catch (error) {
        console.error('Verification failed:', error);
    }
};

verifyAssignments();
