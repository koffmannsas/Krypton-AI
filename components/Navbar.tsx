import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Page, UserProfile } from "../types";
import { ROUTES } from "../routes.config";
import { NAV_LINKS } from "../constants";
import { Bolt, User, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

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

  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0B0B0F]/90 backdrop-blur-xl px-6 lg:px-20">
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
          {NAV_LINKS.map((link) => {
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
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-20 left-0 w-full bg-[#0B0B0F]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const config = ROUTES[link.id];
              return (
                <Link
                  key={link.id}
                  to={config.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all py-2"
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-white/10 pt-4 mt-2">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to={ROUTES[Page.CLIENT_DASHBOARD].path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white"
                  >
                    Mon Compte
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
                  <Link
                    to={ROUTES[Page.SIGNUP].path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-400 hover:text-white font-bold uppercase"
                  >
                    Créer un compte
                  </Link>
                  <Link
                    to={ROUTES[Page.AUTH].path}
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-[#FF2718] text-white px-5 py-3 rounded-sm font-bold uppercase text-center"
                  >
                    Se connecter
                  </Link>
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
                <User
                  size={16}
                  className="text-[#FF2718] group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Mon Compte
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
              <Link
                to={ROUTES[Page.SIGNUP].path}
                className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all px-4"
              >
                Créer un compte
              </Link>
              <Link
                to={ROUTES[Page.AUTH].path}
                className="bg-[#FF2718] hover:bg-red-700 text-white px-8 py-3 rounded-sm font-black text-[10px] transition-all uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 active:scale-95"
              >
                SE CONNECTER
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
