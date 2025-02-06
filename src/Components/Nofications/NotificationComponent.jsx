// import React, { useEffect, useState } from 'react';
// import { getUnseenNotifications, markNotificationAsSeen } from './axiosNotification';

// const NotificationComponent = ({ userId }) => {
//     const [notifications, setNotifications] = useState([]);
//     const [showModal, setShowModal] = useState(false);

//     // Obtener notificaciones no vistas
//     const fetchUnseenNotifications = async () => {
//         try {
//             const unseenNotifications = await getUnseenNotifications(userId);
//             setNotifications(unseenNotifications);
//         } catch (error) {
//             console.error("Error fetching notifications:", error);
//         }
//     };

//     // Marcar notificación como vista
//     const handleMarkAsSeen = async (notificationId) => {
//         try {
//             await markNotificationAsSeen(notificationId);
//             setNotifications((prevNotifications) =>
//                 prevNotifications.map((notification) =>
//                     notification.id === notificationId
//                         ? { ...notification, check: true }
//                         : notification
//                 )
//             );
//         } catch (error) {
//             console.error("Error marking notification as seen:", error);
//         }
//     };

//     // Cargar notificaciones al montar el componente
//     useEffect(() => {
//         fetchUnseenNotifications();
//     }, [userId]);

//     return (
//         <div>
//             {/* Botón para abrir el modal */}
//             <button
//                 onClick={() => setShowModal(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
//             >
//                 Notificaciones
//                 {notifications.length > 0 && (
//                     <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//                         {notifications.length}
//                     </span>
//                 )}
//             </button>

//             {/* Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//                         {/* Encabezado del modal */}
//                         <div className="flex justify-between items-center p-4 border-b">
//                             <h2 className="text-lg font-semibold">Notificaciones</h2>
//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-6 w-6"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>

//                         {/* Cuerpo del modal */}
//                         <div className="p-4 max-h-96 overflow-y-auto">
//                             {notifications.length > 0 ? (
//                                 notifications.map((notification) => (
//                                     <div
//                                         key={notification.id}
//                                         className={`p-3 mb-2 rounded-lg ${
//                                             notification.check ? 'bg-gray-100' : 'bg-blue-50'
//                                         }`}
//                                     >
//                                         <p className="text-sm">{notification.comment}</p>
//                                         <small className="text-xs text-gray-500">
//                                             {new Date(notification.date).toLocaleString()}
//                                         </small>
//                                         {!notification.check && (
//                                             <button
//                                                 onClick={() => handleMarkAsSeen(notification.id)}
//                                                 className="mt-2 w-full bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 focus:outline-none"
//                                             >
//                                                 Marcar como vista
//                                             </button>
//                                         )}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-sm text-gray-500">No hay notificaciones nuevas.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NotificationComponent;