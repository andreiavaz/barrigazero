import React, { useState } from 'react';
import { CheckoutForm as CheckoutFormType } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: (name: string, email: string) => void;
}

export default function CheckoutForm({ onBack, onSuccess }: CheckoutFormProps) {
  const [form, setForm] = useState<CheckoutFormType>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'pix'
  });

  const [loading, setLoading] = useState(false);
  const [cardInputs, setCardInputs] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert('Por favor, preencha todos os dados de contato obrigatórios.');
      return;
    }

    setLoading(true);

    // Simulate short network delay for processing checkout
    setTimeout(() => {
      setLoading(false);
      onSuccess(form.name, form.email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark-green font-sans flex flex-col justify-between py-6 px-4">
      {/* Top logo header */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between pb-4 border-b border-gray-200">
        <button 
          onClick={onBack}
          className="text-xs font-bold text-brand-green flex items-center gap-1 hover:underline"
          id="btn-checkout-back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para a Oferta
        </button>
        <span className="font-serif italic font-bold text-brand-green text-sm">Desafio Barriga Zero</span>
      </div>

      {/* Main content */}
      <div className="max-w-xl mx-auto w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 my-6 space-y-6">
        
        {/* Purchase Summary */}
        <div className="bg-brand-sage/40 rounded-2xl p-4 border border-brand-green/10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xs md:text-sm text-brand-green uppercase tracking-wide">Produto Selecionado</h3>
            <p className="text-sm font-semibold text-brand-dark-green">Desafio Barriga Zero 2.0 + Bônus</p>
            <p className="text-[10px] text-gray-500">Acesso Vitalício Interativo</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 line-through">R$ 97,00</span>
            <p className="text-lg md:text-xl font-black text-brand-pink">R$ 27,00</p>
          </div>
        </div>

        {/* Checkout Steps */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Personal Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-brand-green flex items-center gap-2 border-b border-gray-100 pb-1.5">
              <span className="w-5 h-5 bg-brand-green text-white rounded-full flex items-center justify-center text-xs">1</span>
              Dados de Contato e Acesso
            </h4>

            <div className="grid gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                  id="input-checkout-name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">E-mail (Para Acesso)</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@gmail.com" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                    id="input-checkout-email"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">WhatsApp / Telefone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="(41) 99999-9999" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                    id="input-checkout-phone"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method Selection */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-brand-green flex items-center gap-2 border-b border-gray-100 pb-1.5">
              <span className="w-5 h-5 bg-brand-green text-white rounded-full flex items-center justify-center text-xs">2</span>
              Forma de Pagamento (Simulada)
            </h4>

            {/* Selector Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'pix' }))}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all ${
                  form.paymentMethod === 'pix' 
                    ? 'border-brand-green bg-brand-sage text-brand-green shadow-sm' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                id="btn-pay-pix"
              >
                <QrCode className="w-4 h-4" />
                PIX Simulado
              </button>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'card' }))}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all ${
                  form.paymentMethod === 'card' 
                    ? 'border-brand-green bg-brand-sage text-brand-green shadow-sm' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                id="btn-pay-card"
              >
                <CreditCard className="w-4 h-4" />
                Cartão de Crédito
              </button>
            </div>

            {/* Conditional Payment forms */}
            {form.paymentMethod === 'pix' ? (
              <div className="bg-brand-sage/20 border border-brand-green/20 rounded-2xl p-4 space-y-4 animate-fade-in">
                <div className="flex gap-3 items-start">
                  <div className="bg-brand-green/10 p-2 rounded-xl text-brand-green">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-brand-dark-green">Liberação Imediata via PIX</p>
                    <p className="text-gray-500">O pagamento via PIX é compensado em segundos e libera seu aplicativo de aluna na mesma hora.</p>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col items-center space-y-2">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-inner">
                    {/* Simplified mock QR code using SVG */}
                    <svg className="w-32 h-32 text-brand-dark-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="6" height="6" rx="0.5" />
                      <rect x="16" y="2" width="6" height="6" rx="0.5" />
                      <rect x="2" y="16" width="6" height="6" rx="0.5" />
                      <path d="M10 2h4M10 6h4M2 10v4M6 10v4M18 10v4M22 10v4M10 18h4M10 22h4M14 14h6" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Isso é um simulador seguro de compra.</p>
                </div>
              </div>
            ) : (
              <div className="bg-brand-sage/20 border border-brand-green/20 rounded-2xl p-4 space-y-3 animate-fade-in">
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Número do Cartão</label>
                    <input 
                      type="text" 
                      name="number"
                      value={cardInputs.number}
                      onChange={handleCardInputChange}
                      placeholder="4000 1234 5678 9010" 
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Nome impresso no cartão</label>
                    <input 
                      type="text" 
                      name="name"
                      value={cardInputs.name}
                      onChange={handleCardInputChange}
                      placeholder="MARIA SILVA" 
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs uppercase focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Validade</label>
                      <input 
                        type="text" 
                        name="expiry"
                        value={cardInputs.expiry}
                        onChange={handleCardInputChange}
                        placeholder="12/29" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        value={cardInputs.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guarantee / Security message */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-2 items-center text-[10px] text-gray-500 justify-center">
              <Lock className="w-3.5 h-3.5 text-brand-green" />
              <span>Seus dados de pagamento estão totalmente criptografados e protegidos.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green hover:bg-brand-green/95 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 text-sm md:text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              id="btn-checkout-submit"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando Simulação...
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  Finalizar e Acessar o Desafio - R$ 27,00
                </>
              )}
            </button>
          </div>
        </form>

        {/* Informative alert */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex gap-2.5 text-[10px] md:text-xs text-blue-700 leading-normal">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            <strong>Simulação Segura de Compra:</strong> Este é um demonstrativo funcional para aprovação. Ao clicar em Finalizar, você será direcionada à página de sucesso e poderá interagir com a Área de Alunas completa do Desafio.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-gray-400 py-4 border-t border-gray-200 max-w-xl mx-auto w-full">
        Desafio Barriga Zero • Pagamento Seguro • R$ 27,00 Único
      </div>
    </div>
  );
}
