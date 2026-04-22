"use client";

import { createPayment } from "@krypton/fiko";
import { Button } from "@krypton/ui";

export default function Home() {
  const handleBuy = async (plan: string) => {
    try {
      const res = await createPayment(plan);
      window.location.href = res.paymentUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout");
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#1a56db" }}
      >
        Krypton AI
      </h1>

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
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Access</h2>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            200 000 FCFA
          </p>
          <Button onClick={() => handleBuy("ACCESS")}>Acheter Access</Button>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Terra</h2>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            700 000 FCFA
          </p>
          <Button onClick={() => handleBuy("TERRA")}>Acheter Terra</Button>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Mars</h2>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            1 900 000 FCFA
          </p>
          <Button onClick={() => handleBuy("MARS")}>Acheter Mars</Button>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Krypton</h2>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            3 900 000 FCFA
          </p>
          <Button onClick={() => handleBuy("KRYPTON")}>Acheter Krypton</Button>
        </div>
      </div>
    </div>
  );
}
