import { sequelize, Camera } from './db.js';

const verifyCsvUpdate = async () => {
    try {
        await sequelize.authenticate();
        
        // Sample check 1: CS1
        const c1 = await Camera.findByPk('1');
        if (c1 && c1.serialNumber === 'K17243721' && c1.simNumber === '3320434329' && c1.location === 'LOS CABOS' && c1.assignedTo === 'FERNANDO JIMENEZ') {
            console.log('SUCCESS: Camera 1 data matches.');
        } else {
            console.error('FAILED: Camera 1 data mismatch.', c1 ? c1.toJSON() : 'Not found');
        }

        // Sample check 2: CS3 (with notes)
        const c3 = await Camera.findByPk('3');
        if (c3 && c3.notes === 'Si jala el panel ') {
             console.log('SUCCESS: Camera 3 notes match.');
        } else {
             console.error('FAILED: Camera 3 notes mismatch.', c3 ? c3.toJSON() : 'Not found');
        }

        // Sample check 3: CS88 (last one)
        const c88 = await Camera.findByPk('88');
        if (c88 && c88.simNumber === '3317952979') {
             console.log('SUCCESS: Camera 88 data matches.');
        } else {
             console.error('FAILED: Camera 88 data mismatch.', c88 ? c88.toJSON() : 'Not found');
        }

    } catch (error) {
        console.error('Verification failed:', error);
    }
};

verifyCsvUpdate();
