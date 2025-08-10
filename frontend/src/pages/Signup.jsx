// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSignup = async () => {
//     setError("");
//     setSuccess("");
//     try {
//       const res = await axios.post("http://localhost:5000/signup", { email, password });
//       if (res.data.status) {
//         setSuccess("Signup successful! Please login.");
//         setTimeout(() => navigate("/"), 1500);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.error || "Signup failed. Try another email."
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-20">
//       <h1 className="text-xl font-bold mb-6">Signup</h1>
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
//         onClick={handleSignup}
//         className="bg-green-600 text-white px-4 py-2 rounded w-60"
//       >
//         Signup
//       </button>
//       {error && <div className="mt-2 text-red-500">{error}</div>}
//       {success && <div className="mt-2 text-green-700">{success}</div>}
//       <Link className="mt-3 text-blue-500 underline" to="/">
//         Already have an account? Login
//       </Link>
//     </div>
//   );
// }











import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSun, FaMoon, FaUserPlus, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null); // profile pic file
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // loading state for signup

  // Persist theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true); // Start loader
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (file) formData.append("file", file); // append image file

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.status) {
        setSuccess("✅ Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try another email.");
    }
    setLoading(false); // Stop loader
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
        {darkMode
          ? <FaSun className="text-yellow-300" />
          : <FaMoon className="text-gray-700" />}
      </button>

      {/* Signup Card */}
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
          <h1 className={`text-3xl font-extrabold flex justify-center items-center gap-2
            ${darkMode ? "text-white" : "text-gray-800"}`}>
            <FaUserPlus /> Create Account
          </h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Join <span className={`font-semibold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>ChatSphere</span> today
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
          />
        </div>

        {/* Profile Picture Upload */}
        <div
          className={`flex items-center rounded-lg mb-4 px-3 py-2 border transition-all duration-200
          ${darkMode
            ? "border-gray-700 focus-within:ring-indigo-500"
            : "border-gray-300 focus-within:ring-blue-400"} 
          focus-within:ring-2`}
        >
          <FaImage className={`${darkMode ? "text-gray-400" : "text-gray-500"} mr-2`} />
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className={`outline-none flex-1 bg-transparent text-sm ${darkMode ? "text-gray-200" : "text-gray-800"}`}
          />
        </div>

        {/* Signup Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold shadow-md transition-all duration-300
          ${darkMode
            ? "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-600 text-white"
            : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white"}
          ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </motion.button>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error & Success Messages */}
        {error && (
          <div className="mt-3 text-red-500 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mt-3 text-green-400 text-sm text-center">{success}</div>
        )}

        {/* Login Link */}
        <p className={`mt-4 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Already have an account?{" "}
          <Link
            className={`${darkMode ? "text-indigo-400" : "text-indigo-600"} hover:underline font-medium`}
            to="/"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}