import React, { useState } from 'react';
import './FikoPricingSlider.css';
import { getSaaSUrl, trackEvent } from '../utils/navigation';

const FikoPricingSlider: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="pricing-section" id="section-pricing">
            {/* Fond cosmique */}
            <div className="cosmic-bg">
                <div className="cosmic-particle cp-blue"></div><div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-red"></div><div className="cosmic-particle cp-blue"></div>
                <div className="cosmic-particle cp-orange"></div><div className="cosmic-particle cp-red"></div>
                <div className="cosmic-particle cp-blue"></div><div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-red"></div><div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-blue"></div><div className="cosmic-particle cp-red"></div>
            </div>
            <div className="nebula-orb orb-blue"></div>
            <div className="nebula-orb orb-orange"></div>
            <div className="nebula-orb orb-red"></div>

            <div className="pricing-container">
                {/* Header */}
                <div className="pricing-header">
                    <div className="eyebrow">
                        <span className="pulse-dot"></span> Tarifs Fiko Connect
                    </div>
                    <h2>
                        Votre <span className="gradient-text">machine de conversion</span><br/>prête à être activée
                    </h2>
                    <p className="subtitle">
                        Un plan pour chaque ambition. Sans engagement. Activation immédiate.
                    </p>
                </div>

                {/* Toggle */}
                <div className="toggle-row">
                    <span 
                        className={`toggle-label ${!isAnnual ? 'active' : ''}`} 
                        onClick={() => setIsAnnual(false)}
                    >
                        Mensuel
                    </span>
                    <div 
                        className={`toggle-track ${isAnnual ? 'active' : ''}`} 
                        onClick={() => setIsAnnual(!isAnnual)}
                    >
                        <div className="toggle-dot"></div>
                    </div>
                    <span 
                        className={`toggle-label ${isAnnual ? 'active' : ''}`} 
                        onClick={() => setIsAnnual(true)}
                    >
                        Annuel
                    </span>
                    <span className="toggle-badge">-20%</span>
                </div>

                {/* Grille 1x4 */}
                <div className="pricing-grid">
                    {/* STARTER */}
                    <div className="pricing-card card-starter">
                        <div className="plan-name">Starter</div>
                        <div className="plan-price-wrap">
                            <div className="plan-price">
                                <span className="currency">CFA</span>{isAnnual ? '15 000' : '19 000'}<span className="period">/mois</span>
                            </div>
                        </div>
                        <p className="plan-tagline">Automatisez vos réponses</p>
                        <ul className="plan-features">
                            <li>Réponses automatiques</li>
                            <li>Capture des leads</li>
                            <li>Base conversationnelle</li>
                            <li className="disabled">Qualification IA</li>
                            <li className="disabled">Relances automatiques</li>
                            <li className="disabled">Tableau de bord</li>
                        </ul>
                        <a 
                            href={getSaaSUrl("/register", "starter")}
                            onClick={() => {
                                trackEvent("plan_selected", { plan: "starter" });
                                trackEvent("trial_started", { plan: "starter" });
                                trackEvent("landing_cta_click", { cta_label: "Commencer Starter", plan: "starter" });
                            }}
                            className="plan-cta"
                        >
                            Commencer
                        </a>
                    </div>

                    {/* GROWTH */}
                    <div className="pricing-card card-growth">
                        <div className="plan-name">Growth</div>
                        <div className="plan-price-wrap">
                            <div className="plan-price">
                                <span className="currency">CFA</span>{isAnnual ? '39 000' : '49 000'}<span className="period">/mois</span>
                            </div>
                        </div>
                        <p className="plan-tagline">Structurez votre acquisition</p>
                        <ul className="plan-features">
                            <li>Tout Starter +</li>
                            <li>Qualification intelligente</li>
                            <li>Scoring prospects</li>
                            <li>Suivi amélioré</li>
                            <li className="disabled">Relances automatiques</li>
                            <li className="disabled">Tableau de bord</li>
                        </ul>
                        <a 
                            href={getSaaSUrl("/register", "business")}
                            onClick={() => {
                                trackEvent("plan_selected", { plan: "business" });
                                trackEvent("trial_started", { plan: "business" });
                                trackEvent("landing_cta_click", { cta_label: "Essayer Growth", plan: "business" });
                            }}
                            className="plan-cta"
                        >
                            Essayer Growth
                        </a>
                    </div>

                    {/* PRO */}
                    <div className="pricing-card card-pro">
                        <div className="badge-pro">⭐ RECOMMANDÉ</div>
                        <div className="border-spin-wrapper">
                            <div className="border-spin-inner"></div>
                        </div>
                        <div className="plan-name">Pro</div>
                        <div className="plan-price-wrap">
                            <div className="plan-price">
                                <span className="currency">CFA</span>{isAnnual ? '79 000' : '99 000'}<span className="period">/mois</span>
                            </div>
                        </div>
                        <p className="plan-tagline">Transformez les conversations en ventes</p>
                        <div className="projection-box">
                            <div className="proj-value">+30% à +70% de clients</div>
                            <div className="proj-sub">vs gestion manuelle</div>
                        </div>
                        <ul className="plan-features">
                            <li>Tout Growth +</li>
                            <li>Scénarios de conversion</li>
                            <li>Relances automatiques</li>
                            <li>Recommandations IA</li>
                            <li>Optimisation du closing</li>
                            <li>Tableau de bord temps réel</li>
                        </ul>
                        <p className="popular-mention">✔ <strong>Le plus choisi</strong> par les vendeurs</p>
                        <a 
                            href={getSaaSUrl("/register", "scale")}
                            onClick={() => {
                                trackEvent("plan_selected", { plan: "scale" });
                                trackEvent("trial_started", { plan: "scale" });
                                trackEvent("landing_cta_click", { cta_label: "Activer PRO", plan: "scale" });
                            }}
                            className="plan-cta"
                        >
                            🔥 Activer PRO
                        </a>
                    </div>

                    {/* ELITE */}
                    <div className="pricing-card card-elite">
                        <div className="plan-name">Elite</div>
                        <div className="plan-price-wrap">
                            <div className="plan-price">
                                <span className="currency">CFA</span>{isAnnual ? '159 000' : '199 000'}<span className="period">/mois</span>
                            </div>
                        </div>
                        <p className="plan-tagline">Une machine de vente intégrale</p>
                        <ul className="plan-features">
                            <li>Tout PRO +</li>
                            <li>IA personnalisée</li>
                            <li>Stratégie complète</li>
                            <li>Analytics avancés</li>
                            <li>Accompagnement prioritaire</li>
                            <li>Multi-équipes</li>
                        </ul>
                        <a 
                            href={getSaaSUrl("/register", "elite")}
                            onClick={() => {
                                trackEvent("plan_selected", { plan: "elite" });
                                trackEvent("trial_started", { plan: "elite" });
                                trackEvent("landing_cta_click", { cta_label: "Contacter l'équipe Elite", plan: "elite" });
                            }}
                            className="plan-cta"
                        >
                            Choisir Elite
                        </a>
                    </div>
                </div>

                {/* Mention paiement */}
                <div className="payment-mention">
                    <p>
                        <span>📱 Mobile Money</span> accepté • Paiement mensuel • <span>Activation immédiate</span> • Sans engagement
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FikoPricingSlider;
