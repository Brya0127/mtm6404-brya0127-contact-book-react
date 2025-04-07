// src/components/ContactDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from '../db';

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate('/');
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'contacts', id));
    navigate('/');
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="contact-card">
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p><strong>Email:</strong> {contact.email}</p>
      <Link to={`/edit/${id}`}>✏️ Edit</Link>
      <button onClick={handleDelete}>🗑️ Delete</button>
      <br />
      <Link to="/">⬅️ Back to Contacts</Link>
    </div>
  );
};

export default ContactDetails;
