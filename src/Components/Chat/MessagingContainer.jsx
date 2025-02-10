import React, { useState } from 'react';
import ContactList from './ContactList';
import ChatContainer from './ChatContainer';
import { Navigate, useNavigate } from 'react-router';

const MessagingContainer = ({ usuario }) => {
    const [selectedContact, setSelectedContact] = useState(null);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const navigate = useNavigate();
    

    const goBack = () => {
        navigate("/home");
    };
    const handleBack = () => {
        setSelectedContact(null);
    };

    return (
        <div className="flex h-screen w-full bg-gray-900">
            {(!selectedContact || window.innerWidth >= 640) && (
                <ContactList
                    currentUser={usuario}
                    onSelectContact={handleSelectContact}
                    onBack={goBack} 
                />
            )}
            {selectedContact && (
                <ChatContainer usuario={usuario} recipient={selectedContact} onBack={handleBack} />
            )}
        </div>
    );
};

export default MessagingContainer;