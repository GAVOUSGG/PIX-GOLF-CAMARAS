import { sequelize, Camera } from './db.js';

const csvData = [
  { serial: 'K17243721', sim: '3320434329', id: 'CS1', location: 'LOS CABOS', person: 'FERNANDO JIMENEZ', notes: '' },
  { serial: 'K17243610', sim: '3325891037', id: 'CS2', location: '', person: '', notes: '' },
  { serial: 'K17243734', sim: '3314636128', id: 'CS3', location: 'IRAPUATO', person: 'ERNESTO TREJO', notes: 'Si jala el panel ' },
  { serial: 'AD7241982', sim: '3329409209', id: 'CS4', location: '', person: '', notes: 'boton de encendido por afuera' },
  { serial: 'AD4734323', sim: '3329385394', id: 'CS5', location: 'LOS CABOS', person: 'FERNANDO', notes: '' },
  { serial: 'AD7241949', sim: '3332441261', id: 'CS6 ', location: '', person: '', notes: '' },
  { serial: 'AD4734301', sim: '3338468081', id: 'CS7', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'AD7241992', sim: '6693291985', id: 'CS8', location: 'CASA', person: 'MANTENIMIENTO', notes: 'LA 8 EN REPARACION' },
  { serial: 'AD7242018', sim: '3332272982', id: 'CS9', location: 'TIJUANA', person: 'FABIAN', notes: 'no carga el panel' },
  { serial: 'AD4734260', sim: '3317382545', id: 'CS10', location: '', person: '', notes: 'no carga el panel' },
  { serial: 'AK6518044', sim: '3312507830', id: 'CS11', location: 'CANCUN', person: 'ARTURO ALVARADO', notes: 'entra estando en rojo' },
  { serial: 'AK6518058', sim: '3312484340', id: 'CS12', location: '', person: '', notes: 'no funciona el panel' },
  { serial: 'AK1827569', sim: '3329570450', id: 'CS13', location: 'TIJUANA', person: 'FABIAN', notes: 'sin una antena' },
  { serial: 'AK1827577', sim: '3329570180', id: 'CS14', location: '', person: '', notes: 'no carga el panel' },
  { serial: 'FG8023064', sim: '3328115848', id: 'CS15', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'FG8023054', sim: '3328114492', id: 'CS16', location: '', person: '', notes: 'NO SUBE PARA ALTURA' },
  { serial: 'FG8023108', sim: '3318827907', id: 'CS17', location: 'CDMX', person: 'GABY GRANADOS', notes: '' },
  { serial: 'FG8023044', sim: '3329146066', id: 'CS18', location: '', person: '', notes: '' },
  { serial: 'FG8023159', sim: '3327859041', id: 'CS19', location: 'GDL', person: 'MANTENIMIENTO', notes: 'sin boton de encendido' },
  { serial: 'FG8023130', sim: '3329611620', id: 'CS20', location: 'GDL', person: 'CASA', notes: 'sin una antena' },
  { serial: 'FG8023118', sim: '3329611418', id: 'CS21', location: 'Cancun', person: 'Arturo Alvarado', notes: 'antenas rotas ' },
  { serial: 'FG8023123', sim: '3329611228', id: 'CS22', location: '', person: '', notes: 'antenas rotas' },
  { serial: 'FH3018694', sim: '9811267093', id: 'CS23', location: 'GDL', person: 'CASA', notes: 'sin antenas, se prende estando en rojo' },
  { serial: 'FH3018692', sim: '3329611613', id: 'CS24', location: '', person: '', notes: 'no carga el panel' },
  { serial: 'FH3327164', sim: '3310811303', id: 'CS25', location: 'LOS MOCHIS', person: 'CESAR BELTRAN', notes: 'se mandaron a gdl' },
  { serial: 'FG9011104', sim: '3310393124', id: 'CS26', location: '', person: '', notes: '5445200016' },
  { serial: 'FG9011155', sim: '3310393495', id: 'CS27', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'FG9011163', sim: '3310393266', id: 'CS28', location: '', person: '', notes: '' },
  { serial: 'FH3327012', sim: '3310393183', id: 'CS29', location: 'GDL', person: 'CASA', notes: 'no tiene boton de encendido' },
  { serial: 'FG9011184', sim: '3310892945', id: 'CS30', location: '', person: '', notes: 'No tiene botón de encendido ' },
  { serial: 'FG9011166', sim: '3328295405', id: 'CS31', location: 'CANCUN', person: 'ARTURO ALVARADO', notes: '' },
  { serial: 'FG9011003', sim: '3328276019', id: 'CS32', location: '', person: '', notes: '' },
  { serial: 'FK0615707', sim: '3346435788', id: 'CS33', location: 'GDL', person: 'CASA', notes: 'SI JALAN LOS PANELES' },
  { serial: 'FK0615708', sim: '3330219345', id: 'CS34', location: '', person: '', notes: 'no prende en azul pero si graba' },
  { serial: 'FK0615684', sim: '3351246571', id: 'CS35', location: 'GDL', person: 'CASA', notes: 'no carga el panel / no tiene tapa' },
  { serial: 'FK0615778', sim: '3316471855', id: 'CS36', location: '', person: '', notes: 'no carga el panel' },
  { serial: 'FK0615774', sim: '3351246570', id: 'CS37', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'FH4545559', sim: '3310893415', id: 'CS38', location: '', person: '', notes: '' },
  { serial: 'FX2580433', sim: '3318219320', id: 'CS39', location: 'PUEBLA', person: 'URIEL', notes: '' },
  { serial: 'FX2580403', sim: '3328135932', id: 'CS40', location: '', person: '', notes: '' },
  { serial: 'FX2580310', sim: '3322424430', id: 'CS41', location: 'GDL', person: 'CASA', notes: 'TIENE EL FIMEWARE VIEJO' },
  { serial: 'FX2580287', sim: '3311721323', id: 'CS42', location: '', person: '', notes: 'TIENE EL FIMEWARE VIEJO' },
  { serial: 'FH3327039', sim: '3333929785', id: 'CS43', location: 'ZACATECAS', person: 'ERNESTO TREJO', notes: 'Antena rota ' },
  { serial: 'FH3327092', sim: '3333929179', id: 'CS44', location: '', person: '', notes: '' },
  { serial: 'FX2580380', sim: '3332207835', id: 'CS45', location: 'ACAPULCO', person: 'CHRISTOPHER', notes: '' },
  { serial: 'FX2580432', sim: '3332207407', id: 'CS46', location: '', person: '', notes: 'ENTRO ESTANDO EN ROJO' },
  { serial: 'GB0512586', sim: '3315463971', id: 'CS47', location: 'CDMX', person: 'LARISSA', notes: '' },
  { serial: 'GB0512574', sim: '3315454913', id: 'CS48', location: '', person: '', notes: '' },
  { serial: 'GB0512575', sim: '3317229214', id: 'CS49', location: 'CDMX', person: 'ALANNA GRANADOS', notes: '' },
  { serial: 'GB0512591', sim: '3334834120', id: 'CS50', location: '', person: '', notes: '' },
  { serial: 'GB9249289', sim: '3334834170', id: 'CS51', location: 'LOS MOCHIS', person: 'CESAR BELTRAN', notes: 'se mandaron a gdl' },
  { serial: 'GB9249275', sim: '3315454456', id: 'CS52', location: '', person: '', notes: '5445200016' },
  { serial: 'GB9249417', sim: '3314149171', id: 'CS53', location: 'CANCUN', person: 'ARTURO ALVARADO', notes: '' },
  { serial: 'GB9249388', sim: '3330179807', id: 'CS54', location: '', person: '', notes: '' },
  { serial: 'GB9249276', sim: '3330186917', id: 'CS55', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'GB9249300', sim: '3314123749', id: 'CS56', location: '', person: '', notes: '' },
  { serial: 'GB9249398', sim: '3317134771', id: 'CS57', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'GB9249369', sim: '3329569120', id: 'CS58', location: '', person: '', notes: '' },
  { serial: 'GB9249274', sim: '3314089952', id: 'CS59', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'GB9249306', sim: '3329639701', id: 'CS60', location: '', person: '', notes: '' },
  { serial: 'GB9249378', sim: '3330166141', id: 'CS61', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'GB9249405', sim: '3332510841', id: 'CS62', location: '', person: '', notes: '' },
  { serial: 'GB9249358', sim: '3330096245', id: 'CS63', location: 'GDL', person: 'CASA', notes: 'TRIPIE GROUND UN PEQUEÑO GOLPE' },
  { serial: 'GB9249291', sim: '3330167282', id: 'CS64', location: '', person: '', notes: '' },
  { serial: 'GB9249411', sim: '3231030245', id: 'CS65', location: 'GDL', person: 'CASA', notes: '' },
  { serial: 'GB9249320', sim: '3231060240', id: 'CS66', location: '', person: '', notes: '' },
  { serial: '', sim: '3321851746', id: 'CS67', location: 'PUEBLA', person: 'URIEL', notes: '' },
  { serial: '', sim: '3321817812', id: 'CS68', location: '', person: '', notes: '' },
  { serial: '', sim: '3321879242', id: 'CS69', location: 'MORELIA', person: 'JAIME HUERTA', notes: '' },
  { serial: '', sim: '3334412242', id: 'CS70', location: '', person: '', notes: '' },
  { serial: '', sim: '3334412587', id: 'CS71', location: 'MONTERREY', person: 'JUAN PABLO BUY', notes: '' },
  { serial: '', sim: '3334412403', id: 'CS72', location: '', person: '', notes: '' },
  { serial: '', sim: '3338294563', id: 'CS73', location: 'GDL', person: 'CASA', notes: '' },
  { serial: '', sim: '3338283274', id: 'CS74', location: '', person: '', notes: '' },
  { serial: '', sim: '3321819477', id: 'CS75', location: 'GDL', person: 'CASA', notes: '' },
  { serial: '', sim: '3338294472', id: 'CS76', location: '', person: '', notes: '' },
  { serial: '', sim: '3338281910', id: 'CS77', location: 'GDL', person: 'CASA', notes: '' },
  { serial: '', sim: '3338294544', id: 'CS78', location: '', person: '', notes: '' },
  { serial: '', sim: '3334407026', id: 'CS79', location: '', person: 'MIGUEL OSO', notes: '' },
  { serial: '', sim: '3338294514', id: 'CS80', location: '', person: '', notes: '' },
  { serial: '', sim: '3320320523', id: 'CS81', location: 'PUERTO VALLARTA', person: 'JANETH', notes: '' },
  { serial: '', sim: '3328378771', id: 'CS82', location: '', person: '', notes: '' },
  { serial: '', sim: '3320318092', id: 'CS83', location: 'PUERTO VALLARTA', person: 'JANETH', notes: '' },
  { serial: '', sim: '3320318267', id: 'CS84', location: '', person: '', notes: '' },
  { serial: '', sim: '3338282645', id: 'CS85', location: 'GDL', person: 'CASA', notes: '' },
  { serial: '', sim: '3338294588', id: 'CS86', location: '', person: '', notes: '' },
  { serial: '', sim: '3317987201', id: 'CS87', location: 'GDL', person: 'EL CIELO', notes: '' },
  { serial: '', sim: '3317952979', id: 'CS88', location: '', person: '', notes: '' },
];

const updateCameras = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        let updatedCount = 0;

        for (const row of csvData) {
            // Extract numeric ID
            const id = row.id.replace('CS', '').trim();
            
            if (!id) continue;

            // Prepare update object
            const updateData = {};
            if (row.serial) updateData.serialNumber = row.serial;
            if (row.sim) updateData.simNumber = row.sim;
            if (row.notes) updateData.notes = row.notes;
            if (row.location) updateData.location = row.location;
            if (row.person) updateData.assignedTo = row.person;

            // Simple status logic: if assignedTo or location is set, assume active/assigned, otherwise maybe disponible?
            // Actually, best to just update what is provided. The user explicitly gave this list.
            
            // Check if record exists
            const camera = await Camera.findByPk(id);

            if (camera) {
                await camera.update(updateData);
                updatedCount++;
            } else {
                // Create new if not exists
                await Camera.create({
                    id,
                    model: '4G Solar', // Default
                    type: 'Solar',     // Default
                    status: 'disponible', // Default, logic might change
                    ...updateData
                });
                updatedCount++;
            }
        }
        console.log(`Successfully processed ${updatedCount} cameras.`);

    } catch (error) {
        console.error('Update failed:', error);
    }
};

updateCameras();
