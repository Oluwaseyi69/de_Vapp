// import { useState } from "react";
// import { User, Mail, Lock } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoginModal from "../modal/LoginModal";
// import { signup } from "../services/AuthService";

// interface SignupForm {
//   name: string;
//   email: string;
//   password: string;
//   role: "Room Creator" | "Guest";
// }

// export default function Signup() {
//   const [form, setForm] = useState<SignupForm>({
//     name: "",
//     email: "",
//     password: "",
//     role: "Guest",
//   });

//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const target = e.target as HTMLInputElement;
//     const { name, value, type } = target;

//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? target.checked : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await signup(form); // Call your backend

//       toast.success("✅ Registered successfully!");

//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         role: "Guest",
//       });

//       setTimeout(() => {
//         setIsLoginOpen(true);
//       }, 1000);
//     } catch (err: any) {
//       const errorMsg =
//         err.response?.data?.message || err.message || "Something went wrong";
//       toast.error(`❌ Signup failed: ${errorMsg}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl flex overflow-hidden">
//         {/* Left Illustration */}
//         <div className="w-1/2 hidden md:flex items-center justify-center p-10 bg-white">
//           {/* <img
//             src={signupImg}
//             alt="Illustration"
//             className="w-full h-96 max-h-[500px]"
//           /> */}
//         </div>

//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Username */}
//             <div className="relative">
//               <User
//                 className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full pl-10 py-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <Mail
//                 className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
//                 size={16}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 py-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <Lock
//                 className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
//                 size={16}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 py-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             {/* Role Dropdown */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Select Role <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//                 required
//               >
//                 <option value="" disabled hidden>
//                   -- Select Role --
//                 </option>
//                 <option value="Room Creator">Room Creator</option>
//                 <option value="Guest">Guest</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
//             >
//               Register
//             </button>

//             <p className="text-sm text-center mt-2 text-gray-700">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsLoginOpen(true)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Sign In
//               </button>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
//     </div>
//   );
// }

// src/pages/Signup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../services/AuthService";
import LoginModal from "../modal/LoginModal";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      await signup(form);

      toast.success("✅ Registered successfully!");
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
      toast.error(`❌ Signup failed: ${errorMsg}`);
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
          {/* Name */}
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
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email */}
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
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>

          {/* Role */}
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
            >
              <option value="" disabled hidden>
                -- Select Role --
              </option>
              <option value="roomcreator">Room Creator</option>
              <option value="user">Guest</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-cyan-500 hover:bg-indigo-700 rounded text-white font-semibold transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-2 text-gray-700">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="text-cyan-500 hover:underline"
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
