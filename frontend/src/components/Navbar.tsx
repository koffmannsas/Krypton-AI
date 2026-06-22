import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Page, UserProfile } from "../types";
import { ROUTES } from "../routes.config";
import { NAV_LINKS } from "../constants";
import { Bolt, User, LayoutDashboard, LogOut, Menu, X, ChevronDown, Zap, Smartphone, Send, Info, HelpCircle, BookOpen, Users, Star } from "lucide-react";
import { getSaaSUrl, trackEvent } from "../utils/navigation";

interface NavbarProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"hub" | "resources" | null>(null);

  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/60 backdrop-blur-lg px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 relative">
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <Link
          to={ROUTES[Page.HOME].path}
          className="flex items-center gap-3 group absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 whitespace-nowrap"
        >
          <div className="w-8 h-8 bg-[#FF2718] flex items-center justify-center rounded-sm shadow-lg shadow-red-500/20 group-hover:rotate-12 transition-transform">
            <Bolt className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase">
            Krypton <span className="text-[#FF2718]">AI</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {/* Render Accueil first */}
          {NAV_LINKS.filter(link => link.id === Page.HOME).map((link) => {
            const config = ROUTES[link.id];
            const isActive = location.pathname === config.path;
            return (
              <Link
                key={link.id}
                to={config.path}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 ${
                  isActive ? "text-[#FF2718]" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#FF2718] transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            );
          })}

          {/* Fiko HUB Mega Menu */}
          <div 
            className="relative group/hub"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveMenu(activeMenu === "hub" ? null : "hub");
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white py-2 flex items-center gap-1.5 transition-colors"
            >
              Fiko HUB
              <ChevronDown size={10} className="group-hover/hub:rotate-180 transition-transform" />
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[480px] pt-2 z-50 transition-all duration-200 ${
              activeMenu === "hub"
                ? "grid opacity-100 pointer-events-auto"
                : "hidden group-hover/hub:grid opacity-0 group-hover/hub:opacity-100 pointer-events-none group-hover/hub:pointer-events-auto"
            }`}>
              <div className="bg-black backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-6 grid grid-cols-1 gap-4">
                <Link to={ROUTES[Page.FIKO].path} className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-[#FF2718]/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-[#FF2718] transition-colors">
                    <Zap size={20} className="text-[#FF2718] group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">Fiko AI</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">
                      La première intelligence artificielle business conçue en Afrique, pour aider les entreprises africaines à automatiser, développer et accélérer leur croissance.
                    </div>
                  </div>
                </Link>
                
                <Link to={ROUTES[Page.FIKO_CONNECT].path} className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-green-500 transition-colors">
                    <Smartphone size={20} className="text-green-500 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">FiKO CONNECT</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">
                      La première plateforme intelligente d’automatisation WhatsApp conçue en Afrique, pour transformer les conversations des entreprises africaines en clients.
                    </div>
                  </div>
                </Link>

                <Link to={ROUTES[Page.FIKO_SEND].path} className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-blue-500 transition-colors">
                    <Send size={20} className="text-blue-500 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">FIKO SEND</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">
                      La première plateforme unifiée SMS & Emailing conçue en Afrique, pour propulser le marketing des entreprises africaines.
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Render remaining links */}
          {NAV_LINKS.filter(link => link.label !== "Blog" && link.id !== Page.HOME).map((link) => {
            const config = ROUTES[link.id];
            const isActive = location.pathname === config.path;
            
            return (
              <Link
                key={link.id}
                to={config.path}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 ${
                  isActive
                    ? "text-[#FF2718]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#FF2718] transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}
          {/* Mega Menu Ressources */}
          <div 
            className="relative group/resources"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveMenu(activeMenu === "resources" ? null : "resources");
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white py-2 flex items-center gap-1.5 transition-colors"
            >
              Ressources
              <ChevronDown size={10} className="group-hover/resources:rotate-180 transition-transform" />
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[480px] pt-2 z-50 transition-all duration-200 ${
              activeMenu === "resources"
                ? "grid opacity-100 pointer-events-auto"
                : "hidden group-hover/resources:grid opacity-0 group-hover/resources:opacity-100 pointer-events-none group-hover/resources:pointer-events-auto"
            }`}>
              <div className="bg-black backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-6 grid grid-cols-1 gap-4">
                <Link to="/about" className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-purple-500 transition-colors">
                    <Info size={20} className="text-purple-500 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">Qui sommes-nous</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Découvrez la vision et l'équipe derrière Krypton IA, propulseur de business.</div>
                  </div>
                </Link>
                <Link to="/assistance" className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-orange-500 transition-colors">
                    <HelpCircle size={20} className="text-orange-500 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">Fiko Assistance</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Besoin d'aide pour configurer votre agent ou exploiter vos outils FIKO ?</div>
                  </div>
                </Link>
                <Link to="/blog" className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-pink-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-pink-500 transition-colors">
                    <BookOpen size={20} className="text-pink-500 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">Blog & Stratégies</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Analyses, études de cas et veilles technologiques sur l'IA pour entreprise.</div>
                  </div>
                </Link>
                <Link to="/ambassadeurs" className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-yellow-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500 transition-colors">
                    <Users size={20} className="text-yellow-500 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">Ambassadeurs</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">Rejoignez l'élite et devez partenaire de la révolution IA en Afrique.</div>
                  </div>
                </Link>
                <Link to={ROUTES[Page.EGERIE].path} className="group/item flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-all">
                  <div className="size-10 bg-yellow-600/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-yellow-600 transition-colors">
                    <Star size={20} className="text-yellow-600 group-hover/item:text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-white mb-1 tracking-wider">FIKO ÉGÉRIE</div>
                    <div className="text-[10px] leading-relaxed text-slate-500 font-medium italic">L'élite mondiale et le prestige digital au service de votre héritage.</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-20 left-0 w-full bg-black backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-6 h-[calc(100vh-5rem)] overflow-y-auto">
            
            {/* Mobile Accueil first */}
            <Link
              to={ROUTES[Page.HOME].path}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF2718] py-2"
            >
              Accueil
            </Link>

            <div className="h-px bg-white/5" />

            {/* Mobile Fiko HUB */}
            <div className="flex flex-col gap-3">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2718] mb-2 opacity-60">Fiko HUB</div>
              <Link to={ROUTES[Page.FIKO].path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-[#FF2718]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Zap size={16} className="text-[#FF2718]" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Fiko AI</span>
              </Link>
              <Link to={ROUTES[Page.FIKO_CONNECT].path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Smartphone size={16} className="text-green-500" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Fiko Connect</span>
              </Link>
              <Link to={ROUTES[Page.FIKO_SEND].path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Send size={16} className="text-blue-500" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Fiko Send</span>
              </Link>
            </div>

            <div className="h-px bg-white/5" />

            {/* Other Mobile Links */}
            {NAV_LINKS.filter(link => link.label !== "Blog" && link.id !== Page.HOME).map((link) => {
              const config = ROUTES[link.id];
              return (
                <Link
                  key={link.id}
                  to={config.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all"
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="h-px bg-white/5" />

            <div className="flex flex-col gap-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white opacity-60">Ressources</div>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Info size={16} className="text-purple-500" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Qui sommes-nous</span>
              </Link>
              <Link to="/assistance" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-orange-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <HelpCircle size={16} className="text-orange-500" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Assistance</span>
              </Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-pink-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen size={16} className="text-pink-500" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Blog</span>
              </Link>
              <Link to="/ambassadeurs" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-yellow-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Users size={16} className="text-yellow-500" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Ambassadeurs</span>
              </Link>
              <Link to={ROUTES[Page.EGERIE].path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 group">
                <div className="size-8 bg-yellow-600/10 rounded-lg flex items-center justify-center shrink-0">
                  <Star size={16} className="text-yellow-600" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">FIKO ÉGÉRIE</span>
              </Link>
            </div>

            <div className="border-t border-white/10 pt-6 mt-auto">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to={ROUTES[Page.CLIENT_DASHBOARD].path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={ROUTES[Page.PROFILE].path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white"
                  >
                    Mon Profil
                  </Link>
                  <button
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-sm text-red-500"
                  >
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <a
                    href={getSaaSUrl("/login")}
                    onClick={() => {
                      setIsMenuOpen(false);
                      trackEvent("landing_cta_click", { cta_label: "Navbar Connexion Mobile" });
                    }}
                    className="text-slate-400 hover:text-white font-bold uppercase text-center"
                  >
                    Connexion
                  </a>
                  <a
                    href={getSaaSUrl("/register")}
                    onClick={() => {
                      setIsMenuOpen(false);
                      trackEvent("landing_cta_click", { cta_label: "Navbar Essayer Gratuitement Mobile" });
                    }}
                    className="bg-[#FF2718] text-white px-5 py-3 rounded-sm font-bold uppercase text-center"
                  >
                    Essayer Gratuitement
                  </a>
                </div>
              )}
            </div>
          </nav>
        )}

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES[Page.CLIENT_DASHBOARD].path}
                className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              >
                <LayoutDashboard
                  size={16}
                  className="text-[#FF2718] group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Dashboard
                </span>
              </Link>
              <Link
                to={ROUTES[Page.PROFILE].path}
                className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              >
                <User
                  size={16}
                  className="text-[#FF2718] group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Mon Profil
                </span>
              </Link>
              <button
                onClick={onLogout}
                title="Se déconnecter"
                className="size-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a
                href={getSaaSUrl("/login")}
                onClick={() => trackEvent("landing_cta_click", { cta_label: "Navbar Connexion" })}
                className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all px-4"
              >
                Connexion
              </a>
              <a
                href={getSaaSUrl("/register")}
                onClick={() => trackEvent("landing_cta_click", { cta_label: "Navbar Essayer Gratuitement" })}
                className="bg-[#FF2718] hover:bg-red-700 text-white px-8 py-3 rounded-sm font-black text-[10px] transition-all uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 active:scale-95"
              >
                ESSAYER GRATUITEMENT
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
