import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { castVote } from "../services/RoomService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface RoomData {
  title: string;
  description: string;
  options: string[];
}

export default function VotingRoom() {
  const { roomCode } = useParams();

  const [room, setRoom] = useState<RoomData | null>(null);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `https://de-vapp.onrender.com/api/v1/${roomCode}`
        );
        setRoom(res.data.room);
      } catch (err: any) {
        toast.error(err.message || "Error fetching room data");
      }
    };

    fetchRoom();
  }, [roomCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return toast.warning("Please select an option.");
    const hasVotedKey = `voted_${roomCode}`;
    if (localStorage.getItem(hasVotedKey)) {
      toast.warning("You've already voted in this room.");
      return;
    }
    try {
      setLoading(true);
      await castVote({
        roomCode: roomCode || "",
        selectedOption: selected,
      });
      localStorage.setItem(hasVotedKey, "true");
      toast.success(
        "✅ Your vote has been recorded and submitted successfully!"
      );
      setTimeout(() => {
        navigate("/create-room");
      }, 3000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err.message || "Error submitting vote";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <div className="p-6 text-center">Loading room...</div>;

  return (
    <div className="min-h-screen bg-cyan-50 flex justify-center items-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-black p-6 rounded-xl shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold text-cyan-600 mb-2">{room.title}</h1>
        <p className="text-gray-600 mb-6">{room.description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {room.options.map((opt) => (
            <label
              key={opt}
              className={`block px-4 py-3 rounded border cursor-pointer transition ${
                selected === opt
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "border-gray-300 hover:border-cyan-500"
              }`}
            >
              <input
                type="radio"
                name="vote"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                className="hidden"
              />
              {opt}
            </label>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded transition"
          >
            {loading ? "Submitting..." : "Submit Vote"}
          </button>
        </form>
      </div>
    </div>
  );
}
