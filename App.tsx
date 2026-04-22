import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  FikoFlowStep,
  UserProfile,
  UserRole,
  Agent,
  ProspectInfo,
} from "./types";
import { MASTER_AGENTS } from "./constants";
import { soundEngine } from "./utils/SoundEngine";
import { visitorMemory } from "./utils/VisitorMemory";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/home/HomePage";
import AgentsPage from "./pages/agents/AgentsPage";
import VoicePage from "./pages/voice/VoicePage";
import CRMPage from "./pages/crm/CRMPage";
import ScraperPage from "./pages/scraper/ScraperPage";
import TrustPage from "./pages/trust/TrustPage";
import PricingPage from "./pages/tarifs/PricingPage";
import SEOPage from "./pages/seo/SEOPage";
import ClientDashboardPage from "./pages/dashboard/ClientDashboardPage";
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage";
import AuthPage from "./pages/auth/AuthPage";
import AdminAuthPage from "./pages/auth/AdminAuthPage";
import WhitepaperPage from "./pages/whitepaper/WhitepaperPage";
import FikoLandingPage from "./pages/fiko/FikoLandingPage";
import FikoPage from "./pages/fiko/FikoPage";
import VivaLeadsPage from "./pages/viva/VivaLeadsPage";
import BillingPage from "./pages/billing/BillingPage";
import PaymentPage from "./pages/billing/PaymentPage";
import AccessOfferPage from "./pages/offers/AccessOfferPage";
import GateOfferPage from "./pages/offers/GateOfferPage";

import FikoHexaWidget from "./components/FikoHexaWidget";
import AIChatOverlay from "./components/AIChatOverlay";
import VocalSalesOverlay from "./components/VocalSalesOverlay";
import FikoCaptureModal from "./components/FikoCaptureModal";
import OrderModal from "./components/OrderModal";
import GateTransition from "./components/GateTransition";
import GateAuthModal from "./components/GateAuthModal";

import { CosmicProvider } from "./contexts/CosmicContext";
import CosmicBackground from "./components/CosmicBackground";

import { Hexagon, Volume2, VolumeX } from "lucide-react";

