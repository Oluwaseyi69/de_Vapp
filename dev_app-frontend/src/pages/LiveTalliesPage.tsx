import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ApiResponse {
  roomCode: string;
  title: string;
  deadline: string;
  isClosed: boolean;
  totalVotes: number;
  tally: Record<string, number>;
  percentages: Record<string, string>;
}

export default function LiveTalliesPage() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState<{
    option: string;
    percent: string;
  } | null>(null);

  useEffect(() => {
    const fetchTallies = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("User data:", user);
      console.log("User role:", user.role);

      if (user.role !== "roomCreator") {
        toast.error("Access denied. Only Room Creators can view tallies.");
        navigate("/");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<{ data: ApiResponse }>(
          `https://de-vapp.onrender.com/api/v1/${roomCode}/live-tallies`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = res.data.data;
        setData(result);

        // Calculate winner
        if (result.isClosed && result.percentages) {
          const entries = Object.entries(result.percentages);
          const sorted = entries.sort(
            ([, aPercent], [, bPercent]) =>
              parseFloat(bPercent) - parseFloat(aPercent)
          );
          setWinner({ option: sorted[0][0], percent: sorted[0][1] });
        }
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load tallies.";
        toast.error(`❌ ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTallies();
  }, [roomCode, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading tallies…</p>;
  }

  if (!data) {
    return (
      <p className="text-center mt-10 text-red-600">
        Unable to load live tallies.
      </p>
    );
  }
  function formatLocal(dateString: string) {
    const date = new Date(dateString);
    const localTime = date.toLocaleString("en-NG", {
      hour12: true,
      timeZone: "Africa/Lagos",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return localTime;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-cyan-700 mb-4 text-center">
        {data.isClosed ? " Final Results" : "📊 Live Tallies"}
      </h2>

      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-cyan-900">{data.title}</h3>
        <p className="text-sm text-gray-500">
          {data.isClosed
            ? `Voting closed on ${formatLocal(data.deadline)}`
            : `Voting ends on ${formatLocal(data.deadline)}`}
        </p>
        <p className="text-sm text-gray-500">Total votes: {data.totalVotes}</p>
      </div>

      {/* Winner Section */}
      {data.isClosed && winner && (
        <div className="bg-cyan-50 border border-cyan-200 p-4 rounded mb-6 text-center shadow">
          <h4 className="text-lg font-bold text-cyan-800 mb-1">
            🎉 Winner: <span className="text-cyan-900">{winner.option}</span>
          </h4>
          <p className="text-sm text-cyan-700">
            {winner.percent} of total votes
          </p>
        </div>
      )}

      <ul className="space-y-4">
        {Object.entries(data.percentages).map(([option, percent]) => (
          <li key={option} className="bg-cyan-100 px-4 py-3 rounded shadow">
            <div className="flex justify-between">
              <span className="font-medium text-cyan-900">{option}</span>
              <span className="font-bold text-cyan-700">{percent}</span>
            </div>
            <div className="bg-cyan-300 h-2 rounded mt-2 overflow-hidden">
              <div
                className="bg-cyan-600 h-full transition-all"
                style={{ width: percent }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
