import React from 'react';
import './FikoHeroIA.css';

const FikoHeroIA: React.FC = () => {
    return (
        <section className="hero-ia-section">
            <div className="cosmic-canvas">
                <div className="nebula nebula-blue"></div>
                <div className="nebula nebula-orange"></div>
                <div className="nebula nebula-red"></div>
                <div className="bg-grid"></div>
                <div className="portal-ia">
                    <div className="portal-ring"></div>
                    <div className="portal-ring"></div>
                    <div className="portal-ring"></div>
                </div>
                <div className="energy-particle ep-blue"></div>
                <div className="energy-particle ep-orange"></div>
                <div className="energy-particle ep-red"></div>
                <div className="energy-particle ep-blue"></div>
                <div className="energy-particle ep-orange"></div>
                <div className="energy-particle ep-red"></div>
                <div className="energy-particle ep-blue"></div>
                <div className="energy-particle ep-orange"></div>
            </div>

            <div className="floating-msg fm1">
                <span className="msg-avatar">F</span> Bonjour, comment puis-je vous aider ?
                <span className="msg-check">✓</span>
            </div>
            <div className="floating-msg fm2">
                <span className="msg-avatar">F</span> Votre prospect est qualifié. Score : 94/100
                <span className="msg-check">✓</span>
            </div>
            <div className="floating-msg fm3">
                <span className="msg-avatar">F</span> Relance automatique programmée demain 9h
            </div>
            <div className="floating-msg fm4">
                <span className="msg-avatar">F</span> ✅ Vente conclue. +1 client.
                <span className="msg-check">✓</span>
            </div>

            <div className="hero-ia-container">
                <div className="ia-badge">
                    <span className="badge-dot"></span> Intelligence Artificielle Commerciale
                </div>
                <h1 className="hero-ia-title">
                    Votre <span className="word-gradient">Agent IA</span> qui vend<br/>pendant que vous dormez
                </h1>
                <p className="hero-ia-subtitle">
                    Automatisez vos conversations sur <strong>WhatsApp, Instagram Direct, Facebook Messenger et Telegram</strong>.
                    Du premier contact jusqu'au <strong>closing de la vente</strong>, Fiko Connect gère tout.
                    Déployez votre Agent IA commercial en quelques minutes.
                </p>
                <div className="channel-strip">
                    <div className="channel-icon wa">💬</div>
                    <div className="channel-icon ig">📸</div>
                    <div className="channel-icon fb">📘</div>
                    <div className="channel-icon tg">✈️</div>
                    <div className="channel-icon plus">+</div>
                </div>
                <div className="hero-cta-wrap">
                    <a href="#" className="btn-primary-ia">
                        <span className="btn-icon">🤖</span> Créez votre Agent IA
                    </a>
                </div>
                <p className="micro-trust">
                    🔒 Sans engagement<span className="separator">|</span>Configuration en 3 minutes<span className="separator">|</span>Support 24/7
                </p>
            </div>
        </section>
    );
};

export default FikoHeroIA;
