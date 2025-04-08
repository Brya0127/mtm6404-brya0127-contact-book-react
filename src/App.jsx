// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './App.css'; /
import { Link } from 'react-router-dom';
import db from './db';

// Import components
import ContactList from './components/contactList';
import ContactDetails from './components/ContactDetails';
import NewContact from './components/NewContact';
import EditContact from './components/EditContact';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('lastName'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedContacts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(fetchedContacts);
    });

    return () => unsubscribe();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  return (
    <Router>
      <div>
      <h1>
        <Link to="/">Contact Book</Link>
      </h1>
        <input
          type="text"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Routes>
          <Route path="/" element={<ContactList contacts={filteredContacts} />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/new" element={<NewContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
