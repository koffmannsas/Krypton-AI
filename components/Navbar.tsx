import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Page, UserProfile } from "../types";
import { ROUTES } from "../routes.config";
import { NAV_LINKS } from "../constants";
import { Bolt, User, LayoutDashboard, LogOut } from "lucide-react";

interface NavbarProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
}) => {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0B0B0F]/90 backdrop-blur-xl px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <Link
          to={ROUTES[Page.HOME].path}
          className="flex items-center gap-3 group"
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

        <div className="flex items-center gap-4">
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
