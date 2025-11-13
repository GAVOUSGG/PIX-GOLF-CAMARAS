import React from 'react';
import { Download } from 'lucide-react';
import StatusBadge from '../UI/StatusBadge';

const ShipmentsList = ({ shipments }) => {
  const generateTicket = (shipment) => {
    const ticketContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                    PIXGOLF - TICKET DE ENVÍO
                                   Cámaras Solares Hikvision
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 TICKET: ${shipment.id}
📅 FECHA: ${shipment.date}
⏰ HORA: ${new Date().toLocaleTimeString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 INFORMACIÓN DE ENVÍO:

👤 DESTINATARIO: ${shipment.recipient}
📍 DESTINO: ${shipment.destination}
🏢 REMITENTE: ${shipment.sender}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📹 CÁMARAS SOLARES HIKVISION:

${shipment.cameras.map(cam => `   • ${cam} - Hikvision Solar`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  INSTRUCCIONES ESPECIALES:
• Verificar carga solar al recibir las cámaras
• Confirmar recepción vía sistema PixGolf
• Reportar cualquier daño inmediatamente
• Mantener paneles solares limpios
• Verificar funcionamiento de batería interna
• Posición óptima para captación solar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                           🎯 PIXGOLF - Seguros de Hole in One
                           📹 Especialistas en Cámaras Solares
                              📞 Contacto: (33) 1234-5678
                              🌐 www.pixgolf.mx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${shipment.id}.txt`;
    a.click();
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Envíos y Recolecciones</h3>
      <div className="space-y-4">
        {shipments.map(shipment => (
          <div key={shipment.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <StatusBadge status={shipment.status} />
                <div>
                  <h4 className="font-semibold text-white">Ticket: {shipment.id}</h4>
                  <p className="text-gray-400 text-sm">{shipment.date}</p>
                </div>
              </div>
              <button 
                onClick={() => generateTicket(shipment)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Generar Ticket</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Destinatario</p>
                <p className="text-white font-medium">{shipment.recipient}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Destino</p>
                <p className="text-white font-medium">{shipment.destination}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Cámaras Solares</p>
                <p className="text-white font-medium">{shipment.cameras.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentsList;