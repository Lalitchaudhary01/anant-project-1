// src/components/Auth.js

import React, { useState } from "react";
import axios from "axios";

const Auth = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    const url = `${process.env.REACT_APP_API_URL}/auth/${
      isLogin ? "login" : "register"
    }`;
    try {
      const response = await axios.post(url, { username, password });
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        onAuthSuccess();
      } else {
        alert("Registration successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-2 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-64"
      />
      <button
        onClick={handleAuth}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isLogin ? "Login" : "Register"}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-700 underline"
      >
        {isLogin ? "Create an account" : "Have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;
