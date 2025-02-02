// src/components/MessagingContainer.js
import React, { useState } from 'react';
import ContactList from './ContactList';
import ChatContainer from './ChatContainer';

const MessagingContainer = ({ usuario }) => {
    const [selectedContact, setSelectedContact] = useState(null);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    return (
        <div className="flex h-screen w-full">
            <ContactList currentUser={usuario} onSelectContact={handleSelectContact} />
            {selectedContact ? (
                <ChatContainer usuario={usuario} recipient={selectedContact} />
            ) : (
                <div className="flex flex-col items-center justify-center flex-1">
                    <p className="text-gray-500">Selecciona un contacto para chatear</p>
                </div>
            )}
        </div>
    );
};

export default MessagingContainer;
