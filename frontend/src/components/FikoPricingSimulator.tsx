import React, { useState } from 'react';
import './FikoPricingSimulator.css';

const BASE_PRICE_PER_AGENT = 15000;
const CHANNEL_PRICES = {
    whatsapp: 12000,
    messenger: 8000,
    instagram: 8000,
    telegram: 6000,
    webchat: 5000,
};
const ADDON_PRICES = {
    addonChatbot: 25000,
    addonDiffusion: 15000,
    addonAPI: 10000,
};
const ANNUAL_DISCOUNT = 0.20;

const FikoPricingSimulator: React.FC = () => {
    const [state, setState] = useState({
        agents: 3,
        whatsapp: 1,
        messenger: 0,
        instagram: 0,
        telegram: 0,
        webchat: 1,
        addonChatbot: true,
        addonDiffusion: false,
        addonAPI: false,
        isAnnual: false,
    });

    const handleIncrement = (field: keyof typeof state) => {
        if (typeof state[field] === 'number') {
            setState(prev => ({ ...prev, [field]: Number(prev[field]) + 1 }));
        }
    };

    const handleDecrement = (field: keyof typeof state) => {
        if (typeof state[field] === 'number') {
            const min = field === 'agents' ? 1 : 0;
            setState(prev => ({ ...prev, [field]: Math.max(min, Number(prev[field]) - 1) }));
        }
    };

    const toggleAddon = (field: keyof typeof state) => {
        if (typeof state[field] === 'boolean') {
            setState(prev => ({ ...prev, [field]: !prev[field] }));
        }
    };

    const toggleAnnual = () => {
        setState(prev => ({ ...prev, isAnnual: !prev.isAnnual }));
    };

    const calculateMonthlyTotal = () => {
        let total = 0;
        total += state.agents * BASE_PRICE_PER_AGENT;
        total += state.whatsapp * CHANNEL_PRICES.whatsapp;
        total += state.messenger * CHANNEL_PRICES.messenger;
        total += state.instagram * CHANNEL_PRICES.instagram;
        total += state.telegram * CHANNEL_PRICES.telegram;
        total += state.webchat * CHANNEL_PRICES.webchat;
        if (state.addonChatbot) total += ADDON_PRICES.addonChatbot;
        if (state.addonDiffusion) total += ADDON_PRICES.addonDiffusion;
        if (state.addonAPI) total += ADDON_PRICES.addonAPI;
        return total;
    };

    const monthlyTotal = calculateMonthlyTotal();
    const displayPrice = state.isAnnual ? Math.round(monthlyTotal * (1 - ANNUAL_DISCOUNT)) : monthlyTotal;
    const annualSavings = Math.round(monthlyTotal * 12 * ANNUAL_DISCOUNT);

    return (
        <section className="simulator-section">
            {/* Fond cosmique */}
            <div className="cosmic-bg">
                <div className="cosmic-particle cp-blue"></div>
                <div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-red"></div>
                <div className="cosmic-particle cp-blue"></div>
                <div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-red"></div>
                <div className="cosmic-particle cp-blue"></div>
                <div className="cosmic-particle cp-orange"></div>
            </div>
            <div className="nebula-orb orb-blue"></div>
            <div className="nebula-orb orb-orange"></div>

            <div className="simulator-container">
                {/* Header */}
                <div className="sim-header">
                    <div className="eyebrow">🔧 Simulateur Fiko Connect</div>
                    <h2>
                        Configurez votre <span className="gradient-text">plan sur mesure</span>
                    </h2>
                    <p className="subtitle">
                        Choisissez vos canaux, votre nombre d'agents et vos options.
                        Le devis se met à jour en temps réel.
                    </p>
                </div>

                {/* Layout */}
                <div className="sim-layout">
                    {/* Panneau Configuration */}
                    <div className="sim-config-panel">
                        {/* Agents */}
                        <div>
                            <div className="config-section-title">Ressources</div>
                            <div className="control-row">
                                <div className="control-info">
                                    <div className="control-icon icon-agent">👥</div>
                                    <div>
                                        <div className="control-label">Agents commerciaux</div>
                                        <div className="control-sublabel">Nombre d'utilisateurs simultanés</div>
                                    </div>
                                </div>
                                <div className="counter-control">
                                    <button className="counter-btn" onClick={() => handleDecrement('agents')}>−</button>
                                    <span className="counter-value">{state.agents}</span>
                                    <button className="counter-btn" onClick={() => handleIncrement('agents')}>+</button>
                                </div>
                            </div>
                        </div>

                        {/* Canaux */}
                        <div>
                            <div className="config-section-title">Canaux de messagerie</div>
                            <div className="channel-group">
                                <div className="control-row">
                                    <div className="control-info">
                                        <div className="control-icon icon-whatsapp">💬</div>
                                        <div>
                                            <div className="control-label">WhatsApp</div>
                                            <div className="control-sublabel">Business API inclus</div>
                                        </div>
                                    </div>
                                    <div className="counter-control">
                                        <button className="counter-btn" onClick={() => handleDecrement('whatsapp')}>−</button>
                                        <span className="counter-value">{state.whatsapp}</span>
                                        <button className="counter-btn" onClick={() => handleIncrement('whatsapp')}>+</button>
                                    </div>
                                </div>
                                <div className="control-row">
                                    <div className="control-info">
                                        <div className="control-icon icon-messenger">📘</div>
                                        <div>
                                            <div className="control-label">Facebook Messenger</div>
                                        </div>
                                    </div>
                                    <div className="counter-control">
                                        <button className="counter-btn" onClick={() => handleDecrement('messenger')}>−</button>
                                        <span className="counter-value">{state.messenger}</span>
                                        <button className="counter-btn" onClick={() => handleIncrement('messenger')}>+</button>
                                    </div>
                                </div>
                                <div className="control-row">
                                    <div className="control-info">
                                        <div className="control-icon icon-instagram">📸</div>
                                        <div>
                                            <div className="control-label">Instagram Direct</div>
                                        </div>
                                    </div>
                                    <div className="counter-control">
                                        <button className="counter-btn" onClick={() => handleDecrement('instagram')}>−</button>
                                        <span className="counter-value">{state.instagram}</span>
                                        <button className="counter-btn" onClick={() => handleIncrement('instagram')}>+</button>
                                    </div>
                                </div>
                                <div className="control-row">
                                    <div className="control-info">
                                        <div className="control-icon icon-telegram">✈️</div>
                                        <div>
                                            <div className="control-label">Telegram</div>
                                        </div>
                                    </div>
                                    <div className="counter-control">
                                        <button className="counter-btn" onClick={() => handleDecrement('telegram')}>−</button>
                                        <span className="counter-value">{state.telegram}</span>
                                        <button className="counter-btn" onClick={() => handleIncrement('telegram')}>+</button>
                                    </div>
                                </div>
                                <div className="control-row">
                                    <div className="control-info">
                                        <div className="control-icon icon-webchat">🌐</div>
                                        <div>
                                            <div className="control-label">Chat en direct (site web)</div>
                                        </div>
                                    </div>
                                    <div className="counter-control">
                                        <button className="counter-btn" onClick={() => handleDecrement('webchat')}>−</button>
                                        <span className="counter-value">{state.webchat}</span>
                                        <button className="counter-btn" onClick={() => handleIncrement('webchat')}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Options supplémentaires */}
                        <div>
                            <div className="config-section-title">Options avancées</div>
                            <div className="addons-group">
                                <div className={`addon-toggle ${state.addonChatbot ? 'active' : ''}`} onClick={() => toggleAddon('addonChatbot')}>
                                    <div className="addon-info">
                                        <span className="addon-icon">🤖</span>
                                        <div>
                                            <div className="addon-label">Chatbot IA Avancé</div>
                                            <div className="addon-price">+{ADDON_PRICES.addonChatbot.toLocaleString()} CFA/mois</div>
                                        </div>
                                    </div>
                                    <div className="toggle-switch">
                                        <div className="toggle-switch-dot"></div>
                                    </div>
                                </div>
                                <div className={`addon-toggle ${state.addonDiffusion ? 'active' : ''}`} onClick={() => toggleAddon('addonDiffusion')}>
                                    <div className="addon-info">
                                        <span className="addon-icon">📢</span>
                                        <div>
                                            <div className="addon-label">Module Diffusion WhatsApp</div>
                                            <div className="addon-price">+{ADDON_PRICES.addonDiffusion.toLocaleString()} CFA/mois</div>
                                        </div>
                                    </div>
                                    <div className="toggle-switch">
                                        <div className="toggle-switch-dot"></div>
                                    </div>
                                </div>
                                <div className={`addon-toggle ${state.addonAPI ? 'active' : ''}`} onClick={() => toggleAddon('addonAPI')}>
                                    <div className="addon-info">
                                        <span className="addon-icon">⚙️</span>
                                        <div>
                                            <div className="addon-label">API & Webhooks</div>
                                            <div className="addon-price">+{ADDON_PRICES.addonAPI.toLocaleString()} CFA/mois</div>
                                        </div>
                                    </div>
                                    <div className="toggle-switch">
                                        <div className="toggle-switch-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panneau Devis */}
                    <div className="sim-quote-panel">
                        <div className="quote-header">
                            <div className="quote-label">Votre devis</div>
                            <div className="quote-title">Plan Fiko Connect personnalisé</div>
                        </div>

                        {/* Toggle annuel */}
                        <div className="quote-toggle-row" onClick={toggleAnnual}>
                            <span className={`qt-label ${!state.isAnnual ? 'active' : ''}`}>Mensuel</span>
                            <div className={`quote-toggle-track ${state.isAnnual ? 'active' : ''}`}>
                                <div className="quote-toggle-dot"></div>
                            </div>
                            <span className={`qt-label ${state.isAnnual ? 'active' : ''}`}>Annuel</span>
                        </div>

                        {/* Résumé */}
                        <div className="quote-summary">
                            {state.agents > 0 && (
                                <div className="quote-line">
                                    <span>Agents (×{state.agents})</span>
                                    <span>{(state.agents * BASE_PRICE_PER_AGENT).toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.whatsapp > 0 && (
                                <div className="quote-line">
                                    <span>WhatsApp (×{state.whatsapp})</span>
                                    <span>{(state.whatsapp * CHANNEL_PRICES.whatsapp).toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.messenger > 0 && (
                                <div className="quote-line">
                                    <span>Messenger (×{state.messenger})</span>
                                    <span>{(state.messenger * CHANNEL_PRICES.messenger).toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.instagram > 0 && (
                                <div className="quote-line">
                                    <span>Instagram (×{state.instagram})</span>
                                    <span>{(state.instagram * CHANNEL_PRICES.instagram).toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.telegram > 0 && (
                                <div className="quote-line">
                                    <span>Telegram (×{state.telegram})</span>
                                    <span>{(state.telegram * CHANNEL_PRICES.telegram).toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.webchat > 0 && (
                                <div className="quote-line">
                                    <span>Chat en direct (×{state.webchat})</span>
                                    <span>{(state.webchat * CHANNEL_PRICES.webchat).toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.addonChatbot && (
                                <div className="quote-line">
                                    <span>🤖 Chatbot IA</span>
                                    <span>{ADDON_PRICES.addonChatbot.toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.addonDiffusion && (
                                <div className="quote-line">
                                    <span>📢 Diffusion WhatsApp</span>
                                    <span>{ADDON_PRICES.addonDiffusion.toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.addonAPI && (
                                <div className="quote-line">
                                    <span>⚙️ API & Webhooks</span>
                                    <span>{ADDON_PRICES.addonAPI.toLocaleString()} CFA</span>
                                </div>
                            )}
                            {state.isAnnual && (
                                <div className="quote-line" style={{ color: '#4ADE80', fontWeight: 600 }}>
                                    <span>Remise annuelle (-20%)</span>
                                    <span>-{Math.round(monthlyTotal * ANNUAL_DISCOUNT).toLocaleString()} CFA</span>
                                </div>
                            )}
                            <div className="quote-line total-label">
                                <span>Total</span>
                                <span>{displayPrice.toLocaleString()} CFA/mois</span>
                            </div>
                        </div>

                        {/* Prix total */}
                        <div className="quote-total-price">
                            <div className="total-amount">
                                <span className="total-currency">CFA</span>{displayPrice.toLocaleString()}
                            </div>
                            <span className="total-period">/mois</span>
                        </div>

                        {/* Économie annuelle */}
                        {state.isAnnual && (
                            <div className="annual-savings">
                                💰 Vous économisez <strong>{annualSavings.toLocaleString()} CFA</strong> par an (-20%)
                            </div>
                        )}

                        {/* CTA */}
                        <a href="#" className="quote-cta">🔥 Activer ce plan</a>
                        <p className="quote-trust">✅ Sans engagement • Résiliez à tout moment</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FikoPricingSimulator;
