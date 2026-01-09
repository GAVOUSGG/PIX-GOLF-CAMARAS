import { sequelize } from './db.js';

const addColumns = async () => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const tableInfo = await queryInterface.describeTable('Cameras');

    if (!tableInfo.serialNumber) {
        await queryInterface.addColumn('Cameras', 'serialNumber', {
            type: 'VARCHAR(255)',
            allowNull: true
        });
        console.log('Added serialNumber column');
    }

    if (!tableInfo.simNumber) {
        await queryInterface.addColumn('Cameras', 'simNumber', {
            type: 'VARCHAR(255)',
            allowNull: true
        });
        console.log('Added simNumber column');
    }

    if (!tableInfo.notes) {
        await queryInterface.addColumn('Cameras', 'notes', {
            type: 'VARCHAR(255)',
            allowNull: true
        });
        console.log('Added notes column');
    }

    console.log('Migration completed successfully');

  } catch (error) {
    console.error('Migration failed:', error);
  }
};

addColumns();
