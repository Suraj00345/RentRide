import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//register
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

//login
export const loginUser = async (loginData) => {
  const { email, password, role } = loginData;
  //role is not needed
  const { data } = await API.post("/auth/login", { email, password });
  return data;
};
