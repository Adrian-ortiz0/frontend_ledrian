import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NotificationItem } from './NotificationItem';

export const NotificationsList = ({ onClose, usuario }) => {
  const API_URL = 'http://localhost:8083/notifications';
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const unseenNotifications = await getUnseenNotifications(usuario.id);
      setNotifications(unseenNotifications);
    };

    fetchNotifications();
  }, [usuario.id]);

  const getUnseenNotifications = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/unseen/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  const markNotificationAsSeen = async (notificationId) => {
    try {
      await axios.put(`${API_URL}/mark-as-seen/${notificationId}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      // Actualizar el estado de la notificación a "vista"
      setNotifications(notifications.map(notification =>
        notification.id === notificationId ? { ...notification, check: true } : notification
      ));
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-white">Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              markAsSeen={markNotificationAsSeen}
            />
          ))
        ) : (
          <p className="text-white">No new notifications</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};