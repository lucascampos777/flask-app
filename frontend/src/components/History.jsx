// import { useState, useEffect } from "react";
// import axios from "axios";

// const History = ({ userId }) => {
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     const res = await axios.get("http://localhost:5000/history", {
//       withCredentials: true,
//     });
//     setHistory(res.data);
//   };

//   useEffect(() => {
//     fetchHistory();
//     // eslint-disable-next-line
//   }, []);

//   const handleDelete = async id => {
//     await axios.delete(`http://localhost:5000/delete/${id}`, {
//       withCredentials: true,
//     });
//     setHistory(history.filter(msg => msg._id !== id));
//   };

//   return (
//     <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
//       <h2 className="text-lg mb-2">Chat History</h2>
//       {history.length === 0 ? (
//         <div>No chats yet.</div>
//       ) : (
//         history.map(msg => (
//           <div key={msg._id} className="border-b py-2">
//             <strong>Q:</strong> {msg.question}
//             <br />
//             <strong>A:</strong> {msg.answer}
//             <button
//               onClick={() => handleDelete(msg._id)}
//               className="ml-2 text-red-500"
//             >
//               Delete
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default History;











import { useState, useEffect } from "react";
import axios from "axios";

const History = ({ userId, darkMode }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/history`, {
      withCredentials: true,
    });
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`, {
      withCredentials: true,
    });
    setHistory(history.filter((msg) => msg._id !== id));
  };

  return (
    <div>
      {history.length === 0 ? (
        <div className={darkMode ? "text-gray-400" : "text-gray-600"}>No chats yet.</div>
      ) : (
        history.map((msg) => (
          <div
            key={msg._id}
            className={`border-b py-2 ${darkMode ? "border-gray-700" : "border-gray-300"}`}
          >
            <strong>Q:</strong> {msg.question}
            <br />
            <strong>A:</strong> {msg.answer}
            <button
              onClick={() => handleDelete(msg._id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default History;