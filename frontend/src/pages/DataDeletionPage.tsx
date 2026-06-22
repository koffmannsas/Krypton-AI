import React from 'react';
import { Helmet } from 'react-helmet-async';

const DataDeletionPage = () => {
  return (
    <>
      <Helmet>
        <title>Suppression des données utilisateur | Krypton AI</title>
        <meta name="description" content="Procédure de suppression des données utilisateur pour Krypton AI et Fiko Connect." />
      </Helmet>
      
      <div className="bg-[#050505] text-white min-h-screen py-24 px-6 md:px-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-4">
            Suppression des données utilisateur – Krypton AI / Fiko Connect
          </h1>
          <p className="text-sm text-slate-400 mb-12">
            Dernière mise à jour : Avril 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">1. Introduction</h2>
            <p className="text-slate-300 mb-4">
              Chez Koffmann Capital Group, nous respectons votre vie privée et vos droits. En vertu des réglementations en vigueur sur la protection des données, vous avez le droit de demander la suppression de vos données personnelles.
            </p>
            <p className="text-slate-300">
              Krypton AI respecte les exigences de protection des données, notamment celles de Meta concernant WhatsApp Business. Cette page vous explique clairement la procédure pour soumettre une demande de suppression de données.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">2. Quelles données peuvent être supprimées</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>L'historique de vos conversations WhatsApp</li>
              <li>Vos données de contact (numéro de téléphone, nom, etc.)</li>
              <li>Vos informations stockées dans notre système CRM</li>
              <li>Les données techniques associées à votre profil</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">3. Comment demander la suppression</h2>
            <p className="text-slate-300 mb-4">
              C'est simple, pour supprimer vos données, envoyez-nous une demande directement par email :
            </p>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-6">
              <h3 className="font-bold text-white mb-2">Option 1 : Par email</h3>
              <p className="text-slate-300 mb-2">
                Envoyez un email à <a href="mailto:support@krypton-ia.tech" className="text-[#FF2718] font-bold">support@krypton-ia.tech</a>
              </p>
              <p className="text-slate-300 font-bold mb-2">
                Avec les informations suivantes :
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-1 ml-2">
                <li>Votre Nom / Nom de l'entreprise</li>
                <li>Le Numéro WhatsApp concerné</li>
                <li>Une description claire de votre demande (Ex: "Demande de suppression de toutes mes données")</li>
              </ul>
            </div>
            
            <p className="text-slate-300">
              Vous pouvez également nous contacter par téléphone si vous avez besoin d'assistance concernant cette procédure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">4. Traitement de la demande</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li><strong>Délai de traitement :</strong> Votre demande sera traitée dans un délai de 7 à 14 jours ouvrables.</li>
              <li><strong>Vérification :</strong> Nous pourrions être amenés à vérifier votre identité pour des raisons de sécurité avant de supprimer les données.</li>
              <li><strong>Confirmation :</strong> Une fois les données supprimées, nous vous enverrons un email de confirmation.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">5. Conséquences de la suppression</h2>
            <p className="text-slate-300 mb-2">
              Veuillez noter qu'une fois votre demande exécutée :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Vous perdrez l'intégralité de vos historiques de conversation.</li>
              <li>Il sera impossible de récupérer vos données à l'avenir.</li>
              <li>Cela peut avoir un impact direct sur le service fourni, voire entraîner la suspension de celui-ci.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">6. Données conservées</h2>
            <p className="text-slate-300 mb-2">
              Bien que nous effacions vos données, veuillez noter que :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Certaines informations peuvent être conservées s'il existe une obligation légale de les conserver (ex: facturation).</li>
              <li>Des logs techniques et de sécurité peuvent être conservés temporairement pour garantir l'intégrité de notre système, avant d'être purgés à leur tour.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">7. Responsabilité de nos clients</h2>
            <p className="text-slate-300">
              Important : Si vous avez interagi avec l'une des entreprises clientes de Krypton AI, sachez que ces entreprises sont également responsables de la gestion de leurs propres données. Krypton AI / Koffmann Capital Group agit en tant que fournisseur technologique. Nous supprimerons les données de nos serveurs, mais vous pourriez également devoir contacter directement l'entreprise en question pour qu'elle procède à la suppression selon ses propres politiques.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">8. Contact</h2>
            <div className="text-slate-300 space-y-2">
              <p>
                <strong>Email :</strong> <a href="mailto:support@krypton-ia.tech" className="text-[#FF2718]">support@krypton-ia.tech</a>
              </p>
              <p>
                <strong>Téléphone :</strong> 05 44 42 76 76
              </p>
              <p>
                <strong>Adresse :</strong> Palmeraie, Abidjan, Côte d’Ivoire
              </p>
            </div>
          </section>

          <section>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <p className="text-slate-400 italic text-center">
                En utilisant les services de Krypton AI, vous reconnaissez avoir pris connaissance de cette procédure de suppression de données.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DataDeletionPage;
