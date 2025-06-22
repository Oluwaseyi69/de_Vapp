import axios from "axios";

const BASE_URL = "https://de-vapp.onrender.com/api/v1/auth";

// Register a new user
export const signup = async (formData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(`${BASE_URL}/register`, formData);
  console.log("Response from authService: ", response);
  const { token, user } = response.data;

  if (token && user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  console.log(token);

  return response.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${BASE_URL}/login`, credentials);
  const { token, user } = res.data;

  if (token && user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return res.data;
};
