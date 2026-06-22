import React, { useEffect, useRef } from 'react';
import './AmbassadeursPage.css';
import AmbassadeursHeroSlider from '../../components/AmbassadeursHeroSlider';

const AmbassadeursPage: React.FC = () => {
    const particlesContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navbarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Particles
        const particlesContainer = particlesContainerRef.current;
        if (particlesContainer) {
            const particleCount = 60;
            // Clear existing in case of hot reload
            particlesContainer.innerHTML = '';
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('amb-particle');
                const size = Math.random() * 3 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.backgroundColor = Math.random() > 0.7 ? '#00ff88' : '#a0a0c0';
                particle.style.animationDuration = Math.random() * 15 + 10 + 's';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.boxShadow = Math.random() > 0.7 ? '0 0 6px rgba(0,255,136,0.4)' : 'none';
                particlesContainer.appendChild(particle);
            }
        }

        // Matrix Rain
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const resizeCanvas = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                };
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);

                const columns = Math.floor(canvas.width / 20);
                const drops: number[] = [];
                for (let i = 0; i < columns; i++) {
                    drops[i] = Math.random() * canvas.height;
                }

                const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

                const drawMatrix = () => {
                    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#00ff88';
                    ctx.font = '12px "JetBrains Mono", monospace';

                    for (let i = 0; i < drops.length; i++) {
                        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                        ctx.fillText(text, i * 20, drops[i] * 20);
                        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i] += 0.5;
                    }
                };

                const interval = setInterval(drawMatrix, 80);
                
                return () => {
                    clearInterval(interval);
                    window.removeEventListener('resize', resizeCanvas);
                };
            }
        }
    }, []);

    useEffect(() => {
        // Nav Scroll
        const handleScroll = () => {
            if (window.scrollY > 80) {
                navbarRef.current?.classList.add('scrolled');
            } else {
                navbarRef.current?.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="ambassadeurs-page">
            {/* PARTICULES BACKGROUND */}
            <div className="amb-particles-container" id="particles" ref={particlesContainerRef}></div>

            {/* MATRIX RAIN */}
            <canvas className="amb-matrix-rain" id="matrixRain" ref={canvasRef}></canvas>

            {/* NAVIGATION */}
            <nav className="amb-nav" id="navbar" ref={navbarRef}>
                <div className="amb-nav-inner">
                    <a href="#" className="amb-nav-logo">
                        <div className="amb-nav-logo-icon">K</div>
                        KRYPTON AI
                    </a>
                    <a href="#cta" onClick={(e) => handleAnchorClick(e, 'cta')} className="amb-nav-cta">CANDIDATURE</a>
                </div>
            </nav>

            {/* HERO SECTION */}
            <AmbassadeursHeroSlider />

            {/* SECTION : C'EST QUOI LE PROGRAMME AMBASSADEUR FIKO CONNECT ? */}
            <section className="section-fiko-program">
                {/* Orbes lumineux */}
                <div className="fiko-orb fiko-orb-green"></div>
                <div className="fiko-orb fiko-orb-gold"></div>
                <div className="fiko-orb fiko-orb-blue"></div>

                <div className="amb-container">

                    {/* HEADER */}
                    <div className="fiko-section-header">
                        <div className="fiko-section-badge">
                            <span className="fiko-section-badge-dot"></span>
                            Krypton AI · Fiko Connect
                        </div>
                        <h2 className="fiko-section-title">
                            C'est quoi le programme<br />ambassadeur <span className="highlight">Fiko Connect</span> ?
                        </h2>
                        <p className="fiko-section-subtitle">
                            Un <strong>système d'acquisition élite</strong> où votre audience rencontre une intelligence artificielle de conversion. Vous générez le trafic qualifié. <strong>Fiko transforme chaque visiteur en client.</strong>
                        </p>
                    </div>

                    {/* CARTE EXPLICATIVE */}
                    <div className="fiko-hero-card">
                        <div className="fiko-hero-card-inner">
                            {/* Texte */}
                            <div className="fiko-hero-card-text">
                                <h3>🚀 Vous distribuez.<br />🤖 L'IA convertit.<br />💰 Vous êtes rémunéré.</h3>
                                <p>
                                    Le programme Fiko Connect repose sur un principe simple mais révolutionnaire : <strong>vous n'avez pas besoin de vendre.</strong> Votre rôle est de connecter votre audience à la plateforme via votre lien tracké. Notre IA s'occupe de tout le cycle de vente.
                                </p>
                                <div className="key-point">
                                    <span className="key-point-icon">▸</span>
                                    <span><strong>Vous créez du contenu</strong> et partagez votre lien unique</span>
                                </div>
                                <div className="key-point">
                                    <span className="key-point-icon">▸</span>
                                    <span><strong>Fiko qualifie, score et convertit</strong> automatiquement les prospects</span>
                                </div>
                                <div className="key-point">
                                    <span className="key-point-icon">▸</span>
                                    <span><strong>Vous percevez des commissions</strong> jusqu'à 25% + bonus</span>
                                </div>
                            </div>

                            {/* Animation du flux */}
                            <div className="fiko-flow-animation">
                                <div className="fiko-flow-step you">
                                    👤 VOTRE AUDIENCE
                                </div>
                                <div className="fiko-flow-arrow">↓</div>
                                <div className="fiko-flow-step">
                                    🔗 Votre Lien Tracké
                                </div>
                                <div className="fiko-flow-arrow">↓</div>
                                <div className="fiko-flow-step fiko">
                                    🤖 FIKO CONNECT (IA)
                                </div>
                                <div className="fiko-flow-arrow">↓</div>
                                <div className="fiko-flow-step">
                                    📊 Qualification & Scoring
                                </div>
                                <div className="fiko-flow-arrow">↓</div>
                                <div className="fiko-flow-step you">
                                    💸 VOTRE COMMISSION
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRILLE 6 RAISONS */}
                    <div className="reasons-grid">
                        <div className="reason-card">
                            <div className="reason-icon">🤖</div>
                            <h4>IA de Closing Intégrée</h4>
                            <p>Fiko Connect analyse, qualifie et convertit vos leads automatiquement. Vous n'avez pas à suivre manuellement des prospects.</p>
                        </div>
                        <div className="reason-card">
                            <div className="reason-icon">📈</div>
                            <h4>Commissions Jusqu'à 25%</h4>
                            <p>Un système progressif qui récompense votre performance. Plus vous performez, plus votre pourcentage augmente.</p>
                        </div>
                        <div className="reason-card reason-gold">
                            <div className="reason-icon">👑</div>
                            <h4>Statut & Reconnaissance</h4>
                            <p>Badge officiel, classement public, visibilité sur le réseau Krypton. Votre réussite est célébrée.</p>
                        </div>
                        <div className="reason-card">
                            <div className="reason-icon">📊</div>
                            <h4>Dashboard Temps Réel</h4>
                            <p>Suivez chaque clic, chaque lead, chaque vente. Transparence totale sur vos performances.</p>
                        </div>
                        <div className="reason-card">
                            <div className="reason-icon">🎮</div>
                            <h4>Gamification & Challenges</h4>
                            <p>Progressez à travers 5 niveaux, relevez des défis, débloquez des primes et des voyages.</p>
                        </div>
                        <div className="reason-card reason-gold">
                            <div className="reason-icon">🔒</div>
                            <h4>Accès Élite & Filtrage</h4>
                            <p>Nous sélectionnons uniquement les meilleurs profils. Faire partie de l'alliance est un privilège.</p>
                        </div>
                    </div>

                    {/* BANDEAU COMPARATIF */}
                    <div className="comparison-strip">
                        <div className="comparison-side bad">
                            <span className="comparison-label bad-label">Programme Classique</span>
                            <h5>Le Modèle Obsolète</h5>
                            <ul>
                                <li>Spam et publications forcées</li>
                                <li>Aucun suivi des leads</li>
                                <li>Commissions faibles (1-3%)</li>
                                <li>Pas de reconnaissance</li>
                                <li>Image de marque dégradée</li>
                                <li>Programme mort en 30 jours</li>
                            </ul>
                        </div>
                        <div className="comparison-vs"></div>
                        <div className="comparison-side good">
                            <span className="comparison-label good-label">Alliance Krypton</span>
                            <h5>Le Nouveau Standard</h5>
                            <ul>
                                <li>Contenu premium et authentique</li>
                                <li>IA de suivi et conversion</li>
                                <li>Jusqu'à 25% de commission</li>
                                <li>Statut, badges, leaderboard</li>
                                <li>Crédibilité et prestige</li>
                                <li>Système durable et scalable</li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="fiko-cta-footer">
                        <a href="#cta" onClick={(e) => handleAnchorClick(e, 'cta')} className="fiko-cta-btn">
                            🔥 Rejoindre l'Alliance Fiko Connect
                        </a>
                        <p className="fiko-cta-note">🔒 Candidature examinée sous 72h · Places limitées</p>
                    </div>

                </div>
            </section>

            {/* CRITERIA */}
            <section className="amb-section amb-section-dark" id="criteres">
                <div className="amb-container">
                    <div className="amb-section-header">
                        <div className="amb-section-label">Sélection Stricte</div>
                        <h2>Qui Peut Prétendre à l'Alliance Krypton ?</h2>
                        <p className="amb-section-subtitle">Nous recherchons des <strong>Partenaires de Croissance</strong>, pas des créateurs de contenu généralistes.</p>
                    </div>
                    <div className="amb-criteria-grid">
                        <div className="amb-criteria-card">
                            <div className="amb-criteria-icon">📊</div>
                            <div className="amb-criteria-info">
                                <h4>Score Social ≥ 100 000 points</h4>
                                <p>Calculé sur votre audience réelle et votre engagement. Pas de chiffres gonflés artificiellement.</p>
                            </div>
                        </div>
                        <div className="amb-criteria-card">
                            <div className="amb-criteria-icon">🎯</div>
                            <div className="amb-criteria-info">
                                <h4>Audience 100% Authentique</h4>
                                <p>Alignée sur les univers Business, Entrepreneuriat, Marketing, Immobilier, Finance, Commerce.</p>
                            </div>
                        </div>
                        <div className="amb-criteria-card">
                            <div className="amb-criteria-icon">🧠</div>
                            <div className="amb-criteria-info">
                                <h4>Ambition Dévorante</h4>
                                <p>Monétiser votre influence avec un système puissant et automatisé, pas avec du spam.</p>
                            </div>
                        </div>
                    </div>
                    <div className="amb-criteria-note">
                        🔒 Chaque candidature est vérifiée manuellement par notre équipe et notre IA de scoring. L'accès est un privilège, pas un dû.
                    </div>
                </div>
            </section>

            {/* LEVELS */}
            <section className="amb-section" id="systeme">
                <div className="amb-container">
                    <div className="amb-section-header">
                        <div className="amb-section-label">Progression Méritocratique</div>
                        <h2>Le Système de Croissance par Niveaux</h2>
                        <p className="amb-section-subtitle">Activez un véritable moteur de revenus et de statut. Chaque niveau débloque commissions, outils et reconnaissance.</p>
                    </div>

                    <div className="amb-levels-grid">
                        {/* Niveau 1 */}
                        <div className="amb-level-card">
                            <span className="amb-level-badge bronze">Niveau 1</span>
                            <h3>🥉 INITIÉ</h3>
                            <p style={{ color: 'var(--amb-text-secondary)', fontSize: '0.9rem' }}>Début de l'alliance. Validez votre ID et activez votre lien tracké.</p>
                            <div className="amb-level-commission">5%</div>
                            <ul className="amb-level-detail">
                                <li>10 leads qualifiés / semaine</li>
                                <li>2 contenus / semaine</li>
                                <li>Badge Officiel Krypton</li>
                            </ul>
                        </div>

                        {/* Niveau 2 */}
                        <div className="amb-level-card">
                            <span className="amb-level-badge silver">Niveau 2</span>
                            <h3>🥈 ACTIVATEUR</h3>
                            <p style={{ color: 'var(--amb-text-secondary)', fontSize: '0.9rem' }}>Machine à leads certifiée. 50 leads générés & 5 clients convertis.</p>
                            <div className="amb-level-commission">10%</div>
                            <ul className="amb-level-detail">
                                <li>20 leads / semaine</li>
                                <li>3 contenus / semaine</li>
                                <li>Contenu Premium</li>
                                <li>Visibilité Krypton</li>
                            </ul>
                        </div>

                        {/* Niveau 3 */}
                        <div className="amb-level-card level-3">
                            <span className="amb-level-badge gold">Niveau 3</span>
                            <h3>🥇 CLOSER PARTNER</h3>
                            <p style={{ color: 'var(--amb-text-secondary)', fontSize: '0.9rem' }}>Partenaire de conversion. 150 leads & 15 ventes.</p>
                            <div className="amb-level-commission">15%</div>
                            <ul className="amb-level-detail">
                                <li>Contenu + Preuve Sociale</li>
                                <li>Témoignages Clients</li>
                                <li>Bonus Cash Performance</li>
                                <li>Accès Funnel Avancé</li>
                            </ul>
                        </div>

                        {/* Niveau 4 */}
                        <div className="amb-level-card level-4">
                            <span className="amb-level-badge elite">Niveau 4</span>
                            <h3>💎 ELITE GROWTH</h3>
                            <p style={{ color: 'var(--amb-text-secondary)', fontSize: '0.9rem' }}>Pilier stratégique. 500 leads & 50 ventes.</p>
                            <div className="amb-level-commission">20%</div>
                            <ul className="amb-level-detail">
                                <li>Accès API Fiko</li>
                                <li>Co-Branding</li>
                                <li>Dashboard Avancé</li>
                            </ul>
                        </div>

                        {/* Niveau 5 */}
                        <div className="amb-level-card level-5">
                            <span className="amb-level-badge dominator">Niveau 5</span>
                            <h3>🔥 DOMINATOR</h3>
                            <p style={{ color: 'var(--amb-text-secondary)', fontSize: '0.9rem' }}>Légende de l'alliance. 100+ ventes.</p>
                            <div className="amb-level-commission">25%</div>
                            <ul className="amb-level-detail">
                                <li>Revenue Share</li>
                                <li>Partenariat Stratégique</li>
                                <li>Accès Illimité</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHALLENGES */}
            <section className="amb-section amb-section-dark" id="challenges">
                <div className="amb-container">
                    <div className="amb-section-header">
                        <div className="amb-section-label">Compétition</div>
                        <h2>Plus qu'un Statut, une Arène de Compétition</h2>
                        <p className="amb-section-subtitle">Gravissez les échelons en validant des challenges exclusifs conçus pour révéler les dominateurs.</p>
                    </div>
                    <div className="amb-challenges-grid">
                        <div className="amb-challenge-card">
                            <div className="amb-challenge-number">01</div>
                            <h4>Lead Machine</h4>
                            <p>Objectif : 30 leads qualifiés en 7 jours. Démontrez votre capacité de traction.</p>
                        </div>
                        <div className="amb-challenge-card">
                            <div className="amb-challenge-number">02</div>
                            <h4>Conversion</h4>
                            <p>5 prospects froids → clients Fiko Connect. Prouvez votre maîtrise du closing indirect.</p>
                        </div>
                        <div className="amb-challenge-card">
                            <div className="amb-challenge-number">03</div>
                            <h4>Preuve Sociale</h4>
                            <p>Témoignages, résultats, captures. Construisez la confiance à grande échelle.</p>
                        </div>
                        <div className="amb-challenge-card">
                            <div className="amb-challenge-number">04</div>
                            <h4>Domination</h4>
                            <p>Créez un mini-funnel autonome (Contenu → Lien Fiko → Conversion).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEADERBOARD */}
            <section className="amb-section" id="leaderboard">
                <div className="amb-container">
                    <div className="amb-section-header">
                        <div className="amb-section-label">Classement</div>
                        <h2>🏆 Top 10 Ambassadeurs</h2>
                        <p className="amb-section-subtitle">Ce classement est mis à jour chaque semaine. L'excellence se mesure et se célèbre.</p>
                    </div>
                    <div className="amb-leaderboard">
                        <div className="amb-leaderboard-header">
                            <span>Rang</span>
                            <span>ID Partenaire</span>
                            <span>Leads</span>
                            <span>Niveau</span>
                        </div>
                        <div className="amb-leaderboard-row">
                            <span className="amb-leaderboard-rank top1">#1</span>
                            <span className="amb-leaderboard-name">KOFF123</span>
                            <span>+247</span>
                            <span className="amb-leaderboard-level">🔥 DOMINATOR</span>
                        </div>
                        <div className="amb-leaderboard-row">
                            <span className="amb-leaderboard-rank top2">#2</span>
                            <span className="amb-leaderboard-name">ALYS789</span>
                            <span>+198</span>
                            <span className="amb-leaderboard-level">💎 ELITE</span>
                        </div>
                        <div className="amb-leaderboard-row">
                            <span className="amb-leaderboard-rank top3">#3</span>
                            <span className="amb-leaderboard-name">MARC456</span>
                            <span>+156</span>
                            <span className="amb-leaderboard-level">🥇 CLOSER</span>
                        </div>
                        <div className="amb-leaderboard-row">
                            <span className="amb-leaderboard-rank">#4</span>
                            <span className="amb-leaderboard-name">SORAYA_01</span>
                            <span>+134</span>
                            <span className="amb-leaderboard-level">🥈 ACTIVATEUR</span>
                        </div>
                        <div className="amb-leaderboard-row">
                            <span className="amb-leaderboard-rank">#5</span>
                            <span className="amb-leaderboard-name">BILAL_PRO</span>
                            <span>+112</span>
                            <span className="amb-leaderboard-level">🥈 ACTIVATEUR</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FLOW / SYNERGIE */}
            <section className="amb-section amb-section-dark" id="synergie">
                <div className="amb-container">
                    <div className="amb-section-header">
                        <div className="amb-section-label">Synergie Parfaite</div>
                        <h2>Vous + Fiko Connect</h2>
                        <p className="amb-section-subtitle">Votre mission : générer le trafic qualifié. Notre IA se charge du reste.</p>
                    </div>
                    <div className="amb-flow-diagram">
                        <div className="amb-flow-step">🎯 Votre Audience</div>
                        <div className="amb-flow-arrow">→</div>
                        <div className="amb-flow-step">📱 Contenu + ID</div>
                        <div className="amb-flow-arrow">→</div>
                        <div className="amb-flow-step highlight">🤖 Fiko Connect</div>
                        <div className="amb-flow-arrow">→</div>
                        <div className="amb-flow-step">📊 Qualification</div>
                        <div className="amb-flow-arrow">→</div>
                        <div className="amb-flow-step">💰 Conversion</div>
                        <div className="amb-flow-arrow">→</div>
                        <div className="amb-flow-step highlight">💸 Votre Commission</div>
                    </div>
                    <p style={{ textAlign: 'center', color: 'var(--amb-text-dim)', fontSize: '0.9rem', marginTop: '16px' }}>
                        Vous distribuez l'opportunité, <strong style={{ color: 'var(--amb-accent)' }}>la technologie la convertit en cash.</strong>
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="amb-section" id="cta">
                <div className="amb-container">
                    <div className="amb-cta-section">
                        <div className="amb-section-label" style={{ textAlign: 'center' }}>Rejoindre l'Élite</div>
                        <h2>Prêt à Intégrer l'Armée de Distribution ?</h2>
                        <p style={{ color: 'var(--amb-text-secondary)', marginBottom: '32px', fontSize: '1.05rem' }}>
                            Ne soyez pas un simple maillon dans une chaîne de spam.<br />
                            Devenez un <strong style={{ color: 'var(--amb-text-primary)' }}>Partenaire de Croissance Krypton</strong>.
                        </p>
                        <a href="#cta" onClick={(e) => handleAnchorClick(e, 'cta')} className="amb-btn-primary" style={{ fontSize: '1.2rem', padding: '20px 48px' }}>
                            ⚡ DÉPOSER MA CANDIDATURE ÉLITE
                        </a>
                        <p className="amb-cta-note">🔒 Processus de validation en 72h. Accès exceptionnel. Compétition réelle.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER NOTE */}
            <div className="amb-footer-note">
                <p>
                    <strong>🚨 Erreur Fatale à Éviter :</strong> La majorité des programmes meurent en 30 jours par manque de suivi, d'enjeux et de reconnaissance.<br />
                    <strong>Le Programme Krypton AI est un pari sur l'excellence.</strong> Pas de quantité. Que de la puissance. Rejoignez l'élite.
                </p>
            </div>
        </div>
    );
};

export default AmbassadeursPage;
