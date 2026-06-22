import React from 'react';
import './FikoSuiteModules.css';

const FikoSuiteModules: React.FC = () => {
    return (
        <section className="modules-section">
            <div className="modules-bg-grid"></div>
            <div className="module-orb orb-blue"></div>
            <div className="module-orb orb-orange"></div>

            <div className="modules-container">
                <div className="modules-header">
                    <div className="eyebrow">
                        <span className="pulse-dot"></span> Suite Fiko Connect
                    </div>
                    <h2>
                        Votre messagerie devient une<br />
                        <span className="gradient-text">machine de conversion</span>
                    </h2>
                    <p className="subtitle">
                        Pendant que vous dormez, Fiko répond, qualifie et convertit vos prospects
                        sur WhatsApp, Messenger, Instagram et Telegram — 24h/24.
                    </p>
                </div>

                {/* Grille 1x4 */}
                <div className="modules-grid">
                    {/* 01 */}
                    <div className="module-card card-conversation">
                        <div className="card-number">01</div>
                        <div className="card-icon-wrap">💬</div>
                        <div className="card-content">
                            <h3>Conversation Intelligente</h3>
                            <p>Centralisez tous vos messages. Fiko répond instantanément, comprend chaque demande et dirige vos prospects vers l'action idéale.</p>
                        </div>
                        <ul className="card-features">
                            <li>Multi-canal</li>
                            <li>Réponse 24/7</li>
                            <li>Compréhension IA</li>
                        </ul>
                        <a href="#section-pricing" className="card-link">Activer <span className="arrow-icon">→</span></a>
                    </div>

                    {/* 02 */}
                    <div className="module-card card-chatbot">
                        <div className="card-number">02</div>
                        <div className="card-icon-wrap">🧠</div>
                        <div className="card-content">
                            <h3>Chatbot IA Avancé</h3>
                            <p>Votre meilleur commercial, sans pause. Fiko analyse les intentions, qualifie les prospects et guide chaque client vers la conversion.</p>
                        </div>
                        <ul className="card-features">
                            <li>Analyse d'intention</li>
                            <li>Qualification auto</li>
                            <li>Scénarios de vente</li>
                        </ul>
                        <a href="#section-pricing" className="card-link">Activer <span className="arrow-icon">→</span></a>
                    </div>

                    {/* 03 */}
                    <div className="module-card card-diffusion">
                        <div className="card-number">03</div>
                        <div className="card-icon-wrap">📢</div>
                        <div className="card-content">
                            <h3>Diffusion WhatsApp</h3>
                            <p>Lancez des promotions, relances et annonces sur WhatsApp en quelques secondes. Campagnes intelligentes et personnalisées à grande échelle.</p>
                        </div>
                        <ul className="card-features">
                            <li>Campagnes massives</li>
                            <li>Personnalisation</li>
                            <li>Analytics intégrés</li>
                        </ul>
                        <a href="#section-pricing" className="card-link">Activer <span className="arrow-icon">→</span></a>
                    </div>

                    {/* 04 */}
                    <div className="module-card card-api">
                        <div className="card-number">04</div>
                        <div className="card-icon-wrap">⚙️</div>
                        <div className="card-content">
                            <h3>API & Automatisation</h3>
                            <p>Connectez Fiko à votre CRM, ERP ou site web. Déclenchez des actions automatiques et créez des workflows puissants sans code.</p>
                        </div>
                        <ul className="card-features">
                            <li>API REST</li>
                            <li>Webhooks</li>
                            <li>No-code</li>
                        </ul>
                        <a href="#section-pricing" className="card-link">Activer <span className="arrow-icon">→</span></a>
                    </div>
                </div>

                {/* Bandeau CTA */}
                <div className="modules-cta-strip">
                    <p>⚡ Prêt à transformer votre messagerie en machine de vente ?</p>
                    <a href="#section-pricing" className="cta-btn">🔥 Activer les 4 modules maintenant</a>
                </div>
            </div>
        </section>
    );
};

export default FikoSuiteModules;