const App: React.FC = () => {
  const hostname = window.location.hostname;
  const urlParams = new URLSearchParams(window.location.search);

  const isClientApp =
    hostname === "clients.krypton-ia.tech" || urlParams.get("domain") === "client";
  const isAdminApp =
    hostname === "admin.krypton-ia.tech" || urlParams.get("domain") === "admin";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [prospect, setProspect] = useState<ProspectInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [fikoChat, setFikoChat] = useState({ open: false, agent: null as Agent | null });
  const [fikoVocal, setFikoVocal] = useState({ open: false });

  const [activeGateTransition, setActiveGateTransition] = useState<string | null>(null);
  const [showGateAuth, setShowGateAuth] = useState<string | null>(null);
  const [orderModal, setOrderModal] = useState({ open: false, porte: "" });
  const [selectedGate, setSelectedGate] = useState<string>("MARS");

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
    const memoryIdentity = visitorMemory.getIdentity();
    if (memoryIdentity) setProspect(memoryIdentity);
  }, [soundEnabled]);

  // 🔥 AUTH FIXED
  useEffect(() => {
    let unsubscribe: any;

    const initAuth = async () => {
      try {
        const { auth, db } = await import("./firebase");
        const { doc, getDoc } = await import("firebase/firestore");

        unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
              if (userDoc.exists()) {
                const profile = userDoc.data() as UserProfile;

                if (
                  isAdminApp &&
                  profile.role !== UserRole.ADMIN &&
                  profile.role !== UserRole.SUPER_ADMIN
                ) {
                  await auth.signOut();
                  return;
                }

                if (
                  isClientApp &&
                  (profile.role === UserRole.ADMIN ||
                    profile.role === UserRole.SUPER_ADMIN)
                ) {
                  await auth.signOut();
                  return;
                }

                setUser(profile);

                // FORCE the redirection
                setCurrentPage(prev => {
                  if (prev === Page.HOME || prev === Page.AUTH || prev === Page.SIGNUP) {
                    return (profile.role === UserRole.ADMIN || profile.role === UserRole.SUPER_ADMIN)
                      ? Page.ADMIN_DASHBOARD
                      : Page.CLIENT_DASHBOARD;
                  }
                  return prev;
                });
              } else {
                 console.warn("User document not found in onAuthStateChanged");
              }
            } catch (err) {
              console.error("USER ERROR:", err);
            }
          } else {
            setUser(null);
          }
        });
      } catch (err) {
        console.error("AUTH INIT ERROR:", err);
      }
    };

    initAuth();
    return () => unsubscribe && unsubscribe();
  }, [isAdminApp, isClientApp]);

  const [paymentState, setPaymentState] = useState<{ plan: any, user: UserProfile } | null>(null);

  const navigateTo = useCallback((page: Page, state?: any) => {
    console.log("Navigating to:", page);
    if (page === Page.PAYMENT && state) {
      setPaymentState(state);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleLoginSuccess = useCallback((profile: UserProfile) => {
    setUser(profile);
    if (profile.role === UserRole.SUPER_ADMIN || profile.role === UserRole.ADMIN) {
      navigateTo(Page.ADMIN_DASHBOARD);
    } else {
      navigateTo(Page.CLIENT_DASHBOARD);
    }
  }, [navigateTo]);

  const handleLogout = useCallback(async () => {
    const { auth } = await import("./firebase");
    await auth.signOut();
    setUser(null);
    navigateTo(Page.HOME);
  }, [navigateTo]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage onNavigate={navigateTo} onOpenFiko={() => setFikoVocal({ open: true })} />;
      case Page.AUTH:
        return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} initialMode="login" />;
      case Page.SIGNUP:
        return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} initialMode="signup" />;
      case Page.CLIENT_DASHBOARD:
        return <ClientDashboardPage user={user} onNavigate={navigateTo} onLogout={handleLogout} gate={selectedGate} />;
      case Page.ADMIN_DASHBOARD:
        return <AdminDashboardPage user={user} onNavigate={navigateTo} onLogout={handleLogout} />;
      case Page.AGENTS:
        return (
          <AgentsPage 
            onNavigate={navigateTo} 
            onOpenFiko={() => setFikoVocal({ open: true })} 
            onOpenChat={(agent) => setFikoChat({ open: true, agent })}
          />
        );
      case Page.VOICE:
        return <VoicePage onNavigate={navigateTo} />;
      case Page.CRM:
        return <CRMPage onNavigate={navigateTo} />;
      case Page.SCRAPER:
        return <ScraperPage onNavigate={navigateTo} />;
      case Page.TRUST:
        return <TrustPage onNavigate={navigateTo} />;
      case Page.PRICING:
        return <PricingPage onNavigate={navigateTo} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate || "" })} />;
      case Page.SEO:
        return <SEOPage onNavigate={navigateTo} keyword="intelligence-artificielle" />;
      case Page.ADMIN_AUTH:
        return <AdminAuthPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} />;
      case Page.WHITEPAPER:
        return <WhitepaperPage onNavigate={navigateTo} />;
      case Page.FIKO:
        return (
          <FikoLandingPage 
            onNavigate={navigateTo} 
            onOpenVocal={() => setFikoVocal({ open: true })} 
            onOpenChat={() => setFikoChat({ open: true, agent: MASTER_AGENTS[0] })}
            onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })}
          />
        );
      case Page.FIKO_AUDIT:
        return <FikoPage onNavigate={navigateTo} prospect={prospect || undefined} onOpenGate={(gate) => navigateTo(Page.PRICING)} />;
      case Page.VIVA_LEADS:
        return <VivaLeadsPage onNavigate={navigateTo} user={user} />;
      case Page.BILLING:
        return <BillingPage onNavigate={navigateTo} user={user} />;
      case Page.PAYMENT:
        return paymentState ? <PaymentPage plan={paymentState.plan} user={paymentState.user} /> : <HomePage onNavigate={navigateTo} onOpenFiko={() => setFikoVocal({ open: true })} />;
      case Page.ACCESS_OFFER:
        return <AccessOfferPage onNavigate={navigateTo} onOpenVocal={() => setFikoVocal({ open: true })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} />;
      case Page.TERRA_OFFER:
        return <GateOfferPage gate="TERRA" onNavigate={navigateTo} onOpenVocal={() => setFikoVocal({ open: true })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} />;
      case Page.MARS_OFFER:
        return <GateOfferPage gate="MARS" onNavigate={navigateTo} onOpenVocal={() => setFikoVocal({ open: true })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} />;
      case Page.KRYPTON_OFFER:
        return <GateOfferPage gate="KRYPTON" onNavigate={navigateTo} onOpenVocal={() => setFikoVocal({ open: true })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} />;
      case Page.GALAXY_OFFER:
        return <GateOfferPage gate="GALAXY" onNavigate={navigateTo} onOpenVocal={() => setFikoVocal({ open: true })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} />;
      default:
        return <HomePage onNavigate={navigateTo} onOpenFiko={() => setFikoVocal({ open: true })} />;
    }
  };

  const isClientDashboard = currentPage === Page.CLIENT_DASHBOARD;

  return (
    <CosmicProvider>
      <div className="min-h-screen bg-black text-white flex flex-col relative">
        <CosmicBackground />

        {!isClientDashboard && <Navbar activePage={currentPage} onNavigate={navigateTo} user={user} onLogout={handleLogout} />}

        <main className={`flex-grow ${isClientDashboard ? 'pb-0' : ''}`}>{renderPage()}</main>

        {!isClientDashboard ? (
          <Footer onNavigate={navigateTo} />
        ) : (
          <div className="sticky bottom-0 z-50 w-full bg-[#0A0A0C] border-t border-[#E10600]/20 py-4 flex items-center justify-center backdrop-blur-xl">
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-[#E10600] m-0 drop-shadow-[0_0_8px_rgba(225,6,0,0.3)]">
              KOFFMANN GROUP
            </h1>
          </div>
        )}

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="fixed bottom-6 right-6"
        >
          {soundEnabled ? <Volume2 /> : <VolumeX />}
        </button>

        {currentPage === Page.HOME && (
          <FikoHexaWidget onClick={() => setFikoVocal({ open: true })} />
        )}

        {fikoVocal.open && (
          <VocalSalesOverlay
            agent={MASTER_AGENTS[0]}
            prospectName={prospect?.firstName || "Visiteur"}
            onClose={() => setFikoVocal({ open: false })}
            onOpenCheckout={(porte) => setOrderModal({ open: true, porte })}
          />
        )}
      </div>
    </CosmicProvider>
  );
};

export default App;