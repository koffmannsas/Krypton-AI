import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import './AssistancePage.css';

const POPULAR_QUESTIONS = [
    { question: "Comment fonctionne Fiko Connect ?", category: "Produit", icon: "🔗" },
    { question: "Comment créer un site nouvelle génération ?", category: "Création", icon: "🌐" },
    { question: "Comment connecter WhatsApp Business ?", category: "Intégration", icon: "💬" },
    { question: "Comment automatiser mes ventes ?", category: "Business", icon: "💰" },
    { question: "Comment générer des leads automatiquement ?", category: "Marketing", icon: "🎯" },
    { question: "Comment fonctionne l'IA Krypton ?", category: "Technologie", icon: "🧠" }
];

const PRODUCTS = [
    {
        name: "Fiko Connect",
        description: "Automatisez votre communication WhatsApp avec une intelligence capable de qualifier et convertir vos prospects 24/7.",
        icon: "🤖",
        features: ["Qualification automatique", "Réponses IA contextuelles", "Conversion 24/7"]
    },
    {
        name: "Krypton AI Website Engine",
        description: "Créez des sites internet nouvelle génération capables d'attirer, convaincre et convertir automatiquement.",
        icon: "⚡",
        features: ["Sites IA dynamiques", "SEO intégré", "Conversion optimisée"]
    },
    {
        name: "AI Lead Engine",
        description: "Transformez votre trafic en opportunités qualifiées grâce à l'intelligence artificielle prédictive.",
        icon: "🎯",
        features: ["Scoring intelligent", "Segmentation auto", "Nurturing IA"]
    },
    {
        name: "SEO Automation System",
        description: "Dominez Google avec un système autonome de génération de contenu SEO intelligent et optimisé.",
        icon: "🚀",
        features: ["Contenu auto-généré", "Analyse concurrentielle", "Positionnement garanti"]
    }
];

const CATEGORIES = [
    { title: "Assistant Ambassadeur Elite", icon: "💎", questions: ["Gains et commissions", "Niveaux de progression", "Stratégies TikTok Business"] },
    { title: "Krypton Startup Hub", icon: "🚀", questions: ["Lancer mon MVP IA", "Stratégies de croissance", "Automatisation scalable"] },
    { title: "Vendeur & Commerce local", icon: "🏪", questions: ["Digitaliser mon magasin", "WhatsApp pour commerçants", "Générer du passage"] },
    { title: "Création de site internet IA", icon: "🌐", questions: ["Comment créer mon site ?", "Personnalisation du design", "Intégration domaine"] },
    { title: "WhatsApp Business & automatisation", icon: "💬", questions: ["Configuration API WhatsApp", "Templates de messages", "Automatisation conversations"] },
    { title: "CRM intelligent", icon: "👥", questions: ["Gestion contacts", "Pipeline automatique", "Suivi opportunités"] },
    { title: "SEO & trafic", icon: "📈", questions: ["Stratégie SEO IA", "Génération de contenu", "Analyse mots-clés"] },
    { title: "Tunnel & conversion", icon: "🔄", questions: ["Création tunnel", "Optimisation conversion", "A/B testing IA"] },
    { title: "Dashboard Krypton AI", icon: "📊", questions: ["Navigation dashboard", "Rapports personnalisés", "KPIs intelligents"] }
];

const LEARNING_BLOCKS = [
    { title: 'Guides intelligents', description: 'Apprenez à votre rythme avec nos parcours guidés par IA, adaptés à votre niveau et vos objectifs.', icon: '📘', badge: '12 parcours', badgeType: 'red' },
    { title: 'Tutoriels vidéo', description: 'Découvrez Krypton en images avec nos experts. Des démonstrations claires et approfondies.', icon: '🎥', badge: '+40 vidéos', badgeType: 'red' },
    { title: 'Configuration pas à pas', description: 'Zéro friction. On configure tout ensemble, étape par étape, avec l\'assistance de Fiko en direct.', icon: '🛠️', badge: 'Assistance live', badgeType: 'green' },
    { title: 'Cas concrets business', description: 'Inspirez-vous des meilleurs modèles de réussite. Études de cas réels avec résultats chiffrés.', icon: '📊', badge: '25 cas', badgeType: 'red' },
    { title: 'Optimisation conversion', description: 'Boostez vos performances avec nos conseils IA. Analyses personnalisées et recommandations actionnables pour maximiser votre taux de conversion.', icon: '📈', badge: '+30% conversion', badgeType: 'red' }
];

const BUSINESS_BENEFITS = [
    { icon: "⚡", title: "Réduction du temps de réponse", description: "Instantanéité totale 24/7. Vos clients obtiennent des réponses en moins de 3 secondes." },
    { icon: "🎯", title: "Qualification automatique", description: "Seulement les leads chauds transmis à vos équipes. Filtrage intelligent et scoring prédictif." },
    { icon: "📈", title: "Génération de leads", description: "Flux constant et prédictif. L'IA anticipe et capture les opportunités avant vos concurrents." },
    { icon: "🔄", title: "Conversion intelligente", description: "L'IA qui ferme la vente. Parcours client personnalisé optimisé pour la conversion maximale." },
    { icon: "📊", title: "Dashboard stratégique", description: "Vision totale sur vos KPIs. Pilotage en temps réel de toute votre activité commerciale." },
    { icon: "🤖", title: "IA métier personnalisée", description: "Formée sur vos données. Une intelligence qui comprend votre secteur et vos processus uniques." }
];

const CONTACTS = [
    { icon: "📞", number: "+225 07 98 76 77 63" },
    { icon: "📞", number: "+225 05 44 42 76 76" },
    { icon: "📞", number: "+225 07 58 01 98 99" }
];

const SIGNALS = [
    { prefix: '+', value: 1, label: 'entreprise connectée' },
    { prefix: '+', value: 3, label: 'systèmes activés' },
    { prefix: '+', value: 12, label: 'analyses IA aujourd\'hui' }
];

const AssistancePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fikoResponse, setFikoResponse] = useState<{ answer: string, actions: string[], question: string, intent?: string, score?: number } | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [interactionCount, setInteractionCount] = useState(0);
    const [showEscalation, setShowEscalation] = useState(false);
    const [activeSignals, setActiveSignals] = useState(SIGNALS);
    const [returningUser, setReturningUser] = useState(false);
    
    // Memory Engine State
    const [memory, setMemory] = useState<{
        leadScore: number;
        interests: string[];
        history: string[];
        timeline: string[];
        lastInteraction: string;
        profile: {
            businessType?: 'Entrepreneur' | 'Agence' | 'Vendeur' | 'Coach' | 'Créateur' | 'PME' | 'Startup' | 'Commerçant' | 'Infopreneur';
            maturityLevel?: 'Early' | 'Growing' | 'Scaling' | 'Advanced';
            likelyNeed?: string;
            urgency?: 'low' | 'medium' | 'high';
            recommendation?: string;
            predictions?: {
                proActivation: number;
                ambassadorElite: number;
            }
        }
    }>(() => {
        const saved = localStorage.getItem('fiko_memory');
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                leadScore: parsed.leadScore ?? 0,
                interests: parsed.interests ?? [],
                history: parsed.history ?? [],
                timeline: parsed.timeline ?? ['Initialisation Copilot Stratégique'],
                lastInteraction: parsed.lastInteraction ?? new Date().toISOString(),
                profile: parsed.profile ?? { urgency: 'low' }
            };
        }
        return {
            leadScore: 0,
            interests: [],
            history: [],
            timeline: ['Initialisation Copilot Stratégique'],
            lastInteraction: new Date().toISOString(),
            profile: { urgency: 'low', predictions: { proActivation: 12, ambassadorElite: 5 } }
        };
    });

    const strategicInsights = [
        "🚀 Les entreprises utilisant WhatsApp automatisé répondent 4x plus vite.",
        "🔥 Les contenus TikTok \"avant/après\" convertissent mieux cette semaine.",
        "⚡ Les leads WhatsApp convertissent plus vite sur mobile.",
        "💎 Le niveau 'Closer' débloque +15% de bonus sur les missions IA.",
        "📈 L'automatisation SEO Krypton réduit les coûts d'acquisition de 60%."
    ];

    const [activeInsight, setActiveInsight] = useState(0);

    // Insights rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveInsight(prev => (prev + 1) % strategicInsights.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Save memory on change
    useEffect(() => {
        localStorage.setItem('fiko_memory', JSON.stringify(memory));
    }, [memory]);

    // Dynamic signals simulation
    useEffect(() => {
        if (memory.history.length > 0) setReturningUser(true);
        
        const interval = setInterval(() => {
            setActiveSignals(prev => prev.map(s => ({
                ...s,
                value: s.value + (Math.random() > 0.8 ? 1 : 0)
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Auto-search logic for SEO slugs
    useEffect(() => {
        if (slug) {
            const topic = slug.replace(/-/g, ' ');
            quickSearch(topic);
        }
    }, [slug]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const generateFikoResponse = (question: string) => {
        const q = question.toLowerCase();
        setInteractionCount(prev => prev + 1);
        
        // --- 1. INTENT & SCORING ENGINE ---
        let currentScore = memory.leadScore;
        let detectedTheme: string | null = null;
        let detectedProfile: any = memory.profile.businessType;
        let urgency: 'low' | 'medium' | 'high' = memory.profile.urgency || 'low';
        const newTimelineEntries: string[] = [];
        
        // Base scoring
        const queryLengthBonus = Math.min(15, Math.floor(q.length / 5));
        currentScore += (5 + queryLengthBonus);

        // Profile Detection Logic (Granular)
        if (q.includes('agence') || q.includes('prestataire')) { detectedProfile = 'Agence'; newTimelineEntries.push("Segment identifié : Agence Marketing"); }
        if (q.includes('coach') || q.includes('formation') || q.includes('formation en ligne')) { detectedProfile = 'Coach'; newTimelineEntries.push("Segment identifié : Coach / Formateur"); }
        if (q.includes('boutique') || q.includes('vendeur') || q.includes('produit')) { detectedProfile = 'Vendeur'; newTimelineEntries.push("Segment identifié : E-commerce / Vendeur"); }
        if (q.includes('tiktok') || q.includes('influence') || q.includes('créateur')) { detectedProfile = 'Créateur'; newTimelineEntries.push("Segment identifié : Creator Economy"); }
        if (q.includes('local') || q.includes('magasin') || q.includes('commerce')) { detectedProfile = 'Commerçant'; newTimelineEntries.push("Segment identifié : Commerce Local"); }
        if (q.includes('startup') || q.includes('projet') || q.includes('mvp')) { detectedProfile = 'Startup'; newTimelineEntries.push("Segment identifié : Startup Hub"); }
        if (q.match(/vendre (mes|des) (formations|cours)/)) { detectedProfile = 'Infopreneur'; newTimelineEntries.push("Segment identifié : Infopreneur Elite"); }

        // Maturity Engine
        let maturity: 'Early' | 'Growing' | 'Scaling' | 'Advanced' = memory.profile.maturityLevel || 'Early';
        const interactions = (memory.history || []).length;
        if (interactions > 3) maturity = 'Growing';
        if (interactions > 6 || currentScore > 60) maturity = 'Scaling';
        if (currentScore > 85) maturity = 'Advanced';
        
        if (maturity !== memory.profile.maturityLevel) newTimelineEntries.push(`Niveau de maturité : ${maturity}`);

        // Predictive Probability Engine
        const proProb = Math.min(98, (memory.profile.predictions?.proActivation || 10) + (isHot ? 25 : 5));
        const ambProb = Math.min(95, (memory.profile.predictions?.ambassadorElite || 5) + (detectedProfile === 'Créateur' ? 40 : 10));

        // Recommended Action Engine
        let recommendedAction = memory.profile.recommendation;
        if (detectedProfile === 'Créateur' || detectedProfile === 'Infopreneur') recommendedAction = "Monétiser votre audience via le réseau Ambassadeur";
        if (detectedProfile === 'Agence' || detectedProfile === 'PME') recommendedAction = "Digitaliser l'acquisition client avec WhatsApp Business API";
        if (detectedProfile === 'Vendeur' || detectedProfile === 'Commerçant') recommendedAction = "Automatiser les ventes WhatsApp Fiko Connect";
        if (detectedProfile === 'Startup') recommendedAction = "Scaler l'infrastructure client via AI Website Engine";

        // HOT Keywords (+30)
        const hotKeywords = ['prix', 'tarif', 'acheter', 'installer', 'abonnement', 'démo', 'combien', 'devis', 'rdv', 'appel'];
        const isHot = hotKeywords.some(key => q.includes(key));
        if (isHot) {
            currentScore += 30;
            urgency = 'high';
            newTimelineEntries.push("Intention d'achat critique détectée");
        }

        // --- 2. DETECT THEME & UPDATE MEMORY ---
        if (q.includes('site') || q.includes('créer') || q.includes('internet')) { detectedTheme = 'Website Engine'; newTimelineEntries.push("Intérêt : Website Engine Engine"); }
        if (q.includes('whatsapp') || q.includes('connecter') || q.includes('fiko connect')) { detectedTheme = 'Fiko Connect'; newTimelineEntries.push("Intérêt : Fiko Connect Automation"); }
        if (q.includes('lead') || q.includes('prospect') || q.includes('générer') || q.includes('vente')) { detectedTheme = 'Lead Generation'; newTimelineEntries.push("Intérêt : Lead Generation Engine"); }
        if (q.includes('seo') || q.includes('google') || q.includes('trafic')) { detectedTheme = 'SEO Automation'; newTimelineEntries.push("Intérêt : SEO Automation System"); }
        if (q.includes('ambassadeur') || q.includes('gagner') || q.includes('commission') || q.includes('mission') || q.includes('tiktok')) { detectedTheme = 'Ambassadeur Program'; newTimelineEntries.push("Intérêt : Réseau Ambassadeur Elite"); }

        if (currentScore > 50 && memory.leadScore <= 50) newTimelineEntries.push("Passage en mode Lead WARM");
        if (currentScore > 80 && memory.leadScore <= 80) newTimelineEntries.push("🔓 ALERTE : Profil Éligible Session Stratégique");

        // Update Memory state
        setMemory(prev => ({
            ...prev,
            leadScore: Math.min(100, currentScore),
            interests: detectedTheme && !(prev.interests || []).includes(detectedTheme) 
                ? [...(prev.interests || []), detectedTheme] 
                : (prev.interests || []),
            history: [...(prev.history || []), question].slice(-10),
            timeline: [...(prev.timeline || []), ...newTimelineEntries].slice(-15),
            lastInteraction: new Date().toISOString(),
            profile: {
                ...(prev.profile || {}),
                businessType: detectedProfile || (prev.profile && prev.profile.businessType),
                maturityLevel: maturity,
                likelyNeed: detectedTheme || (prev.profile && prev.profile.likelyNeed),
                urgency: urgency,
                recommendation: recommendedAction,
                predictions: {
                    proActivation: proProb,
                    ambassadorElite: ambProb
                }
            }
        }));

        // Threshold checks
        if (currentScore >= 50) setShowEscalation(true);
        
        // --- 3. RESPONSE GENERATION ---
        
        // HOT Buyer Escalation
        if (currentScore >= 85) {
            return {
                intent: "HOT LEAD DETECTED",
                answer: `Votre projet semble être une <b>priorité stratégique</b> ${detectedProfile ? `pour votre profil de ${detectedProfile}` : ''}.\n\nAu vu de vos besoins en ${detectedTheme || 'IA Business'}, je recommande une activation immédiate. Nous avons identifié un potentiel de croissance significatif pour votre structure.\n\n🚀 <b>Recommandation Action IA :</b> Session Stratégique avec un Ingénieur Krypton.\n💡 <b>Bénéfice :</b> Audit complet et plan de déploiement personnalisé en 48h.`,
                actions: ['⚡ Parler à un Expert', 'Réserver ma Session'],
                score: currentScore
            };
        }

        // Theme-specific logic
        if (detectedTheme === "Website Engine") {
            return {
                intent: "Krypton AI Website Engine",
                answer: `Je détecte un projet de <b>Création de Site Intelligent</b>.\n\nKrypton AI n'est pas un simple éditeur : c'est un moteur de conversion autonome. Votre site générera ses propres contenus, s'optimisera pour Google et captera vos prospects sans intervention.\n\n✅ <b>Solution recommandée :</b> Website Engine PRO\n✅ <b>Bénéfice :</b> +45% de conversion organique.\n\n${memory.interests.includes('Lead Generation') ? '<i>Note : Ce système s\'intègre parfaitement avec votre intérêt pour le Lead Engine.</i>' : ''}`,
                actions: ['Voir la Démo Site IA', 'Lancer mon Projet'],
                score: currentScore
            };
        }
        if (detectedTheme === "Fiko Connect") {
            return {
                intent: "Fiko Connect Automation",
                answer: `Analyse d'intention : <b>Automatisation Relationnelle</b>.\n\nFiko Connect transforme votre WhatsApp en une machine à vendre. L'IA ne se contente pas de répondre, elle qualifie, segmente et prépare le closing pour vos équipes.\n\n✅ <b>Solution recommandée :</b> Fiko Connect API\n✅ <b>Bénéfice :</b> Disponibilité 24/7 & Qualification instantanée.`,
                actions: ['Activer Fiko Connect', 'Test Gratuit WhatsApp'],
                score: currentScore
            };
        }
        if (detectedTheme === "Lead Generation") {
            return {
                intent: "AI Lead & Sales Engine",
                answer: `Détection d'objectif : <b>Croissance & Acquisition</b>.\n\nNotre Lead Engine utilise l'IA prédictive pour identifier vos futurs clients avant même qu'ils ne vous contactent. Nous créons un flux ininterrompu d'opportunités qualifiées.\n\n✅ <b>Solution recommandée :</b> Lead Engine Enterprise\n✅ <b>KPI :</b> ROI mesurable sous 30 jours.`,
                actions: ['Découvrir Lead Engine', 'Analyse de Trafic'],
                score: currentScore
            };
        }
        if (detectedTheme === "SEO Automation") {
            return {
                intent: "SEO Automation System",
                answer: `Intention détectée : <b>Domination Moteurs de Recherche</b>.\n\nLe système SEO Krypton est 100% autonome. Il rédige, indexe et positionne vos pages sur les mots-clés les plus rentables de votre secteur.\n\n✅ <b>Solution recommandée :</b> SEO Cloud System\n✅ <b>Promesse :</b> Top 3 Google sur vos requêtes stratégiques.`,
                actions: ['Audit SEO IA Gratuit', 'Voir les Résultats'],
                score: currentScore
            };
        }

        // AMBASSADEUR INTENT
        if (detectedTheme === "Ambassadeur Program") {
            if (q.includes('gagner') || q.includes('argent') || q.includes('commission')) {
                return {
                    intent: "Ambassadeur Revenue Coach",
                    answer: `Fiko Connect permet aux ambassadeurs de recommander une technologie IA capable d'automatiser WhatsApp et de générer des leads qualifiés.\n\n💰 <b>Modèle de revenus :</b>\nLorsqu'un prospect active une offre via votre lien, vous générez des commissions directes. Plus vos leads sont "HOT", plus vos gains augmentent. Votre progression dans les niveaux (Actinateur → Elite) booste vos multiplicateurs.\n\n🚀 <b>Conseil Fiko :</b> Concentrez-vous sur le contenu TikTok à fort engagement pour maximiser votre flux de prospects.`,
                    actions: ['Calculer mes Gains', 'Devenir Ambassadeur'],
                    score: currentScore
                };
            }
            if (q.includes('niveau') || q.includes('rank') || q.includes('elite') || q.includes('dominator')) {
                return {
                    intent: "Ambassadeur Progression",
                    answer: `Le réseau Ambassadeur est structuré en 7 niveaux d'excellence :\n\n1️⃣ <b>Initié</b> (Départ)\n2️⃣ <b>Activateur</b>\n3️⃣ <b>Performer</b>\n4️⃣ <b>Closer</b>\n5️⃣ <b>Elite Growth</b>\n6️⃣ <b>Dominator</b>\n7️⃣ <b>Titan Network</b>\n\nChaque niveau débloque des bonus de commission, des missions premium et des outils IA exclusifs. Votre XP augmente avec chaque lead qualifié généré.`,
                    actions: ['Voir mon Niveau', 'Plan de Progression'],
                    score: currentScore
                };
            }
            if (q.includes('tiktok') || q.includes('vidéo') || q.includes('mots-clés')) {
                return {
                    intent: "TikTok Growth Strategy",
                    answer: `<b>TikTok → WhatsApp → Conversion</b> : C'est le funnel le plus puissant du réseau Fiko.\n\nPour réussir, utilisez des hooks visuels forts montrant l'IA en action. Nos ambassadeurs "Elite" publient des démos Fiko Connect qui deviennent virales en ciblant les entrepreneurs et PME.\n\n🔗 <b>Outils :</b> Votre lien unique est optimisé par IA pour tracker chaque clic avec précision.`,
                    actions: ['Hooks Viraux IA', 'Guide TikTok'],
                    score: currentScore
                };
            }
            return {
                intent: "Fiko Ambassador Hub",
                answer: `Bienvenue dans le moteur de croissance du réseau Fiko Connect.\n\nEn tant qu'ambassadeur, vous n'êtes pas un simple affilié : vous êtes un partenaire stratégique. Vous disposez d'un dashboard complet pour piloter vos revenus et vos missions IA.\n\n✅ <b>Missions quotidiennes :</b> Boostez votre XP et vos gains.\n✅ <b>Network Elite :</b> Intégrez une communauté de performers pilotée par Krypton AI.`,
                actions: ['Rejoindre le Réseau', 'Accès Dashboard'],
                score: currentScore
            };
        }

        return {
            answer: `Je comprends votre besoin concernant "${question}".\n\nKrypton AI permet de créer des systèmes intelligents capables d’automatiser votre acquisition client, votre communication et votre conversion.\n\nJe vous suggère d'explorer nos modules spécifiques ou de consulter nos guides détaillés pour une configuration optimale.`,
            actions: ['Explorer les Solutions', 'Parler à un Expert'],
            score: currentScore
        };
    };

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;
        
        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
            const responseData = generateFikoResponse(query);
            setFikoResponse({ ...responseData, question: query });
            setIsModalOpen(true);
            setSearchQuery('');
        }, 1200);
    };

    const handleQuestionClick = (question: string) => {
        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
            const responseData = generateFikoResponse(question);
            setFikoResponse({ ...responseData, question });
            setIsModalOpen(true);
        }, 800);
    };

    const quickSearch = (question: string) => {
        setSearchQuery(question);
        handleQuestionClick(question);
    };

    return (
        <div className={`assistance-page ${memory.leadScore >= 85 ? 'hot-mode' : ''}`} onMouseMove={handleMouseMove}>
            
            {/* CSS for Hot Mode Glow */}
            <style>
                {`
                .hot-mode {
                    position: relative;
                }
                .hot-mode::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    box-shadow: inset 0 0 100px rgba(225, 6, 0, 0.15);
                    pointer-events: none;
                    z-index: 100;
                    animation: pulse-glow 4s infinite;
                }
                @keyframes pulse-glow {
                    0% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.3; }
                }
                `}
            </style>
            {/* TOP HOT LEAD BANNER */}
            {memory.leadScore >= 85 && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    style={{ background: 'var(--red)', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 800, fontSize: '13px', letterSpacing: '0.05em', position: 'sticky', top: 0, zIndex: 1000, textTransform: 'uppercase' }}
                >
                    🚀 EXECUTIVE MODE ACTIVÉ • Profil {memory.profile.maturityLevel} détecté • Session stratégique prioritaire disponible pour {memory.profile.businessType || 'votre projet'}
                    <a href="https://cal.com/fiko-ai/session-strategique" target="_blank" rel="noopener" style={{ marginLeft: '15px', color: 'white', borderBottom: '1px solid white', textDecoration: 'none' }}>Réserver mon Audit expert →</a>
                </motion.div>
            )}

            {/* HERO SECTION */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', position: 'relative', overflow: 'hidden' }}>
                
                {/* Particules */}
                <div className="particles-container" aria-hidden="true">
                    {[0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6].map((delay, i) => (
                        <div key={i} className="particle" style={{ 
                            top: `${[15, 25, 55, 45, 35, 65, 10, 75, 50, 30][i]}%`, 
                            left: `${[8, 75, 12, 68, 48, 38, 30, 55, 20, 85][i]}%`, 
                            //@ts-ignore
                            '--tx': `${[120, -100, 140, -120, 60, -70, 100, -130, 80, -90][i]}px`, 
                            '--ty': `${[-130, -110, 90, 70, -160, -90, 80, -70, -140, 100][i]}px`, 
                            animationDelay: `${delay}s` 
                        }} />
                    ))}
                </div>

                <div style={{ position: 'absolute', inset: 0, background: memory.leadScore >= 85 ? 'radial-gradient(ellipse at 50% 40%, rgba(225,6,0,0.15) 0%, transparent 65%)' : 'radial-gradient(ellipse at 50% 40%, rgba(225,6,0,0.07) 0%, transparent 65%)', pointerEvents: 'none', transition: 'background 2s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.4) 0%, transparent 50%)', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '850px', width: '100%' }}>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 22px', borderRadius: '30px', marginBottom: '36px', fontSize: '11px', color: memory.leadScore >= 85 ? 'var(--red)' : 'var(--gray-300)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, border: memory.leadScore >= 85 ? '1px solid rgba(225,6,0,0.4)' : '1px solid var(--border)' }}
                    >
                        <span style={{ fontSize: '14px' }}>🔒</span>
                        {memory.leadScore >= 85 ? 'Priorité Stratégique Détectée' : 'Entreprise vérifiée par Meta'}
                        <span style={{ width: '1px', height: '16px', background: 'var(--border)' }}></span>
                        {memory.profile.businessType || 'Fournisseur Officiel'}
                        <span style={{ width: '1px', height: '16px', background: 'var(--border)' }}></span>
                        Scoring Core Active
                    </motion.div>

                    <div className="fiko-core-container animate-float-slow" style={{ marginBottom: '36px' }} aria-hidden="true">
                        <div className="fiko-sphere"></div>
                        <div className="fiko-ring"></div>
                        <div className="fiko-ring"></div>
                        <div className="fiko-ring"></div>
                    </div>

                    {returningUser && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass" 
                            style={{ margin: '0 auto 20px', padding: '16px 28px', borderRadius: '20px', fontSize: '14px', color: 'var(--red)', fontWeight: 600, border: '1px solid rgba(225,6,0,0.3)', background: 'rgba(225,6,0,0.08)', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '500px', textAlign: 'left' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>🤖</span>
                                <div>
                                    <p style={{ margin: 0, lineHeight: 1.2, fontSize: '15px' }}>Bon retour {memory.profile.businessType ? `partenaire ${memory.profile.businessType}` : ''}.</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--gray-400)', fontWeight: 400 }}>Fiko Copilot a synchronisé votre intelligence business.</p>
                                </div>
                            </div>
                            
                            {memory.profile.recommendation && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ marginTop: '8px', padding: '10px 14px', background: 'rgba(225,6,0,0.1)', borderRadius: '12px', border: '1px solid rgba(225,6,0,0.2)', fontSize: '12px' }}
                                >
                                    <span style={{ color: 'var(--white)', fontWeight: 700 }}>Prochaine étape critique :</span> {memory.profile.recommendation}
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* STRATEGIC INSIGHTS FEED */}
                    <div style={{ height: '32px', marginBottom: '32px', overflow: 'hidden', position: 'relative' }}>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeInsight}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ fontSize: '14px', color: 'var(--gray-400)', margin: 0, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <span style={{ width: '4px', height: '4px', background: 'var(--red)', borderRadius: '50%' }} />
                                {strategicInsights[activeInsight]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <h1 style={{ fontSize: 'clamp(44px, 7vw, 76px)', fontWeight: 700, lineHeight: 1.08, marginBottom: '16px', letterSpacing: '-0.03em' }}>
                        {memory.profile.businessType === 'Créateur' ? 'Monétisation' : 
                         memory.profile.businessType === 'Agence' ? 'Scaling Business' :
                         memory.profile.businessType === 'Commerçant' ? 'Digital Local' :
                         'Fiko Business'}<br />
                        <span style={{ background: 'linear-gradient(135deg, #ff5555 0%, #E10600 40%, #cc0000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            {memory.profile.maturityLevel === 'Advanced' ? 'Executive Mode' : 'Copilot Pro'}
                        </span>
                    </h1>

                    <p style={{ fontSize: '18px', color: 'var(--gray-400)', marginBottom: '48px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.65 }}>
                        {memory.profile.businessType === 'Créateur' ? "Optimisez votre influence TikTok avec nos agents IA et rejoignez le réseau Elite." :
                         memory.profile.businessType === 'Agence' ? "Automatisez l'acquisition lead de vos clients et scalez vos revenus via Fiko." :
                         memory.profile.businessType === 'Commerçant' ? "Transformez votre commerce local en machine de vente via WhatsApp automatisé." :
                         "L'intelligence commerciale persistante qui pilote votre croissance. Fiko mémorise vos besoins pour vous guider vers les meilleures opportunités IA."}
                    </p>

                    <div className="search-wrapper" style={{ maxWidth: '640px', margin: '0 auto 40px' }}>
                        <form onSubmit={handleSearch}>
                            <input 
                                type="text" 
                                className="search-input" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isThinking ? "Fiko analyse votre intention..." : "Posez votre question business à Fiko..."}
                                aria-label="Posez votre question à Fiko"
                                disabled={isThinking}
                            />
                            {isThinking && (
                                <div style={{ position: 'absolute', left: '20px', bottom: '-25px', display: 'flex', gap: '15px' }}>
                                    <span style={{ fontSize: '10px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '4px', height: '4px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                                        Analyse comportementale
                                    </span>
                                    <span style={{ fontSize: '10px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '4px', height: '4px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1s infinite', animationDelay: '0.2s' }} />
                                        Detection intentions
                                    </span>
                                    <span style={{ fontSize: '10px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '4px', height: '4px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1s infinite', animationDelay: '0.4s' }} />
                                        Scoring business
                                    </span>
                                </div>
                            )}
                            <button 
                                type="submit"
                                className="btn-primary" 
                                style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', padding: '0 28px', fontSize: '14px', borderRadius: '12px' }}
                            >
                                {isThinking ? "Analyse..." : "Action IA"}
                            </button>
                        </form>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '44px' }}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => quickSearch('Rejoindre le réseau Elite')} className="badge badge-red" style={{ cursor: 'pointer', padding: '10px 18px', fontSize: '12px' }}>→ Devenir Ambassadeur Elite</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => quickSearch('Comment gagner des commissions')} className="badge badge-dark" style={{ cursor: 'pointer', padding: '10px 18px', fontSize: '12px', borderColor: 'rgba(225,6,0,0.3)' }}>→ Gagner des Commissions</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => quickSearch('Stratégie TikTok Business')} className="badge badge-dark" style={{ cursor: 'pointer', padding: '10px 18px', fontSize: '12px', borderColor: 'rgba(225,6,0,0.3)' }}>→ Stratégie TikTok IA</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => quickSearch('Niveaux Ambassadeur Fiko')} className="badge badge-dark" style={{ cursor: 'pointer', padding: '10px 18px', fontSize: '12px', borderColor: 'rgba(225,6,0,0.3)' }}>→ Débloquer les Niveaux</motion.button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--gray-400)', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {activeSignals.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                                    <span className="animate-ping" style={{ position: 'absolute', height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e', opacity: 0.75 }} />
                                    <span style={{ position: 'relative', height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }} />
                                </span>
                                {s.prefix}{s.value} {s.label}
                            </div>
                        ))}
                        {memory.leadScore > 20 && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--red)' }}
                            >
                                <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                                    <span className="animate-ping" style={{ position: 'absolute', height: '8px', width: '8px', borderRadius: '50%', background: 'var(--red)', opacity: 0.75 }} />
                                    <span style={{ position: 'relative', height: '8px', width: '8px', borderRadius: '50%', background: 'var(--red)' }} />
                                </span>
                                Business Sync: Active ({memory.leadScore}%)
                            </motion.div>
                        )}
                        {memory.profile.likelyNeed && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--white)' }}>
                                <span style={{ fontSize: '14px' }}>🎯</span>
                                Intention: {memory.profile.likelyNeed}
                            </div>
                        )}
                    </div>

                    <div className="glass-strong" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 26px', borderRadius: '30px', borderColor: 'rgba(225,6,0,0.3)', background: 'rgba(225,6,0,0.05)' }}>
                        <div style={{ width: '10px', height: '10px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out infinite', boxShadow: '0 0 10px var(--red)' }}></div>
                        <span style={{ fontSize: '13px', color: 'var(--white)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                            {memory.leadScore > 80 ? 'Analyse Stratégique Prioritaire' : 'Fiko Live Status: Online'}
                        </span>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, animation: 'float 2s ease-in-out infinite' }}>
                    <div style={{ width: '28px', height: '44px', border: '2px solid var(--border)', borderRadius: '14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '8px' }}>
                        <div style={{ width: '4px', height: '8px', background: 'var(--red)', borderRadius: '2px', animation: 'float 1.5s ease-in-out infinite' }} />
                    </div>
                </div>
            </section>

            {/* POPULAR QUESTIONS */}
            <section style={{ padding: '100px 20px', background: 'var(--black)' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag glass" style={{ marginBottom: '24px' }}>📋 Base de connaissances</div>
                        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                            Questions <span style={{ color: 'var(--red)' }}>populaires</span>
                        </h2>
                        <p style={{ color: 'var(--gray-400)', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>Les réponses aux questions les plus fréquentes de notre communauté</p>
                    </div>

                    <div className="grid-3">
                        {POPULAR_QUESTIONS.map((q, i) => (
                            <div key={i} className="card" style={{ padding: '24px' }} onClick={() => handleQuestionClick(q.question)}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <span style={{ fontSize: '28px', lineHeight: 1 }}>{q.icon}</span>
                                    <div>
                                        <p style={{ fontWeight: 500, marginBottom: '8px', fontSize: '15px' }}>{q.question}</p>
                                        <span className="badge badge-dark">{q.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #0c0c0c 100%)' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag glass" style={{ marginBottom: '24px' }}>🚀 Écosystème</div>
                        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                            Explorer les <span style={{ color: 'var(--red)' }}>produits</span>
                        </h2>
                        <p style={{ color: 'var(--gray-400)', fontSize: '17px' }}>Découvrez l'écosystème complet Krypton AI</p>
                    </div>

                    <div className="grid-2" id="productsGrid">
                        {PRODUCTS.map((p, i) => (
                            <div key={i} className="card" style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', marginBottom: '18px' }}>
                                    <span style={{ fontSize: '40px', lineHeight: 1 }}>{p.icon}</span>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', letterSpacing: '-0.01em' }}>{p.name}</h3>
                                        <p style={{ color: 'var(--gray-400)', fontSize: '14px', lineHeight: 1.65 }}>{p.description}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {p.features.map((f, i) => <span key={i} className="badge badge-red">{f}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section style={{ padding: '100px 20px', background: 'var(--gray-950)' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag glass" style={{ marginBottom: '24px' }}>📂 Catégories</div>
                        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                            Catégories d'<span style={{ color: 'var(--red)' }}>assistance</span>
                        </h2>
                        <p style={{ color: 'var(--gray-400)', fontSize: '17px' }}>Trouvez rapidement l'aide dont vous avez besoin</p>
                    </div>

                    <div className="grid-3" id="categoriesGrid">
                        {CATEGORIES.map((c, i) => (
                            <div key={i} className="card" style={{ padding: '28px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                                    <span style={{ fontSize: '26px' }}>{c.icon}</span>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{c.title}</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {c.questions.map((q, qi) => (
                                        <button 
                                            key={qi}
                                            //@ts-ignore - complex hover logic in HTML moved here for consistency
                                            onClick={() => handleQuestionClick(q)}
                                            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', fontSize: '13px', padding: '10px 14px', borderRadius: '10px', transition: 'all var(--transition)', fontFamily: 'Inter, sans-serif', width: '100%' }}
                                            className="hover:bg-white/5 hover:text-[#E10600] hover:pl-[18px]"
                                        >
                                            → {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* APPRENDRE AVEC FIKO */}
            <section style={{ padding: '100px 20px', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(225,6,0,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
                
                <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag glass" style={{ marginBottom: '24px', borderColor: 'rgba(225,6,0,0.3)' }}>🎓 Académie</div>
                        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                            Apprendre avec <span style={{ color: 'var(--red)' }}>Fiko</span>
                        </h2>
                        <p style={{ color: 'var(--gray-400)', fontSize: '17px', maxWidth: '550px', margin: '0 auto 16px' }}>
                            Plus qu'un support, Fiko est votre mentor IA. Apprenez à maîtriser l'automatisation pas à pas.
                        </p>
                        <a href="#" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginTop: '8px' }}>
                            Accéder à l'académie
                            <span style={{ fontSize: '18px' }}>→</span>
                        </a>
                    </div>

                    <div className="grid-2" style={{ gap: '24px' }}>
                        {LEARNING_BLOCKS.map((block, i) => (
                            <div key={i} className="card" style={{ padding: '32px', display: 'flex', gap: '20px', alignItems: 'flex-start', ...(i === 4 ? { gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto' } : {}) }}>
                                <div style={{ width: '56px', height: '56px', background: 'rgba(225,6,0,0.12)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                                    {block.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '19px', fontWeight: 600, marginBottom: '8px' }}>{block.title}</h3>
                                    <p style={{ color: 'var(--gray-400)', fontSize: '14px', lineHeight: 1.6 }}>{block.description}</p>
                                    <span className={`badge badge-${block.badgeType}`} style={{ marginTop: '12px', display: 'inline-block' }}>{block.badge}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AMBASSADEUR ELITE NETWORK SECTION */}
            <section style={{ padding: '100px 20px', background: 'var(--black)', position: 'relative' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div>
                            <div className="section-tag glass" style={{ marginBottom: '24px', color: 'var(--red)' }}>💎 Elite Growth System</div>
                            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                Rejoignez le réseau<br />
                                <span style={{ color: 'var(--red)' }}>Elite Ambassadeur</span>
                            </h2>
                            <p style={{ color: 'var(--gray-400)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.7 }}>
                                Transformez votre influence en moteur de revenus passifs. Le programme ambassadeur Fiko Connect n'est pas une simple affiliation, c'est un écosystème de croissance piloté par IA.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '30px', height: '30px', background: 'rgba(225,6,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)', fontSize: '14px', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Commissions Scalables</h4>
                                        <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>Gagnez sur chaque activation et chaque HOT Lead généré par votre réseau.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '30px', height: '30px', background: 'rgba(225,6,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)', fontSize: '14px', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Progression Gamifiée</h4>
                                        <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>Débloquez 7 niveaux d'élite, d'Initié à Titan Network, avec des bonus croissants.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '30px', height: '30px', background: 'rgba(225,6,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)', fontSize: '14px', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Accompagnement TikTok IA</h4>
                                        <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>Fiko vous coache sur les hooks et stratégies virales pour exploser votre acquisition.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-primary btn-large" onClick={() => quickSearch('Comment devenir ambassadeur')}>
                                Commencer l'Aventure Elite →
                            </button>
                        </div>
                        <div className="glass-strong" style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(225,6,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '15px', background: 'var(--red)', color: 'white', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Dashboard Preview</div>
                            
                            <div style={{ marginBottom: '30px' }}>
                                <p style={{ fontSize: '12px', color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: '8px' }}>Solde Estimé Ambassadeur</p>
                                <div style={{ fontSize: '36px', fontWeight: 800 }}>1 245,50 €</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div className="glass" style={{ padding: '15px', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '10px', color: 'var(--gray-500)', marginBottom: '5px' }}>HOT LEADS</p>
                                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--red)' }}>12 Active</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '10px', color: 'var(--gray-500)', marginBottom: '5px' }}>NIVEAU</p>
                                    <div style={{ fontSize: '18px', fontWeight: 700 }}>Closer (III)</div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '10px' }}>
                                    <span style={{ color: 'var(--gray-400)' }}>Progression vers Elite Growth</span>
                                    <span style={{ color: 'var(--white)' }}>82%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '82%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        style={{ height: '100%', background: 'var(--red)' }} 
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '25px', padding: '12px', background: 'rgba(225,6,0,0.05)', borderRadius: '8px', border: '1px solid rgba(225,6,0,0.1)', fontSize: '12px', color: 'var(--gray-300)' }}>
                                <span style={{ color: 'var(--red)', fontWeight: 700 }}>Fiko Insight:</span> Vos contenus TikTok sur la "Solution WhatsApp" génèrent 40% de conversion en plus. Focus recommandé.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KRYPTON AI POUR LES ENTREPRISES */}
            <section style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #0c0c0c 0%, #000000 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(225,6,0,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-100px', left: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(225,6,0,0.04) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag glass" style={{ marginBottom: '24px', borderColor: 'rgba(225,6,0,0.3)' }}>🏢 Solutions Enterprise</div>
                        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '18px', letterSpacing: '-0.02em' }}>
                            Krypton AI pour<br />
                            <span style={{ color: 'var(--red)' }}>les Entreprises</span>
                        </h2>
                        <p style={{ color: 'var(--gray-400)', fontSize: '17px', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
                            Krypton AI aide les entreprises à automatiser leur acquisition, leur communication et leur croissance grâce à des systèmes intelligents conçus pour convertir.
                        </p>
                    </div>

                    <div className="grid-3" style={{ marginBottom: '60px' }}>
                        {BUSINESS_BENEFITS.map((benefit, i) => (
                            <div key={i} className="card" style={{ padding: '28px', textAlign: 'center' }}>
                                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{benefit.icon}</div>
                                <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>{benefit.title}</h3>
                                <p style={{ color: 'var(--gray-400)', fontSize: '13px', lineHeight: 1.6 }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="glass-strong" style={{ padding: '48px', borderRadius: 'var(--radius-xl)', textAlign: 'center', borderColor: 'rgba(225,6,0,0.2)', maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
                        <h3 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.02em' }}>
                            Déployez votre <span style={{ color: 'var(--red)' }}>Agent Entreprise</span>
                        </h3>
                        <p style={{ color: 'var(--gray-400)', fontSize: '15px', marginBottom: '28px', lineHeight: 1.7, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                            Besoin d'une solution sur-mesure pour votre structure ? Nos ingénieurs IA configurent votre écosystème en 48h.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '28px' }}>
                            {CONTACTS.map((contact, i) => (
                                <div key={i} className="card" style={{ padding: '16px 24px', cursor: 'default', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '20px' }}>{contact.icon}</span>
                                    <span style={{ fontWeight: 500, fontSize: '15px' }}>{contact.number}</span>
                                </div>
                            ))}
                        </div>

                        <a href="https://cal.com/fiko-ai/session-strategique" target="_blank" rel="noopener noreferrer" className="btn-primary btn-large" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                            📅 Planifier un Appel Stratégique
                            <span style={{ fontSize: '18px' }}>→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST BANNER */}
            <section style={{ padding: '50px 20px', background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '13px', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🔒 Entreprise vérifiée par Meta</div>
                    <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>✓ Fournisseur de technologie officiel</div>
                    <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>💬 Compatible WhatsApp Business API</div>
                    <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🛡️ Conforme RGPD</div>
                </div>
            </section>

            {/* FIKO INTELLIGENCE ANALYTICS (BUSINESS COPILOT CORE) */}
            <section style={{ padding: '100px 20px', background: '#020202', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(225,6,0,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💎</div>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Copilot Strategic Core</h2>
                            <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Intelligence persistante pilotée par Fiko Business Engine</p>
                        </div>
                    </div>

                    <div className="grid-4">
                        <div className="glass" style={{ padding: '24px', borderRadius: '20px', border: memory.leadScore > 80 ? '1px solid rgba(225,6,0,0.4)' : '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opportunity Score</p>
                            <div style={{ fontSize: '36px', fontWeight: 800, color: memory.leadScore > 70 ? 'var(--red)' : 'var(--white)' }}>{memory.leadScore}<span style={{ fontSize: '18px', opacity: 0.5 }}>/100</span></div>
                            <div style={{ height: '4px', background: 'var(--gray-900)', borderRadius: '2px', marginTop: '16px', overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${memory.leadScore}%` }} style={{ height: '100%', background: 'var(--red)' }} />
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '24px', borderRadius: '20px' }}>
                            <p style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maturité Profil</p>
                            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--white)' }}>
                                {memory.profile.maturityLevel === 'Advanced' ? '🚀 ADVANCED' : 
                                 memory.profile.maturityLevel === 'Scaling' ? '📈 SCALING' :
                                 memory.profile.maturityLevel === 'Growing' ? '⚡ GROWING' : '🌱 EARLY'}
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: '8px' }}>Potentiel de croissance identifié</p>
                        </div>

                        <div className="glass" style={{ padding: '24px', borderRadius: '20px' }}>
                            <p style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conversion Score</p>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--white)' }}>{memory.profile.predictions?.proActivation || 0}<span style={{ fontSize: '16px', opacity: 0.5 }}>%</span></div>
                            <p style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: '8px' }}>Probabilité d'activation PRO</p>
                        </div>

                        <div className="glass" style={{ padding: '24px', borderRadius: '20px', background: memory.profile.businessType ? 'rgba(225,6,0,0.05)' : 'transparent' }}>
                            <p style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Identity</p>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: memory.profile.businessType ? 'var(--red)' : 'var(--white)' }}>
                                {memory.profile.businessType || 'ANONYME'}
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--gray-600)', marginTop: '4px' }}>Segment : {memory.profile.maturityLevel || 'Initial'}</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', marginTop: '30px' }}>
                        <div className="glass" style={{ borderRadius: '20px' }}>
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Timeline Stratégique Copilot</span>
                                <span style={{ color: 'var(--red)', fontSize: '10px' }}>• LIVE SESSION</span>
                            </div>
                            <div style={{ padding: '24px' }}>
                                {memory.timeline.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {memory.timeline.slice(-8).map((h, i) => (
                                            <div key={i} style={{ fontSize: '13px', color: 'var(--gray-400)', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                                <span style={{ color: 'var(--gray-700)', fontFamily: 'monospace', minWidth: '70px', fontSize: '11px' }}>{i + 1}. DETECT</span>
                                                <div style={{ width: '8px', height: '8px', background: i === memory.timeline.length - 1 ? 'var(--red)' : 'var(--gray-800)', borderRadius: '50%' }} />
                                                <span style={{ fontWeight: i === memory.timeline.length - 1 ? 700 : 400, color: i === memory.timeline.length - 1 ? 'var(--white)' : 'inherit' }}>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Initialisation du moteur de recommandation...</p>
                                )}
                            </div>
                        </div>

                        <div className="glass" style={{ borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', border: '1px solid rgba(225,6,0,0.2)', background: 'rgba(225,6,0,0.03)' }}>
                            <div style={{ fontSize: '44px', marginBottom: '16px' }}>📱</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px' }}>IA Business Ready?</h3>
                            <p style={{ color: 'var(--gray-500)', fontSize: '13px', marginBottom: '24px' }}>Votre profil est maintenant prêt pour une implémentation réelle de nos agents IA.</p>
                            <button className="btn-primary" style={{ width: '100%' }} onClick={() => quickSearch('Lancer mon plan stratégique IA')}>
                                Lancer mon Agent IA →
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', gap: '10px' }}>
                        <button className="badge badge-red" style={{ background: 'rgba(225,6,0,0.2)', border: '1px solid var(--red)', cursor: 'pointer' }} onClick={() => { localStorage.removeItem('fiko_memory'); window.location.reload(); }}>
                            Reset AI Memory
                        </button>
                        <button className="badge badge-dark">Export Session CSV</button>
                        <button className="badge badge-dark">View Heatmap</button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: '36px 20px', background: 'var(--black)', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', color: 'var(--gray-500)', fontSize: '12px', letterSpacing: '0.02em' }}>
                © 2026 Krypton AI. Propulsé par Fiko Assistant Intelligence Premium.
            </footer>

            {/* MODAL ASSISTANT FIKO */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay" 
                        onClick={() => { setIsModalOpen(false); setFikoResponse(null); }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="modal-content" 
                            onClick={(e) => e.stopPropagation()}
                            style={{ borderTop: '4px solid var(--red)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ width: '60px', height: '60px', background: 'rgba(225,6,0,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0, border: '1px solid rgba(225,6,0,0.2)', boxShadow: '0 0 20px rgba(225,6,0,0.1)' }}>
                                    🤖
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                        <h3 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--white)' }}>Krypton Assistant</h3>
                                        {fikoResponse?.intent && (
                                            <span className="badge badge-red" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{fikoResponse.intent}</span>
                                        )}
                                        {fikoResponse?.score && fikoResponse.score > 70 && (
                                            <span style={{ fontSize: '10px', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>HOT PROSPECT</span>
                                        )}
                                    </div>
                                    
                                    {/* PROBABILITY ENGINE DISPLAY */}
                                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '11px', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Indice de compatibilité IA</span>
                                            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--red)' }}>{memory.profile.predictions?.proActivation}%</span>
                                        </div>
                                        <div style={{ height: '4px', background: 'var(--gray-900)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${memory.profile.predictions?.proActivation}%` }} style={{ height: '100%', background: 'var(--red)' }} />
                                        </div>
                                        <p style={{ fontSize: '10px', color: 'var(--gray-600)', marginTop: '8px' }}>
                                            Analyse prédictive basée sur votre profil de {memory.profile.businessType || 'partenaire'} en phase {memory.profile.maturityLevel}.
                                        </p>
                                    </div>

                                    {/* VISUAL ANALYSIS TIMELINE */}
                                    <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <p style={{ fontSize: '10px', color: 'var(--gray-600)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Copilot Timeline d'Analyse</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {memory.timeline.slice(-4).map((note, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.12 }}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: i === 3 ? 'var(--white)' : 'var(--gray-500)' }}
                                                >
                                                    <div style={{ width: '4px', height: '4px', background: i === 3 ? 'var(--red)' : 'var(--gray-700)', borderRadius: '50%' }} />
                                                    {note}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <p style={{ color: 'var(--gray-400)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                                        <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
                                        Intelligence active • Analyse contextuelle
                                    </p>
                                </div>
                                <button onClick={() => { setIsModalOpen(false); setFikoResponse(null); }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--gray-400)', width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', transition: 'all var(--transition)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover:bg-white/10 hover:text-white">✕</button>
                            </div>

                            <div style={{ color: 'var(--gray-200)', lineHeight: '1.8', marginBottom: '32px', fontSize: '16px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', fontSize: '13px', color: 'var(--gray-400)', border: '1px solid var(--border)' }}>
                                    <span style={{ color: 'var(--red)', fontWeight: 700 }}>REQUÊTE :</span> "{fikoResponse?.question}"
                                </div>
                                <div style={{ paddingLeft: '4px' }} dangerouslySetInnerHTML={{ __html: fikoResponse?.answer || '' }} />
                            </div>

                            {/* SMART ESCALATION BLOC */}
                            {showEscalation && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ background: 'rgba(225,6,0,0.05)', border: '1px solid rgba(225,6,0,0.2)', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🔥</span>
                                        <h4 style={{ color: 'var(--white)', fontSize: '15px', fontWeight: 700 }}>Analyse Expert Recommandée</h4>
                                    </div>
                                    <p style={{ color: 'var(--gray-400)', fontSize: '13px', marginBottom: '16px' }}>Votre projet présente un fort potentiel technologique. Souhaitez-vous une assistance stratégique personnalisée avec un ingénieur ?</p>
                                    <a href="https://cal.com/fiko-ai/session-strategique" target="_blank" rel="noopener" className="btn-primary" style={{ display: 'inline-block', width: '100%', textAlign: 'center', textDecoration: 'none' }}>
                                        🎯 Planifier une Session Stratégique
                                    </a>
                                </motion.div>
                            )}

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                                    🎬 {fikoResponse?.actions[0]}
                                </button>
                                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                                    🚀 {fikoResponse?.actions[1]}
                                </button>
                            </div>

                            <p style={{ marginTop: '20px', fontSize: '11px', color: 'var(--gray-600)', textAlign: 'center', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Système Krypton AI • Confidentialité Garantie
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .assistance-page .card {
                    --mouse-x: ${mousePosition.x}px;
                    --mouse-y: ${mousePosition.y}px;
                }
            `}</style>
        </div>
    );
};

export default AssistancePage;
