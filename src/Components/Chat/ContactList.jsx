import React, { useEffect, useState } from 'react';
import AxiosConfiguration from '../../AxiosConfiguration';

export const ContactList = ({ currentUser, onSelectContact, onBack }) => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUserById = async (userId) => {
        try {
            const response = await AxiosConfiguration.get(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            return null;
        }
    };

    const fetchFollowingContacts = async () => {
        try {
            const contactsPromises = currentUser.followingIds.map((userId) => fetchUserById(userId));
            const contactsArray = await Promise.all(contactsPromises);
            setContacts(contactsArray.filter((contact) => contact !== null));
        } catch (error) {
            console.error('Error fetching following contacts:', error);
        }
    };

    useEffect(() => {
        if (currentUser.followingIds && currentUser.followingIds.length > 0) {
            fetchFollowingContacts();
        }
    }, [currentUser]);

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className="sm:w-1/4 bg-gray-900 text-white border-r border-gray-700 h-screen overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
                {/* Flecha para volver atrás (visible solo en móviles) */}
                <button
                    onClick={onBack}
                    className="sm:hidden mr-4 p-2 rounded-full hover:bg-gray-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="text-lg font-semibold mb-4">Chats</h2>
                <input
                    type="text"
                    placeholder="Buscar contactos..."
                    className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ul className="p-2">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <li key={contact.id} className="mb-2">
                            <button
                                className="flex items-center p-2 w-full text-left focus:outline-none hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={() => onSelectContact(contact)}
                            >
                                <img src={contact.photo} alt={contact.name} className="w-10 h-10 rounded-full" />
                                <span className="ml-3">{contact.name}</span>
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 p-2">No se encontraron contactos.</p>
                )}
            </ul>
        </aside>
    );
};

export default ContactList;