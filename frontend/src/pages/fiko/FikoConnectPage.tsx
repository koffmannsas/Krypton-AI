"use client";

import React from "react";
import FikoHeroSlider from "../../components/FikoHeroSlider";
import FikoSuiteModules from "../../components/FikoSuiteModules";
import FikoPricingSlider from "../../components/FikoPricingSlider";
import FikoAiFeatures from "../../components/FikoAiFeatures";
import FikoPricingSimulator from "../../components/FikoPricingSimulator";

import FikoWhatsAppBroadcast from "../../components/FikoWhatsAppBroadcast";
import MetaVerificationBanner from "../../components/MetaVerificationBanner";
import FikoHeroIA from "../../components/FikoHeroIA";

export default function FikoConnectPage() {
  return (
    <div className="bg-[#FFFFFF] text-[#080808] min-h-screen selection:bg-[#E10600] selection:text-white pb-0">
      
      <FikoHeroSlider />

      <MetaVerificationBanner />

      <FikoSuiteModules />
      
      <FikoWhatsAppBroadcast />
      
      <FikoAiFeatures />
      
      <FikoPricingSlider />
      
      <FikoPricingSimulator />
      
      <FikoHeroIA />
    </div>
  );
}
