import React, { useState, useCallback, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import {
  Page,
  UserProfile,
  UserRole,
  Agent,
  ProspectInfo,
} from "./types";
import { ROUTES } from "./routes.config";
import { soundEngine } from "./utils/SoundEngine";
import { visitorMemory } from "./utils/VisitorMemory";
import { MASTER_AGENTS } from "./constants";

import SEO from "./components/SEO";
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
import BlogGridPage from "./pages/blog/BlogGridPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import { BLOG_POSTS } from "./data/blogPosts";
import TopicalPillarPage from "./pages/seo/TopicalPillarPage";
import ProgrammaticPage from "./pages/seo/ProgrammaticPage";
import VivaLeadsPage from "./pages/viva/VivaLeadsPage";
import BillingPage from "./pages/billing/BillingPage";
import FikoAddonOfferPage from "./pages/offers/FikoAddonOfferPage";
import PaymentPage from "./pages/billing/PaymentPage";
import AccessOfferPage from "./pages/offers/AccessOfferPage";
import GateOfferPage from "./pages/offers/GateOfferPage";

import FikoHexaWidget from "./components/FikoHexaWidget";
import AIChatOverlay from "./components/AIChatOverlay";
import VocalSalesOverlay from "./components/VocalSalesOverlay";
import OrderModal from "./components/OrderModal";
import GateTransition from "./components/GateTransition";
import GateAuthModal from "./components/GateAuthModal";

import { CosmicProvider } from "./contexts/CosmicContext";
import CosmicBackground from "./components/CosmicBackground";

import { Volume2, VolumeX } from "lucide-react";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hostname = window.location.hostname;
  const urlParams = new URLSearchParams(window.location.search);

  const isClientApp =
    hostname === "clients.krypton-ia.tech" || urlParams.get("domain") === "client";
  const isAdminApp =
    hostname === "admin.krypton-ia.tech" || urlParams.get("domain") === "admin";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [prospect, setProspect] = useState<ProspectInfo | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [fikoChat, setFikoChat] = useState({ open: false, agent: null as Agent | null });
  const [fikoVocal, setFikoVocal] = useState<{ open: boolean; initialPorte?: string }>({ open: false });

  const [activeGateTransition, setActiveGateTransition] = useState<string | null>(null);
  const [showGateAuth, setShowGateAuth] = useState<string | null>(null);
  const [orderModal, setOrderModal] = useState({ open: false, porte: "" });
  const [selectedGate, setSelectedGate] = useState<string>("MARS");

  const [paymentState, setPaymentState] = useState<{ plan: any; user: UserProfile } | null>(null);

  // Legacy Query Redirection (Atomic 301-like)
  useEffect(() => {
    const p = urlParams.get("p");
    if (p) {
      const pageMapping: Record<string, Page> = {
        tarifs: Page.PRICING,
        agents: Page.AGENTS,
        fiko: Page.FIKO,
        viva: Page.VIVA_LEADS,
        voice: Page.VOICE,
        crm: Page.CRM,
        scraper: Page.SCRAPER,
        trust: Page.TRUST,
        seo: Page.SEO,
        whitepaper: Page.WHITEPAPER,
      };
      const targetPage = pageMapping[p.toLowerCase()];
      if (targetPage && ROUTES[targetPage]) {
        navigate(ROUTES[targetPage].path, { replace: true });
      }
    }
  }, [navigate, urlParams]);

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
    const memoryIdentity = visitorMemory.getIdentity();
    if (memoryIdentity) setProspect(memoryIdentity);
  }, [soundEnabled]);

  // Auth logic
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

                if (isAdminApp && profile.role !== UserRole.ADMIN && profile.role !== UserRole.SUPER_ADMIN) {
                  await auth.signOut();
                  return;
                }

                if (isClientApp && (profile.role === UserRole.ADMIN || profile.role === UserRole.SUPER_ADMIN)) {
                  await auth.signOut();
                  return;
                }

                setUser(profile);

                // Auto-redirect on login if on landing/auth pages
                const publicPaths = [ROUTES[Page.HOME].path, ROUTES[Page.AUTH].path, ROUTES[Page.SIGNUP].path];
                if (publicPaths.includes(location.pathname)) {
                   if (profile.role === UserRole.ADMIN || profile.role === UserRole.SUPER_ADMIN) {
                     navigate(ROUTES[Page.ADMIN_DASHBOARD].path);
                   } else {
                     navigate(ROUTES[Page.CLIENT_DASHBOARD].path);
                   }
                }
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
  }, [isAdminApp, isClientApp, location.pathname, navigate]);

  const navigateTo = useCallback(
    (page: Page, state?: any) => {
      if (page === Page.PAYMENT && state) {
        setPaymentState(state);
      }
      const route = ROUTES[page];
      if (route) {
        navigate(route.path);
      }
    },
    [navigate]
  );

  const handleLoginSuccess = useCallback(
    (profile: UserProfile) => {
      setUser(profile);
      if (profile.role === UserRole.SUPER_ADMIN || profile.role === UserRole.ADMIN) {
        navigate(ROUTES[Page.ADMIN_DASHBOARD].path);
      } else {
        navigate(ROUTES[Page.CLIENT_DASHBOARD].path);
      }
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    const { auth } = await import("./firebase");
    await auth.signOut();
    setUser(null);
    navigate(ROUTES[Page.HOME].path);
  }, [navigate]);

  const isClientDashboard = location.pathname === ROUTES[Page.CLIENT_DASHBOARD].path;
  const isAdminDashboard = location.pathname === ROUTES[Page.ADMIN_DASHBOARD].path;
  const isAnyDashboard = isClientDashboard || isAdminDashboard;

  // Find active page from path for Navbar highlights
  const activePageEnum = Object.values(ROUTES).find(r => r.path === location.pathname)?.enum || Page.HOME;

  const PageWrapper = ({ children, config }: { children: React.ReactNode; config: typeof ROUTES[Page.HOME] }) => (
    <>
      <SEO title={config.title} description={config.description} canonical={config.path} />
      {children}
    </>
  );

  const CategoryPageWrapper = () => {
    const { slug } = useParams();
    const config = ROUTES[Page.CATEGORY];
    const displayKeyword = slug?.replace(/-/g, " ") || "";
    const title = config.title.replace("%s", displayKeyword);
    const description = config.description.replace("%s", displayKeyword);
    
    return (
      <>
        <SEO title={title} description={description} canonical={`/recherche/${slug}`} />
        <SEOPage onNavigate={navigateTo} keyword={displayKeyword} />
      </>
    );
  };

  const BlogPostWrapper = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
    const { slug } = useParams();
    const post = BLOG_POSTS.find(p => p.slug === slug);
    const title = post ? post.title : 'Article Introuvable | Krypton AI';
    const description = post ? post.excerpt : 'Cet article n\'existe plus ou a été déplacé.';

    return (
      <>
        <SEO title={title} description={description} canonical={`/blog/${slug}`} />
        <BlogPostPage onNavigate={onNavigate} />
      </>
    );
  };

  const ProgrammaticPageWrapper = () => {
    const { slug } = useParams<{ slug: string }>();
    return <ProgrammaticPage onNavigate={navigateTo} />;
  };

  return (
    <CosmicProvider>
      <div className="min-h-screen bg-black text-white flex flex-col relative">
        <CosmicBackground />

        {!isAnyDashboard && (
          <Navbar
            user={user}
            onLogout={handleLogout}
          />
        )}

        <main className={`flex-grow ${isAnyDashboard ? "pb-0" : ""}`}>
          <Routes>
            <Route path={ROUTES[Page.HOME].path} element={<PageWrapper config={ROUTES[Page.HOME]}><HomePage onNavigate={navigateTo} onOpenFiko={(gate) => setFikoVocal({ open: true, initialPorte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.AUTH].path} element={<PageWrapper config={ROUTES[Page.AUTH]}><AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} initialMode="login" /></PageWrapper>} />
            <Route path={ROUTES[Page.SIGNUP].path} element={<PageWrapper config={ROUTES[Page.SIGNUP]}><AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} initialMode="signup" /></PageWrapper>} />
            <Route path={ROUTES[Page.AGENTS].path} element={<PageWrapper config={ROUTES[Page.AGENTS]}><AgentsPage onNavigate={navigateTo} onOpenFiko={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenChat={(agent) => setFikoChat({ open: true, agent })} /></PageWrapper>} />
            <Route path={ROUTES[Page.PRICING].path} element={<PageWrapper config={ROUTES[Page.PRICING]}><PricingPage onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate || "" })} /></PageWrapper>} />
            <Route path={ROUTES[Page.VOICE].path} element={<PageWrapper config={ROUTES[Page.VOICE]}><VoicePage onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.CRM].path} element={<PageWrapper config={ROUTES[Page.CRM]}><CRMPage onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.SCRAPER].path} element={<PageWrapper config={ROUTES[Page.SCRAPER]}><ScraperPage onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.TRUST].path} element={<PageWrapper config={ROUTES[Page.TRUST]}><TrustPage onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.SEO].path} element={<PageWrapper config={ROUTES[Page.SEO]}><SEOPage onNavigate={navigateTo} keyword="intelligence-artificielle" /></PageWrapper>} />
            <Route path="/recherche/:slug" element={<CategoryPageWrapper />} />
            <Route path={ROUTES[Page.BLOG].path} element={<PageWrapper config={ROUTES[Page.BLOG]}><BlogGridPage onNavigate={navigateTo} /></PageWrapper>} />
            <Route path="/blog/:slug" element={<BlogPostWrapper onNavigate={navigateTo} />} />

            {/* Topical Pillars */}
            <Route path={ROUTES[Page.PILLAR_SITE_WEB].path} element={<PageWrapper config={ROUTES[Page.PILLAR_SITE_WEB]}><TopicalPillarPage topicId="site-web-ia" onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.PILLAR_AGENTS_IA].path} element={<PageWrapper config={ROUTES[Page.PILLAR_AGENTS_IA]}><TopicalPillarPage topicId="agents-ia" onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.PILLAR_ACQUISITION].path} element={<PageWrapper config={ROUTES[Page.PILLAR_ACQUISITION]}><TopicalPillarPage topicId="acquisition-leads" onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.CRM].path} element={<PageWrapper config={ROUTES[Page.CRM]}><TopicalPillarPage topicId="crm-intelligent" onNavigate={navigateTo} /></PageWrapper>} />
            
            {/* Programmatic SEO Routes */}
            <Route path="/:slug" element={<ProgrammaticPageWrapper />} />

            <Route path={ROUTES[Page.WHITEPAPER].path} element={<PageWrapper config={ROUTES[Page.WHITEPAPER]}><WhitepaperPage onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.FIKO].path} element={<PageWrapper config={ROUTES[Page.FIKO]}><FikoLandingPage onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenChat={() => setFikoChat({ open: true, agent: MASTER_AGENTS[0] })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.FIKO_AUDIT].path} element={<PageWrapper config={ROUTES[Page.FIKO_AUDIT]}><FikoPage onNavigate={navigateTo} prospect={prospect || undefined} onOpenGate={() => navigateTo(Page.PRICING)} /></PageWrapper>} />
            <Route path={ROUTES[Page.VIVA_LEADS].path} element={<PageWrapper config={ROUTES[Page.VIVA_LEADS]}><VivaLeadsPage onNavigate={navigateTo} user={user} /></PageWrapper>} />
            <Route path={ROUTES[Page.BILLING].path} element={<PageWrapper config={ROUTES[Page.BILLING]}><BillingPage onNavigate={navigateTo} user={user} /></PageWrapper>} />
            <Route path={ROUTES[Page.PAYMENT].path} element={<PageWrapper config={ROUTES[Page.PAYMENT]}>{paymentState ? <PaymentPage plan={paymentState.plan} user={paymentState.user} /> : <Navigate to="/" />}</PageWrapper>} />
            
            {/* Admin Routes */}
            <Route path={ROUTES[Page.ADMIN_AUTH].path} element={<PageWrapper config={ROUTES[Page.ADMIN_AUTH]}><AdminAuthPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} /></PageWrapper>} />
            <Route path={ROUTES[Page.ADMIN_DASHBOARD].path} element={<PageWrapper config={ROUTES[Page.ADMIN_DASHBOARD]}>{user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN ? <AdminDashboardPage user={user} onNavigate={navigateTo} onLogout={handleLogout} /> : <Navigate to="/admin/auth" />}</PageWrapper>} />
            
            {/* Offer Routes */}
            <Route path={ROUTES[Page.ACCESS_OFFER].path} element={<PageWrapper config={ROUTES[Page.ACCESS_OFFER]}><AccessOfferPage onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.TERRA_OFFER].path} element={<PageWrapper config={ROUTES[Page.TERRA_OFFER]}><GateOfferPage gate="TERRA" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.MARS_OFFER].path} element={<PageWrapper config={ROUTES[Page.MARS_OFFER]}><GateOfferPage gate="MARS" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.KRYPTON_OFFER].path} element={<PageWrapper config={ROUTES[Page.KRYPTON_OFFER]}><GateOfferPage gate="KRYPTON" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.GALAXY_OFFER].path} element={<PageWrapper config={ROUTES[Page.GALAXY_OFFER]}><GateOfferPage gate="GALAXY" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            
            {/* Fiko Addons */}
            <Route path={ROUTES[Page.FIKO_SOLO_OFFER].path} element={<PageWrapper config={ROUTES[Page.FIKO_SOLO_OFFER]}><FikoAddonOfferPage addon="SOLO" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.FIKO_PILOT_OFFER].path} element={<PageWrapper config={ROUTES[Page.FIKO_PILOT_OFFER]}><FikoAddonOfferPage addon="PILOT" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.FIKO_ELITE_OFFER].path} element={<PageWrapper config={ROUTES[Page.FIKO_ELITE_OFFER]}><FikoAddonOfferPage addon="ELITE" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            <Route path={ROUTES[Page.FIKO_EMPIRE_OFFER].path} element={<PageWrapper config={ROUTES[Page.FIKO_EMPIRE_OFFER]}><FikoAddonOfferPage addon="EMPIRE" onNavigate={navigateTo} onOpenVocal={(gate) => setFikoVocal({ open: true, initialPorte: gate })} onOpenFiko={(gate) => setOrderModal({ open: true, porte: gate })} /></PageWrapper>} />
            
            {/* Client Dashboard */}
            <Route path={ROUTES[Page.CLIENT_DASHBOARD].path} element={<PageWrapper config={ROUTES[Page.CLIENT_DASHBOARD]}>{user ? <ClientDashboardPage user={user} onNavigate={navigateTo} onLogout={handleLogout} gate={selectedGate} /> : <Navigate to="/connexion" />}</PageWrapper>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {!isAnyDashboard ? (
          <Footer />
        ) : (
          <div className="sticky bottom-0 z-50 w-full bg-[#0A0A0C] border-t border-[#FF2718]/20 py-4 flex items-center justify-center backdrop-blur-xl">
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF2718] m-0 drop-shadow-[0_0_8px_rgba(255,39,24,0.3)]">
              KOFFMANN GROUP
            </h1>
          </div>
        )}

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="fixed bottom-6 right-6 z-50"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        {location.pathname === ROUTES[Page.HOME].path && (
          <FikoHexaWidget onClick={() => setFikoVocal({ open: true })} />
        )}

        {fikoVocal.open && (
          <VocalSalesOverlay
            agent={MASTER_AGENTS[0]}
            prospectName={prospect?.firstName || "Visiteur"}
            onClose={() => setFikoVocal({ open: false })}
            onOpenCheckout={(porte) => {
              setFikoVocal({ open: false });
              setOrderModal({ open: true, porte });
            }}
            initialPorte={fikoVocal.initialPorte}
          />
        )}

        {orderModal.open && (
          <OrderModal
            onClose={() => setOrderModal({ open: false, porte: "" })}
            porte={orderModal.porte}
            onComplete={(p) => {
              setOrderModal({ open: false, porte: "" });
              setShowGateAuth(p);
            }}
          />
        )}

        {showGateAuth && (
          <GateAuthModal
            onClose={() => setShowGateAuth(null)}
            gate={showGateAuth}
            onSuccess={() => {
              const currentGate = showGateAuth;
              setShowGateAuth(null);
              setActiveGateTransition(currentGate);
            }}
          />
        )}

        {activeGateTransition !== null && (
          <GateTransition
            gate={activeGateTransition}
            onComplete={() => {
              setActiveGateTransition(null);
              navigate(ROUTES[Page.CLIENT_DASHBOARD].path);
            }}
          />
        )}
      </div>
    </CosmicProvider>
  );
};

export default App;
