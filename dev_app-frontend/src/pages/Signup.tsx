// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { signup } from "../services/AuthService";
// import LoginModal from "../modal/LoginModal";
// import { Eye, EyeOff } from "lucide-react";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await signup(form);

//       toast.success(" Registered successfully!");
//       navigate("/create-room");

//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         role: "user",
//       });

//       setTimeout(() => {
//         setIsLoginOpen(true);
//       }, 1000);
//     } catch (err: any) {
//       const errorMsg =
//         err.response?.data?.message || err.message || "Something went wrong";
//       toast.error(`Signup failed: ${errorMsg}`);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4"
//       style={{ backgroundImage: `url('/images/faded.jpg')` }}
//     >
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="w-full max-w-lg bg-[#111827] rounded-xl p-8 shadow-lg">
//         <h2 className="text-3xl font-bold text-center mb-6 text-cyan-500">
//           <span className="text-cyan-200"> Sign Up to</span> deVapp
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-sm font-medium mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded pr-10"
//               required
//             />
//             <button
//               type="button"
//               className="absolute top-9 right-3 text-gray-400 hover:text-white"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Select Role <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
//               required
//             >
//               <option value="" disabled hidden>
//                 -- Select Role --
//               </option>
//               <option value="roomCreator">Room Creator</option>
//               <option value="user">Guest</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full mt-4 py-2 bg-cyan-500 hover:bg-indigo-700 rounded text-white font-semibold transition"
//           >
//             Register
//           </button>

//           <p className="text-sm text-center mt-2 text-gray-700">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={() => setIsLoginOpen(true)}
//               className="text-cyan-500 hover:underline"
//             >
//               Sign In
//             </button>
//           </p>
//         </form>
//       </div>

//       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../services/AuthService";
import LoginModal from "../modal/LoginModal";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signup(form);
      toast.success("Registered successfully!");
      navigate("/create-room");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      setTimeout(() => {
        setIsLoginOpen(true);
      }, 1000);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || err.message || "Something went wrong";
      toast.error(`Signup failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/images/faded.jpg')` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-lg bg-[#111827] rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-500">
          <span className="text-cyan-200"> Sign Up to</span> deVapp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded pr-10"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
              disabled={loading}
            >
              <option value="" disabled hidden>
                -- Select Role --
              </option>
              <option value="roomCreator">Room Creator</option>
              <option value="user">Guest</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-cyan-500 hover:bg-indigo-700 rounded text-white font-semibold transition flex items-center justify-center"
            disabled={loading}
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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-sm text-center mt-2 text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="text-cyan-400 hover:underline"
              disabled={loading}
            >
              Sign In
            </button>
          </p>
        </form>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
