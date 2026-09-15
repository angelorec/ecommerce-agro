"use client";

import Link from "next/link";
import { CheckCircle, WhatsappLogo, MapPin } from "@phosphor-icons/react";

export default function OrderSuccessPage() {
  return (
    <div className="bg-brand-beige min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Decorative header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-forest"></div>
        
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={64} weight="fill" />
        </div>
        
        <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark mb-4 tracking-tight">
          Compra Realizada!
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
          Seu pedido <strong className="text-brand-dark">#RP-{(Math.random() * 100000).toFixed(0).padStart(6, '0')}</strong> foi processado com sucesso. Obrigado por confiar no Rancho dos Pinheiros.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left mb-8 max-w-md mx-auto">
          <h3 className="font-bold text-brand-dark mb-4 border-b border-gray-200 pb-2">Próximos Passos</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-xs mt-0.5">1</span>
              <p className="text-sm text-gray-600">Enviamos um e-mail com o resumo do pedido e a nota fiscal.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-xs mt-0.5">2</span>
              <p className="text-sm text-gray-600">Você pode acompanhar o status pelo painel da sua conta.</p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="px-8 py-4 bg-brand-dark text-white rounded-md font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors w-full sm:w-auto">
            Voltar para Loja
          </Link>
          <a href="https://wa.me/5549998142661" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-500 text-white rounded-md font-bold uppercase tracking-wider hover:bg-green-600 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg shadow-green-500/20">
            <WhatsappLogo size={24} weight="fill" />
            Falar no Whats
          </a>
        </div>
      </div>
    </div>
  );
}
