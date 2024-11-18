// src/pages/Home.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth";

const Home = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to MindSync</h1>
      <Auth onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default Home;
