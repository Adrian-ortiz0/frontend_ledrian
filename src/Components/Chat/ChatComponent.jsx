import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, subscribe, sendMessage, disconnect } from '../../WebSocketService';

const ChatComponent = ({ currentUser, recipientId }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let intervalId;

        const onConnected = () => {
            setIsConnected(true);
            console.log('WebSocket Connected and Subscribing...');
            subscribe(`/user/${currentUser.id}/queue/messages`, onMessageReceived);
            fetchMessages();
            intervalId = setInterval(fetchMessages, 100);
        };

        const onError = (error) => {
            console.error('Error al conectar con WebSocket:', error);
        };

        connect(onConnected, onError);

        return () => {
            clearInterval(intervalId); 
            setIsConnected(false);
        };
    }, [currentUser, recipientId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/chat/messages', {
                params: {
                    senderId: currentUser.id,
                    recipientId: recipientId
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error al obtener los mensajes del chat:', error);
        }
    };

    const onMessageReceived = (message) => {
        console.log('Mensaje recibido:', message);
        if (
            (message.senderId === currentUser.id && message.recipientId === recipientId) ||
            (message.senderId === recipientId && message.recipientId === currentUser.id)
        ) {
            setMessages((prevMessages) => [...prevMessages, message]);
        }
    };

    const handleSendMessage = () => {
        if (messageContent.trim() !== '') {
            const chatMessage = {
                content: messageContent,
                senderId: currentUser.id,
                recipientId: recipientId
            };
            console.log('Enviando mensaje:', chatMessage);
            sendMessage('/app/chat.sendMessage', chatMessage);
            setMessageContent('');
        }
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start ${message.senderId === currentUser.id ? 'justify-end' : ''}`}>
                        {message.senderId !== currentUser.id && (
                            <img src={message.senderPhoto || 'default-avatar.png'} alt="Profile" className="w-8 h-8 rounded-full" />
                        )}
                        <div className={`${message.senderId === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-100'} p-3 rounded-lg max-w-[70%]`}>
                            <p className="text-sm">{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-200">
                {isConnected ? (
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                        />
                        <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 9.172a4 4 0 10-5.656 5.656" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7h-1.586a2 2 0 00-1.414.586l-1.828 1.828" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="text-red-500">Conexión perdida. Reintentando...</div>
                )}
            </div>
        </>
    );
};

export default ChatComponent;
