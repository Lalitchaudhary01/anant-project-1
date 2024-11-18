// src/pages/Dashboard.js

import React from "react";
import MindMap from "../components/MindMap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
      <MindMap />
    </div>
  );
};

export default Dashboard;
