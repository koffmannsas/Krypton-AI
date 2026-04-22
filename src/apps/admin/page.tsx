import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  signOut,
} from "../../packages/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "../../packages/ui/Button";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalRevenue: number;
    totalClients: number;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        fetchStats();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center border border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-white">Admin Portal</h1>
          <p className="text-gray-400 mb-8">
            Restricted access. Please sign in.
          </p>
          <Button className="w-full" onClick={handleLogin}>
            Sign in with Google
          </Button>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Krypton Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">{user.email}</span>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Revenue
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats
                    ? `${stats.totalRevenue.toLocaleString()} FCFA`
                    : "..."}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Clients
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats ? stats.totalClients : "..."}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
