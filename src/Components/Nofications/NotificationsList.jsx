import { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem';

const API_URL = 'http://localhost:8083/notifications';

const NotificationsList = ({ onClose, usuario }) => {
  const API_URL = 'http://localhost:8083/api/notifications';

// Estado para las notificaciones
const [notifications, setNotifications] = useState([]);
const [notification, setNotification] = useState(null);

// Obtención de todas las notificaciones (leídas y no leídas juntas)
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const unread = await getUnseenNotifications(usuario.id);
      const read = await getReadNotifications(usuario.id);
      // Unir ambas listas y ordenarlas por fecha (descendente)
      const allNotifications = [...unread, ...read].sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  fetchNotifications();
}, [usuario.id]);

// Obtener notificaciones no leídas
const getUnseenNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/unread/${userId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    return [];
  }
};

// Obtener notificaciones leídas
const getReadNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/read/${userId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching read notifications:", error);
    return [];
  }
};

// Marcar una notificación como leída
const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.put(`${API_URL}/read/${notificationId}`, null, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    // Actualizar el estado
    setNotifications(notifications.map(n => n.id === notificationId ? { ...n, checked: true } : n));
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

// Marcar todas como leídas al cerrar el modal
const markAllNotificationsAsRead = async (userId) => {
  try {
    await axios.put(`${API_URL}/read-all/${userId}`, null, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    // Marcar todas como leídas en el estado
    setNotifications(notifications.map(n => ({ ...n, checked: true })));
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
  }
};

// Obtener una notificación por su ID
const getNotificationById = async (notificationId) => {
  try {
    const response = await axios.get(`${API_URL}/${notificationId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    setNotification(response.data);
  } catch (error) {
    console.error("Error fetching notification by ID:", error);
  }
};

// Crear una nueva notificación
const createNotification = async (notificationData) => {
  try {
    const response = await axios.post(API_URL, notificationData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    // Agregar la nueva notificación a la lista
    setNotifications([response.data, ...notifications]);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
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