import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../../types';
import { ROUTES } from '../../routes.config';

interface AboutPageProps {
    onNavigate: (page: Page) => void;
}

interface Letter {
    id: number;
    date: string;
    title: string;
    excerpt: string;
    plainText: string;
    content: string;
}

const LETTERS_DATA: Letter[] = [
    {
        id: 1,
        date: '15 Janvier 2025',
        title: 'Le prochain géant de votre secteur',
        excerpt: 'Le prochain géant de votre secteur ne sera pas forcément le plus grand. Ce sera le plus connecté, le plus intelligent et le plus automatisé.',
        plainText: `Lettre ouverte aux dirigeants, entrepreneurs et bâtisseurs d'Afrique. Le prochain géant de votre secteur ne sera pas forcément le plus grand. Ce sera le plus connecté, le plus intelligent et le plus automatisé. Chers dirigeants, chers entrepreneurs, chers bâtisseurs de l'économie africaine. Depuis plusieurs années, j'observe une réalité qui revient dans presque toutes les entreprises que nous accompagnons. Peu importe le secteur, peu importe la taille de l'entreprise, peu importe le pays. Les mêmes difficultés ralentissent encore la croissance de milliers d'organisations africaines : des équipes débordées, des clients mal suivis, des ventes qui dépendent trop des humains, des outils dispersés, des données perdues, des paiements compliqués, des campagnes inefficaces, des entreprises incapables d'automatiser leur croissance. Pendant que le monde avance vers l'intelligence artificielle, l'automatisation et les infrastructures connectées, beaucoup d'entreprises africaines continuent encore de fonctionner avec des systèmes fragmentés. Et c'est précisément là que se crée aujourd'hui le plus grand écart de compétitivité. Le vrai problème n'est pas le manque de clients. Le vrai problème est souvent l'absence d'un écosystème capable de transformer chaque opportunité en croissance durable. La question n'est donc plus : faut-il se digitaliser ? La vraie question est : votre entreprise est-elle prête pour l'économie qui arrive ? Chez KCG, nous avons décidé de construire cette infrastructure. Notre objectif était de créer un écosystème capable d'aider les entreprises africaines à vendre plus, automatiser leurs opérations, simplifier leurs paiements, centraliser leurs outils, exploiter l'intelligence artificielle et scaler avec beaucoup plus de puissance. Je crois que l'Afrique possède les talents, les idées, les entrepreneurs et l'énergie pour bâtir les prochaines grandes réussites mondiales. Mais pour y parvenir, nous devons construire des infrastructures modernes capables d'accélérer cette croissance. C'est exactement la mission que nous poursuivons chez KCG. Et ce n'est que le commencement. Rejoignez notre vision.`,
        content: `
            <h1>Lettre ouverte aux dirigeants, entrepreneurs et bâtisseurs d'Afrique</h1>
            <h2><strong>Le prochain géant de votre secteur ne sera pas forcément le plus grand.</strong><br><strong>Ce sera le plus connecté, le plus intelligent et le plus automatisé.</strong></h2>
            <p>Chers dirigeants,<br>Chers entrepreneurs,<br>Chers bâtisseurs de l'économie africaine,</p>
            <p>Depuis plusieurs années, j'observe une réalité qui revient dans presque toutes les entreprises que nous accompagnons. Peu importe le secteur. Peu importe la taille de l'entreprise. Peu importe le pays. Les mêmes difficultés ralentissent encore la croissance de milliers d'organisations africaines :</p>
            <ul>
                <li>des équipes débordées,</li>
                <li>des clients mal suivis,</li>
                <li>des ventes qui dépendent trop des humains,</li>
                <li>des outils dispersés,</li>
                <li>des données perdues,</li>
                <li>des paiements compliqués,</li>
                <li>des campagnes inefficaces,</li>
                <li>des entreprises incapables d'automatiser leur croissance.</li>
            </ul>
            <p>Pendant que le monde avance vers l'intelligence artificielle, l'automatisation et les infrastructures connectées, beaucoup d'entreprises africaines continuent encore de fonctionner avec des systèmes fragmentés. Et c'est précisément là que se crée aujourd'hui le plus grand écart de compétitivité.</p>
            <hr />
            <h3>Le vrai problème n'est pas le manque de clients</h3>
            <p>Le vrai problème est souvent : <strong>l'absence d'un écosystème capable de transformer chaque opportunité en croissance durable.</strong></p>
            <p>Aujourd'hui, un client peut : vous écrire sur WhatsApp, disparaître sans relance, vouloir payer sans solution simple, demander une assistance à minuit, ou attendre une réponse que votre équipe n'a pas le temps de traiter.</p>
            <p>Pendant ce temps, des entreprises ailleurs dans le monde utilisent déjà : des agents IA, des CRM intelligents, des systèmes automatisés, et des infrastructures capables de travailler 24h/24.</p>
            <div class="bg-white border-l-[3px] border-[#C8A45C] p-4 my-5 italic text-[#0A0A0A]">La question n'est donc plus : <strong>"Faut-il se digitaliser ?"</strong><br>La vraie question est : <strong>"Votre entreprise est-elle prête pour l'économie qui arrive ?"</strong></div>
            <hr />
            <h3>Chez KCG, nous avons décidé de construire cette infrastructure</h3>
            <p>Lorsque nous avons fondé KOFFMANN CAPITAL GROUP, notre objectif n'était pas de créer une simple entreprise technologique. Nous voulions construire un écosystème capable d'aider les entreprises africaines à vendre plus, automatiser leurs opérations, simplifier leurs paiements, centraliser leurs outils, exploiter l'intelligence artificielle, et scaler avec beaucoup plus de puissance.</p>
            <hr />
            <h3>Une IA capable de travailler pour votre entreprise</h3>
            <p>Avec <strong>Krypton AI</strong>, nous développons des agents conversationnels intelligents capables d'assister les entreprises automatiquement sur plusieurs canaux. Cette technologie alimente notamment <strong>Fiko Connect</strong>, qui transforme WhatsApp, Facebook et les messageries en véritables systèmes commerciaux intelligents.</p>
            <p>Imaginez une entreprise capable : de répondre instantanément à ses prospects, de relancer automatiquement ses clients, d'envoyer des campagnes intelligentes, de scorer ses leads, et de convertir plus… même pendant votre sommeil. Ce n'est plus une vision futuriste. C'est déjà en train de se produire.</p>
            <hr />
            <h3>Parce que la croissance ne doit pas être compliquée</h3>
            <p>Nous avons également compris qu'aucune entreprise ne peut scaler durablement avec des paiements fragmentés. C'est pourquoi nous avons développé des solutions pour simplifier les paiements, les abonnements, les transactions, et les collectes de fonds. Parce qu'un business qui grandit doit pouvoir encaisser facilement, rapidement et intelligemment.</p>
            <hr />
            <h3>Une technologie qui sert aussi l'impact social</h3>
            <p>L'Afrique possède une force immense : <strong>ses communautés</strong>. Mais beaucoup d'ONG, d'associations et de projets sociaux manquent encore d'outils adaptés. C'est pourquoi nous avons conçu des plateformes pour aider les organisations à mieux gérer leurs opérations et amplifier leur impact.</p>
            <hr />
            <h3>Le futur appartient aux écosystèmes connectés</h3>
            <p>Les prochaines grandes entreprises africaines ne seront pas simplement celles qui possèdent un bon produit. Ce seront celles capables de connecter leurs clients, leurs données, leurs paiements, leur communication, leur intelligence artificielle et leurs opérations dans un seul système cohérent. C'est cette nouvelle génération d'infrastructure que nous construisons.</p>
            <hr />
            <h3>Une vision validée par les standards internationaux</h3>
            <p>La reconnaissance officielle de certaines de nos technologies par Meta for Developers renforce notre engagement à bâtir des solutions fiables, sécurisées et conformes aux standards technologiques mondiaux. Mais au-delà de la technologie, notre véritable mission reste humaine : <strong>aider les entreprises africaines à entrer dans une nouvelle dimension de croissance.</strong></p>
            <hr />
            <h3>Ce que je crois profondément</h3>
            <p>Je crois que l'Afrique possède les talents, les idées, les entrepreneurs et l'énergie pour bâtir les prochaines grandes réussites mondiales. Mais pour y parvenir, nous devons construire des infrastructures modernes capables d'accélérer cette croissance. C'est exactement la mission que nous poursuivons chez KCG. Et ce n'est que le commencement.</p>
            <hr />
            <h3>Rejoignez notre vision</h3>
            <p>Chaque semaine, je partage personnellement : des réflexions stratégiques, des analyses business, des tendances IA, des systèmes de croissance, des opportunités technologiques, et des stratégies concrètes pour aider les entreprises à scaler plus vite.</p>
            <div class="text-right mt-10 pt-5 border-t border-black/10">
                <p class="font-mono font-bold text-[0.8rem] tracking-[3px] text-[#0A0A0A] uppercase">Paul Koffmann</p>
                <p class="text-[0.65rem] text-[#8B8B8B] tracking-[2px] mt-1">CEO & Founder — KOFFMANN CAPITAL GROUP</p>
                <p class="font-serif italic text-[0.85rem] text-[#C8A45C] mt-2">"Building Africa's Connected Future."</p>
            </div>
        `
    },
    ...Array.from({ length: 19 }, (_, i) => {
        const titles = ["L'infrastructure avant l'application","Pourquoi l'Afrique doit créer ses propres champions","Automatisation : le levier ignoré","La data, nouveau pétrole africain","Construire pour scaler","L'IA n'est pas une mode, c'est une révolution","Paiements : le chaînon manquant","WhatsApp, votre prochain CRM","Le mythe du marché saturé","PME africaines, réveillez-vous","L'écosystème KCG expliqué","De la startup à la scale-up","Sécurité et confiance numérique","L'impact social par la tech","Pourquoi j'ai fondé KCG","Les 3 piliers de la croissance moderne","Conversational Commerce","Meta Verified : ce que ça change","Bâtir des ponts, pas des silos"];
        const excerpts = ["Sans infrastructure solide, aucune application ne peut tenir la charge.","L'Afrique a les talents. Elle a besoin des outils.","L'automatisation est le seul chemin vers la scalabilité.","Les données bien exploitées valent plus que l'or.","Scaler, c'est grandir sans se briser.","L'IA redéfinit les règles du commerce mondial.","Simplifier les paiements, libérer la croissance.","2 milliards d'utilisateurs WhatsApp. Votre canal de vente.","Il n'y a pas de marché saturé, seulement des approches dépassées.","Les PME africaines ont un potentiel immense.","KCG est un écosystème de croissance.","De startup à scale-up : l'infrastructure fait la différence.","La confiance numérique est le fondement.","La technologie amplifie l'impact social.","Retour sur la vision originelle de KCG.","Automatisation, IA, données : les trois moteurs.","Le commerce conversationnel change tout.","La certification Meta valide notre excellence.","L'avenir appartient aux écosystèmes intégrés."];
        const title = titles[i];
        const excerpt = excerpts[i];
        return {
            id: i + 2,
            date: `${['Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre'][i]} 2025`,
            title: title,
            excerpt: excerpt,
            plainText: `Lettre du CEO Paul Koffmann : ${title}. ${excerpt} Chers bâtisseurs, cette lettre explore une dimension essentielle de notre mission chez KOFFMANN CAPITAL GROUP. Nous croyons fermement que l'Afrique possède tous les atouts pour devenir un leader technologique mondial. Notre conviction est simple : l'infrastructure précède toujours l'innovation durable. À travers nos solutions, Krypton AI, Fiko Connect et nos autres plateformes, nous construisons les fondations qui permettront aux entreprises africaines de rivaliser à l'échelle internationale. Merci de faire partie de cette aventure.`,
            content: `
                <h1>${title}</h1>
                <p>Chers bâtisseurs,</p>
                <p>Cette lettre explore une dimension essentielle de notre mission chez KOFFMANN CAPITAL GROUP.</p>
                <div class="bg-white border-l-[3px] border-[#C8A45C] p-4 my-5 italic text-[#0A0A0A]">Notre conviction : <strong>l'infrastructure précède toujours l'innovation durable.</strong></div>
                <p>À travers Krypton AI, Fiko Connect et nos autres plateformes, nous construisons les fondations.</p>
                <div class="text-right mt-10 pt-5 border-t border-black/10">
                    <p class="font-mono font-bold text-[0.8rem] tracking-[3px] text-[#0A0A0A] uppercase">Paul Koffmann</p>
                    <p class="text-[0.65rem] text-[#8B8B8B] tracking-[2px] mt-1">CEO & Founder — KOFFMANN CAPITAL GROUP</p>
                    <p class="font-serif italic text-[0.85rem] text-[#C8A45C] mt-2">"Building Africa's Connected Future."</p>
                </div>
            `
        };
    })
];

