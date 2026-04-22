import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  signOut,
} from "../../packages/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "../../packages/ui/Button";
import { createCheckout } from "../../packages/fiko";

export default function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  const handleUpgrade = async () => {
    try {
      setUpgradeLoading(true);
      const res = await createCheckout("KRYPTON");
      alert(`Redirecting to upgrade payment: ${res.paymentUrl}`);
    } catch (error) {
      console.error("Upgrade failed", error);
    } finally {
      setUpgradeLoading(false);
    }
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Client Login
          </h1>
          <p className="text-gray-600 mb-8">
            Sign in to access your Krypton AI dashboard.
          </p>
          <Button className="w-full" onClick={handleLogin}>
            Sign in with Google
          </Button>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for the dashboard
  const companyName = "Acme Corp";
  const activePlan = "TERRA";
  const activeAgents = [
    { id: "1", name: "Assistant Pro", type: "assistant", status: "active" },
    { id: "2", name: "Marketing Genius", type: "marketing", status: "active" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">
                Krypton AI Client
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Company
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {companyName}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Plan
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">
                  {activePlan}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center p-6">
              <Button
                onClick={handleUpgrade}
                disabled={upgradeLoading}
                className="w-full h-full text-lg"
              >
                {upgradeLoading ? "Processing..." : "Upgrade Plan"}
              </Button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Active AI Agents
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {activeAgents.map((agent) => (
                <li key={agent.id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {agent.type.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {agent.name}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {agent.type}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {agent.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
