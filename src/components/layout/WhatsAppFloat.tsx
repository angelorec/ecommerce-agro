"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "motion/react";

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/5549998142661?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20produtos."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(34,197,94,0.5)] hover:bg-green-400 transition-colors"
    >
      <WhatsappLogo size={30} weight="fill" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />
    </motion.a>
  );
}
