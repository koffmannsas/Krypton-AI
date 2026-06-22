import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen py-24 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-4">Politique de confidentialité – Krypton AI / Fiko Connect</h1>
        <p className="text-sm text-slate-400 mb-12">Dernière mise à jour : Avril 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">1. Introduction</h2>
          <p className="text-slate-300">Koffmann Capital Group, société spécialisée dans le développement et l’exploitation de solutions informatiques innovantes de mise en relation, enregistrée au Registre de Commerce et des Sociétés d’Abidjan sous le numéro RCCM : CI-ABJ-03-2023-B13-02587, NCC : 23 01 065 C. Siège social : Palmeraie, Abidjan, Côte d’Ivoire. Fiko Connect est un module de la solution propriétaire Krypton AI, développée et exploitée par Koffmann Capital Group. Cette solution permet aux entreprises d’automatiser leur communication client via des agents intelligents connectés notamment à WhatsApp Business.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">2. Données collectées</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Données de communication (messages WhatsApp)</li>
            <li>Données techniques (IP, appareil, logs)</li>
            <li>Données clients (prospects, CRM)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">3. Utilisation des données</h2>
          <p className="text-slate-300">Les données servent à automatiser les échanges, améliorer l’expérience utilisateur, qualifier les prospects, et optimiser la conversion. Ces données ne sont pas utilisées à d’autres fins.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">4. Utilisation des données Meta (WhatsApp)</h2>
          <p className="text-slate-300">Les données WhatsApp sont utilisées uniquement pour fournir le service. Aucune revente de données. Usage strictement dans le cadre client.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">5. Sécurité et Partage</h2>
          <p className="text-slate-300">Aucune vente de données. Partage uniquement si obligation légale ou technique. Stockage sécurisé (cloud / Firebase), accès restreint, protection contre intrusion.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">6. Droits des utilisateurs</h2>
          <p className="text-slate-300">Accès, modification, suppression, opposition au traitement.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">7. Contact</h2>
          <p className="text-slate-300">Email : <a href="mailto:support@krypton-ia.tech" className="text-[#FF2718]">support@krypton-ia.tech</a></p>
          <p className="text-slate-300">Téléphone : 05 44 42 76 76</p>
          <p className="text-slate-300">Adresse : Palmeraie, Abidjan, Côte d’Ivoire</p>
        </section>

        <section>
          <p className="text-slate-400 italic">L’utilisation de Krypton AI implique l’acceptation de cette politique.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
