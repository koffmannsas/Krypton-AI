import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FikoAiFeatures.css';

const FikoAiFeatures: React.FC = () => {
    const [typingText, setTypingText] = useState('');
    const fullText = "Promo spéciale -50% aujourd'hui seulement !";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypingText(fullText.substring(0, i + 1));
                i++;
            } else {
                setTimeout(() => {
                    i = 0;
                    setTypingText('');
                }, 2000); // Wait before restarting
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section className="fiko-ai-features-section">
            <div className="faf-bg-elements">
                <div className="faf-glow-orb orb-1"></div>
                <div className="faf-glow-orb orb-2"></div>
                <div className="faf-grid-pattern"></div>
            </div>

            <div className="faf-container">
                <div className="faf-header">
                    <div className="faf-eyebrow">
                        <span className="live-dot"></span>
                        AI Performance Marketing Engine
                    </div>
                    <h2>
                        Ne devinez plus. <br />
                        <span className="text-gradient">L'IA garantit votre ROI.</span>
                    </h2>
                    <p className="faf-subtitle">
                        Fiko Connect n'est pas qu'un outil d'envoi. C'est un moteur d'optimisation qui analyse, segmente et perfectionne chaque campagne pour une conversion maximale.
                    </p>
                </div>

                <div className="faf-bento-grid">
                    {/* BENTO 1: Smart Campaign Score */}
                    <motion.div 
                        className="faf-bento-card bento-score"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-inner">
                            <div className="card-header">
                                <h3>Smart Campaign Score</h3>
                                <div className="score-badge">87/100</div>
                            </div>
                            <p className="card-desc">L'IA analyse vos messages avant l'envoi pour prédire et maximiser leur taux de conversion.</p>
                            
                            <div className="score-visual">
                                <div className="score-gauge-container">
                                    <svg viewBox="0 0 100 50" className="score-gauge">
                                        <path d="M 10 50 A 40 40 0 0 1 90 50" className="gauge-bg" fill="none" strokeWidth="8" />
                                        <path d="M 10 50 A 40 40 0 0 1 75 25" className="gauge-fill" fill="none" strokeWidth="8" strokeLinecap="round" />
                                    </svg>
                                    <div className="score-value">
                                        <span className="num">87</span>
                                        <span className="percent">%</span>
                                    </div>
                                </div>
                                <div className="ai-suggestions">
                                    <div className="suggestion warning">
                                        <span className="icon">⚠️</span> Hook : Ajoutez plus d'urgence
                                    </div>
                                    <div className="suggestion success">
                                        <span className="icon">✓</span> Personnalisation optimale
                                    </div>
                                    <div className="suggestion success">
                                        <span className="icon">✓</span> Structure émotionnelle forte
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* BENTO 2: Live WhatsApp Simulation */}
                    <motion.div 
                        className="faf-bento-card bento-whatsapp"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="card-inner">
                            <div className="card-header">
                                <h3>Simulation Live</h3>
                            </div>
                            <p className="card-desc">Prévisualisez l'expérience client exacte avec des interactions hyper-réalistes.</p>
                            
                            <div className="whatsapp-mockup">
                                <div className="wa-header">
                                    <div className="wa-avatar"></div>
                                    <div className="wa-contact-info">
                                        <div className="wa-name">Fiko Connect</div>
                                        <div className="wa-status">en ligne</div>
                                    </div>
                                </div>
                                <div className="wa-body">
                                    <div className="wa-message received">
                                        Bonjour ! Avez-vous de nouvelles offres ?
                                    </div>
                                    <div className="wa-typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <div className="wa-message sent active">
                                        {typingText}<span className="cursor">|</span>
                                    </div>
                                </div>
                                <div className="wa-input-area">
                                    <div className="wa-input-bubble">Message...</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* BENTO 3: AI Auto Optimization & Testing */}
                    <motion.div 
                        className="faf-bento-card bento-abtest"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="card-inner">
                            <div className="card-header">
                                <h3>Auto Optimization</h3>
                                <span className="tag-live">LIVE</span>
                            </div>
                            
                            <div className="ab-test-visual">
                                <div className="test-variant winner">
                                    <div className="var-header">
                                        <span className="var-name">Variante A</span>
                                        <span className="var-badge">Winner 🏆</span>
                                    </div>
                                    <div className="var-metrics">
                                        <div className="metric"><span className="label">Open</span><span className="val">78%</span></div>
                                        <div className="metric"><span className="label">Conv.</span><span className="val">12%</span></div>
                                    </div>
                                </div>
                                <div className="test-variant">
                                    <div className="var-header">
                                        <span className="var-name">Variante B</span>
                                    </div>
                                    <div className="var-metrics">
                                        <div className="metric"><span className="label">Open</span><span className="val">64%</span></div>
                                        <div className="metric"><span className="label">Conv.</span><span className="val">5%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* BENTO 4: Revenue Tracking */}
                    <motion.div 
                        className="faf-bento-card bento-revenue"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="card-inner">
                            <div className="card-header">
                                <h3>Revenue Tracking</h3>
                            </div>
                            
                            <div className="revenue-visual">
                                <div className="rev-main">
                                    <span className="rev-label">ROAS Campagne</span>
                                    <span className="rev-amount">4.2x</span>
                                </div>
                                <div className="rev-stats">
                                    <div className="stat">
                                        <span className="icon">💰</span>
                                        <div>
                                            <div className="stat-val">2.4M CFA</div>
                                            <div className="stat-label">Revenus générés</div>
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <span className="icon">🎯</span>
                                        <div>
                                            <div className="stat-val">8%</div>
                                            <div className="stat-label">Taux de conversion</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FikoAiFeatures;
