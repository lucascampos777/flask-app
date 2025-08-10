// import ChatWindow from "../components/ChatWindow";
// import History from "../components/History";
// import { useNavigate } from "react-router-dom";

// export default function ChatPage() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center">
//       <h1 className="text-2xl mt-6 mb-2">ChatGPT App</h1>
//       <button
//         onClick={logout}
//         className="self-end mr-6 bg-red-500 text-white px-3 py-1 rounded mb-2"
//       >
//         Logout
//       </button>
//       <ChatWindow userId={user.user_id} />
//       <History userId={user.user_id} />
//     </div>
//   );
// }


















import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";
import History from "../components/History";
import { useNavigate } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
  FaRobot,
  FaInfoCircle,
  FaLightbulb,
} from "react-icons/fa";

export default function ChatPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 
        ${darkMode
          ? "bg-gradient-to-br from-gray-900 to-black text-white"
          : "bg-gradient-to-br from-blue-50 to-pink-50 text-gray-900"
        }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-[100vh] w-64 transform transition-transform duration-300 z-40 flex flex-col
          ${darkMode ? "bg-gray-800" : "bg-white"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        {/* Top with theme toggle */}
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <FaRobot className="text-indigo-400" />
            <h2 className="font-bold">History</h2>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-600/30 transition"
          >
            {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-700" />}
          </button>
        </div>

        {/* Scrollable history */}
        <div className="flex-1 overflow-y-auto p-4">
          <History userId={user.user_id} darkMode={darkMode} />
        </div>

        {/* Bottom logout */}
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full py-2 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Right side */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Mobile Top Bar with Profile */}
        <div
          className={`flex items-center justify-between p-4 border-b md:hidden
            ${darkMode ? "border-gray-700" : "border-gray-300"}`}
        >
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            <FaBars />
          </button>
          <div className="flex items-center gap-2">
            {user?.profile_pic ? (
              <img
                src={user.profile_pic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={28} className={darkMode ? "text-indigo-300" : "text-indigo-700"} />
            )}
            <span className="font-semibold text-sm">{user?.email || "Guest"}</span>
          </div>
        </div>

        {/* Profile Top-Right Desktop */}
        <div className="hidden md:flex absolute top-4 right-8 items-center gap-2">
          {user?.profile_pic ? (
            <img
              src={user.profile_pic}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-400"
            />
          ) : (
            <FaUserCircle size={38} className={darkMode ? "text-indigo-300" : "text-indigo-700"} />
          )}
          <span className="font-semibold text-base">{user?.email || "Guest"}</span>
        </div>

        {/* Center content */}
        <div className="flex flex-col flex-1 justify-center items-center p-4">
          {/* Intro above chat */}
          <div className="mb-4 text-center max-w-max">
            <div className="flex justify-center items-center gap-2 mb-1 text-[25px] font-semibold">
              <FaInfoCircle className={darkMode ? "text-indigo-300" : "text-indigo-600"} />
              Welcome to ChatSphere
            </div>
            <p className="text-[20px]">
              Your AI-powered assistant is ready. Just type below to start a conversation.
              All chats are saved for future reference.
            </p>
          </div>

          {/* Chat Window */}
          <ChatWindow userId={user.user_id} darkMode={darkMode} />

          {/* Tips below chat */}
          <div className="mt-4 text-center max-w-md mx-auto">
            <div className="flex justify-center items-center gap-2 mb-1 text-[25px] font-medium">
              <FaLightbulb className={darkMode ? "text-yellow-400" : "text-yellow-500"} />
              Tips for better questions:
            </div>
            <ul className="text-[14px] list-disc list-inside space-y-1 text-left">
              <li>Be clear and specific in your queries.</li>
              <li>Use follow-up questions to refine answers.</li>
              <li>Review history to continue past chats.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}