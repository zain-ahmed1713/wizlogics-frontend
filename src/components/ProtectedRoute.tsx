import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (user?.role !== "admin") {
      toast.error("User not authorized");
      navigate("/feed");
      return;
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-white text-4xl font-bold">Loading...</div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
