// src/components/EditContact.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../db';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    const fetchContact = async () => {
      const docSnap = await getDoc(doc(db, 'contacts', id));
      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        navigate('/');
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await updateDoc(doc(db, 'contacts', id), form);
    navigate(`/contact/${id}`);
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" value={form.lastName} onChange={handleChange} required />
        <input name="email" value={form.email} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
