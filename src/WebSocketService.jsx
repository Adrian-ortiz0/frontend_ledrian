import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connect = (callback, errorCallback) => {
    const socket = new SockJS('http://localhost:8083/ws'); 
    stompClient = StompJs.Stomp.over(socket);
    stompClient.connect({
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    }, () => {
        console.log('WebSocket Connected');
        callback();
    }, (error) => {
        console.log('Error:', error);
        if (errorCallback) errorCallback(error);
    });
};

export const subscribe = (topic, callback) => {
    return stompClient.subscribe(topic, (message) => {
        callback(JSON.parse(message.body));
    });
};

export const sendMessage = (destination, message) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(destination, {}, JSON.stringify(message));
    } else {
        console.error('No se pudo enviar el mensaje, no hay conexión');
    }
};

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
        console.log('WebSocket Disconnected');
    }
};
