import React, { useState } from "react";
import { createCheckout } from "../../packages/fiko";
import { Button } from "../../packages/ui/Button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBuy = async (plan: string) => {
    try {
      setLoading(plan);
      const res = await createCheckout(plan);
      // In a real app, we would redirect to the payment URL
      // window.location.href = res.paymentUrl;
      alert(`Redirecting to Fiko Pay: ${res.paymentUrl}`);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "ACCESS",
      name: "Access",
      price: "200 000 FCFA",
      features: ["Assistant IA"],
    },
    {
      id: "TERRA",
      name: "Terra",
      price: "700 000 FCFA",
      features: ["Assistant IA", "Marketing IA"],
    },
    {
      id: "MARS",
      name: "Mars",
      price: "1 900 000 FCFA",
      features: ["Assistant IA", "Marketing IA", "Sales IA", "SAV IA"],
    },
    {
      id: "KRYPTON",
      name: "Krypton",
      price: "3 900 000 FCFA",
      features: ["All Agents", "Custom Models", "Dedicated Support"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Krypton AI</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate("/client")}>
            Client Login
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            Admin Login
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Supercharge your business with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the right plan for your company and get access to our suite
            of specialized AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-3xl font-extrabold text-blue-600 mb-6">
                {plan.price}
              </p>
              <ul className="mb-8 flex-grow space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                onClick={() => handleBuy(plan.id)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? "Processing..." : `Acheter ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
