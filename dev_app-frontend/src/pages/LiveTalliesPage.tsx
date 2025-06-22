// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { toast, ToastContainer } from "react-toastify";

// // export default function TalliesPage() {
// //   const { roomCode } = useParams();
// //   const navigate = useNavigate();
// //   const [tallies, setTallies] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem("user") || "{}");

// //     // Role check
// //     if (!user?.role || user.role.toLowerCase() !== "roomcreator") {
// //       toast.error("Access denied. Only Room Creators can view tallies.");
// //       navigate("/");
// //       return;
// //     }

// //     const fetchTallies = async () => {
// //       setLoading(true); // ✅ Start loading
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get(
// //           `http://localhost:5050/api/v1/${roomCode}/live-tallies`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );

// //         setTallies(res.data.data);
// //         toast.success("✅ Success");
// //       } catch (err: any) {
// //         const errorMessage =
// //           err?.response?.data?.message ||
// //           err?.message ||
// //           "An unexpected error occurred while loading tallies.";

// //         console.error("Fetch tallies error:", err); // for debugging
// //         toast.error(`❌ ${errorMessage}`);
// //       } finally {
// //         setLoading(false); // ✅ End loading
// //       }
// //     };

// //     // ✅ Trigger async fetch after role check
// //     fetchTallies();
// //   }, [roomCode, navigate]);

// //   return (
// //     <div className="p-6 max-w-xl mx-auto">
// //       <ToastContainer position="top-right" autoClose={3000} />

// //       <h1 className="text-2xl font-bold mb-4 text-center text-cyan-800">
// //         Live Vote Tallies
// //       </h1>
// //       <ul className="space-y-3">
// //         {Object.entries(tallies).map(([option, percent]) => (
// //           <li key={option} className="bg-cyan-100 px-4 py-3 rounded shadow">
// //             <div className="flex justify-between">
// //               <span className="font-medium text-cyan-900">{option}</span>
// //               {/* <span className="font-bold text-cyan-700">{percent}%</span> */}
// //             </div>
// //             <div className="bg-cyan-900 h-2 rounded mt-2 overflow-hidden">
// //               <div
// //                 className="bg-cyan-900 h-full transition-all"
// //                 style={{ width: `${percent}%` }}
// //               />
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// // export {};

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // interface Tallies {
// //   [option: string]: number;
// // }

// // interface RoomDetails {
// //   deadline: string;
// //   createdBy: string;
// //   title: string;
// //   description: string;
// // }

// // export default function LiveTalliesPage() {
// //   const { roomCode } = useParams();
// //   const navigate = useNavigate();

// //   const [tallies, setTallies] = useState<Tallies>({});
// //   const [loading, setLoading] = useState(true);
// //   const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
// //   const [roomInfo, setRoomInfo] = useState<RoomDetails | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const user = JSON.parse(localStorage.getItem("user") || "{}");

// //       if (!user?.role || user.role.toLowerCase() !== "roomcreator") {
// //         toast.error("Access denied. Only Room Creators can view tallies.");
// //         navigate("/");
// //         return;
// //       }

// //       try {
// //         const token = localStorage.getItem("token");

// //         // Step 1: Get tallies
// //         const res = await axios.get(
// //           `http://localhost:5050/api/v1/${roomCode}/live-tallies`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );
// //         console.log(res.data.data);
// //         setTallies(res.data.data);

// //         const deadline = new Date(res.data.deadline).getTime();
// //         const now = new Date().getTime();
// //         setIsDeadlinePassed(now > deadline);

// //         toast.success("✅ Tallies fetched");
// //       } catch (err: any) {
// //         toast.error(
// //           err?.response?.data?.message ||
// //             "Failed to fetch live tallies or room info."
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [roomCode, navigate]);

// //   if (loading) return <p className="text-center mt-10">Loading...</p>;

// //   return (
// //     <div className="max-w-2xl mx-auto px-4 py-8">
// //       <h2 className="text-2xl font-bold text-cyan-700 mb-4">
// //         {isDeadlinePassed ? "🗳 Final Results" : "📊 Live Tallies"}
// //       </h2>

