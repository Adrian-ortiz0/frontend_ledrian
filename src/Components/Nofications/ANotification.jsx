import React from 'react';

const NotificationBar = ({ interaccion }) => {
  // Valor predeterminado en caso de que no se pase la propiedad interaccion
  const defaultInteraccion = {
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    texto: 'Mensaje de prueba',
    hora: 'Hace 10 minutos'
  };

  const { foto, texto, hora } = interaccion || defaultInteraccion;

  return (
    <div className="flex items-center p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <img 
        src={foto}
        alt="Foto de usuario" 
        className="w-12 h-12 rounded-full object-cover mr-4" 
      />
      <div className="flex flex-col">
        <p className="font-medium">{texto}</p>
        <span className="text-sm text-gray-400">{hora}</span>
      </div>
    </div>
  );
};

export default NotificationBar;