const LETTERS_PER_PAGE = 20;

const TypewriterText: React.FC<{ phrases: string[] }> = ({ phrases }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === phrases[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 2000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 50 : 100, Math.floor(Math.random() * (reverse ? 75 : 150))));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, phrases]);

    return (
        <span className="font-mono text-[clamp(1rem,2vw,1.5rem)] tracking-[5px] text-white uppercase">
            {phrases[index].substring(0, subIndex)}
            <span className="animate-pulse">|</span>
        </span>
    );
};

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
    const lettersRef = useRef<HTMLElement>(null);
    
    // Audio Player State
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [estimatedDuration, setEstimatedDuration] = useState(0);
    const [pausedElapsed, setPausedElapsed] = useState(0);
    const [playbackStartTime, setPlaybackStartTime] = useState(0);
    
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        
        // Load voices
        const loadVoicesList = () => {
            if (!synth) return;
            const availableVoices = synth.getVoices();
            
            // Prioritize high-quality French male voices
            // Keywords for high quality: 'Natural', 'Premium', 'Google', 'Enhanced'
            const frVoices = availableVoices.filter(v => v.lang.startsWith('fr'));
            
            const maleKeywords = ['Thomas', 'Nicolas', 'Paul', 'Daniel', 'Gilles', 'Male', 'Homme'];
            const qualityKeywords = ['Natural', 'Premium', 'Google', 'Enhanced', 'Multilingual'];
            
            frVoices.sort((a, b) => {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();
                
                const aIsMale = maleKeywords.some(k => aName.includes(k.toLowerCase()));
                const bIsMale = maleKeywords.some(k => bName.includes(k.toLowerCase()));
                
                const aIsHighQuality = qualityKeywords.some(k => aName.includes(k.toLowerCase()));
                const bIsHighQuality = qualityKeywords.some(k => bName.includes(k.toLowerCase()));
                
                // Sort by combined score (Male + High Quality first)
                if ((aIsMale && aIsHighQuality) && !(bIsMale && bIsHighQuality)) return -1;
                if (!(aIsMale && aIsHighQuality) && (bIsMale && bIsHighQuality)) return 1;
                
                if (aIsMale && !bIsMale) return -1;
                if (!aIsMale && bIsMale) return 1;
                
                if (aIsHighQuality && !bIsHighQuality) return -1;
                if (!aIsHighQuality && bIsHighQuality) return 1;
                
                return a.name.localeCompare(b.name);
            });

            setVoices(frVoices.length > 0 ? frVoices : availableVoices);
            
            if (frVoices.length > 0) {
                setSelectedVoice(frVoices[0]);
            } else if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        if (synth) {
            synth.onvoiceschanged = loadVoicesList;
            loadVoicesList();
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            if (synth) synth.cancel();
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [synth]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const estimateDuration = (text: string, rate: number) => {
        const words = text.split(/\s+/).length;
        const baseWPM = 150;
        return (words / (baseWPM * rate)) * 60;
    };

    const stopAudio = () => {
        if (!synth) return;
        synth.cancel();
        setIsPlaying(false);
        setIsPaused(false);
        if (progressInterval.current) clearInterval(progressInterval.current);
        setCurrentTime(0);
        setPausedElapsed(0);
    };

    const startAudioPlayback = (text: string) => {
        if (!synth) return;
        stopAudio();

        const duration = estimateDuration(text, playbackSpeed);
        setEstimatedDuration(duration);
        setPlaybackStartTime(Date.now());

        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = playbackSpeed * 0.95; // Slightly slower for more authority
        utterance.pitch = 0.85; // Deeper, more manly voice
        utterance.volume = 1;

        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
            setPlaybackStartTime(Date.now());
            progressInterval.current = setInterval(() => {
                setCurrentTime(prev => {
                    const elapsed = (Date.now() - playbackStartTime) / 1000;
                    const total = pausedElapsed + elapsed;
                    return Math.min(total, duration);
                });
            }, 100);
        };

        utterance.onend = () => {
            stopAudio();
            setCurrentTime(duration);
        };

        utterance.onerror = () => stopAudio();

        synth.speak(utterance);
    };

    const togglePlayback = () => {
        if (!synth || !selectedLetter) return;
        if (isPlaying && !isPaused) {
            synth.pause();
            setIsPaused(true);
            setIsPlaying(false);
            setPausedElapsed(prev => prev + (Date.now() - playbackStartTime) / 1000);
            if (progressInterval.current) clearInterval(progressInterval.current);
        } else if (isPaused) {
            synth.resume();
            setIsPaused(false);
            setIsPlaying(true);
            setPlaybackStartTime(Date.now());
            progressInterval.current = setInterval(() => {
                setCurrentTime(prev => {
                    const elapsed = (Date.now() - playbackStartTime) / 1000;
                    const total = pausedElapsed + elapsed;
                    return Math.min(total, estimatedDuration);
                });
            }, 100);
        } else {
            startAudioPlayback(selectedLetter.plainText);
        }
    };

    useEffect(() => {
        if (selectedLetter) {
            // Auto-start audio when modal opens
            const timer = setTimeout(() => {
                startAudioPlayback(selectedLetter.plainText);
            }, 600);
            return () => clearTimeout(timer);
        } else {
            stopAudio();
        }
    }, [selectedLetter, selectedVoice, playbackSpeed]);

    const totalPages = Math.ceil(LETTERS_DATA.length / LETTERS_PER_PAGE);
    const currentLetters = LETTERS_DATA.slice((currentPage - 1) * LETTERS_PER_PAGE, currentPage * LETTERS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (lettersRef.current) {
            lettersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
    };

    return (
        <div className="bg-black text-[#F5F3EF] selection:bg-[#C8A45C]/30 selection:text-[#F5F3EF] min-h-screen font-sans overflow-x-hidden">
            {/* Custom Cursor */}
            <motion.div 
                className="fixed w-2 h-2 bg-[#C8A45C] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{ 
                    x: cursorPos.x - 4, 
                    y: cursorPos.y - 4,
                    scale: isMouseDown ? 1.5 : 1
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.5 }}
            />
            <motion.div 
                className="fixed w-10 h-10 border border-[#C8A45C]/50 rounded-full pointer-events-none z-[9998]"
                animate={{ 
                    x: cursorPos.x - 20, 
                    y: cursorPos.y - 20,
                    scale: isMouseDown ? 0.7 : 1
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
            />

            {/* Circuit Background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
                <svg viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M0 400 L300 400 L350 350 L500 350 L550 400 L800 400 L850 450 L1000 450 L1050 400 L1200 400" stroke="#C8A45C" strokeWidth="0.5" fill="none"/>
                    <path d="M400 0 L400 150 L350 200 L350 350 L400 400" stroke="#C8A45C" strokeWidth="0.5" fill="none"/>
                    <path d="M600 800 L600 600 L650 550 L650 400 L600 350" stroke="#C8A45C" strokeWidth="0.5" fill="none"/>
                    <path d="M900 0 L900 200 L850 250 L850 400 L900 450" stroke="#C8A45C" strokeWidth="0.5" fill="none"/>
                    <circle cx="350" cy="350" r="2" fill="#C8A45C" opacity="0.5"/>
                    <circle cx="650" cy="400" r="2" fill="#C8A45C" opacity="0.5"/>
                    <circle cx="850" cy="450" r="2" fill="#C8A45C" opacity="0.5"/>
                    <circle cx="1050" cy="400" r="2" fill="#C8A45C" opacity="0.5"/>
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* SECTION 1: HERO */}
                <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-black">
                    <motion.div 
                        initial={{ opacity: 0, letterSpacing: '0px', filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, letterSpacing: '20px', filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <h1 className="font-sans font-black text-[clamp(1.2rem,4vw,3.5rem)] tracking-[20px] leading-tight bg-gradient-to-b from-[#D4AF6C] via-[#C8A45C] to-[#8B6914] bg-clip-text text-transparent uppercase drop-shadow-[0_0_20px_rgba(200,164,92,0.4)]">
                            KOFFMANN CAPITAL GROUP
                        </h1>
                    </motion.div>

                    {/* Typewriter Animation */}
                    <div className="mt-8 h-8 flex items-center justify-center">
                        <TypewriterText 
                            phrases={[
                                "Krypton AI", "Fiko Connect", "Fiko AI", "Fiko Pay", 
                                "Fiko Saas", "Fiko delivery", "Airvoo", "Nos Artisans", 
                                "Pegasus RH", "Trillion AI", "Afriwood", "KCG Truth", 
                                "FGFS", "LYNN", "Vivacompta"
                            ]} 
                        />
                    </div>
                </section>

                {/* SECTION 2: INFRASTRUCTURE VISION */}
                <section className="py-32 px-10 bg-[#0A0A0A] border-y border-white/[0.03]">
                    <div className="max-w-[1100px] mx-auto text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <p className="font-sans font-extralight tracking-[0.6em] text-[clamp(1rem,2vw,1.3rem)] uppercase text-[#F5F3EF]/70 mb-6">
                                Nous ne créons pas de logiciels.
                            </p>
                            <h2 className="font-sans font-black text-[clamp(2rem,5vw,4.5rem)] tracking-tight leading-[1.1] text-white max-w-5xl mx-auto">
                                Nous construisons l'infrastructure technologique<br className="hidden md:block" /> des entreprises africaines de demain.
                            </h2>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: MISSION - White */}
                <section className="py-32 px-10 bg-[#FBF9F6] text-[#0A0A0A]">
                    <div className="max-w-[1100px] mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <p className="font-mono text-[0.7rem] tracking-[6px] uppercase text-[#C8A45C] mb-6 font-medium">Notre Mission</p>
                            <h2 className="font-sans font-extrabold text-[clamp(2.2rem,4.5vw,4rem)] tracking-tight leading-[1.1] text-[#0A0A0A] mb-8">Une nouvelle génération de groupe technologique africain</h2>
                            
                            <div className="flex items-center justify-center flex-wrap gap-5 font-mono font-bold text-[clamp(1rem,2vw,1.4rem)] tracking-[1px] uppercase my-12 p-10 border border-[#0A0A0A]/10 bg-white/50">
                                <span className="p-4 py-6 bg-[#0A0A0A] text-[#C8A45C] whitespace-nowrap text-[0.9rem]">ENTREPRISES<br/>AFRICAINES</span>
                                <span className="text-[2rem] text-[#C8A45C] font-light">+</span>
                                <span className="p-4 py-6 bg-[#0A0A0A] text-[#C8A45C] whitespace-nowrap text-[0.9rem]">TECH MONDIALE<br/>DE CROISSANCE</span>
                                <span className="text-[2.5rem] text-[#C8A45C] font-black">=</span>
                                <span className="p-4 py-6 bg-[#C8A45C] text-[#0A0A0A] whitespace-nowrap text-[0.9rem] font-black">DOMINATION<br/>DE MARCHÉ</span>
                            </div>
                            
                            <div className="flex gap-5 flex-wrap justify-center mt-10">
                                {['Automatisation', 'IA', 'CRM', 'Scalabilité', 'Data'].map((item) => (
                                    <div key={item} className="w-24 h-24 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center font-mono text-[0.65rem] tracking-[2px] uppercase text-center transition-all duration-400 hover:bg-[#0A0A0A] hover:text-[#C8A45C] hover:border-[#0A0A0A] hover:scale-110 cursor-default">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 4: KRYPTON AI - Reactor Core */}
                <section className="py-32 px-10 bg-black relative overflow-hidden">
                    <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,164,92,0.08)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
                    <div className="section-inner relative z-10 text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <p className="font-mono text-[0.7rem] tracking-[6px] uppercase text-[#C8A45C] mb-8 font-medium">Au cœur de notre écosystème, le nucléaire.</p>
                            <h2 className="font-mono font-extrabold text-[clamp(2.5rem,8vw,7rem)] tracking-[8px] uppercase text-center bg-gradient-to-b from-[#FFD700] via-[#C8A45C] to-[#8B6914] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(200,164,92,0.5)]">KRYPTON AI</h2>
                            
                            <div className="w-48 h-48 border border-[#C8A45C]/30 rounded-full mx-auto my-10 relative animate-[spin_20s_linear_infinite]">
                                <div className="w-2 h-2 bg-[#D4AF6C] rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_20px_#C8A45C]"></div>
                            </div>
                            
                            <p className="text-[1.3rem] leading-[1.7] font-light text-[#F5F3EF]/90 max-w-[700px] mx-auto mb-10">
                                Krypton AI alimente des solutions comme <strong className="text-[#C8A45C] font-bold">FIKO CONNECT</strong> — CRM intelligent, campagnes automatisées, scoring commercial.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 5: META VERIFIED */}
                <section className="py-32 px-10 bg-[#F2F0EC] text-[#0A0A0A]">
                    <div className="max-w-[1100px] mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <p className="font-mono text-[0.7rem] tracking-[6px] uppercase text-[#C8A45C] mb-6 font-medium">Reconnaissance Internationale</p>
                            <h2 className="font-sans font-extrabold text-[clamp(2.2rem,4.5vw,4rem)] tracking-tight leading-[1.1] text-[#0A0A0A] mb-5">KCG franchit une étape.</h2>
                            
                            <div className="inline-flex items-center gap-4 px-8 py-5 border-2 border-[#1A1A1A] bg-white mb-8">
                                <span className="font-mono font-bold text-[1.2rem] tracking-[2px]">Meta</span>
                                <span className="text-[#C8A45C] font-light">for</span>
                                <span className="font-mono font-bold text-[1.2rem] tracking-[2px]">Developers</span>
                            </div>
                            
                            <div className="flex gap-10 mt-8 flex-wrap">
                                {['SÉCURITÉ', 'FIABILITÉ', 'INTÉGRATION'].map((pillar) => (
                                    <span key={pillar} className="font-mono font-bold text-[0.8rem] tracking-[5px] text-[#2A2A2A] pl-5 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-[#C8A45C]">
                                        {pillar}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 6: ECOSYSTEM */}
                <section className="py-32 px-10 bg-black">
                    <div className="max-w-[1100px] mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <p className="font-mono text-[0.7rem] tracking-[6px] uppercase text-[#C8A45C] mb-8 font-medium">Plus qu'une entreprise</p>
                            <h2 className="font-sans font-extrabold text-[clamp(2.2rem,4.5vw,4rem)] tracking-tight leading-[1.1]">KCG : Un écosystème.</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 mt-16">
                                {[
                                    { nr: '01', title: 'Automatisation', desc: 'Systèmes intelligents 24h/24.' },
                                    { nr: '02', title: 'IA', desc: 'Scoring, prédiction, génération de leads.' },
                                    { nr: '03', title: 'Infrastructure', desc: 'Plateformes SaaS robustes.' },
                                    { nr: '04', title: 'Croissance', desc: 'Des écosystèmes conçus pour scaler sans limite.' }
                                ].map((card) => (
                                    <div key={card.nr} className="bg-[#111111] p-12 border border-white/5 transition-all duration-500 relative group hover:bg-[#181818] hover:border-[#C8A45C]/20">
                                        <div className="font-mono text-[0.6rem] tracking-[6px] text-[#C8A45C] mb-5">{card.nr}</div>
                                        <div className="font-mono font-bold text-[1.1rem] tracking-[1px] uppercase mb-3">{card.title}</div>
                                        <p className="text-[0.85rem] text-[#F5F3EF]/50 leading-[1.6]">{card.desc}</p>
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C8A45C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                                    </div>
                                ))}
                            </div>
                            
                            <h3 className="font-sans font-extrabold text-[clamp(2rem,5vw,4rem)] tracking-tight leading-[1.05] text-center mt-20 text-[#C8A45C]">Nous bâtissons une infrastructure capable de rivaliser à l'échelle mondiale.</h3>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 7: FOUNDER LETTERS GRID */}
                <section className="py-32 px-10 bg-[#0D0D0D]" ref={lettersRef}>
                    <div className="max-w-[1100px] mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <p className="font-mono text-[0.7rem] tracking-[6px] uppercase text-[#C8A45C] mb-6 font-medium">Lettres du Fondateur</p>
                            <h2 className="font-sans font-extrabold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight leading-[1.1]">Archives & Réflexions</h2>
                            <p className="text-[1.1rem] leading-[1.8] text-[#F5F3EF]/80 font-light mt-3">Chaque lettre est une brique de notre vision. Lisez ou <span className="text-[#C8A45C] font-semibold">🎧 écoutez</span> l'intégralité.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 mt-12 bg-[#C8A45C]/5">
                                {currentLetters.map((letter) => (
                                    <motion.div 
                                        key={letter.id} 
                                        onClick={() => setSelectedLetter(letter)}
                                        whileHover={{ y: -4 }}
                                        className="bg-[#111111] border border-white/[0.04] p-8 cursor-pointer transition-all duration-400 relative overflow-hidden flex flex-col justify-between min-h-[240px] group"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500"></div>
                                        <div>
                                            <div className="font-mono text-[0.6rem] tracking-[4px] text-[#C8A45C] uppercase mb-4">{letter.date}</div>
                                            <div className="font-mono font-bold text-[1rem] tracking-[1px] uppercase text-white leading-[1.3] mb-3">{letter.title}</div>
                                            <p className="text-[0.8rem] text-[#F5F3EF]/45 leading-[1.5] line-clamp-3">{letter.excerpt}</p>
                                            <div className="flex items-center gap-2 mt-4 font-mono text-[0.55rem] tracking-[2px] text-[#C8A45C]/50 uppercase">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a11 11 0 100 22 11 11 0 000-22zm-1 4h2v7h-2V5zm0 9h2v2h-2v-2z"/></svg>
                                                Audio disponible
                                            </div>
                                        </div>
                                        <div className="font-mono text-[0.55rem] tracking-[3px] text-[#C8A45C] mt-5 uppercase opacity-60 group-hover:opacity-100 transition-opacity">Paul Koffmann, CEO</div>
                                    </motion.div>
                                ))}
                                
                                {currentLetters.length < LETTERS_PER_PAGE && Array.from({ length: LETTERS_PER_PAGE - currentLetters.length }).map((_, i) => (
                                    <div key={`placeholder-${i}`} className="bg-[#111111] border border-white/[0.04] p-8 opacity-20 pointer-events-none flex flex-col justify-between min-h-[240px]">
                                        <div>
                                            <div className="font-mono text-[0.6rem] tracking-[4px] text-[#C8A45C] uppercase mb-4">À venir</div>
                                            <div className="font-mono font-bold text-[1rem] tracking-[1px] uppercase text-white leading-[1.3] mb-3">Prochaine lettre</div>
                                            <p className="text-[0.8rem] text-[#F5F3EF]/45 leading-[1.5]">Une nouvelle réflexion du CEO sera bientôt publiée.</p>
                                        </div>
                                        <div className="font-mono text-[0.55rem] tracking-[3px] text-[#C8A45C] mt-5 uppercase opacity-60">—</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-5 mt-12">
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-transparent border border-[#C8A45C]/30 text-[#C8A45C] py-3 px-6 cursor-pointer font-mono text-[0.7rem] tracking-[3px] uppercase transition-all duration-300 hover:bg-[#C8A45C]/10 hover:border-[#C8A45C] disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    ← Précédent
                                </button>
                                <span className="font-mono text-[0.7rem] tracking-[3px] text-[#6B6B6B]">Page {currentPage} / {totalPages}</span>
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="bg-transparent border border-[#C8A45C]/30 text-[#C8A45C] py-3 px-6 cursor-pointer font-mono text-[0.7rem] tracking-[3px] uppercase transition-all duration-300 hover:bg-[#C8A45C]/10 hover:border-[#C8A45C] disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    Suivant →
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 8: CLOSING SEAL */}
                <section className="py-24 px-10 bg-black text-center min-h-[60vh] flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <svg className="w-24 h-auto mx-auto drop-shadow-[0_0_50px_rgba(200,164,92,0.6)] mb-8 animate-pulse" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" y="10" width="160" height="140" rx="8" fill="none" stroke="#C8A45C" strokeWidth="3"/>
                                <text x="100" y="70" textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="42" fill="#C8A45C" letterSpacing="6">KCG</text>
                                <text x="100" y="95" textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight="300" fontSize="10" fill="#C8A45C" letterSpacing="8">KOFFMANN</text>
                            </svg>
                            <p className="font-mono text-[0.7rem] tracking-[5px] text-[#6B6B6B] uppercase mb-2">Building African Technology Powerhouses.</p>
                            <button 
                                onClick={() => onNavigate(Page.HOME)}
                                className="mt-8 bg-transparent border border-[#C8A45C]/30 text-[#C8A45C] py-3 px-8 cursor-pointer font-mono text-[0.75rem] tracking-[3px] uppercase hover:bg-[#C8A45C]/10 transition-all duration-300"
                            >
                                Retour à l'accueil
                            </button>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* MODAL LECTEUR DE DOCUMENT AVEC AUDIO */}
            <AnimatePresence>
                {selectedLetter && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/92 z-[10000] flex items-center justify-center backdrop-blur-xl p-4"
                        onClick={() => setSelectedLetter(null)}
                    >
                        <motion.div 
                            initial={{ y: 30, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 30, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="w-full max-w-4xl max-h-[90vh] bg-[#F5F3EF] text-[#1A1A1A] rounded-sm relative overflow-hidden flex flex-col shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Audio Player Bar */}
                            <div className="bg-white border-b border-black/5 p-4 flex flex-col shrink-0">
                                <div className="flex items-center gap-5">
                                    <button 
                                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${isPlaying ? 'bg-[#C8A45C] border-[#C8A45C] animate-pulse' : 'bg-[#0A0A0A] border-[#0A0A0A]'}`}
                                        onClick={togglePlayback}
                                    >
                                        {isPlaying ? (
                                            <svg className="w-5 h-5 fill-[#0A0A0A]" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                                        ) : (
                                            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg>
                                        )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-mono text-[0.55rem] tracking-[4px] text-[#8B8B8B] uppercase mb-0.5">Audio · Lecture par IA</div>
                                        <div className="font-sans font-semibold text-[0.85rem] text-[#0A0A0A] truncate">{selectedLetter.title}</div>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2">
                                        <label className="font-mono text-[0.5rem] tracking-[3px] text-[#8B8B8B] uppercase">Voix</label>
                                        <select 
                                            className="p-2 border border-black/10 bg-[#FBF9F6] text-[0.75rem] rounded-sm focus:outline-none focus:border-[#C8A45C]"
                                            value={selectedVoice?.name || ''}
                                            onChange={(e) => {
                                                const v = voices.find(v => v.name === e.target.value);
                                                if (v) setSelectedVoice(v);
                                            }}
                                        >
                                            {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        {[0.75, 1, 1.25, 1.5].map(speed => (
                                            <button 
                                                key={speed}
                                                className={`p-1 px-2 border rounded-sm font-mono text-[0.6rem] transition-all ${playbackSpeed === speed ? 'bg-[#0A0A0A] text-[#C8A45C] border-[#0A0A0A]' : 'border-black/10 text-[#0A0A0A] hover:border-[#C8A45C]'}`}
                                                onClick={() => setPlaybackSpeed(speed)}
                                            >
                                                {speed}×
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full h-1 bg-black/5 cursor-pointer relative overflow-hidden" 
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const ratio = (e.clientX - rect.left) / rect.width;
                                            const newTime = ratio * estimatedDuration;
                                            const remainingText = selectedLetter.plainText.substring(Math.floor(ratio * selectedLetter.plainText.length));
                                            stopAudio();
                                            setPausedElapsed(newTime);
                                            startAudioPlayback(remainingText);
                                        }}
                                    >
                                        <div 
                                            className="h-full bg-[#C8A45C] transition-all duration-100 ease-linear"
                                            style={{ width: `${(currentTime / estimatedDuration) * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between font-mono text-[0.55rem] tracking-[2px] text-[#8B8B8B] mt-1.5">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(estimatedDuration)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:px-8 border-b border-black/5 flex items-center justify-between bg-white shrink-0">
                                <span className="font-mono text-[0.6rem] tracking-[4px] text-[#8B8B8B] uppercase">LETTRE · {selectedLetter.date.toUpperCase()}</span>
                                <button 
                                    className="bg-none border-none text-[1.5rem] cursor-pointer text-[#1A1A1A] w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 hover:text-[#C8A45C] transition-all"
                                    onClick={() => setSelectedLetter(null)}
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-10 md:px-12 font-serif text-[1rem] leading-[1.9] text-[#2A2A2A] markdown-document">
                                <div dangerouslySetInnerHTML={{ __html: selectedLetter.content }} />
                                
                                <div className="mt-10 p-8 bg-white border border-black/5 text-center">
                                    <h3 className="font-mono font-bold text-[0.8rem] tracking-[2px] uppercase text-[#0A0A0A] mb-2">Restez informé</h3>
                                    <p className="font-sans text-[0.85rem] text-[#5A5A5A] mb-5 leading-[1.5]">Si vous êtes un dirigeant, un entrepreneur ou un bâtisseur ambitieux, cette newsletter a été pensée pour vous. Rejoignez la lettre privée du CEO.</p>
                                    <form className="flex flex-wrap justify-center gap-3" onSubmit={(e) => { e.preventDefault(); alert('Merci ! Inscription simulée.'); }}>
                                        <input 
                                            type="email" 
                                            placeholder="Votre adresse email" 
                                            required 
                                            className="p-3 px-4 border border-black/15 font-sans text-[0.85rem] min-w-[250px] bg-[#FBF9F6] focus:outline-none focus:border-[#C8A45C] transition-colors"
                                        />
                                        <button 
                                            type="submit"
                                            className="p-3 px-7 bg-[#0A0A0A] text-[#C8A45C] border-none cursor-pointer font-mono font-semibold text-[0.75rem] tracking-[2px] uppercase hover:bg-[#1A1A1A] hover:text-[#C8A45C]/80 transition-all"
                                        >
                                            S'abonner
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>
                {`
                    .markdown-document h1 {
                        font-family: 'Space Grotesk', sans-serif;
                        font-weight: 700;
                        font-size: 1.5rem;
                        letter-spacing: 1px;
                        color: #0A0A0A;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        line-height: 1.2;
                    }
                    .markdown-document h2 {
                        font-family: 'Inter', sans-serif;
                        font-weight: 600;
                        font-size: 1rem;
                        color: #4A4A4A;
                        margin-bottom: 24px;
                        line-height: 1.4;
                    }
                    .markdown-document h2 strong {
                        color: #0A0A0A;
                    }
                    .markdown-document h3 {
                        font-family: 'Space Grotesk', sans-serif;
                        font-weight: 700;
                        font-size: 0.9rem;
                        letter-spacing: 2px;
                        color: #0A0A0A;
                        margin: 28px 0 12px;
                        text-transform: uppercase;
                    }
                    .markdown-document p {
                        margin-bottom: 16px;
                    }
                    .markdown-document ul {
                        margin: 12px 0 20px 24px;
                        list-style: none;
                    }
                    .markdown-document ul li {
                        position: relative;
                        padding-left: 20px;
                        margin-bottom: 6px;
                    }
                    .markdown-document ul li::before {
                        content: '—';
                        position: absolute;
                        left: 0;
                        color: #C8A45C;
                        font-weight: 700;
                    }
                    .markdown-document hr {
                        border: none;
                        border-top: 1px solid rgba(0, 0, 0, 0.1);
                        margin: 30px 0;
                    }
                `}
            </style>
        </div>
    );
};

export default AboutPage;