// //       {roomInfo && (
// //         <div className="mb-6">
// //           <h3 className="text-xl font-semibold text-cyan-900">
// //             {roomInfo.title}
// //           </h3>
// //           <p className="text-gray-600">{roomInfo.description}</p>
// //         </div>
// //       )}

// //       <ul className="space-y-4">
// //         {Object.entries(tallies).map(([option, percent]) => (
// //           <li key={option} className="bg-cyan-100 px-4 py-3 rounded shadow">
// //             <div className="flex justify-between">
// //               <span className="font-medium text-cyan-900">{option}</span>
// //               <span className="font-bold text-cyan-700">{percent}%</span>
// //             </div>
// //             <div className="bg-cyan-300 h-2 rounded mt-2 overflow-hidden">
// //               <div
// //                 className="bg-cyan-600 h-full transition-all"
// //                 style={{ width: `${percent}%` }}
// //               />
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // src/pages/LiveTalliesPage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// interface ApiResponse {
//   roomCode: string;
//   title: string;
//   // description is not returned by this endpoint—omit or fetch separately if needed
//   deadline: string;
//   isClosed: boolean;
//   totalVotes: number;
//   tally: Record<string, number>;
//   percentages: Record<string, string>;
// }

// export default function LiveTalliesPage() {
//   const { roomCode } = useParams<{ roomCode: string }>();
//   const navigate = useNavigate();

//   const [data, setData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTallies = async () => {
//       // Client‑side role guard
//       const user = JSON.parse(localStorage.getItem("user") || "{}");
//       if (user.role?.toLowerCase() !== "roomcreator") {
//         toast.error("Access denied. Only Room Creators can view tallies.");
//         navigate("/");
//         return;
//       }

//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get<{ data: ApiResponse }>(
//           `http://localhost:5050/api/v1/${roomCode}/live-tallies`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setData(res.data.data);
//       } catch (err: any) {
//         const msg =
//           err?.response?.data?.message ||
//           err?.message ||
//           "Failed to load tallies.";
//         toast.error(`❌ ${msg}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTallies();
//   }, [roomCode, navigate]);

//   if (loading) {
//     return <p className="text-center mt-10">Loading tallies…</p>;
//   }
//   if (!data) {
//     return (
//       <p className="text-center mt-10 text-red-600">
//         Unable to load live tallies.
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold text-cyan-700 mb-4 text-center">
//         {data.isClosed ? "🗳 Final Results" : "📊 Live Tallies"}
//       </h2>

//       <div className="mb-6 text-center">
//         <h3 className="text-xl font-semibold text-cyan-900">{data.title}</h3>
//         <p className="text-sm text-gray-500">
//           {data.isClosed
//             ? `Voting closed on ${new Date(data.deadline).toLocaleString()}`
//             : `Voting ends on ${new Date(data.deadline).toLocaleString()}`}
//         </p>
//         <p className="text-sm text-gray-500">
//           Total votes so far: {data.totalVotes}
//         </p>
//       </div>

//       <ul className="space-y-4">
//         {Object.entries(data.percentages).map(([option, percent]) => (
//           <li key={option} className="bg-cyan-100 px-4 py-3 rounded shadow">
//             <div className="flex justify-between">
//               <span className="font-medium text-cyan-900">{option}</span>
//               <span className="font-bold text-cyan-700">{percent}</span>
//             </div>
//             <div className="bg-cyan-300 h-2 rounded mt-2 overflow-hidden">
//               <div
//                 className="bg-cyan-600 h-full transition-all"
//                 style={{ width: percent }}
//               />
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

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

      if (user.role?.toLowerCase() !== "roomcreator") {
        toast.error("Access denied. Only Room Creators can view tallies.");
        navigate("/");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<{ data: ApiResponse }>(
          `http://localhost:5050/api/v1/${roomCode}/live-tallies`,
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-cyan-700 mb-4 text-center">
        {data.isClosed ? "🗳 Final Results" : "📊 Live Tallies"}
      </h2>

      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-cyan-900">{data.title}</h3>
        <p className="text-sm text-gray-500">
          {data.isClosed
            ? `Voting closed on ${new Date(data.deadline).toLocaleString()}`
            : `Voting ends on ${new Date(data.deadline).toLocaleString()}`}
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
