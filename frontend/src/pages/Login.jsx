// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/login", { email, password }, {withCredentials: true });
//       if (res.data.status) {
//         // Save user info in localStorage
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ email, user_id: res.data.user_id })
//         );
//         navigate("/chat");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.error || "Login failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-20">
//       <h1 className="text-xl font-bold mb-6">Login</h1>
//       <input
//         className="mb-3 px-2 py-1 border rounded w-60"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         className="mb-4 px-2 py-1 border rounded w-60"
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 text-white px-4 py-2 rounded w-60"
//       >
//         Login
//       </button>
//       {error && <div className="mt-2 text-red-500">{error}</div>}
//       <Link className="mt-3 text-blue-500 underline" to="/signup">
//         New user? Signup here
//       </Link>
//     </div>
//   );
// }






import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

 const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    if (res.data.status) {
      login({
        email,
        user_id: res.data.user_id,
        profile_pic: res.data.profile_pic || null,
      });
      navigate("/chat");
    }
  } catch (err) {
    setError(err.response?.data?.error || "Login failed");
  }
};

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-4 relative transition-colors duration-500 
      ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        : "bg-gradient-to-br from-blue-100 via-white to-pink-100"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full shadow-md transition-all duration-300
          bg-white/20 hover:bg-white/30"
      >
        {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-700" />}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md border transition-colors duration-500
          ${darkMode
            ? "bg-gray-900 bg-opacity-90 border-gray-700"
            : "bg-white/90 border-gray-200"
          }`}
      >
        {/* Title & Description */}
        <div className="text-center mb-6">
          <h1 className={`text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-800"}`}>
            Welcome Back 👋
          </h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Sign in to continue to{" "}
            <span className={`font-semibold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
              ChatSphere
            </span>
          </p>
        </div>

        {/* Email Input */}
        <div
          className={`flex items-center rounded-lg mb-4 px-3 py-2 border transition-all duration-200 
          ${darkMode
            ? "border-gray-700 focus-within:ring-indigo-500"
            : "border-gray-300 focus-within:ring-blue-400"} 
          focus-within:ring-2`}
        >
          <FaEnvelope className={`${darkMode ? "text-gray-400" : "text-gray-500"} mr-2`} />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            className={`outline-none flex-1 bg-transparent ${darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
            autoComplete="username"
          />
        </div>

        {/* Password Input */}
        <div
          className={`flex items-center rounded-lg mb-4 px-3 py-2 border transition-all duration-200
          ${darkMode
            ? "border-gray-700 focus-within:ring-indigo-500"
            : "border-gray-300 focus-within:ring-blue-400"} 
          focus-within:ring-2`}
        >
          <FaLock className={`${darkMode ? "text-gray-400" : "text-gray-500"} mr-2`} />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className={`outline-none flex-1 bg-transparent ${darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
            autoComplete="current-password"
          />
        </div>

        {/* Login Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className={`w-full py-2 rounded-lg font-semibold shadow-md transition-all duration-300
          ${darkMode
            ? "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-600 text-white"
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white"}`}
        >
          Login
        </motion.button>

        {/* Error Message */}
        {error && <div className="mt-3 text-red-500 text-sm text-center">{error}</div>}

        {/* Signup Link */}
        <p className={`mt-4 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          New user?{" "}
          <Link className={`${darkMode ? "text-indigo-400" : "text-indigo-600"} hover:underline font-medium`} to="/signup">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}