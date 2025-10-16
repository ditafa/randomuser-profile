import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface User {
  name: { first: string; last: string };
  email: string;
  phone: string;
  picture: { large: string };
  location: { city: string; country: string };
  login: { uuid: string };
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
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">
        👤 Random User Profiles
      </h1>

      <button
        onClick={fetchUsers}
        className="mb-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
      >
        🔄 Generate New Users
      </button>

      {loading ? (
        <p className="text-gray-600 text-lg animate-pulse">Loading users...</p>
      ) : (
        <div className="relative w-full max-w-5xl flex flex-wrap justify-center gap-8">
          {users.map((user) => {
            // random rotation for polaroid effect
            const rotate = Math.floor(Math.random() * 10 - 5);
            return (
              <motion.div
                key={user.login.uuid}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, rotate: rotate }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-2xl p-5 w-64 text-center cursor-pointer"
                style={{ rotate: rotate }}
              >
                <img
                  src={user.picture.large}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full mx-auto mb-3 border-4 border-purple-400 shadow-lg"
                />
                <h2 className="text-xl font-bold text-gray-800">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="text-purple-700 font-semibold mb-2">
                  {user.location.city}, {user.location.country}
                </p>
                <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                <p className="text-gray-600 text-sm mb-3">{user.phone}</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => copyToClipboard(user.email)}
                    className="text-xs px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => copyToClipboard(user.phone)}
                    className="text-xs px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                  >
                    Copy Phone
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <footer className="text-center text-gray-700 text-sm mt-12">
        © 2025 Random User Profile | Built with ❤️ by Dita Fajarsari
      </footer>
    </div>
  );
}

export default App;
