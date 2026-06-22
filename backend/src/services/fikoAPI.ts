export const sendToFiko = async (message: string) => {
  let userId = localStorage.getItem("fiko_user");

  if (!userId) {
    userId = "visitor_" + Date.now();
    localStorage.setItem("fiko_user", userId);
  }

  const res = await fetch("https://fikochatv2-gx7rkah46a-uc.a.run.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      userId,
    }),
  });

  return await res.json();
};
