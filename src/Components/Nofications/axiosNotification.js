// import axios from 'axios';

// const API_URL = 'http://localhost:8083/notifications'; // Ajusta la URL según tu backend

// export const getUnseenNotifications = async (userId) => {
//     try {
//         const response = await axios.get(`${API_URL}/unseen/${userId}`, {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Incluye el token de autenticación
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching notifications:", error);
//         return [];
//     }
// };

// export const markNotificationAsSeen = async (notificationId) => {
//     try {
//         await axios.put(`${API_URL}/mark-as-seen/${notificationId}`, {}, {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Incluye el token de autenticación
//             }
//         });
//     } catch (error) {
//         console.error("Error marking notification as seen:", error);
//     }
// };