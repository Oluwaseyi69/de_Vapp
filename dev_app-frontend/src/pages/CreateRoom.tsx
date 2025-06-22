// // src/pages/CreateRoom.tsx

// import { useState } from "react";
// import { createRoom } from "../services/RoomService";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// export default function CreateRoom() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     options: "",
//     deadline: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const optionsArray = form.options
//       .split(",")
//       .map((opt) => opt.trim())
//       .filter(Boolean);

//     if (optionsArray.length < 2 || optionsArray.length > 5) {
//       toast.error("❌ Please provide between 2 to 5 voting options.");
//       return;
//     }

//     try {
//       const payload = {
//         title: form.title,
//         description: form.description,
//         options: optionsArray,
//         deadline: form.deadline,
//       };

//       const result = await createRoom(payload);
//       console.log("Room URL: ", result.room.roomCode);
//       toast.success("✅ Room created successfully!");

//       // Redirect to room view or confirmation page
//       //display the new url for creator to copy
//       // create another screen to display the voting option
//       navigate(`/vote/${result.room.roomCode}`);
//     } catch (err: any) {
//       const errorMsg = err.response?.data?.message || "Failed to create room";
//       toast.error(`❌ ${errorMsg}`);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cyan-50 p-6 flex items-center justify-center"
//       style={{ backgroundImage: `url('/images/rm222batch3-kul-15.jpg')` }}
//     >
//       <ToastContainer position="top-right" autoClose={3000} />

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-xl rounded-lg shadow-md p-6 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-cyan-700 mb-2">
//           Create a Decision Room
//         </h2>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             required
//             className="w-full border text-gray-600 border-gray-300 rounded px-3 py-2"
//             placeholder="e.g. Best Artiste"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//             className="w-full text-gray-600 border border-gray-300 rounded px-3 py-2"
//             rows={3}
//             placeholder="Explain the context..."
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Options (comma-separated) <span className="text-red-500">*</span>
//           </label>
//           <input
//             name="options"
//             value={form.options}
//             onChange={handleChange}
//             required
//             className="w-full border text-gray-600 border-gray-300 rounded px-3 py-2"
//             placeholder="e.g. Wizkid, Davido, Burna Boy, IcePrince"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Deadline <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="datetime-local"
//             name="deadline"
//             value={form.deadline}
//             onChange={handleChange}
//             required
//             className="w-full text-gray-600 border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-2 rounded transition"
//         >
//           Create Room
//         </button>
//       </form>
//     </div>
//   );
// }
// src/pages/CreateRoom.tsx

import { useState } from "react";
import { createRoom } from "../services/RoomService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function CreateRoom() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    options: "",
    deadline: "",
  });

  const [createdRoomCode, setCreatedRoomCode] = useState<string | null>(null);
  const [showRoomLink, setShowRoomLink] = useState(false);
  const [loading, setLoading] = useState(false); // 🌀 loading state

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const optionsArray = form.options
      .split(",")
      .map((opt) => opt.trim())
      .filter(Boolean);

    if (optionsArray.length < 2 || optionsArray.length > 5) {
      toast.error("❌ Please provide between 2 to 5 voting options.");
      return;
    }

    try {
      setLoading(true); // ⏳ Start spinner
      const payload = {
        title: form.title,
        description: form.description,
        options: optionsArray,
        deadline: form.deadline,
      };

      const result = await createRoom(payload);
      const roomCode = result.room.roomCode;

      toast.success(" Room created successfully!");
      setCreatedRoomCode(roomCode);
      setShowRoomLink(true);

      setTimeout(() => navigate(`/vote/${roomCode}`), 4000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to create room";
      toast.error(`${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (createdRoomCode) {
      navigator.clipboard.writeText(
        `${window.location.origin}/vote/${createdRoomCode}`
      );
      toast.success("Room link copied!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cyan-50 p-6 flex items-center justify-center"
      style={{ backgroundImage: `url('/images/rm222batch3-kul-15.jpg')` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-cyan-700 mb-2">
            Create a Decision Room
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border text-gray-600 border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Best Artiste"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full text-gray-600 border border-gray-300 rounded px-3 py-2"
              rows={3}
              placeholder="Explain the context..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options (comma-separated) <span className="text-red-500">*</span>
            </label>
            <input
              name="options"
              value={form.options}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border text-gray-600 border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Wizkid, Davido, Burna Boy, IcePrince"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full text-gray-600 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-2 rounded transition flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Room"
            )}
          </button>
        </form>

        {showRoomLink && createdRoomCode && (
          <div className="bg-white mt-4 p-4 rounded shadow border border-gray-200">
            <p className="text-gray-800 mb-2 font-medium">
              Room created! Share this link:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={`${window.location.origin}/vote/${createdRoomCode}`}
                readOnly
                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-700"
              />
              <button
                onClick={handleCopy}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
