/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  name: { first: string; last: string };
  email: string;
  phone: string;
  picture: { large: string };
  location: { city: string; country: string };
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fungsi untuk ambil data user random
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("https://randomuser.me/api/?results=8");
    const data = await res.json();
    setUsers(data.results);
    setLoading(false);
  };

  // 🔹 Ambil data pertama kali
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-300 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 drop-shadow-md">
        👤 Random User Profiles
      </h1>

      <div className="text-center mb-8">
        <button
          onClick={fetchUsers}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg transition-all shadow-md"
        >
          🔄 Generate New Users
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">
          Loading users...
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          <AnimatePresence>
            {users.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <img
                  src={user.picture.large}
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-emerald-300 shadow"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  {user.location.city}, {user.location.country}
                </p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-gray-500 text-sm">{user.phone}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <footer className="text-center text-gray-600 text-sm mt-12">
        © 2025 Random User Profile | Built with ❤️ by Dita Fajarsari
      </footer>
    </div>
  );
}

export default App;
