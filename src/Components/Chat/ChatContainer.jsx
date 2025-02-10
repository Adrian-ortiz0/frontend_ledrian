import React from 'react';
import ChatComponent from './ChatComponent';

export const ChatContainer = ({ usuario, recipient, onBack }) => {
    return (
        <section className="flex flex-col h-screen w-full bg-gray-800 text-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center">
                    {/* Flecha para volver atrás (visible solo en móviles) */}
                    <button
                        onClick={onBack}
                        className="sm:hidden mr-4 p-2 rounded-full hover:bg-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <img
                        src={recipient.photo}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="ml-3 font-semibold text-sm">{recipient.name}</span>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <ChatComponent currentUser={usuario} recipientId={recipient.id} />
        </section>
    );
};

export default ChatContainer;