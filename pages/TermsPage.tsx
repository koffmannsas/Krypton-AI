import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen py-24 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-4">Conditions d'Utilisation – Krypton AI</h1>
        <p className="text-sm text-slate-400 mb-12">Dernière mise à jour : Avril 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">1. Objet</h2>
          <p className="text-slate-300">Les présentes Conditions Générales d’Utilisation (CGU) encadrent l’utilisation de la plateforme Krypton AI et de ses modules, notamment Fiko Connect, développés par Koffmann Capital Group.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">2. Accès au service</h2>
          <p className="text-slate-300">L'accès est réservé aux professionnels ayant souscrit à l'un de nos plans d'abonnement. L'utilisateur est responsable de la conservation de ses identifiants.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">3. Responsabilité du client</h2>
          <p className="text-slate-300">Le client est seul responsable des données qu'il traite via nos outils, ainsi que du respect de la réglementation applicable (RGPD, etc.) dans sa juridiction.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">4. Propriété intellectuelle</h2>
          <p className="text-slate-300">La plateforme et ses contenus sont la propriété exclusive de Koffmann Capital Group.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">5. Contact</h2>
          <p className="text-slate-300">Pour toute question : <a href="mailto:support@krypton-ia.tech" className="text-[#FF2718]">support@krypton-ia.tech</a></p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
