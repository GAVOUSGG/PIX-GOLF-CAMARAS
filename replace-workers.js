import { sequelize, Worker } from './server/db.js';

const newWorkersData = [
  { id: '1', name: 'LARISSA GRANADOS', state: 'CDMX', email: 'larissagm@gmail.com', phone: '5567031343' },
  { id: '2', name: 'GABRIELA GRANADOS', state: 'CDMX', email: 'chibiga.gm@gmail.com', phone: '5539629788' },
  { id: '3', name: 'ARTURO ALVARADO', state: 'Quintana Roo', email: 'arturoalvaradomorales@gamil.com', phone: '9982605176' },
  { id: '4', name: 'ERNESTO TREJO', state: 'Guanajuato', email: 'ernesto_trejo@hotmail.com', phone: '5529557740' },
  { id: '5', name: 'MIGUEL ANGEL SERRANO', state: 'Estado de México', email: 'Miguelangelserranojimenez@gmail.com', phone: '7224570148' },
  { id: '6', name: 'MIGUEL ANGEL SERRANO PAPA', state: 'Estado de México', email: '', phone: '7225681047' },
  { id: '7', name: 'JUAN PABLO BUY', state: 'Nuevo Leon', email: 'Pablobuy_92@hotmail.com', phone: '8183621364' },
  { id: '8', name: 'ALEJANDRO TORRES', state: 'Nuevo Leon', email: 'alejandrootorr.torr@hotmail.com', phone: '8123872444' },
  { id: '9', name: 'MARIO ROMERO', state: 'Coahuila', email: 'mrprogolf@yahoo.com', phone: '8711568924' },
  { id: '10', name: 'RICARDO HERNANDEZ', state: 'Quintana Roo', email: '', phone: '' },
  { id: '11', name: 'DAVID JAVIER MORALES', state: 'Tabasco', email: 'dm753176@gmail.com', phone: '9931117115' },
  { id: '12', name: 'CHRISTOPHER GAYTAN SANCHEZ', state: 'Aguascalientes', email: 'christopherantoniogaytanherrer@gmail.com', phone: '4493647135' },
  { id: '13', name: 'JORGE ROSALES', state: 'Aguascalientes', email: 'Jororu10@hotmail.com', phone: '4491686803' },
  { id: '14', name: 'JORGE ARMANDO RAMIREZ ROMERO', state: 'Chihuahua', email: 'jorgerramirez@yahoo.com', phone: '6141966717' },
  { id: '15', name: 'Janeth Elizabeth Gutiérrez Aguilar', state: 'Jalisco', email: 'janeth_estudios@outlook.com', phone: '3221902625' },
  { id: '16', name: 'FERNANDO JIMENEZ APOLINAR', state: 'Baja California Sur', email: 'Fernando_univer@hotmail.com', phone: '6241210576' },
  { id: '17', name: 'RICARDO WILLY', state: 'Baja California Sur', email: '', phone: '6121614111' },
  { id: '18', name: 'JOSE ANTONIO ROJAS', state: 'Colima', email: '.rojas.roca76@gmail.com', phone: '3121267892' },
  { id: '19', name: 'DAVID HERNANDEZ LEDWARD', state: 'Quintana Roo', email: 'davidhdez.contacto@gmail.com', phone: '4613245997' },
  { id: '20', name: 'YESHUA SALVADOR MELENDEZ RAMOS', state: 'Jalisco', email: 'yeshuamelendez8@gmail.com', phone: '3325640518' },
  { id: '21', name: 'GABIEL CAMBEROS', state: 'Jalisco', email: '', phone: '3321712415' },
  { id: '22', name: 'ERNESTO DE KERATRY', state: 'Jalisco', email: 'ernestodk@pixgolf.com', phone: '3314299723' },
  { id: '23', name: 'JORGE JAIME ESQUERRA', state: 'Sinaloa', email: 'jorgejep1002@gmail.com', phone: '6673492383' },
  { id: '24', name: 'JAIME HUERTA FLORES', state: 'Michoacan', email: 'Jaimehuerta584@gmail.com', phone: '5659263658' },
  { id: '25', name: 'MANUEL MEJIA ', state: 'Chiapas', email: '', phone: '9614440726' },
  { id: '26', name: 'ROBERTO CUAUTLE', state: 'Puebla', email: 'contactoaroberto@gmail.com', phone: '2224938315' },
  { id: '27', name: 'RICARDO HERNANDEZ', state: 'Quintana Roo', email: '', phone: '' },
  { id: '28', name: 'LUIS RODRIGO MARTINEZ', state: 'Puebla', email: 'rodrigorodrigieich@gmail.com', phone: '2223572578' },
  { id: '29', name: 'HUGO MILLER', state: 'Tamaulipas', email: 'hugo.miller@techcustom.com.mx', phone: '8331487571' },
  { id: '30', name: 'JESUS RICARDO JONES LEON', state: 'Tamaulipas', email: 'Licjonesl@gmail.com', phone: '8331086362' },
  { id: '31', name: 'FERNANDO SANCHEZ', state: 'Michoacan', email: '', phone: '' },
  { id: '32', name: 'RICARDO PONCE', state: 'Yucatan', email: 'rponcer2002@gmail.com', phone: '9993706781' },
  { id: '33', name: 'VICTOR ALEJANDRO MURCIA MENA', state: 'Campeche', email: 'Vce.m.89@gmail.com', phone: '9381830967' },
  { id: '34', name: 'CHRISTOFER SANCHEZ', state: 'Guerrero', email: 'criszanchez915@gmail.com', phone: '9381577773' },
  { id: '35', name: 'MARIANO MARTINEZ', state: 'Colima', email: '', phone: '31141460245' },
  { id: '36', name: 'Kevin Zamudio', state: 'Sinaloa', email: '', phone: '6691467163' },
  { id: '37', name: 'MARCO PARADA', state: 'Sonora', email: '', phone: '6624168717' },
  { id: '38', name: 'LUIS ANDRES VILLASEÑOR BARBOSA', state: '', email: 'Landresv86@gmail.com', phone: '' },
  { id: '39', name: 'ALANNA SANCHEZ GRANADOS', state: 'CDMX', email: 'sanchezalanna4@gmail.com', phone: '5565108886' },
  { id: '40', name: 'Jesus (Hijo Mario Romero)', state: 'Coahuila', email: '', phone: '5638793415' },
  { id: '41', name: 'KHIABETT ALVAREZ', state: 'Quintana Roo', email: 'khiabett.alvarez@gmail.com', phone: '3111470593' },
  { id: '42', name: 'IAN EMILIO GUTIERREZ CARVAJAL', state: 'Jalisco', email: '', phone: '3221038978' },
  { id: '43', name: 'GERARDO ROQUE', state: 'BAJA CALIFORNIA NORTE', email: '', phone: '6611468194' },
  { id: '44', name: 'ALBERTO MUNGUIA', state: 'CDMX', email: '', phone: '5518255222' },
  { id: '45', name: 'RAFAEL VAZQUEZ', state: 'VERACRUZ', email: '', phone: '2281334370' },
  { id: '46', name: 'JOSE LUIZ GUTIERREZ LARA', state: 'BAJA CALIFORNIA NORTE', email: '', phone: '6641626075' },
  { id: '47', name: 'Gabriel Eduardo', state: 'VERACRUZ', email: '', phone: '2291771012' },
  { id: '48', name: 'Omar', state: 'CHIHUAHUA', email: 'punttorojo@hotmail.es', phone: '6564601027' }
];

const replaceWorkers = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Delete all existing workers
    await Worker.destroy({ where: {}, truncate: true });
    console.log('All existing workers deleted.');

    // Insert new workers
    const workersToInsert = newWorkersData.map(w => ({
      ...w,
      status: 'disponible',
      specialty: 'General',
      camerasAssigned: [],
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=random`
    }));

    await Worker.bulkCreate(workersToInsert);
    console.log(`Successfully inserted ${workersToInsert.length} new workers.`);

  } catch (error) {
    console.error('Unable to replace workers:', error);
  }
};

replaceWorkers();
