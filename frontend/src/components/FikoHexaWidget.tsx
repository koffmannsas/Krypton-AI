import React from "react";
import { motion } from "framer-motion";
import { Hexagon, Bot } from "lucide-react";

interface FikoHexaWidgetProps {
  onClick: () => void;
}

export default function FikoHexaWidget({ onClick }: FikoHexaWidgetProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[100] group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative size-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Hexagon size={80} className="text-[#FF2718]" strokeWidth={1} />
        </motion.div>
        <Bot size={32} className="text-white relative z-10" />
      </div>
    </motion.button>
  );
}
