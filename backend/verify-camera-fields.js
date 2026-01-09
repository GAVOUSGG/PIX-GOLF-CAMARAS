import { sequelize, Camera } from './db.js';

const verifyCameraFields = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        const testId = 'TEST_CAM_' + Date.now();
        const testSerial = 'SN123456';
        const testSim = '1234567890';
        const testNotes = 'Test notes';

        // 1. Create a camera with the new fields
        await Camera.create({
            id: testId,
            model: 'Test Model',
            type: 'Solar',
            status: 'disponible',
            location: 'Almacén',
            serialNumber: testSerial,
            simNumber: testSim,
            notes: testNotes
        });

        // 2. Fetch it back
        const fetchedCamera = await Camera.findByPk(testId);

        // 3. Verify fields
        if (fetchedCamera.serialNumber === testSerial && fetchedCamera.simNumber === testSim && fetchedCamera.notes === testNotes) {
            console.log('SUCCESS: Serial number, SIM, and notes saved correctly.');
        } else {
            console.error('FAILED: Fields did not match.');
            console.log('Expected:', { serialNumber: testSerial, simNumber: testSim, notes: testNotes });
            console.log('Got:', { serialNumber: fetchedCamera.serialNumber, simNumber: fetchedCamera.simNumber, notes: fetchedCamera.notes });
        }

        // Cleanup
        await fetchedCamera.destroy();

    } catch (error) {
        console.error('Verification failed:', error);
    }
};

verifyCameraFields();
