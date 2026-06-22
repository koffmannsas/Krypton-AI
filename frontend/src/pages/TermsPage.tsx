import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Conditions d'utilisation | Krypton AI</title>
        <meta name="description" content="Conditions d'utilisation du service Krypton AI et de son module Fiko Connect." />
      </Helmet>

      <div className="bg-[#050505] text-white min-h-screen py-24 px-6 md:px-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-4">
            Conditions d’utilisation – Krypton AI / Fiko Connect
          </h1>
          <p className="text-sm text-slate-400 mb-12">
            Dernière mise à jour : Avril 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">1. Objet</h2>
            <p className="text-slate-300">
              Les présentes conditions d'utilisation régissent l'accès et l'utilisation de la plateforme Krypton AI et de son module Fiko Connect. En accédant ou en utilisant notre service, vous acceptez de manière inconditionnelle de vous conformer à ces conditions générales. Si vous n'acceptez pas ces conditions, vous ne pouvez pas utiliser la plateforme.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">2. Accès au service</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Le service est accessible via Internet aux professionnels ayant souscrit à une offre.</li>
              <li>L'accès nécessite la création d'un compte utilisateur. Vous êtes entièrement responsable du maintien de la confidentialité de vos identifiants de connexion.</li>
              <li>Toute action effectuée via votre compte est présumée avoir été effectuée par vous-même. En cas de perte ou de vol de vos accès, vous devez prévenir immédiatement notre support.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">3. Description du service</h2>
            <p className="text-slate-300 mb-2">
              Krypton AI est une plateforme logicielle en tant que service (SaaS) développée et exploitée par Koffmann Capital Group.
            </p>
            <p className="text-slate-300">
              Le module <span className="font-bold">Fiko Connect</span> permet aux entreprises d’automatiser leur communication client, la génération de leads et la gestion commerciale via des agents intelligents (IA) connectés, notamment, à l'API WhatsApp Business.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">4. Obligations de l’utilisateur</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>L’utilisateur s'engage à employer la plateforme uniquement à des fins légales et professionnelles.</li>
              <li>Il est strictement interdit d'utiliser le service pour envoyer des messages indésirables (spam abusif, harcèlement, fraude).</li>
              <li>L'utilisateur garantit qu'il respecte les lois en vigueur dans sa juridiction, notamment en matière de prospection et de protection des données (RGPD ou local).</li>
              <li>L'utilisateur demeure seul responsable des données importées et traitées via Krypton AI.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">5. Utilisation de WhatsApp / Meta</h2>
            <p className="text-slate-300 mb-2 font-bold text-white">
              Une attention particulière est requise concernant l'utilisation des intégrations Meta (WhatsApp Business API) :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>L’utilisateur est formellement tenu de respecter l'ensemble des politiques de commerce et de messagerie établies par Meta.</li>
              <li>Toute utilisation abusive du système de messagerie (ex: envoi massif non sollicité, contenu interdit) entraînera une perturbation immédiate des services par Meta.</li>
              <li>Krypton AI / Koffmann Capital Group décline toute responsabilité en cas de blocage ou de suspension de votre compte WhatsApp par Meta en raison de violations des règles de Meta.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">6. Données et confidentialité</h2>
            <p className="text-slate-300">
              Le traitement de vos données personnelles et de celles de vos clients est encadré par notre <a href="/privacy" className="text-[#FF2718] font-bold hover:underline">Politique de confidentialité</a>. Pour en savoir plus sur la manière de supprimer vos informations ou de demander une purge, veuillez consulter notre <a href="/data-deletion" className="text-[#FF2718] font-bold hover:underline">Procédure de suppression des données</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">7. Propriété intellectuelle</h2>
            <p className="text-slate-300 mb-2">
              La plateforme Krypton AI, incluant Fiko Connect, son code source, ses algorithmes, ses interfaces et son design, demeurent la propriété exclusive de Koffmann Capital Group.
            </p>
            <p className="text-slate-300">
              Il est expressément interdit de copier, reproduire, modifier, désassembler ou créer des œuvres dérivées de la plateforme sans l'accord écrit de Koffmann Capital Group.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">8. Responsabilité</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Le service Krypton AI est fourni "tel quel". Nous nous efforçons de maintenir un accès ininterrompu, mais nous ne garantissons pas l'absence de bugs ou d'incidents techniques.</li>
              <li>Krypton AI est un outil d'assistance commerciale. Koffmann Capital Group ne fournit aucune garantie de résultats commerciaux (ex: augmentation obligatoire du chiffre d'affaires).</li>
              <li>Notre responsabilité, en cas de litige, est expressément limitée au montant total payé pour l'utilisation du service sur la période concernée, sauf disposition légale impérative contraire.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">9. Interruption / Suspension</h2>
            <p className="text-slate-300 mb-2">
              Koffmann Capital Group se réserve le droit de suspendre ou d'interrompre l'accès au service :
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Pour effectuer des opérations de maintenance technique régulières ou d'urgence.</li>
              <li>En cas d'utilisation abusive, illégale ou en violation grave des présentes conditions (notamment celles liées aux abus sur WhatsApp Business API).</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">10. Résiliation</h2>
            <p className="text-slate-300">
              Vous avez la possibilité de résilier votre abonnement ou l'utilisation du service selon les modalités prévues dans votre contrat ou votre plan tarifaire. La résiliation entraînera la fermeture du compte et la suppression des accès à la plateforme.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">11. Modifications</h2>
            <p className="text-slate-300">
              Koffmann Capital Group se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Toute modification substantielle fera l'objet d'une notification préalable (par email ou notification sur la plateforme). Continuer d'utiliser le service après de telles modifications équivaut à leur acceptation.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">12. Droit applicable et Juridiction</h2>
            <p className="text-slate-300">
              Les présentes conditions d'utilisation sont régies par le droit en vigueur en Côte d'Ivoire. Tout litige relatif à leur interprétation ou leur exécution relèvera de la compétence exclusive du Tribunal de Commerce d'Abidjan.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">13. Contact</h2>
            <div className="text-slate-300 space-y-2">
              <p>
                <strong>Koffmann Capital Group</strong> (RCCM: CI-ABJ-03-2023-B13-02587 / NCC: 23 01 065 C)
              </p>
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
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-12 text-center">
              <p className="text-slate-300 italic font-medium">
                L’utilisation de Krypton AI implique l’acceptation pleine et entière des présentes conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
