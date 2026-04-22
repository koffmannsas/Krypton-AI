'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "Est-ce que Krypton AI remplace mon site actuel ?", a: "Non. Krypton AI prend votre site actuel et le transforme en un outil commercial ultra-intelligent capable d’attirer, de qualifier et de convertir automatiquement vos visiteurs en clients. C'est une mise à jour radicale vers la performance." },
  { q: "Combien de temps avant d’avoir des résultats ?", a: "Dès la mise en ligne, votre site commence à capter et qualifier vos visiteurs. Grâce à nos stratégies d'automatisation, les premiers résultats (leads qualifiés) peuvent apparaître en quelques jours seulement." },
  { q: "Est-ce que je dois avoir des compétences techniques ?", a: "Absolument pas. Tout est conçu pour être clé en main et automatisé. Vous n'avez pas à gérer la technique, Krypton AI travaille pour vous 24h/24 en toute autonomie." },
  { q: "Est-ce que l’IA peut vraiment remplacer un commercial ?", a: "Elle ne remplace pas votre expertise, elle décuple votre efficacité. Fiko, votre agent IA, qualifie vos prospects, prend des rendez-vous et pré-vend vos services, vous permettant de vous concentrer sur le closing final." },
  { q: "Puis-je payer en plusieurs fois ?", a: "Oui, nous proposons des facilités de paiement adaptées pour vous permettre de lancer rapidement votre projet sans mettre en péril votre trésorerie." },
  { q: "Que se passe-t-il après mon inscription ?", a: "Vous êtes instantanément guidé par Fiko, notre agent d'onboarding, qui analyse votre business model et configure automatiquement votre stratégie digitale. Vous n'êtes jamais seul." },
  { q: "Mon activité est spécifique, ça marche quand même ?", a: "Oui. Krypton AI s'adapte par nature à tous les secteurs : E-commerce, Services, Consulting, BTP, Immobilier, Artisans, etc. L'IA apprend et se personnalise à votre spécificité." },
  { q: "Est-ce sécurisé ?", a: "Oui, la sécurité est notre priorité absolue. Vos données et celles de vos clients sont protégées avec des standards de chiffrement avancés." },
  { q: "Puis-je upgrader mon offre plus tard ?", a: "Oui, à tout moment depuis votre dashboard, vous pouvez passer à un niveau supérieur pour accompagner la croissance de votre entreprise." },
  { q: "Pourquoi choisir Krypton AI ?", a: "Parce que vous ne créez pas juste un site… vous créez un système de vente automatique qui génère des clients pour vous. Vous investissez dans la croissance, pas dans une simple vitrine." },
];

function FAQItem({ question, answer, isOpen, toggle }: { question: string, answer: string, isOpen: boolean, toggle: () => void }) {
  return (
    <div className="border border-white/10 rounded-sm mb-4 bg-white/[0.02]">
      <button
        onClick={toggle}
        className="flex w-full justify-between items-center p-6 text-left"
      >
        <span className="font-['Oswald'] font-medium text-lg text-white">{question}</span>
        {isOpen ? <Minus className="text-[#E10600] shrink-0" /> : <Plus className="text-white shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-400 font-light italic">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-24 px-6 bg-[#0B0B0F] text-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Oswald'] font-bold mb-6">
            Questions fréquentes
          </h2>
          <p className="text-gray-400 text-lg">
            Tout ce que vous devez savoir avant de transformer votre site en machine à clients.
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
