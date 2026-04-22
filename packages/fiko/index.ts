export async function createPayment(
  plan: string,
): Promise<{ paymentUrl: string }> {
  const response = await fetch("/api/fiko/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
  });

  if (!response.ok) {
    throw new Error("Failed to create checkout");
  }

  return response.json();
}
