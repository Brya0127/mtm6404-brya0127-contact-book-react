// src/components/NewContact.jsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import db from '../db';

const NewContact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'contacts'), form);
    navigate(`/contact/${docRef.id}`);
  };

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewContact;
