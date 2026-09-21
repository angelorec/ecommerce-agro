"use client";

import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, MapPin, CheckCircle, Money, Barcode, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";
import { motion, AnimatePresence } from "motion/react";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Sound setup
  const { play: playSuccess } = useSound('/sounds/purchase-success.mp3');

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    metodoEntrega: "correios",
    metodoPagamento: "pix"
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate API request and payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Play sound and redirect
    playSuccess();
    clearCart();
    router.push('/checkout/sucesso');
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h2 className="font-display font-bold text-2xl mb-4 text-brand-dark">Carrinho Vazio</h2>
        <p className="text-gray-500 mb-8">Adicione produtos ao carrinho antes de finalizar a compra.</p>
        <Link href="/produtos" className="px-6 py-3 bg-brand-forest text-white rounded-md font-bold uppercase tracking-wider">
          Voltar às Compras
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const frete = formData.metodoEntrega === 'retirada' ? 0 : 25.90;
  const total = subtotal + frete;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">
            Finalizar <span className="text-brand-forest">Compra</span>
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span className={step >= 1 ? "text-brand-forest" : ""}>1. Dados</span>
            <span className="text-gray-300">--</span>
            <span className={step >= 2 ? "text-brand-forest" : ""}>2. Entrega</span>
            <span className="text-gray-300">--</span>
            <span className={step >= 3 ? "text-brand-forest" : ""}>3. Pagamento</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Form Area */}
          <div className="w-full lg:w-[65%]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: DADOS */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center text-sm">1</span>
                      Seus Dados Pessoais
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md focus:border-brand-forest outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CPF/CNPJ</label>
                        <input name="cpf" value={formData.cpf} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md focus:border-brand-forest outline-none" />
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button onClick={nextStep} className="px-8 py-3 bg-brand-dark hover:bg-brand-forest text-white font-bold rounded-md transition-colors flex items-center gap-2">
                        Próximo <ArrowRight weight="bold" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: ENTREGA */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center text-sm">2</span>
                      Entrega e Endereço
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <label className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${formData.metodoEntrega === 'correios' ? 'border-brand-forest bg-green-50 text-brand-forest' : 'border-gray-200 text-gray-500 hover:border-brand-forest/50'}`}>
                        <input type="radio" name="metodoEntrega" value="correios" className="hidden" checked={formData.metodoEntrega === 'correios'} onChange={handleChange} />
                        <Truck size={32} weight={formData.metodoEntrega === 'correios' ? "fill" : "regular"} />
                        <span className="font-bold">Entrega</span>
                      </label>
                      <label className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${formData.metodoEntrega === 'retirada' ? 'border-brand-forest bg-green-50 text-brand-forest' : 'border-gray-200 text-gray-500 hover:border-brand-forest/50'}`}>
                        <input type="radio" name="metodoEntrega" value="retirada" className="hidden" checked={formData.metodoEntrega === 'retirada'} onChange={handleChange} />
                        <MapPin size={32} weight={formData.metodoEntrega === 'retirada' ? "fill" : "regular"} />
                        <span className="font-bold">Retirar na Loja</span>
                      </label>
                    </div>

                    {formData.metodoEntrega === 'correios' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                          <input name="cep" value={formData.cep} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                          <input name="endereco" value={formData.endereco} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                          <input name="numero" value={formData.numero} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                          <input name="bairro" value={formData.bairro} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none" />
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      <button onClick={prevStep} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2">
                        <ArrowLeft weight="bold" /> Voltar
                      </button>
                      <button onClick={nextStep} className="px-8 py-3 bg-brand-dark hover:bg-brand-forest text-white font-bold rounded-md transition-colors flex items-center gap-2">
                        Próximo <ArrowRight weight="bold" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAGAMENTO */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 md:p-8"
                  >
                    <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center text-sm">3</span>
                      Pagamento
                    </h2>
                    
                    <div className="flex flex-col gap-3 mb-8">
                      <label className={`border border-gray-200 rounded-lg p-4 cursor-pointer flex items-center gap-4 transition-all ${formData.metodoPagamento === 'pix' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'hover:bg-gray-50'}`}>
                        <input type="radio" name="metodoPagamento" value="pix" className="w-4 h-4 text-green-600 focus:ring-green-500" checked={formData.metodoPagamento === 'pix'} onChange={handleChange} />
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm text-[#32BCAD]">
                          <Money size={24} weight="fill" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">PIX (5% de desconto)</h4>
                          <p className="text-sm text-gray-500">Aprovação imediata</p>
                        </div>
                      </label>
                      
                      <label className={`border border-gray-200 rounded-lg p-4 cursor-pointer flex items-center gap-4 transition-all ${formData.metodoPagamento === 'cartao' ? 'border-brand-forest bg-green-50 ring-1 ring-brand-forest' : 'hover:bg-gray-50'}`}>
                        <input type="radio" name="metodoPagamento" value="cartao" className="w-4 h-4 text-brand-forest focus:ring-brand-forest" checked={formData.metodoPagamento === 'cartao'} onChange={handleChange} />
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm text-brand-dark">
                          <CreditCard size={24} weight="fill" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">Cartão de Crédito</h4>
                          <p className="text-sm text-gray-500">Até 3x sem juros</p>
                        </div>
                      </label>
                    </div>

                    <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
                      <button onClick={prevStep} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2">
                        <ArrowLeft weight="bold" /> Voltar
                      </button>
                      <button 
                        onClick={handleCheckout} 
                        disabled={isProcessing}
                        className="px-8 py-4 bg-brand-forest hover:bg-brand-forest-dark text-white font-black uppercase tracking-wider text-lg rounded-md transition-all active:scale-[0.98] shadow-[0_4px_15px_rgba(45,106,30,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
                      >
                        {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                        {!isProcessing && <CheckCircle size={24} weight="bold" />}
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar / Order Summary */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-display font-bold text-lg border-b border-gray-100 pb-4 mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
                {items.map(item => {
                  const price = item.product.promotionalPrice || item.product.price;
                  return (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 relative flex-shrink-0">
                        <Image src={item.product.images[0] || '/images/placeholder.jpg'} alt={item.product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-brand-dark line-clamp-2 leading-tight mb-1">{item.product.name}</h4>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-gray-500">Qtd: {item.quantity}</span>
                          <span className="font-bold text-sm">R$ {(price * item.quantity).toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>{frete === 0 ? 'Grátis (Retirada)' : `R$ ${frete.toFixed(2).replace('.', ',')}`}</span>
                </div>
                {formData.metodoPagamento === 'pix' && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Desconto PIX (5%)</span>
                    <span>- R$ {(total * 0.05).toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
                  <span className="font-display font-bold text-lg">Total</span>
                  <span className="font-display font-black text-2xl text-brand-forest">
                    R$ {(formData.metodoPagamento === 'pix' ? total * 0.95 : total).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
