import React, { useState, useEffect, useRef, useCallback } from 'react';
import './AmbassadeursHeroSlider.css';

const SLIDES = [
    {
        bgClass: 'slide-bg-1',
        eyebrow: 'Système Élite · Sur Invitation',
        title: <>L'<span className="highlight">Alliance</span> des<br/>Bâtisseurs d'Empire</>,
        subtitle: 'Nous ne cherchons pas des spectateurs. Nous recrutons les architectes de la nouvelle économie digitale.',
        ctaText: "Rejoindre l'Élite",
    },
    {
        bgClass: 'slide-bg-2',
        eyebrow: 'Technologie · Fiko Connect',
        title: <>Votre Audience.<br/><span className="highlight">Notre IA.</span></>,
        subtitle: 'Distribuez l\'opportunité. Notre intelligence artificielle convertit chaque lead en revenu automatique.',
        ctaText: 'Découvrir Fiko',
    },
    {
        bgClass: 'slide-bg-3',
        eyebrow: 'Progression · 5 Niveaux',
        title: <>De l'Initié au<br/><span className="highlight-gold">Dominator</span></>,
        subtitle: 'Un système méritocratique où chaque victoire débloque commissions, statut et pouvoir.',
        ctaText: 'Voir les Niveaux',
    },
    {
        bgClass: 'slide-bg-4',
        eyebrow: 'Compétition · Leaderboard',
        title: <>L'Arène des<br/><span className="highlight">Dominateurs</span></>,
        subtitle: 'Chaque semaine, les meilleurs partenaires sont célébrés. L\'excellence se mesure en public.',
        ctaText: 'Voir le Classement',
    },
    {
        bgClass: 'slide-bg-5',
        eyebrow: 'Élite · Candidature',
        title: <><span className="highlight-gold">L'Exception</span><br/>Vous Attend</>,
        subtitle: 'Accès strictement limité. Chaque profil est validé par notre équipe. L\'excellence est un choix.',
        ctaText: 'Déposer ma Candidature',
    }
];

const AmbassadeursHeroSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitIndex, setExitIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [flashTrigger, setFlashTrigger] = useState(false);
    const [glitchTrigger, setGlitchTrigger] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const particlesRef = useRef<HTMLDivElement>(null);

    const autoplayDelay = 6000;

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentIndex) return;
        
        let newIndex = index;
        if (newIndex < 0) newIndex = SLIDES.length - 1;
        if (newIndex >= SLIDES.length) newIndex = 0;

        setIsTransitioning(true);
        setExitIndex(currentIndex);
        setCurrentIndex(newIndex);

        // Flash
        setFlashTrigger(false);
        setTimeout(() => setFlashTrigger(true), 10);
        setTimeout(() => setFlashTrigger(false), 600);

        setTimeout(() => {
            setExitIndex(null);
            setIsTransitioning(false);
        }, 1500);
    }, [currentIndex, isTransitioning]);

    const nextSlide = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);
    const prevSlide = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isPaused && !isTransitioning) {
            interval = setInterval(nextSlide, autoplayDelay);
        }
        return () => clearInterval(interval);
    }, [nextSlide, isPaused, isTransitioning]);

    useEffect(() => {
        let active = true;
        const scheduleGlitch = () => {
            const delay = Math.random() * 7000 + 8000;
            setTimeout(() => {
                if (!active) return;
                setGlitchTrigger(true);
                setTimeout(() => {
                    if (active) setGlitchTrigger(false);
                }, 300);
                scheduleGlitch();
            }, delay);
        };
        scheduleGlitch();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (particlesRef.current) {
            const container = particlesRef.current;
            container.innerHTML = '';
            for (let i = 0; i < 80; i++) {
                const particle = document.createElement('div');
                particle.classList.add('floating-particle');

                const size = Math.random() * 3 + 1;
                const isGold = Math.random() > 0.85;
                const isGreen = Math.random() > 0.7 && !isGold;

                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.backgroundColor = isGold ? '#f0d060' : (isGreen ? '#00ff88' : '#ffffff');
                particle.style.boxShadow = isGold ?
                    '0 0 8px rgba(240,208,96,0.8), 0 0 20px rgba(240,208,96,0.3)' :
                    (isGreen ? '0 0 6px rgba(0,255,136,0.6), 0 0 15px rgba(0,255,136,0.2)' :
                        '0 0 4px rgba(255,255,255,0.4)');
                particle.style.animationDuration = Math.random() * 20 + 15 + 's';
                particle.style.animationDelay = Math.random() * 20 + 's';

                container.appendChild(particle);
            }
        }
    }, []);

    const [touchStartX, setTouchStartX] = useState(0);
    const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.changedTouches[0].screenX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <section 
            className="hero-cinematic" 
            id="heroCinematic"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="letterbox-top"></div>
            <div className="letterbox-bottom"></div>

            <div className={`light-flash ${flashTrigger ? 'trigger' : ''}`} id="lightFlash"></div>

            <div className="cinematic-slider">
                {SLIDES.map((slide, index) => (
                    <div 
                        key={index}
                        className={`cinematic-slide ${currentIndex === index ? 'active' : ''} ${exitIndex === index ? 'exit' : ''}`}
                    >
                        <div className={`slide-bg ${slide.bgClass}`}></div>
                        <div className="slide-overlay-vignette"></div>
                        <div className="slide-overlay-gradient"></div>
                        <div className="slide-content">
                            <div className="slide-eyebrow">{slide.eyebrow}</div>
                            <h1 className={`slide-title ${currentIndex === index && glitchTrigger ? 'glitch-trigger' : ''}`}>
                                {slide.title}
                            </h1>
                            <p className="slide-subtitle">{slide.subtitle}</p>
                            <a href="#cta" className="slide-cta" onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                {slide.ctaText}
                                <span className="slide-cta-icon">→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cinematic-particles" ref={particlesRef}></div>
            <div className="cinematic-scanlines"></div>

            <button className="slide-nav slide-nav-prev" onClick={prevSlide} aria-label="Slide précédent">
                <span className="slide-nav-icon">◂</span>
            </button>
            <button className="slide-nav slide-nav-next" onClick={nextSlide} aria-label="Slide suivant">
                <span className="slide-nav-icon">▸</span>
            </button>

            <div className="slide-indicators">
                {SLIDES.map((_, index) => (
                    <button 
                        key={index}
                        className={`slide-indicator ${currentIndex === index ? 'active' : ''}`} 
                        onClick={() => goToSlide(index)}
                    >
                        {currentIndex === index && <div className="slide-indicator-progress"></div>}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default AmbassadeursHeroSlider;
