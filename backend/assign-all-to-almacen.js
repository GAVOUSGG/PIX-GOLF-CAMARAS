import { sequelize, Camera, Worker, Tournament } from './db.js';

const assignAllToAlmacen = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // 1. Update all cameras
    const cameraUpdateResult = await Camera.update({
      location: 'Almacén',
      assignedTo: null,
      status: 'disponible'
    }, {
      where: {} // Apply to all
    });
    console.log(`Updated ${cameraUpdateResult[0]} cameras to Almacén/disponible and unassigned them.`);

    // 2. Clear assignments from Workers
    // Since camerasAssigned is a JSON column, we update it to an empty array
    const workerUpdateResult = await Worker.update({
      camerasAssigned: []
    }, {
      where: {} // Apply to all
    });
    console.log(`Cleared camera assignments for ${workerUpdateResult[0]} workers.`);

    // 3. Clear assignments from Tournaments
    // Since cameras is a JSON column, we update it to an empty array
    const tournamentUpdateResult = await Tournament.update({
      cameras: []
    }, {
      where: {} // Apply to all
    });
    console.log(`Cleared camera assignments for ${tournamentUpdateResult[0]} tournaments.`);

  } catch (error) {
    console.error('Unable to reset assignments:', error);
  }
};

assignAllToAlmacen();
