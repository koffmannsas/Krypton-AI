'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: "Marc L.", business: "E-commerce Mode", role: "Dirigeant", quote: "Depuis qu’on utilise Krypton AI, notre site génère des leads tous les jours sans qu’on intervienne." },
  { name: "Sophie D.", business: "Cabinet Conseil", role: "Consultante", quote: "On est passé d’un site vitrine à un vrai outil commercial. Les clients arrivent déjà qualifiés." },
  { name: "Thomas R.", business: "Artisan BTP", role: "Gérant", quote: "Fiko est devenu notre meilleur commercial. Il répond, qualifie et convertit à notre place." },
  { name: "Julie B.", business: "Agence Web", role: "Fondatrice", quote: "Une automatisation bluffante. Le ROI a été immédiat." },
  { name: "Lucas M.", business: "SaaS CRM", role: "Product Manager", quote: "La détection d'intention d'achat est d'une précision chirurgicale." },
  { name: "Carole F.", business: "Immobilier", role: "Agent", quote: "Nos rendez-vous de visite ont augmenté de 40% en un mois." },
  { name: "David K.", business: "Formation en ligne", role: "Formateur", quote: "L'IA gère le support et la vente 24/7. Un game changer." },
  { name: "Elena V.", business: "Joaillerie", role: "Créatrice", quote: "Mes clients adorent la réactivité immédiate sur le site." },
  { name: "Nicolas P.", business: "Logistique", role: "Directeur", quote: "Fiabilité exemplaire. Krypton se paie tout seul." },
  { name: "Sarah J.", business: "Cosmétiques Bio", role: "Fondatrice", quote: "Enfin une IA qui comprend le ton de notre marque." }
];

// Enrichir le dataset à 100 pour la preuve sociale
const extendedTestimonials = Array.from({ length: 100 }, (_, i) => ({
    ...testimonials[i % testimonials.length],
    id: i
}));

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0B0B0F] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </span>
            <span className="text-sm font-medium">Noté 4.9/5 par nos clients</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-['Oswald'] font-bold mb-6">
          Déjà plusieurs entreprises font confiance à Krypton AI
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Découvrez comment nos clients transforment leurs visiteurs en clients grâce à l’intelligence artificielle.
        </p>
      </div>

      <div className="relative">
        <motion.div 
            className="flex gap-6 cursor-grab"
            animate={{ x: [0, -2500] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            whileHover={{ animationPlayState: 'paused' }}
        >
            {[...extendedTestimonials, ...extendedTestimonials].map((t, i) => (
            <div key={i} className="min-w-[350px] bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm flex flex-col gap-4">
                <div className="flex text-yellow-500 gap-0.5">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 flex-grow italic">"{t.quote}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center font-bold">
                        {t.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.role}, {t.business}</div>
                    </div>
                </div>
            </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
