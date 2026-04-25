import React from "react";
import { Link } from "react-router-dom";
import { Bolt, Globe, Mail, Bot } from "lucide-react";
import { Page } from "../types";
import { ROUTES } from "../routes.config";
import { SEO_CLUSTERS, slugify } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24">
        <div className="flex flex-col gap-8">
          <Link
            to={ROUTES[Page.HOME].path}
            className="flex items-center gap-3 w-fit group"
          >
            <div className="w-8 h-8 bg-[#FF2718] flex items-center justify-center rounded-sm group-hover:rotate-12 transition-transform">
              <Bolt className="text-white w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter uppercase">
              Krypton AI
            </h2>
          </Link>
          <p className="text-slate-500 text-[10px] leading-loose uppercase tracking-[0.2em] font-black italic">
            Krypton AI accompagne les entreprises ambitieuses dans leur
            développement en ligne avec des solutions puissantes, efficaces et
            orientées résultats. <br />
            Division stratégique de Koffmann Group.
          </p>
          <div className="flex gap-6">
            <Globe
              className="text-slate-600 hover:text-[#FF2718] cursor-pointer transition-colors"
              size={20}
            />
            <Mail
              className="text-slate-600 hover:text-[#FF2718] cursor-pointer transition-colors"
              size={20}
            />
            <Bot
              className="text-slate-600 hover:text-[#FF2718] cursor-pointer transition-colors"
              size={20}
            />
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-black uppercase mb-10 tracking-[0.3em] text-white">
            Entreprise
          </h4>
          <ul className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            <li>
              <a
                className="hover:text-[#FF2718] transition-colors"
                href="https://koffmann.group"
                target="_blank"
                rel="noopener noreferrer"
              >
                Koffmann Group
              </a>
            </li>
            <li>
              <Link
                to={ROUTES[Page.WHITEPAPER].path}
                className="hover:text-[#FF2718] transition-colors text-left"
              >
                Documentation IA
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES[Page.WHITEPAPER].path}
                className="hover:text-[#FF2718] transition-colors text-left"
              >
                Whitepaper Final
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[11px] font-black uppercase mb-10 tracking-[0.3em] text-white">
            Neural Newsletter
          </h4>
          <p className="text-[10px] text-slate-500 mb-8 uppercase tracking-widest font-bold leading-relaxed max-w-sm">
            Anticipez les disruptions du marché. Rejoignez 12k+ décideurs qui
            reçoivent nos insights stratégiques hebdomadaires.
          </p>
          <div className="flex gap-2 max-w-md">
            <input
              className="bg-[#1A1A1F] border border-white/5 rounded-sm text-[10px] w-full focus:ring-[#FF2718] focus:border-[#FF2718] px-5 py-4 placeholder:text-slate-800 outline-none text-white font-bold"
              placeholder="VOTRE EMAIL PROFESSIONNEL"
              type="email"
            />
            <button className="bg-[#FF2718] px-8 py-4 rounded-sm text-white hover:bg-red-700 transition-all shadow-lg shadow-red-500/10">
              <Bolt size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-12 lg:gap-16 pt-20 border-t border-white/5">
        {SEO_CLUSTERS.map((cluster, i) => (
          <div key={i}>
            <h4 className="text-[11px] font-black uppercase mb-10 tracking-[0.3em] text-white">
              {cluster.title}
            </h4>
            <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
              {cluster.keywords.map((kw, j) => (
                <li key={j}>
                  <Link
                    to={`/recherche/${slugify(kw)}`}
                    className="hover:text-[#FF2718] transition-colors text-left"
                  >
                    {kw}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-24 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em] leading-loose italic">
          Krypton AI est la plateforme de référence pour tout{" "}
          <span className="text-slate-400">site web intelligent</span> et
          l'excellence en <span className="text-slate-400">automatisation marketing</span>.
          Nous déployons le meilleur de l'
          <span className="text-slate-400">IA en Afrique</span> pour propulser
          votre business vers une croissance exponentielle et autonome.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col items-center gap-8">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Krypton AI une marque{" "}
          <a
            href="https://www.koffmann.group"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-[#FF2718] hover:underline"
          >
            KCG
          </a>
        </p>
        <div className="flex gap-10 text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">
          <button className="hover:text-white transition-colors">
            Vie Privée
          </button>
          <button className="hover:text-white transition-colors">
            Conditions
          </button>
          <button className="hover:text-white transition-colors">
            Conformité RGPD
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
