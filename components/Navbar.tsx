import React from "react";
import { Page, UserProfile } from "../types";
import { NAV_LINKS } from "../constants";
import { Bolt, User, LayoutDashboard, LogOut } from "lucide-react";
import { sendToFiko } from "../services/fikoAPI";

interface NavbarProps {
  activePage: Page;
  onNavigate: (p: Page) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  user,
  onLogout,
}) => {
  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0B0B0F]/90 backdrop-blur-xl px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <button
          onClick={() => onNavigate(Page.HOME)}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-[#E10600] flex items-center justify-center rounded-sm shadow-lg shadow-red-500/20 group-hover:rotate-12 transition-transform">
            <Bolt className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase">
            Krypton <span className="text-[#E10600]">AI</span>
          </h1>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 ${
                activePage === link.id
                  ? "text-[#E10600]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#E10600] transition-all ${activePage === link.id ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <a
                href="https://clients.krypton-ia.tech"
                className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              >
                <User
                  size={16}
                  className="text-[#E10600] group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Mon Compte
                </span>
              </a>
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
              <button
                onClick={() => onNavigate(Page.SIGNUP)}
                className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all px-4"
              >
                Créer un compte
              </button>
              <button
                onClick={() => onNavigate(Page.AUTH)}
                className="bg-[#E10600] hover:bg-red-700 text-white px-8 py-3 rounded-sm font-black text-[10px] transition-all uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 active:scale-95"
              >
                SE CONNECTER
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
