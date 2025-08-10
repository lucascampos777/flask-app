// import { useState } from "react";
// import axios from "axios";

// const ChatWindow = ({ userId }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!question) return;
//     setLoading(true);
//     setAnswer("");
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/ask",
//         { question },
//         { withCredentials: true }
//       );
//       setAnswer(res.data.answer);
//       setQuestion("");
//     } catch (err) {
//       setAnswer("Something went wrong!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-md">
//       <textarea
//         value={question}
//         onChange={e => setQuestion(e.target.value)}
//         className="w-full p-2 border rounded"
//         placeholder="Ask something..."
//       />
//       <button
//         onClick={handleSend}
//         disabled={loading || !question}
//         className="mt-2 p-2 bg-blue-500 text-white rounded"
//       >
//         {loading ? "Asking..." : "Ask"}
//       </button>
//       {answer && (
//         <div className="mt-4 bg-gray-50 p-2 rounded">
//           <strong>Answer:</strong> {answer}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;











import { useState } from "react";
import axios from "axios";

const ChatWindow = ({ userId, darkMode }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ask`,
        { question },
        { withCredentials: true }
      );
      setAnswer(res.data.answer);
      setQuestion("");
    } catch (err) {
      setAnswer("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg w-full max-w-lg transition-colors duration-500
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={`w-full p-2 border rounded resize-none transition-colors duration-500
          ${darkMode 
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" 
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
        placeholder="Ask something..."
        rows={4}
      />
      <button
        onClick={handleSend}
        disabled={loading || !question}
        className={`mt-3 m-auto w-full px-4 py-2 rounded font-semibold transition-all duration-300
          ${darkMode 
            ? "bg-blue-600 hover:bg-blue-700 text-white" 
            : "bg-blue-500 hover:bg-blue-600 text-white"}`}
      >
        {loading ? "Asking..." : "Ask"}
      </button>

      {answer && (
        <div className={`mt-4 p-3 rounded ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;