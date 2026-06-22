import React, { useState, useEffect } from "react";
import { Page, UserProfile, FikoLead } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Search, 
  Bell, 
  Menu, 
  X,
  ShieldCheck,
  Zap,
  LogOut
} from "lucide-react";

// 🔥 FIREBASE
import { db } from "../../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

import FikoOnboardingOverlay from "../../components/FikoOnboardingOverlay";
import FikoWelcomeModal from "../../components/dashboard/FikoWelcomeModal";
import FikoDashboardGuide from "../../components/dashboard/FikoDashboardGuide";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardOverview from "../../components/dashboard/DashboardOverview";
import BusinessPanel from "../../components/dashboard/BusinessPanel";
import ProjectTracking from "../../components/dashboard/ProjectTracking";
import AgentsPanel from "../../components/dashboard/AgentsPanel";
import LeadsPanel from "../../components/dashboard/LeadsPanel";
import PricingPanel from "../../components/dashboard/PricingPanel";
import PaymentsPanel from "../../components/dashboard/PaymentsPanel";
import AccountPanel from "../../components/dashboard/AccountPanel";
import FikoTriggerEngine from "../../components/dashboard/FikoTriggerEngine";

interface ClientDashboardPageProps {
  onNavigate: (p: Page) => void;
  gate: string;
  user: UserProfile | null;
  onLogout: () => void;
  onUpdateUser: (profile: UserProfile) => void;
}

const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({
  onNavigate,
  user,
  onLogout,
  gate,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔥 DATA STATE
  const [leads, setLeads] = useState<FikoLead[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      onNavigate(Page.AUTH);
      return;
    }
    
    // Check local welcome status
    const hasSeenWelcome = localStorage.getItem('fiko_welcome_seen');
    const hasSeenTutorial = localStorage.getItem('fiko_tutorial_seen');
    
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    } else {
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
      if (user && user.onboardingCompleted === false) {
        setShowOnboarding(true);
      }
    }
    
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [user, onNavigate]);

  const handleWelcomeAccept = () => {
    localStorage.setItem('fiko_welcome_seen', 'true');
    setShowWelcome(false);
    const hasSeenTutorial = localStorage.getItem('fiko_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    } else if (user && user.onboardingCompleted === false) {
      setShowOnboarding(true);
    }
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('fiko_tutorial_seen', 'true');
    setShowTutorial(false);
  };

  // 🔥 REAL-TIME LEADS SYNC
  useEffect(() => {
    if (!user?.id && !user?.uid) return;
    const uid = user.uid || user.id;

    const q = query(
      collection(db, "leads"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FikoLead[];
      setLeads(data);
    }, (error) => {
      console.error("Leads Sync Error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // 🔥 REAL-TIME PAYMENTS SYNC
  useEffect(() => {
    if (!user?.id && !user?.uid) return;
    const uid = user.uid || user.id;

    const q = query(
      collection(db, "payments"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(data);
    }, (error) => {
      console.error("Payments Sync Error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // 🔥 OPPORTUNITY ENGINE
  useEffect(() => {
    const fetchOpportunities = async () => {
      if (user && !loading) {
         const { opportunityEngine } = await import('../../services/opportunityEngine');
         const opps = await opportunityEngine.detectOpportunities(user, leads, 0, 'PILOT');
         setOpportunities(opps);
      }
    };
    fetchOpportunities();
  }, [user, leads, loading]);

  const handleOpportunityAction = async (opp: any) => {
    const { opportunityEngine } = await import('../../services/opportunityEngine');
    if (opp.type === 'upgrade') {
       setActiveTab('upgrade');
    } else if (opp.type === 'activation_agents') {
       setActiveTab('agents');
    } else {
       setShowOnboarding(true);
    }
    await opportunityEngine.markAsConverted(opp.id);
    setOpportunities(prev => prev.filter(o => o.id !== opp.id));
  };

  const handleOpportunityDismiss = async (opp: any) => {
    const { opportunityEngine } = await import('../../services/opportunityEngine');
    await opportunityEngine.markAsClicked(opp.id);
    setOpportunities(prev => prev.filter(o => o.id !== opp.id));
  };


  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center gap-10">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="size-24 border-2 border-white/5 border-t-[#FF2718] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Rocket size={32} className="text-[#FF2718]" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Synchronisation Krypton HQ</p>
          <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-600 italic">Accès hautement sécurisé AES-512</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview user={user} leadsCount={leads.length} projectStatus="IA En Intégration" opportunities={opportunities} gate={gate} onNavigate={setActiveTab} onOpportunityAction={handleOpportunityAction} onOpportunityDismiss={handleOpportunityDismiss} />;
      case "business": return <BusinessPanel user={user} />;
      case "site": return <ProjectTracking />;
      case "agents": return <AgentsPanel />;
      case "leads": return <LeadsPanel leads={leads} />;
      case "upgrade": return <PricingPanel currentPlanId="MARS" />;
      case "billing": return <PaymentsPanel user={user} payments={payments} />;
      case "account": return <AccountPanel user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} />;
      default: return <DashboardOverview user={user} leadsCount={leads.length} projectStatus="IA En Intégration" opportunities={opportunities} gate={gate} onNavigate={setActiveTab} onOpportunityAction={handleOpportunityAction} onOpportunityDismiss={handleOpportunityDismiss} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex overflow-hidden relative">
      <AnimatePresence>
        {showWelcome && (
          <FikoWelcomeModal onAccept={handleWelcomeAccept} />
        )}
        {showOnboarding && !showWelcome && (
          <FikoOnboardingOverlay 
            user={user} 
            onComplete={() => setShowOnboarding(false)} 
          />
        )}
        {showTutorial && !showWelcome && !showOnboarding && (
          <FikoDashboardGuide onComplete={handleTutorialComplete} />
        )}
      </AnimatePresence>

      {/* SIDEBARS */}
      <div className="hidden lg:block">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      </div>
      
      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden"
            >
              <DashboardSidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false);
                }} 
                onLogout={onLogout} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR TOGGLE */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 left-6 z-50 p-4 bg-[#FF2718] rounded-full lg:hidden block shadow-xl shadow-red-500/20"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 bg-[#0B0B0F]">
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-10 sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" /> Protocole Sécurisé
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4 relative group cursor-pointer">
              <Search size={18} className="text-slate-500 group-hover:text-white transition-colors" />
              <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>
              <div className="relative hidden md:block">
                <Bell size={18} className="text-slate-500 hover:text-white transition-colors" />
                <div className="absolute -top-1 -right-1 size-2 bg-[#FF2718] rounded-full border-2 border-black"></div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:pl-8 md:border-l border-white/10">
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-black uppercase tracking-widest leading-none">{user.firstName} {user.lastName}</p>
                <p className="text-[9px] font-bold text-[#FF2718] uppercase tracking-widest mt-1">Krypton Member</p>
              </div>
              <div className="size-10 bg-[#FF2718] rounded-full flex items-center justify-center font-black italic">
                {user.firstName[0]}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all"
                  title="Se déconnecter"
                >
                  SE DÉCONNECTER
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Fiko Assistant CTA (Dashboard specific) */}
      <div className="fixed bottom-20 right-10 z-[60]">
        <FikoTriggerEngine user={user} opportunities={opportunities} onAccept={handleOpportunityAction} />
      </div>
    </div>
  );
};

export default ClientDashboardPage;
