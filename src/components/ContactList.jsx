// src/components/ContactList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts }) => {
  return (
    <div>
      <h2>All Contacts</h2>
      <Link to="/new">➕ Add New Contact</Link>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default ContactList;
