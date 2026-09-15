"use client";

import { MapPin, WhatsappLogo, EnvelopeSimple, Phone, PaperPlaneTilt } from "@phosphor-icons/react";
import { useState } from "react";
import type { Metadata } from "next";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Encode to WhatsApp message as a simple fallback
    const text = encodeURIComponent(
      `Olá! Me chamo ${form.nome}.\n\nAssunto: ${form.assunto}\n\n${form.mensagem}\n\nE-mail: ${form.email}`
    );
    window.open(`https://wa.me/5549998142661?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-brand-forest font-bold uppercase tracking-widest text-sm mb-2">Fale com a Gente</p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-dark uppercase tracking-tight">
            Entre em <span className="text-brand-forest">Contato</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-dark text-white rounded-2xl p-6 md:p-8 border-2 border-brand-gold/30">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide mb-6 text-brand-gold">Informações</h2>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={24} weight="fill" className="text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white mb-1">Endereço</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Rua São Joaquim, 1187<br />
                      Bairro Copacabana<br />
                      Lages/SC — 88504-010
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Phone size={24} weight="fill" className="text-brand-gold shrink-0" />
                  <div>
                    <p className="font-bold text-white mb-1">Telefone</p>
                    <a href="tel:+5549998142661" className="text-white/60 text-sm hover:text-white transition-colors">
                      (49) 99814-2661
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <WhatsappLogo size={24} weight="fill" className="text-green-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/5549998142661"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 font-bold text-sm hover:text-green-300 transition-colors"
                    >
                      Chamar agora →
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <EnvelopeSimple size={24} weight="fill" className="text-brand-gold shrink-0" />
                  <div>
                    <p className="font-bold text-white mb-1">E-mail</p>
                    <a href="mailto:contato@ranchodospinheiros.com.br" className="text-white/60 text-sm hover:text-white transition-colors">
                      contato@ranchodospinheiros.com.br
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-2">Horário</p>
                <p className="text-white text-sm font-medium">Seg — Sex: 8h às 18h</p>
                <p className="text-white text-sm font-medium">Sábado: 8h às 12h</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <PaperPlaneTilt size={40} weight="fill" className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-dark">Mensagem Enviada!</h3>
                  <p className="text-gray-500">Abrimos o WhatsApp com a sua mensagem. Em breve retornaremos o seu contato!</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-6 py-2 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-2xl text-brand-dark mb-6 uppercase">Envie uma Mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome *</label>
                        <input
                          required
                          value={form.nome}
                          onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-colors bg-gray-50 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-colors bg-gray-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Assunto *</label>
                      <input
                        required
                        value={form.assunto}
                        onChange={e => setForm(f => ({ ...f, assunto: e.target.value }))}
                        placeholder="Ex: Dúvida sobre produto, orçamento, etc."
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-colors bg-gray-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensagem *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.mensagem}
                        onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                        placeholder="Escreva sua mensagem aqui..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-colors resize-none bg-gray-50 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 bg-brand-forest hover:bg-brand-forest-light text-white font-bold uppercase tracking-wider rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-brand-forest/20 flex items-center justify-center gap-2"
                    >
                      <WhatsappLogo size={22} weight="fill" />
                      Enviar via WhatsApp
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Sua mensagem será enviada diretamente para o nosso WhatsApp.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
