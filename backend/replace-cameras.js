import { sequelize, Camera } from './db.js';

const newCamerasData = [
  { id: '1', serialNumber: 'K17243721', simNumber: '3320434329', notes: 'Falta una Antena' },
  { id: '2', serialNumber: 'K17243610', simNumber: '3325891037', notes: 'Falta una Antena' },
  { id: '3', serialNumber: 'K17243734', simNumber: '3314636128', notes: '' },
  { id: '4', serialNumber: 'AD7241982', simNumber: '3329409209', notes: 'Boton por afuera' },
  { id: '5', serialNumber: 'AD4734323', simNumber: '3329385394', notes: '' },
  { id: '6', serialNumber: 'AD7241949', simNumber: '3332441261', notes: '' },
  { id: '7', serialNumber: 'AD4734301', simNumber: '3338468081', notes: '' },
  { id: '8', serialNumber: 'AD7241992', simNumber: '6693291985', notes: 'En Reparacion' },
  { id: '9', serialNumber: 'AD7242018', simNumber: '3332272982', notes: 'No Carga el Panel' },
  { id: '10', serialNumber: 'AD4734260', simNumber: '3317382545', notes: 'No carga el panel' },
  { id: '11', serialNumber: 'AK6518044', simNumber: '3312507830', notes: '' },
  { id: '12', serialNumber: 'AK6518058', simNumber: '3312484340', notes: 'No Carga el Panel' },
  { id: '13', serialNumber: 'AK1827569', simNumber: '3329570450', notes: 'Base esta rota' },
  { id: '14', serialNumber: 'AK1827577', simNumber: '3329570180', notes: 'No Carga el Panel' },
  { id: '15', serialNumber: 'FG8023064', simNumber: '3328115848', notes: '' },
  { id: '16', serialNumber: 'FG8023054', simNumber: '3328114492', notes: '' },
  { id: '17', serialNumber: 'FG8023108', simNumber: '3318827907', notes: 'Alertas' },
  { id: '18', serialNumber: 'FG8023044', simNumber: '3329146066', notes: '' },
  { id: '19', serialNumber: 'FG8023159', simNumber: '3327859041', notes: 'No tiene boton' },
  { id: '20', serialNumber: 'FG8023130', simNumber: '3329611620', notes: '' },
  { id: '21', serialNumber: 'FG8023118', simNumber: '3329611418', notes: '' },
  { id: '22', serialNumber: 'FG8023123', simNumber: '3329611228', notes: '' },
  { id: '23', serialNumber: 'FH3018694', simNumber: '3329567485', notes: 'No tiene antena' },
  { id: '24', serialNumber: 'FH3018682', simNumber: '3329611613', notes: 'no carga el panel' },
  { id: '25', serialNumber: 'FH3327164', simNumber: '3310811303', notes: '' },
  { id: '26', serialNumber: 'FG9011104', simNumber: '3310393124', notes: '' },
  { id: '27', serialNumber: 'FG9011155', simNumber: '3310393495', notes: '' },
  { id: '28', serialNumber: 'FG9011163', simNumber: '3310393266', notes: '' },
  { id: '29', serialNumber: 'FH3327012', simNumber: '3310393183', notes: 'No Tienen Boton' },
  { id: '30', serialNumber: 'FG9011184', simNumber: '3310892945', notes: 'No Tienen Boton' },
  { id: '31', serialNumber: 'FG9011166', simNumber: '3328295405', notes: '' },
  { id: '32', serialNumber: 'FG9011003', simNumber: '3328276019', notes: '' },
  { id: '33', serialNumber: 'FK0615707', simNumber: '3346435788', notes: '' },
  { id: '34', serialNumber: 'FK0615708', simNumber: '3330219345', notes: 'No prende en azul' },
  { id: '35', serialNumber: 'FK0615684', simNumber: '3351246571', notes: '' },
  { id: '36', serialNumber: 'FK0615778', simNumber: '8131011303', notes: 'No carga el panel' },
  { id: '37', serialNumber: 'FK0615774', simNumber: '3351246570', notes: '' },
  { id: '38', serialNumber: 'FH4545559', simNumber: '3310893415', notes: '' },
  { id: '39', serialNumber: 'FX2580433', simNumber: '3318219320', notes: '' },
  { id: '40', serialNumber: 'FX2580403', simNumber: '3328135932', notes: '' },
  { id: '41', serialNumber: 'FX2580310', simNumber: '3322424430', notes: '' },
  { id: '42', serialNumber: 'FX2580289', simNumber: '3311721323', notes: '' },
  { id: '43', serialNumber: 'FH3327039', simNumber: '3333929785', notes: 'Antena rota' },
  { id: '44', serialNumber: 'FH3327092', simNumber: '3333929179', notes: '' },
  { id: '45', serialNumber: 'FX2580380', simNumber: '3332207835', notes: '' },
  { id: '46', serialNumber: 'FX2580432', simNumber: '3332207407', notes: '' },
  { id: '47', serialNumber: 'GB0512586', simNumber: '3315463971', notes: '' },
  { id: '48', serialNumber: 'GB0512574', simNumber: '3315454913', notes: '' },
  { id: '49', serialNumber: 'GB0512575', simNumber: '3317229214', notes: '' },
  { id: '50', serialNumber: 'GB0512591', simNumber: '3334834120', notes: '' },
  { id: '51', serialNumber: 'GB9249289', simNumber: '3334834170', notes: '' },
  { id: '52', serialNumber: 'GB9249275', simNumber: '3315454456', notes: '' },
  { id: '53', serialNumber: 'GB9249417', simNumber: '3314149171', notes: '' },
  { id: '54', serialNumber: 'GB9249388', simNumber: '3330179807', notes: '' },
  { id: '55', serialNumber: 'GB9249276', simNumber: '3330186917', notes: '' },
  { id: '56', serialNumber: 'GB9249300', simNumber: '3314123749', notes: '' },
  { id: '57', serialNumber: 'GB9249398', simNumber: '3317134771', notes: '' },
  { id: '58', serialNumber: 'GB9249301', simNumber: '3329569120', notes: '' },
  { id: '59', serialNumber: 'GB9249274', simNumber: '3314089952', notes: '' },
  { id: '60', serialNumber: 'GB9249306', simNumber: '3329639701', notes: '' },
  { id: '61', serialNumber: 'GB9249378', simNumber: '3330166141', notes: '' },
  { id: '62', serialNumber: 'GB9249405', simNumber: '3332510841', notes: '' },
  { id: '63', serialNumber: 'GB9249358', simNumber: '3330096245', notes: '' },
  { id: '64', serialNumber: 'GB9249291', simNumber: '3330167282', notes: '' },
  { id: '65', serialNumber: 'GB9249411', simNumber: '3231060245', notes: '' },
  { id: '66', serialNumber: 'GB9249320', simNumber: '3231060240', notes: '' },
  { id: '67', serialNumber: 'GD3941132', simNumber: '3321851746', notes: '' },
  { id: '68', serialNumber: 'GD3941098', simNumber: '3321817812', notes: '' },
  { id: '69', serialNumber: 'GD3941160', simNumber: '3321879242', notes: '' },
  { id: '70', serialNumber: 'GD3941089', simNumber: '3334412242', notes: '' },
  { id: '71', serialNumber: 'GD3941157', simNumber: '3334412587', notes: '' },
  { id: '72', serialNumber: 'GD3941136', simNumber: '3334412403', notes: '' },
  { id: '73', serialNumber: 'GD3941167', simNumber: '3338294563', notes: '' },
  { id: '74', serialNumber: 'GD3941138', simNumber: '3338283274', notes: '' },
  { id: '75', serialNumber: 'GD3941113', simNumber: '3321819477', notes: '' },
  { id: '76', serialNumber: 'GD3941086', simNumber: '3338294472', notes: '' },
  { id: '77', serialNumber: 'GD3941093', simNumber: '3338281910', notes: '' },
  { id: '78', serialNumber: 'GD3941096', simNumber: '3338294544', notes: '' },
  { id: '79', serialNumber: 'GD3941097', simNumber: '3334407026', notes: '' },
  { id: '80', serialNumber: 'GD3941105', simNumber: '3338294514', notes: '' },
  { id: '81', serialNumber: 'GD3941163', simNumber: '3320320523', notes: '' },
  { id: '82', serialNumber: 'GD3941164', simNumber: '3328378771', notes: '' },
  { id: '83', serialNumber: 'GD3941146', simNumber: '3320318092', notes: '' },
  { id: '84', serialNumber: 'GD3941082', simNumber: '3320318267', notes: '' },
  { id: '85', serialNumber: 'GD3941128', simNumber: '3338282645', notes: '' },
  { id: '86', serialNumber: 'GD3941133', simNumber: '3338294588', notes: '' },
  { id: '87', serialNumber: 'GD3941152', simNumber: '3317987201', notes: '' },
  { id: '88', serialNumber: 'GD3941138', simNumber: '3317952979', notes: '' },
];

const replaceCameras = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Delete all existing cameras
    await Camera.destroy({ where: {}, truncate: true });
    console.log('All existing cameras deleted.');

    // Insert new cameras
    const camerasToInsert = newCamerasData.map(c => ({
      ...c,
      model: '4G Solar', // Default model
      type: 'Solar',
      status: 'disponible', // Default status
      location: 'Almacén', // Default location
      assignedTo: null
    }));

    await Camera.bulkCreate(camerasToInsert);
    console.log(`Successfully inserted ${camerasToInsert.length} new cameras.`);

  } catch (error) {
    console.error('Unable to replace cameras:', error);
  }
};

replaceCameras();
