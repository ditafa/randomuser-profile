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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=8");
      const data = await res.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Disalin ke clipboard!");
    } catch (e) {
      alert("Gagal menyalin: " + e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-300 p-8 flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 drop-shadow-md">
        👤 Random User Profiles
      </h1>

      <button
        onClick={fetchUsers}
        className="mb-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
      >
        🔄 Generate New Users
      </button>

      {loading ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">Loading users...</p>
      ) : (
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
          <AnimatePresence>
            {users.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 text-xs rounded-full">
                  {user.location.city}
                </div>
                <img
                  src={user.picture.large}
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-emerald-300 shadow-lg"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  {user.location.city}, {user.location.country}
                </p>
                <p className="text-gray-500 text-sm mb-1">{user.email}</p>
                <p className="text-gray-500 text-sm mb-2">{user.phone}</p>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => copyToClipboard(user.email)}
                    className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => copyToClipboard(user.phone)}
                    className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Copy Phone
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <footer className="text-center text-gray-700 text-sm mt-12">
        © 2025 Random User Profile | Built with ❤️ by Dita Fajarsari
      </footer>
    </div>
  );
}

export default App;
