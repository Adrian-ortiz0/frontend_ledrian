// src/components/ContactList.js
import React, { useEffect, useState } from 'react';
import AxiosConfiguration from '../../AxiosConfiguration';

export const ContactList = ({ currentUser, onSelectContact }) => {
    const [contacts, setContacts] = useState([]);

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

    return (
        <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Contactos</h2>
            <ul>
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <li key={contact.id} className="mb-2">
                            <button
                                className="flex items-center p-2 w-full text-left focus:outline-none hover:bg-gray-200 rounded"
                                onClick={() => onSelectContact(contact)}
                            >
                                <img src={contact.photo} alt={contact.name} className="w-10 h-10 rounded-full" />
                                <span className="ml-3">{contact.name}</span>
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No sigues a ningún usuario.</p>
                )}
            </ul>
        </aside>
    );
};

export default ContactList;
