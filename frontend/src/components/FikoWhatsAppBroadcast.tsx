import React from 'react';
import './FikoWhatsAppBroadcast.css';

const FikoWhatsAppBroadcast: React.FC = () => {
    return (
        <section className="campaign-section">
            <div className="wb-cosmic-bg">
                <div className="wb-cosmic-particle wb-cp-blue"></div>
                <div className="wb-cosmic-particle wb-cp-orange"></div>
                <div className="wb-cosmic-particle wb-cp-red"></div>
                <div className="wb-cosmic-particle wb-cp-green"></div>
                <div className="wb-cosmic-particle wb-cp-blue"></div>
                <div className="wb-cosmic-particle wb-cp-orange"></div>
                <div className="wb-cosmic-particle wb-cp-red"></div>
                <div className="wb-cosmic-particle wb-cp-green"></div>
                <div className="wb-cosmic-particle wb-cp-blue"></div>
                <div className="wb-cosmic-particle wb-cp-orange"></div>
            </div>
            <div className="wb-nebula-orb wb-orb-blue"></div>
            <div className="wb-nebula-orb wb-orb-orange"></div>
            <div className="wb-nebula-orb wb-orb-green"></div>

            <div className="campaign-container">
                <div className="campaign-header">
                    <div className="eyebrow">
                        <span className="pulse-dot"></span> Module Broadcast WhatsApp
                    </div>
                    <h2>
                        Créez des <span className="gradient-text">campagnes marketing</span><br/>qui convertissent à chaque envoi
                    </h2>
                    <p className="subtitle">
                        Importez vos contacts, créez des messages percutants avec images et documents, envoyez des campagnes ciblées et suivez vos performances en temps réel. Fiko automatise chaque étape.
                    </p>
                </div>

                <div className="campaign-layout">
                    <div className="steps-panel">
                        <div className="step-card">
                            <div className="step-icon-wrap">📂</div>
                            <div className="step-content">
                                <div className="step-number">Étape 01</div>
                                <h3>Importer des contacts via CSV</h3>
                                <p className="step-meta">Téléchargez votre fichier client en un clic. Fiko nettoie automatiquement les doublons, valide les numéros WhatsApp et segmente votre base par critères.</p>
                                <div className="step-tags">
                                    <span className="step-tag">CSV</span>
                                    <span className="step-tag">Nettoyage auto</span>
                                    <span className="step-tag">Dédoublonnage</span>
                                </div>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-icon-wrap">🎯</div>
                            <div className="step-content">
                                <div className="step-number">Étape 02</div>
                                <h3>Créer des campagnes marketing WhatsApp</h3>
                                <p className="step-meta">Concevez des campagnes visuelles avec un éditeur intuitif. Choisissez votre audience, programmez l'envoi et personnalisez chaque message avec des variables dynamiques.</p>
                                <div className="step-tags">
                                    <span className="step-tag">Éditeur visuel</span>
                                    <span className="step-tag">Programmation</span>
                                    <span className="step-tag">Personnalisation</span>
                                </div>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-icon-wrap">📤</div>
                            <div className="step-content">
                                <div className="step-number">Étape 03</div>
                                <h3>Envoyer messages + image / document</h3>
                                <p className="step-meta">Ajoutez des images, PDF, catalogues ou liens interactifs à vos messages. Prévisualisez le rendu sur mobile avant d'envoyer. Un clic, et votre campagne est live.</p>
                                <div className="step-tags">
                                    <span className="step-tag">Images</span>
                                    <span className="step-tag">PDF</span>
                                    <span className="step-tag">Boutons interactifs</span>
                                </div>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-icon-wrap">📊</div>
                            <div className="step-content">
                                <div className="step-number">Étape 04</div>
                                <h3>Suivre les performances en temps réel</h3>
                                <p className="step-meta">Tableau de bord live : taux d'ouverture, clics, conversions, réponses. Chaque indicateur est mis à jour instantanément pour vous permettre d'optimiser vos campagnes.</p>
                                <div className="step-tags">
                                    <span className="step-tag">Dashboard live</span>
                                    <span className="step-tag">KPIs</span>
                                    <span className="step-tag">Export données</span>
                                </div>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-icon-wrap">🔄</div>
                            <div className="step-content">
                                <div className="step-number">Étape 05</div>
                                <h3>Segmenter et relancer automatiquement</h3>
                                <p className="step-meta">Fiko segmente vos contacts selon leur comportement (ouverture, clic, achat) et déclenche des relances automatiques personnalisées. Vos campagnes s'optimisent toutes seules.</p>
                                <div className="step-tags">
                                    <span className="step-tag">Segmentation</span>
                                    <span className="step-tag">Relances auto</span>
                                    <span className="step-tag">Scénarios</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="phone-preview-wrapper">
                        <div className="wb-phone-frame">
                            <div className="wb-phone-notch"></div>
                            <div className="wb-phone-screen">
                                <div className="wb-phone-status-bar">
                                    <span className="time">9:41</span>
                                    <span className="icons">📶 📡 🔋</span>
                                </div>
                                <div className="wb-phone-wa-header">
                                    <span className="back">←</span>
                                    <div className="contact-avatar">SD</div>
                                    <div>
                                        <div className="contact-name">Sophie Dubois</div>
                                        <div className="contact-status">en ligne</div>
                                    </div>
                                </div>
                                <div className="wb-phone-messages">
                                    <div className="msg-bubble received">
                                        Bonjour, votre catalogue m'intéresse !
                                        <div className="msg-time">10:32</div>
                                    </div>
                                    <div className="msg-bubble sent">
                                        <div className="msg-image">📸 Aperçu catalogue</div>
                                        Découvrez notre nouvelle collection ! Profitez de <strong>-25%</strong> cette semaine seulement. 🎉
                                        <div className="msg-time">10:32</div>
                                    </div>
                                    <div className="msg-bubble received">
                                        La remise s'applique sur tous les articles ?
                                        <div className="msg-time">10:34</div>
                                    </div>
                                    <div className="msg-bubble sent">
                                        Oui ! Sur toute la boutique. Voici le lien :<br/>🔗 <u>fikoconnect.me/promo</u>
                                        <div className="msg-time">10:34</div>
                                    </div>
                                    <div className="msg-bubble received">
                                        Parfait, je commande cet après-midi !
                                        <div className="msg-time">10:36</div>
                                    </div>
                                    <div className="msg-bubble sent urgent">
                                        ⏳ L'offre expire ce soir à minuit. Profitez-en vite !
                                        <div className="msg-time">10:36</div>
                                    </div>
                                    <div className="msg-bubble received">
                                        Merci pour l'info, je passe commande maintenant 🙏
                                        <div className="msg-time">10:38</div>
                                    </div>
                                    <div className="msg-bubble sent">
                                        ✅ Excellente nouvelle ! Votre code promo : <strong>FIKO25</strong>
                                        <div className="msg-time">10:38</div>
                                    </div>
                                </div>
                                <div className="wb-phone-input-bar">
                                    <button className="attach-btn">📎</button>
                                    <div className="input-field">Message...</div>
                                    <button className="send-btn">↑</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="kpi-strip">
                    <div className="kpi-item">
                        <div className="kpi-value">92%</div>
                        <div className="kpi-label">Taux d'ouverture moyen</div>
                    </div>
                    <div className="kpi-item">
                        <div className="kpi-value">+3.5x</div>
                        <div className="kpi-label">ROI vs email marketing</div>
                    </div>
                    <div className="kpi-item">
                        <div className="kpi-value">-40%</div>
                        <div className="kpi-label">Temps de gestion campagne</div>
                    </div>
                    <div className="kpi-item">
                        <div className="kpi-value">24/24</div>
                        <div className="kpi-label">Relances automatiques</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FikoWhatsAppBroadcast;
