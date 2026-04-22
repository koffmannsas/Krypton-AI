"use client";

import { useEffect, useState } from "react";
import { auth, signInWithGoogle, signOut } from "@krypton/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "@krypton/ui";
import { createPayment } from "@krypton/fiko";

export default function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpgrade = async () => {
    try {
      const res = await createPayment("KRYPTON");
      window.location.href = res.paymentUrl;
    } catch (error) {
      console.error("Upgrade failed", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Client Dashboard</h1>
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
        <h1>Client Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>{user.email}</span>
          <Button onClick={signOut}>Logout</Button>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h3>Entreprise</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Acme Corp</p>
        </div>
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h3>Plan Actif</h3>
          <p
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1a56db" }}
          >
            TERRA
          </p>
        </div>
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleUpgrade}>Upgrade Plan</Button>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
        }}
      >
        <h3>Agents IA Actifs</h3>
        <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
          <li
            style={{ padding: "0.5rem 0", borderBottom: "1px solid #e5e7eb" }}
          >
            Assistant IA - <span style={{ color: "green" }}>Actif</span>
          </li>
          <li style={{ padding: "0.5rem 0" }}>
            Marketing IA - <span style={{ color: "green" }}>Actif</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
