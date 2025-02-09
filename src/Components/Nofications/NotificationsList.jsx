import { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem';

const API_URL = 'http://localhost:8083/api/notifications';

const NotificationsList = ({ onClose, usuario }) => {
  const [notifications, setNotifications] = useState([]);

  // Obtener todas las notificaciones (leídas y no leídas juntas)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const noti = await getNotifications(usuario.id);
        // Ordena las notificaciones por fecha de manera descendente
        const allNotifications = [...noti].sort((a, b) => new Date(b.date) - new Date(a.date));
        setNotifications(allNotifications);  // Establece el estado de las notificaciones
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [usuario.id]);  // Dependencia: vuelve a ejecutar si cambia el usuario

  // Obtener las notificaciones del backend
  const getNotifications = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/all/${userId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      return response.data;  // Retorna la lista de notificaciones
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];  // Retorna un array vacío en caso de error
    }
  };

  // Marcar todas las notificaciones como leídas
  const markAllNotificationsAsRead = async (userId) => {
    try {
      await axios.put(`${API_URL}/read-all/${userId}`, null, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      // Actualiza todas las notificaciones en el estado como leídas
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, checked: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-gray-800 w-full max-w-md p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Notificaciones</h2>
          <button onClick={() => { markAllNotificationsAsRead(usuario.id); onClose(); }} className="text-red-500">Cerrar</button>
        </div>
        <div className="mt-2 max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <p className="text-center text-gray-500">No hay notificaciones</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
