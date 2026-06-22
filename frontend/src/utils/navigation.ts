import { auth } from "../firebase";

/**
 * Smart SaaS URL generator.
 * In development / local environments, keeps the user on the same local server.
 * In production, redirects to the production SaaS domain.
 */
export const getSaaSUrl = (path: string, plan?: string) => {
  const hostname = window.location.hostname;
  const isDev =
    hostname.includes("localhost") ||
    hostname.includes("run.app") ||
    hostname.includes("webcontainer") ||
    hostname.includes("aistudio");

  const baseUrl = isDev ? "" : "https://connect.krypton-ia.tech";
  const separator = path.startsWith("/") ? "" : "/";
  let url = `${baseUrl}${separator}${path}`;
  if (plan) {
    url += `?plan=${plan.toLowerCase()}`;
  }
  return url;
};

/**
 * Track events to Google Analytics & Firebase Analytics
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  console.log(`[Tracking Event] ${eventName}`, params);

  // Send to Google Analytics (gtag) if loaded
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }

  // Send to other tracking listeners
  if (typeof (window as any).dataLayer !== "undefined") {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};

/**
 * Safe navigation helper that checks auth state to direct users
 * either to Dashboard or Login, following SaaS logic.
 */
export const handleSmartRedirect = (
  isLoggedIn: boolean,
  actionLabel: string,
  plan?: string
) => {
  trackEvent("landing_cta_click", {
    cta_label: actionLabel,
    plan: plan || "none",
    is_logged_in: isLoggedIn,
  });

  const targetPath = isLoggedIn ? "/dashboard" : "/login";
  window.location.href = getSaaSUrl(targetPath, plan);
};
