import React from 'react';
import './MetaVerificationBanner.css';

const MetaVerificationBanner: React.FC = () => {
    return (
        <div className="banner-container">
            {/* Zone gauche — Meta Verified (fond bleu Meta) */}
            <div className="meta-zone">
                <div className="meta-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div className="meta-text">
                    <span className="meta-label">Meta</span>
                    <span className="meta-name">Verified</span>
                </div>
            </div>

            {/* Zone droite — Texte défilant */}
            <div className="marquee-zone">
                {/* Particules */}
                <div className="spark"></div>
                <div className="spark"></div>
                <div className="spark"></div>
                <div className="spark"></div>

                {/* Fondu */}
                <div className="fade-right"></div>

                {/* Piste défilante */}
                <div className="marquee-track">
                    <div className="marquee-content">
                        {/* Bloc 1 — Message de confiance */}
                        <div className="marquee-item">
                            <span className="marquee-icon">🔒</span>
                            <span className="marquee-text">
                                Une infrastructure sérieuse, vérifiée et pensée pour les entreprises.
                            </span>
                            <span className="marquee-dot"></span>
                        </div>
                        {/* Bloc 2 — Message de vérification */}
                        <div className="marquee-item">
                            <span className="marquee-text">
                                <span className="highlight">Koffmann Capital Group</span>, société éditrice de <span className="highlight">Krypton AI</span> et <span className="highlight">Fiko Connect</span>, a été vérifiée par <span className="highlight">Meta</span> en tant que fournisseur de technologie pour les solutions professionnelles Meta et WhatsApp Business.
                            </span>
                            <span className="marquee-dot"></span>
                        </div>
                        {/* Duplication pour boucle infinie */}
                        <div className="marquee-item">
                            <span className="marquee-icon">🔒</span>
                            <span className="marquee-text">
                                Une infrastructure sérieuse, vérifiée et pensée pour les entreprises.
                            </span>
                            <span className="marquee-dot"></span>
                        </div>
                        <div className="marquee-item">
                            <span className="marquee-text">
                                <span className="highlight">Koffmann Capital Group</span>, société éditrice de <span className="highlight">Krypton AI</span> et <span className="highlight">Fiko Connect</span>, a été vérifiée par <span className="highlight">Meta</span> en tant que fournisseur de technologie pour les solutions professionnelles Meta et WhatsApp Business.
                            </span>
                            <span className="marquee-dot"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetaVerificationBanner;
