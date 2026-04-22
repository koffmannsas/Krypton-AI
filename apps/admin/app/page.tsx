"use client";

import { useEffect, useState } from "react";
import { auth, signInWithGoogle, signOut } from "@krypton/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "@krypton/ui";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalRevenue: number;
    totalClients: number;
  } | null>(null);

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
        setStats(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Admin Dashboard</h1>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>{user.email}</span>
          <Button onClick={signOut}>Logout</Button>
        </div>
      </header>

      <div
        style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h3>CA Total</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>
            {stats ? `${stats.totalRevenue.toLocaleString()} FCFA` : "..."}
          </p>
        </div>
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h3>Nombre Clients</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>
            {stats ? stats.totalClients : "..."}
          </p>
        </div>
      </div>
    </div>
  );
}
