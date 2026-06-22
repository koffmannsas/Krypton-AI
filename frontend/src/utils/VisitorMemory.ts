import { ProspectInfo, MagicLinkContext, TrustedDevice } from "../types";

class VisitorMemorySystem {
  private COOKIE_NAME = "fiko_id";
  private STORAGE_KEY = "krypton_visitor_identity";
  private TRUSTED_DEVICES_KEY = "krypton_trusted_devices";

  /**
   * Génère une empreinte probabiliste du navigateur (Fingerprint)
   */
  public generateFingerprint(): string {
    const signature = [
      navigator.userAgent,
      navigator.language,
      screen.colorDepth,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      !!window.indexedDB,
      !!window.sessionStorage,
    ].join("###");

    let hash = 0;
    for (let i = 0; i < signature.length; i++) {
      const char = signature.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return "fiko_fp_" + Math.abs(hash).toString(36);
  }

  private setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie =
      name +
      "=" +
      (value || "") +
      expires +
      "; path=/; SameSite=Strict; Secure";
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Vérifie si l'appareil actuel est déjà de confiance pour cet utilisateur
   */
  public isDeviceTrusted(email: string): boolean {
    const devices: TrustedDevice[] = JSON.parse(
      localStorage.getItem(this.TRUSTED_DEVICES_KEY) || "[]",
    );
    const currentFp = this.generateFingerprint();
    return devices.some((d) => d.email === email && d.visitorId === currentFp);
  }

  /**
   * Ajoute l'appareil actuel à la liste de confiance (Double Validation)
   */
  public trustDevice(email: string) {
    const devices: TrustedDevice[] = JSON.parse(
      localStorage.getItem(this.TRUSTED_DEVICES_KEY) || "[]",
    );
    const currentFp = this.generateFingerprint();

    if (!this.isDeviceTrusted(email)) {
      const newDevice: TrustedDevice = {
        email,
        visitorId: currentFp,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };
      localStorage.setItem(
        this.TRUSTED_DEVICES_KEY,
        JSON.stringify([...devices, newDevice]),
      );
      console.log(`[SECURITY] Device trusted for ${email}`);
    }
  }

  public getIdentity(): ProspectInfo | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return null;
  }

  public saveIdentity(info: ProspectInfo) {
    const visitorId = this.generateFingerprint();
    const fullIdentity = {
      ...info,
      visitorId,
      lastSeen: new Date().toISOString(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fullIdentity));
    this.setCookie(this.COOKIE_NAME, visitorId, 365);
    this.trustDevice(info.email); // L'enregistrement initial vaut confiance device

    return fullIdentity;
  }

  public generateMagicLink(prospect: ProspectInfo, gate?: string): string {
    const context: MagicLinkContext = {
      prospect: { ...prospect, visitorId: this.generateFingerprint() },
      gate,
      timestamp: new Date().toISOString(),
    };
    const token = btoa(JSON.stringify(context));
    return `${window.location.origin}${window.location.pathname}?fiko_token=${token}`;
  }

  public decodeMagicToken(token: string): MagicLinkContext | null {
    try {
      const decoded = JSON.parse(atob(token));
      const date = new Date(decoded.timestamp);
      const now = new Date();
      if (now.getTime() - date.getTime() > 7 * 24 * 60 * 60 * 1000) return null;
      return decoded;
    } catch (e) {
      return null;
    }
  }

  public forget() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.setCookie(this.COOKIE_NAME, "", -1);
  }
}

export const visitorMemory = new VisitorMemorySystem();
