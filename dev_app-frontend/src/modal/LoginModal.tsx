// src/components/LoginModal.tsx

import { useState, ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";
import { login } from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success("✅ Login successful!");
      navigate("/create-room");
      onClose(); // Close modal
    } catch (err: any) {
      toast.error(
        "❌ Login failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#111827] rounded-lg w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full text-black p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border text-black border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
