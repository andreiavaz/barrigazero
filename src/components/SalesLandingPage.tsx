import React, { useState, useEffect } from 'react';
import { FAQ_LIST, TESTIMONIALS } from '../data';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Flame, 
  HelpCircle, 
  Lock, 
  ThumbsUp, 
  ArrowRight,
  BookOpen,
  Heart,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { trackEvent } from '../lib/metaPixel';

interface SalesLandingPageProps {
  onStartCheckout: () => void;
  onPreviewApp: () => void;
  mockupImgUrl: string;
}

export default function SalesLandingPage({ onStartCheckout, onPreviewApp, mockupImgUrl }: SalesLandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = typeof window !== 'undefined' ? sessionStorage.getItem('promo_timer_end_15') : null;
    if (savedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(savedEndTime, 10) - Date.now()) / 1000));
      if (remaining > 0) return remaining;
    }
    const duration = 15 * 60; // 15 minutes
    const endTime = Date.now() + duration * 1000;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('promo_timer_end_15', endTime.toString());
    }
    return duration;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const savedEndTime = sessionStorage.getItem('promo_timer_end_15');
        if (savedEndTime) {
          const remaining = Math.max(0, Math.floor((parseInt(savedEndTime, 10) - Date.now()) / 1000));
          if (remaining <= 0) {
            clearInterval(interval);
            return 0;
          }
          return remaining;
        }
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-brand-dark-green font-sans selection:bg-brand-pink selection:text-white">
      {/* Top Scarcity Banner with Countdown */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center text-xs md:text-sm font-extrabold flex flex-wrap items-center justify-center gap-2 border-b border-white/20 sticky top-0 z-50 shadow-md">
        <Clock className="w-4 h-4 shrink-0 animate-pulse text-white" />
        <span className="tracking-wide uppercase">
          Oferta liberada por apenas 15 minutos: <span className="bg-white text-red-600 px-2.5 py-0.5 rounded-md font-mono text-xs md:text-sm inline-block shadow-inner ml-1 font-black">{formatTime(timeLeft)}</span>
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
        
        {/* Header Hero Section - Dobra 1 (Fundo Branco, Letras Pretas, Destaque em Rosa, Botão Verde) */}
        <header className="bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 space-y-8 text-center max-w-4xl mx-auto">
          {/* Alerta de Urgência em Vermelho com escrita em Branco */}
          <div className="bg-red-600 text-white font-extrabold text-sm md:text-base py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md max-w-xl mx-auto animate-pulse">
            <Clock className="w-5 h-5 shrink-0 text-white animate-spin" style={{ animationDuration: '10s' }} />
            <span className="tracking-wide uppercase">
              Oferta liberada por apenas 15 minutos: <span className="bg-white text-red-600 px-2.5 py-0.5 rounded-md font-mono text-xs md:text-sm inline-block shadow-inner ml-1.5 font-black">{formatTime(timeLeft)}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
            Perca até <span className="text-brand-pink font-black relative inline-block">3 cm de barriga</span> em apenas <span className="text-brand-pink font-black relative inline-block">15 dias</span>.
          </h1>

          {/* Subheadline */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm md:text-base font-semibold text-gray-700 max-w-2xl mx-auto">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <span className="text-brand-pink text-lg shrink-0">✓</span>
              <span>Sem dietas malucas.</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <span className="text-brand-pink text-lg shrink-0">✓</span>
              <span>Sem treinos intensos.</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <span className="text-brand-pink text-lg shrink-0">✓</span>
              <span>E sem precisar mudar sua vida inteira.</span>
            </div>
          </div>

          {/* Caixa de Destaque */}
          <div className="bg-pink-50/60 border-2 border-dashed border-brand-pink/30 rounded-2xl p-5 md:p-6 max-w-lg mx-auto text-left space-y-3 shadow-inner">
            <p className="flex items-start gap-2.5 text-xs md:text-sm text-gray-800 font-bold">
              <span className="text-brand-pink text-lg shrink-0 mt-0.5">✔</span>
              <span>Você <span className="text-brand-pink underline decoration-2">não vai precisar</span> montar dieta.</span>
            </p>
            <p className="flex items-start gap-2.5 text-xs md:text-sm text-gray-800 font-bold">
              <span className="text-brand-pink text-lg shrink-0 mt-0.5">✔</span>
              <span>Você <span className="text-brand-pink underline decoration-2">não vai precisar</span> decidir o que fazer.</span>
            </p>
            <p className="flex items-start gap-2.5 text-xs md:text-sm text-gray-800 font-bold">
              <span className="text-brand-pink text-lg shrink-0 mt-0.5">✔</span>
              <span>Você <span className="text-brand-pink underline decoration-2">só vai seguir</span> um plano pronto.</span>
            </p>
          </div>

          {/* Image above CTA */}
          <div className="pt-4 max-w-md mx-auto">
            <img 
              src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/07/chatgpt-image-7-de-jul.-de-2026-10_23_39.png" 
              alt="Desafio Barriga Zero"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-2xl shadow-lg border border-gray-100 mx-auto transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* CTA */}
          <div className="pt-2">
            <a 
              href="https://chk.eduzz.com/118019"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('InitiateCheckout', { value: 27.00, currency: 'BRL', content_name: 'Desafio Barriga Zero' })}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-extrabold text-xl md:text-3xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 tracking-wider inline-flex items-center gap-2.5 mx-auto uppercase border-b-4 border-emerald-800 animate-bounce"
              id="btn-cta-hero"
            >
              <span>🔥</span>
              QUERO COMEÇAR AGORA
            </a>
          </div>

          {/* Selos abaixo do botão */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-xs md:text-sm font-extrabold text-gray-600">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="text-lg">✔</span> Acesso imediato
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="text-lg">✔</span> Aplicativo + Kit para imprimir
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="text-lg">✔</span> Acesso vitalício
            </span>
          </div>
        </header>

        {/* Identification Section */}
        <section className="bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 space-y-8 max-w-4xl mx-auto" id="identification-section">
          <div className="text-center space-y-3">
            <span className="text-brand-pink font-extrabold uppercase tracking-widest text-xs md:text-sm">
              Será que isso é para você?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-dark-green tracking-tight">
              Você também sente que...
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-pink/30 transition-all duration-200">
              <span className="text-brand-pink text-xl font-bold shrink-0">💔</span>
              <p className="text-base text-gray-700 font-medium text-left">Sua barriga parece nunca diminuir?</p>
            </div>
            
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-pink/30 transition-all duration-200">
              <span className="text-brand-pink text-xl font-bold shrink-0">👖</span>
              <p className="text-base text-gray-700 font-medium text-left">As roupas favoritas estão apertadas?</p>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-pink/30 transition-all duration-200">
              <span className="text-brand-pink text-xl font-bold shrink-0">📸</span>
              <p className="text-base text-gray-700 font-medium text-left">Se esconde na hora de tirar fotos?</p>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-pink/30 transition-all duration-200">
              <span className="text-brand-pink text-xl font-bold shrink-0">🔄</span>
              <p className="text-base text-gray-700 font-medium text-left">Você emagrece e volta tudo de novo?</p>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-pink/30 transition-all duration-200">
              <span className="text-brand-pink text-xl font-bold shrink-0">🥗</span>
              <p className="text-base text-gray-700 font-medium text-left">Já tentou várias dietas sem conseguir manter?</p>
            </div>
          </div>

          <div className="bg-brand-sage/40 border border-brand-green/20 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto text-center space-y-3 shadow-inner">
            <p className="text-base md:text-lg text-brand-dark-green font-bold">
              O problema <span className="text-brand-pink">não é</span> falta de força de vontade.
            </p>
            <p className="text-lg md:text-xl text-brand-dark-green font-extrabold leading-relaxed">
              Na maioria das vezes, você apenas <span className="underline decoration-brand-pink decoration-2">nunca teve um plano simples</span> para seguir. 😍
            </p>
          </div>
        </section>

        {/* Dobra 3 - The New Opportunity */}
        <section className="bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 space-y-8 max-w-4xl mx-auto" id="opportunity-section">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-dark-green tracking-tight leading-tight max-w-2xl mx-auto">
              Imagine acordar todos os dias sabendo <span className="text-brand-pink font-black">exatamente o que fazer</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
              <span className="text-brand-pink text-xl shrink-0">✕</span>
              <span className="text-base text-gray-700 font-semibold">Sem pesquisar receitas.</span>
            </div>
            <div className="flex items-center gap-3 bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
              <span className="text-brand-pink text-xl shrink-0">✕</span>
              <span className="text-base text-gray-700 font-semibold">Sem montar dieta.</span>
            </div>
            <div className="flex items-center gap-3 bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
              <span className="text-brand-pink text-xl shrink-0">✕</span>
              <span className="text-base text-gray-700 font-semibold">Sem ficar perdida.</span>
            </div>
            <div className="flex items-center gap-3 bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
              <span className="text-brand-pink text-xl shrink-0">✕</span>
              <span className="text-base text-gray-700 font-semibold">Sem recomeçar toda segunda-feira.</span>
            </div>
          </div>

          <div className="bg-brand-sage/40 border-2 border-dashed border-brand-green/20 rounded-2xl p-6 max-w-xl mx-auto text-center space-y-4">
            <p className="text-base md:text-lg text-brand-dark-green font-semibold">
              Você simplesmente abre o <strong className="text-brand-pink font-black text-lg">aplicativo</strong>...
            </p>
            <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">— OU —</p>
            <p className="text-base md:text-lg text-brand-dark-green font-semibold">
              o seu <strong className="text-brand-pink font-black text-lg">Caderno Oficial</strong>...
            </p>
            <div className="pt-2">
              <span className="inline-block bg-brand-green text-white font-extrabold text-lg md:text-xl px-8 py-3 rounded-full shadow-lg uppercase tracking-wide">
                🚀 e faz a missão do dia.
              </span>
            </div>
          </div>
        </section>

        {/* Dobra 4 - System & Delivery (Tudo o que você precisa já está pronto) */}
        <section className="bg-[#f2f7f3] text-gray-900 rounded-3xl p-6 md:p-12 shadow-xl border border-brand-green/10 relative overflow-hidden max-w-4xl mx-auto" id="system-ready-section">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-green/5 rounded-full blur-2xl"></div>

          <div className="text-center space-y-3 relative z-10">
            <span className="text-brand-green font-extrabold uppercase tracking-widest text-xs md:text-sm">
              Sem complicação e direto ao ponto
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto text-brand-dark-green">
              Tudo o que você precisa <span className="text-brand-green font-black">já está pronto</span>.
            </h2>
            <p className="text-brand-green font-extrabold text-sm md:text-base uppercase tracking-wider">
              Você não receberá apenas vídeos.
            </p>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto font-medium">
              Você receberá um sistema completo para acompanhar sua evolução durante os 15 dias.
            </p>
          </div>

          {/* Kit + App Image Mockup */}
          <div className="relative z-10 my-8 max-w-2xl mx-auto flex justify-center">
            <div className="relative group w-full">
              <div className="absolute inset-0 bg-brand-green/5 rounded-2xl filter blur-xl group-hover:blur-2xl transition duration-300"></div>
              <img 
                src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/07/8f490502-6887-410c-abfe-502e94ad7abc.png" 
                alt="Mockup do Kit + App Desafio Barriga Zero" 
                className="rounded-2xl shadow-2xl relative z-10 w-full h-auto object-cover border border-brand-green/10 transition-transform duration-300 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Formats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto relative z-10">
            {/* Format 1 - App */}
            <div className="bg-white border border-brand-green/10 rounded-2xl p-6 space-y-3 flex flex-col justify-start shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label="smartphone">📱</span>
                <h4 className="font-bold text-lg text-brand-dark-green uppercase tracking-wide">Aplicativo Barriga Zero</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Abra o aplicativo e siga a missão do dia.
              </p>
            </div>

            {/* Format 2 - Print */}
            <div className="bg-white border border-brand-green/10 rounded-2xl p-6 space-y-3 flex flex-col justify-start shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label="book">📖</span>
                <h4 className="font-bold text-lg text-brand-dark-green uppercase tracking-wide">Kit Oficial para Imprimir</h4>
              </div>
              <div className="space-y-1">
                <p className="text-brand-green font-extrabold text-xs uppercase tracking-wider">Prefere papel?</p>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  Baixe todos os materiais e acompanhe sua evolução à mão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Offer 1 */}
        <section className="text-center py-8 bg-white text-brand-dark-green rounded-3xl shadow-xl px-4 md:px-8 space-y-6 border-2 border-brand-gold max-w-xl mx-auto">
          <div className="text-brand-pink text-xs md:text-sm font-bold tracking-widest uppercase">
            ⚡ PREÇO DE LANÇAMENTO EXCLUSIVO ⚡
          </div>
          <div className="text-sm md:text-base text-gray-500 line-through font-medium">
            De R$ 97,00 por apenas
          </div>
          <div className="font-serif text-5xl md:text-6xl font-black text-brand-pink">
            R$ 27,00
          </div>
          <div className="text-xs md:text-sm font-bold bg-brand-sage text-brand-green inline-block px-4 py-1.5 rounded-full">
            Estratégias VÁLIDAS PARA APLICAR NA SUA ROTINA
          </div>
          
          <div className="pt-2">
            <a 
              href="https://chk.eduzz.com/118019"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('InitiateCheckout', { value: 27.00, currency: 'BRL', content_name: 'Desafio Barriga Zero' })}
              className="w-full bg-brand-green hover:bg-brand-green/95 text-white font-black py-4 rounded-2xl shadow-xl transition-all duration-200 text-base md:text-lg hover:shadow-2xl flex items-center justify-center gap-2 uppercase tracking-wide"
              id="btn-checkout-offer-1"
            >
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
              Quero meu Acesso agora
            </a>
          </div>

          <div className="text-brand-pink font-bold text-xs tracking-wider uppercase mt-2">
            ⚠️ NÃO É FÓRMULA MÁGICA
          </div>
          
          {/* Guarantee bubble */}
          <div className="bg-brand-sage/50 border border-brand-green/20 rounded-2xl p-4 max-w-md mx-auto text-xs md:text-sm text-brand-dark-green mt-2">
            <span className="font-extrabold text-brand-pink block text-sm mb-1">🛡️ Satisfação Garantida</span>
            Se você aplicar as estratégias durante 7 dias e não funcionar... <strong>Devolvo todo seu DINHEIRO!</strong>
          </div>
        </section>

        {/* Testimonials Block */}
        <section className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-center">
            O que as alunas estão dizendo...
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* IMAGEM 1 */}
            <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100 flex flex-col justify-between text-brand-dark-green hover:shadow-xl transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-pink/15 flex items-center justify-center font-bold text-brand-pink text-sm">G</div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark-green">Grupo do Desafio</h4>
                    <span className="text-xs bg-brand-pink/10 text-brand-pink font-semibold px-2 py-0.5 rounded-full">
                      Resultado do Desafio de 15 dias
                    </span>
                  </div>
                </div>

                {/* Real Screenshot with custom WhatsApp UI over top */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white group shadow-sm">
                  <img 
                    src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/07/imagem-do-whatsapp-de-2024-01-17-as-21.45.06_d370d5c2.jpg" 
                    alt="Depoimento 1 no WhatsApp"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* WhatsApp top bar cover to rename group and cover phone number */}
                  <div className="absolute top-0 left-0 right-0 h-[10.5%] bg-[#075e54] z-20 flex items-center justify-between px-3 py-1.5 border-b border-white/5 shadow-md">
                    <div className="flex items-center gap-1.5">
                      {/* Back arrow */}
                      <span className="text-white font-bold text-sm">←</span>
                      {/* Group Icon / Avatar */}
                      <div className="w-7 h-7 rounded-full bg-brand-pink/20 flex items-center justify-center font-bold text-white text-[11px] border border-white/20 shadow-inner">
                        🎯
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] md:text-xs font-black text-white tracking-wide leading-tight">Desafio Barriga Zero 💚</p>
                        <p className="text-[7.5px] md:text-[9px] text-emerald-100 font-medium">Você e +130 participantes</p>
                      </div>
                    </div>
                    {/* Fake icons to look authentic */}
                    <div className="flex items-center gap-3 text-white/90 text-xs pr-1">
                      <span>📞</span>
                      <span>⋮</span>
                    </div>
                  </div>

                  {/* Elegant solid/blur stickers to hide individual cell phone numbers if any */}
                  {/* Covering the first phone number: +55 45 9817-2969 (which is covered by the top bar, but we add a safety block at top-[1.2%] left-[10%] in case header loads offset) */}
                  <div className="absolute top-[1.2%] left-[10%] w-[42%] h-[3.8%] bg-white rounded-md z-30 flex items-center">
                    <span className="text-[9px] font-bold text-gray-500 pl-2">★ Aluna Desafio</span>
                  </div>
                  
                  {/* Covering the second phone number: +55 45 9817-2969 (precisely at 19.2% height) */}
                  <div className="absolute top-[19.2%] left-[10%] w-[42%] h-[3.8%] bg-white rounded-md z-30 flex items-center">
                    <span className="text-[9px] font-bold text-gray-500 pl-2">★ Aluna Desafio</span>
                  </div>

                  {/* Covering the third phone number: +55 11 94783-0408 (precisely at 88.5% height) */}
                  <div className="absolute top-[88.5%] left-[10%] w-[42%] h-[3.8%] bg-white rounded-md z-30 flex items-center">
                    <span className="text-[9px] font-bold text-gray-500 pl-2">★ Aluna Desafio</span>
                  </div>

                  {/* Visual Highlight Badge */}
                  <div className="absolute bottom-3 right-3 bg-brand-pink text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow uppercase tracking-wider z-[25]">
                    Mensagem Real 📸
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 mt-4 text-center">
                <span className="text-xs text-brand-green font-bold flex items-center justify-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Caso Real Verificado
                </span>
              </div>
            </div>

            {/* IMAGEM 2 */}
            <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100 flex flex-col justify-between text-brand-dark-green hover:shadow-xl transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green/15 flex items-center justify-center font-bold text-brand-green text-sm">A</div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark-green">Conversa com Aluna</h4>
                    <span className="text-xs bg-brand-pink/10 text-brand-pink font-semibold px-2 py-0.5 rounded-full">
                      Resultado do Desafio de 15 dias
                    </span>
                  </div>
                </div>

                {/* Real Screenshot with matching smartphone wrapper style */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white group shadow-sm">
                  <img 
                    src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/07/imagem-do-whatsapp-de-2023-12-20-as-07.14.11_3c5b6e8d.jpg" 
                    alt="Depoimento 2 no WhatsApp"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* WhatsApp top bar cover to make both testimonials perfectly symmetric */}
                  <div className="absolute top-0 left-0 right-0 h-[10.5%] bg-[#075e54] z-20 flex items-center justify-between px-3 py-1.5 border-b border-white/5 shadow-md">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold text-sm">←</span>
                      <div className="w-7 h-7 rounded-full bg-brand-pink/20 flex items-center justify-center font-bold text-white text-[11px] border border-white/20 shadow-inner">
                        👩
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] md:text-xs font-black text-white tracking-wide leading-tight">Aluna do Desafio 💚</p>
                        <p className="text-[7.5px] md:text-[9px] text-emerald-100 font-medium">Online</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/90 text-xs pr-1">
                      <span>📞</span>
                      <span>⋮</span>
                    </div>
                  </div>

                  {/* Visual Highlight Badge */}
                  <div className="absolute bottom-3 right-3 bg-brand-pink text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow uppercase tracking-wider">
                    Mensagem Real 📸
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 mt-4 text-center">
                <span className="text-xs text-brand-green font-bold flex items-center justify-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Caso Real Verificado
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Dobra 5 - What you will use during the 15 days (6 large cards) */}
        <section className="bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 space-y-8 max-w-4xl mx-auto" id="materials-section">
          <div className="text-center space-y-3">
            <span className="text-brand-pink font-extrabold uppercase tracking-widest text-xs md:text-sm">
              Sua caixa de ferramentas para o sucesso
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-dark-green tracking-tight leading-tight">
              O que você vai usar durante os próximos <span className="text-brand-pink font-black">15 dias</span>
            </h3>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
              Tudo desenvolvido de forma extremamente visual, simples e prazerosa para que você não desista no meio do caminho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - MAPA DOS 15 DIAS */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-brand-green/20 transition-all duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="calendar">📅</span>
                  <h4 className="font-bold text-base text-brand-dark-green uppercase tracking-wide">MAPA DOS 15 DIAS</h4>
                </div>
                <p className="text-xs text-brand-pink font-extrabold uppercase tracking-wide">Nunca mais fique perdida.</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Basta olhar qual é a missão de hoje e colocá-la em prática. Sem enrolação.
                </p>
              </div>
              
              {/* Image representing the MAP */}
              <div className="bg-emerald-950 text-white rounded-xl p-3 text-[10px] space-y-2 font-mono shadow-inner">
                <p className="text-center font-bold text-brand-gold text-[9px] uppercase tracking-wider border-b border-white/10 pb-1">🗺️ Mapa de Progresso</p>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`py-1 rounded border font-bold ${
                        i < 4 
                          ? 'bg-brand-pink border-brand-pink text-white' 
                          : i === 4 
                          ? 'bg-brand-gold border-brand-gold text-brand-dark-green animate-pulse' 
                          : 'bg-white/10 border-white/5 text-white/40'
                      }`}
                    >
                      D{i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-[8px] text-brand-cream/80 text-center italic mt-1">Hoje: Missão Dia 5 ✨</p>
              </div>
            </div>

            {/* Card 2 - CADERNO DE MISSÕES */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-brand-green/20 transition-all duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="notebook">📒</span>
                  <h4 className="font-bold text-base text-brand-dark-green uppercase tracking-wide">CADERNO DE MISSÕES</h4>
                </div>
                <p className="text-xs text-brand-pink font-extrabold uppercase tracking-wide">Controle diário prático.</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Anote seus hábitos, acompanhe seu progresso e celebre cada pequena conquista.
                </p>
              </div>

              {/* Image representing the CADERNO */}
              <div className="bg-white text-gray-800 rounded-xl p-3 border border-gray-200 text-[10px] space-y-1.5 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-2 w-0.5 h-full bg-red-100"></div>
                <div className="pl-4 space-y-1">
                  <p className="font-bold text-brand-green text-[9px] uppercase border-b border-gray-100 pb-0.5">📝 Missões Concluídas:</p>
                  <p className="flex items-center gap-1.5 text-gray-500 line-through">
                    <span className="text-brand-green font-bold">✓</span> Tomar 2L de água
                  </p>
                  <p className="flex items-center gap-1.5 text-gray-500 line-through">
                    <span className="text-brand-green font-bold">✓</span> Almoço Nutritivo
                  </p>
                  <p className="flex items-center gap-1.5 text-gray-700 font-medium">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm border border-gray-300"></span> Missão do Dia 5
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - GUIA ALIMENTAR */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-brand-green/20 transition-all duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="salad">🥗</span>
                  <h4 className="font-bold text-base text-brand-dark-green uppercase tracking-wide">GUIA ALIMENTAR</h4>
                </div>
                <p className="text-xs text-brand-pink font-extrabold uppercase tracking-wide">Coma sem culpa nem neuras.</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Um guia simples para ajudar você a montar refeições equilibradas sem depender de um cardápio engessado.
                </p>
              </div>

              {/* Image representing the GUIA ALIMENTAR */}
              <div className="bg-brand-sage/20 rounded-xl p-3 text-[10px] space-y-1 border border-brand-green/10">
                <p className="font-bold text-brand-dark-green text-[9px] uppercase">🍽️ Regra Prática do Prato:</p>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full w-[50%]" title="Vegetais e Legumes"></div>
                  <div className="bg-amber-500 h-full w-[25%]" title="Proteínas de qualidade"></div>
                  <div className="bg-yellow-400 h-full w-[25%]" title="Gorduras boas / Fibras"></div>
                </div>
                <div className="flex justify-between text-[8px] text-gray-500 pt-1 font-semibold">
                  <span>🟢 50% Salada</span>
                  <span>🟠 25% Prot</span>
                  <span>🟡 25% Fibras</span>
                </div>
              </div>
            </div>

            {/* Card 4 - FICHA DE MEDIDAS */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-brand-green/20 transition-all duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="ruler">📏</span>
                  <h4 className="font-bold text-base text-brand-dark-green uppercase tracking-wide">FICHA DE MEDIDAS</h4>
                </div>
                <p className="text-xs text-brand-pink font-extrabold uppercase tracking-wide">Métricas que importam.</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Veja sua evolução muito além da balança. Acompanhe a queima de gordura real no abdômen.
                </p>
              </div>

              {/* Image representing FICHA DE MEDIDAS */}
              <div className="bg-white rounded-xl p-3 border border-gray-100 text-[10px] space-y-1 shadow-sm font-sans">
                <div className="flex justify-between font-bold text-gray-700 border-b border-gray-100 pb-1 text-[9px]">
                  <span>Região</span>
                  <span>Início</span>
                  <span>Dia 15</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[9px] py-0.5">
                  <span>Balança</span>
                  <span>70,1 kg</span>
                  <span className="text-brand-green font-bold">68,4 kg</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[9px] py-0.5">
                  <span>Abdômen</span>
                  <span>113 cm</span>
                  <span className="text-brand-pink font-black">108 cm 🔥</span>
                </div>
              </div>
            </div>

            {/* Card 5 - CARTÃO ANTISSABOTAGEM */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-brand-green/20 transition-all duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="heart">❤️</span>
                  <h4 className="font-bold text-base text-brand-dark-green uppercase tracking-wide">CARTÃO ANTISSABOTAGEM</h4>
                </div>
                <p className="text-xs text-brand-pink font-extrabold uppercase tracking-wide">Seu escudo emocional.</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para aqueles dias em que a vontade de desistir aparecer. Um lembrete rápido do seu "porquê".
                </p>
              </div>

              {/* Image representing CARTÃO ANTISSABOTAGEM */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-3 text-[10px] text-center border border-pink-100 shadow-sm">
                <p className="font-serif italic text-brand-pink font-bold text-[9.5px] leading-relaxed">
                  "Você não falhou por ser imperfeita. Você vence hoje quando escolhe dar o próximo passo certo!"
                </p>
              </div>
            </div>

            {/* Card 6 - CERTIFICADO BARRIGA ZERO */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-brand-green/20 transition-all duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="trophy">🏆</span>
                  <h4 className="font-bold text-base text-brand-dark-green uppercase tracking-wide">CERTIFICADO BARRIGA ZERO</h4>
                </div>
                <p className="text-xs text-brand-pink font-extrabold uppercase tracking-wide">Coroe a sua vitória.</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para celebrar e marcar a sua conquista de ter concluído os 15 dias de dedicação com sucesso!
                </p>
              </div>

              {/* Image representing CERTIFICADO BARRIGA ZERO */}
              <div className="bg-[#fbfbfb] rounded-xl p-2.5 border-2 border-double border-brand-gold text-center text-[9px] shadow-sm">
                <p className="font-bold text-brand-dark-green uppercase tracking-wider text-[8px] mb-0.5">Certificado de Conclusão</p>
                <p className="text-gray-400 text-[7px] mb-1">Conferido com orgulho para:</p>
                <p className="font-serif text-brand-pink font-bold text-[10px] underline decoration-brand-gold/50">Sua Nova Versão ✨</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dobra 5.5 - Process Timeline (Você não precisa decorar nada) */}
        <section className="bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 relative overflow-hidden max-w-4xl mx-auto animate-fade-in" id="timeline-process-section">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-pink/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl"></div>
          
          <div className="text-center space-y-3 relative z-10">
            <span className="text-brand-green font-extrabold uppercase tracking-widest text-xs md:text-sm">
              Tranquilidade e Simplicidade
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-dark-green">
              Você <span className="text-brand-pink font-black">não precisa decorar</span> nada.
            </h3>
            <p className="text-gray-600 text-sm md:text-base font-medium max-w-xl mx-auto">
              Durante os próximos 15 dias, basta repetir este processo simples. Sem esforço mental.
            </p>
          </div>

          {/* Timeline Process Flow */}
          <div className="mt-8 relative z-10 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-stretch gap-1">
              
              {/* Step 1 */}
              <div className="bg-[#f2f7f3] border border-brand-green/10 rounded-2xl p-4 text-center space-y-2 flex-1 flex flex-col items-center justify-center min-w-[125px] transition-all hover:scale-105 shadow-sm">
                <span className="text-3xl" role="img" aria-label="smartphone">📱</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">Passo 1</span>
                <p className="text-xs font-extrabold leading-tight text-brand-dark-green">Abra o aplicativo</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-brand-pink font-black text-xl shrink-0 py-1">
                <span className="hidden md:inline">→</span>
                <span className="inline md:hidden">↓</span>
              </div>

              {/* Step 2 */}
              <div className="bg-[#f2f7f3] border border-brand-green/10 rounded-2xl p-4 text-center space-y-2 flex-1 flex flex-col items-center justify-center min-w-[125px] transition-all hover:scale-105 shadow-sm">
                <span className="text-3xl" role="img" aria-label="target">🎯</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">Passo 2</span>
                <p className="text-xs font-extrabold leading-tight text-brand-dark-green">Faça a missão</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-brand-pink font-black text-xl shrink-0 py-1">
                <span className="hidden md:inline">→</span>
                <span className="inline md:hidden">↓</span>
              </div>

              {/* Step 3 */}
              <div className="bg-[#f2f7f3] border border-brand-green/10 rounded-2xl p-4 text-center space-y-2 flex-1 flex flex-col items-center justify-center min-w-[125px] transition-all hover:scale-105 shadow-sm">
                <span className="text-3xl" role="img" aria-label="check-mark">✅</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">Passo 3</span>
                <p className="text-xs font-extrabold leading-tight text-brand-dark-green">Marque o check</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-brand-pink font-black text-xl shrink-0 py-1">
                <span className="hidden md:inline">→</span>
                <span className="inline md:hidden">↓</span>
              </div>

              {/* Step 4 */}
              <div className="bg-[#f2f7f3] border border-brand-green/10 rounded-2xl p-4 text-center space-y-2 flex-1 flex flex-col items-center justify-center min-w-[125px] transition-all hover:scale-105 shadow-sm">
                <span className="text-3xl" role="img" aria-label="relieved-face">😌</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">Passo 4</span>
                <p className="text-xs font-extrabold leading-tight text-brand-dark-green">Continue seu dia</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-brand-pink font-black text-xl shrink-0 py-1">
                <span className="hidden md:inline">→</span>
                <span className="inline md:hidden">↓</span>
              </div>

              {/* Step 5 */}
              <div className="bg-[#f2f7f3] border border-brand-green/10 rounded-2xl p-4 text-center space-y-2 flex-1 flex flex-col items-center justify-center min-w-[125px] transition-all hover:scale-105 shadow-sm">
                <span className="text-3xl" role="img" aria-label="celebration">🎉</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">Passo 5</span>
                <p className="text-xs font-extrabold leading-tight text-brand-dark-green">Veja sua evolução</p>
              </div>

            </div>
          </div>

          <div className="text-center pt-6 relative z-10 max-w-md mx-auto">
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Esta estrutura de checklist de passos simples elimina o peso mental. Você não está apenas adquirindo informações soltas, você está conquistando <strong className="text-brand-green uppercase tracking-wider font-extrabold">tranquilidade</strong>.
            </p>
          </div>
        </section>

        {/* Dobra 6 - Prova Social Renovada */}
        <section className="bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 space-y-8 max-w-4xl mx-auto" id="students-proof-section">
          <div className="text-center space-y-3">
            <span className="text-brand-pink font-extrabold uppercase tracking-widest text-xs md:text-sm">
              Mais de 130 mulheres já aplicaram e comprovaram 🌟
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-dark-green tracking-tight leading-tight">
              Elas também começaram pelo <span className="text-brand-pink font-black">Dia 1</span>.
            </h3>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              No começo elas tinham exatamente as mesmas dúvidas que você. Hoje comemoram resultados que pareciam impossíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Testimonial 1 - Whatsapp Juh */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-sage flex items-center justify-center font-bold text-brand-green text-sm">J</div>
                  <div>
                    <span className="font-bold block text-sm text-brand-dark-green">Juliana</span>
                    <span className="text-[10px] text-gray-400">Aluna do desafio</span>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white group max-h-[160px]">
                  <img 
                    src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/07/imagem-do-whatsapp-de-2023-12-20-as-07.14.10_cbc64803.jpg" 
                    alt="Resultado de Juliana no WhatsApp"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover object-top"
                  />
                  {/* WhatsApp top bar cover to rename contact and cover phone number */}
                  <div className="absolute top-0 left-0 right-0 h-[17%] bg-[#075e54]/95 backdrop-blur-md z-20 flex items-center justify-between px-3 py-1 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20 shadow-inner shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                          alt="Juliana" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] font-bold text-white tracking-wide">Juliana - Desafio</p>
                        <p className="text-[6px] text-emerald-200 font-medium flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-brand-pink text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                    Mensagem Real 📸
                  </div>
                </div>
              </div>
              <div className="bg-brand-sage/20 rounded-xl p-3 text-center border border-brand-green/10">
                <span className="font-extrabold text-brand-pink text-xs block uppercase tracking-wide">Ela eliminou 6cm de abdômen em 15 dias!</span>
              </div>
            </div>

            {/* Testimonial 2 - Mother's WhatsApp */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/15 flex items-center justify-center font-bold text-brand-pink text-sm">C</div>
                  <div>
                    <span className="font-bold block text-sm text-brand-dark-green">Cleuza (Mãe da Nutri)</span>
                    <span className="text-[10px] text-gray-400">69 anos, aplicando o método</span>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white group max-h-[160px]">
                  <img 
                    src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/07/imagem-do-whatsapp-de-2023-12-20-as-07.14.10_fd170f53.jpg" 
                    alt="Resultado da Mãe no WhatsApp"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover object-top"
                  />
                  {/* WhatsApp top bar cover to rename contact and cover phone number */}
                  <div className="absolute top-0 left-0 right-0 h-[17%] bg-[#075e54]/95 backdrop-blur-md z-20 flex items-center justify-between px-3 py-1 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-brand-pink/20 flex items-center justify-center font-bold text-brand-pink text-[9px] border border-white/20 shadow-inner shrink-0 text-white">C</div>
                      <div className="text-left">
                        <p className="text-[8px] font-bold text-white tracking-wide">Cleuza - Desafio</p>
                        <p className="text-[6px] text-emerald-200 font-medium flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-brand-pink text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                    Mensagem Real 📸
                  </div>
                </div>
              </div>
              <div className="bg-brand-sage/20 rounded-xl p-3 text-center border border-brand-green/10 text-xs">
                <span className="font-bold text-brand-dark-green block uppercase tracking-wide">Perdeu 1,7kg e eliminou 5cm de abdômen!</span>
              </div>
            </div>
          </div>

          {/* Social Proof Context Counter */}
          <div className="bg-brand-sage/25 border border-brand-green/10 rounded-2xl p-5 text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs md:text-sm text-brand-dark-green font-extrabold uppercase tracking-wide">
              🔥 Este desafio já foi aplicado por mais de 130 mulheres
            </p>
            <p className="text-xs text-gray-600 font-medium">
              Não se trata de sorte. Trata-se de seguir uma estrutura que funciona para corpos reais, rotinas reais e idades reais.
            </p>
          </div>
        </section>

        {/* Dobra 7 - Dobra Emocional (Imagine você...) */}
        <section className="bg-brand-cream text-brand-dark-green rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden border border-brand-gold/20 max-w-4xl mx-auto" id="emotional-projection-section">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl"></div>

          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <div className="text-center space-y-2">
              <span className="text-brand-pink font-extrabold uppercase tracking-widest text-xs md:text-sm">
                Sua Nova Realidade
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-dark-green tracking-tight leading-tight">
                Imagine você daqui a <span className="text-brand-pink font-black">15 dias...</span>
              </h3>
              <p className="text-gray-600 text-sm md:text-base font-medium">
                Feche os olhos por um segundo e sinta os resultados que estão logo ali na frente:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Point 1 */}
              <div className="bg-white/85 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]">
                <span className="text-3xl shrink-0" role="img" aria-label="jeans">👖</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-brand-dark-green text-sm uppercase tracking-wide">Roupa confortável</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Vestindo uma roupa que hoje está apertada e sentindo ela cair com leveza.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white/85 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]">
                <span className="text-3xl shrink-0" role="img" aria-label="smiling-face">😊</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-brand-dark-green text-sm uppercase tracking-wide">Leveza e bem-estar</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Sentindo muito menos inchaço e muito mais energia para encarar o seu dia.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white/85 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]">
                <span className="text-3xl shrink-0" role="img" aria-label="camera">📸</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-brand-dark-green text-sm uppercase tracking-wide">Liberdade nas fotos</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tirando fotos sem precisar se esconder da câmera ou esconder a sua barriga.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="bg-white/85 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]">
                <span className="text-3xl shrink-0" role="img" aria-label="heart">💚</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-brand-dark-green text-sm uppercase tracking-wide">Orgulho de conseguir</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Orgulhosa por finalmente ter conseguido seguir um plano até o fim e celebrar sua vitória.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="inline-block bg-brand-pink text-white font-extrabold text-xs md:text-sm px-5 py-2 rounded-full uppercase tracking-wider animate-pulse shadow">
                Sua mente está pronta. Agora é hora de dar o próximo passo.
              </span>
            </div>
          </div>
        </section>

        {/* Dobra 8 - Oferta Reestruturada e Percepção de Valor */}
        <section className="space-y-8 max-w-4xl mx-auto" id="final-offer-section">
          
          {/* Main Title of Offer */}
          <div className="text-center space-y-2">
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-dark-green tracking-tight leading-tight">
              Seu <span className="text-brand-pink font-black">Kit Oficial Barriga Zero™</span> inclui:
            </h3>
            <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto font-medium">
              Todo o método compilado em um ecossistema integrado para que você não precise pensar, apenas executar.
            </p>
          </div>

          {/* Value Perception Table (Kit Oficial Barriga Zero™ Bundle) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-green/10 shadow-2xl space-y-4">
            <div className="max-w-xl mx-auto bg-[#f2f7f3] rounded-2xl p-5 text-xs md:text-sm space-y-4 border border-brand-green/10 shadow-inner">
              
              {/* Highlight Kit Package */}
              <div className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-extrabold text-brand-pink text-sm md:text-base uppercase flex items-center gap-1.5">
                      <span>🎁</span> Kit Oficial Barriga Zero™
                    </h5>
                    <ul className="text-[11px] text-gray-700 list-disc list-inside space-y-1 mt-2 pl-2 font-medium">
                      <li>App Interativo completo</li>
                      <li>Kit Oficial para Impressão de alta qualidade</li>
                      <li>Mapa Visual Prático dos 15 Dias</li>
                      <li>Caderno de Missões e Controle de hábitos</li>
                      <li>Guia Alimentar de Substituições</li>
                      <li>Ferramentas interativas de acompanhamento</li>
                    </ul>
                  </div>
                  <span className="text-gray-400 line-through font-bold text-xs md:text-sm">R$ 197,00</span>
                </div>
              </div>

              {/* Total Accumulated Value */}
              <div className="flex justify-between items-center pt-2 font-black text-brand-green text-xs md:text-sm uppercase tracking-wider border-t border-brand-green/10">
                <span>VALOR DO KIT COMPLETO:</span>
                <span className="line-through text-red-500">R$ 197,00</span>
              </div>
            </div>
          </div>

          {/* Proposal, Price & Core Checkout Card */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h4 className="font-serif text-2xl md:text-3xl font-bold text-brand-pink">A proposta é simples e clara...</h4>
              <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed text-gray-700 font-medium">
                Sua chance de eliminar até 3 cm de abdômen em 15 dias. Um passo a passo prático que você pode usar com acesso vitalício, sem mensalidades nem pegadinhas!
              </p>
            </div>

            <div className="bg-brand-pink/20 border border-brand-pink/30 p-4 rounded-2xl max-w-xl mx-auto font-black text-xs md:text-sm text-brand-pink uppercase tracking-wide">
              HOJE VOCÊ ADQUIRE TUDO POR UM VALOR EXCEPCIONAL
            </div>

            {/* Core Pricing & Checkout Button Box */}
            <div className="bg-white text-brand-dark-green rounded-3xl p-6 md:p-8 max-w-md mx-auto shadow-2xl border-4 border-brand-gold space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-pink text-white font-black text-[10px] uppercase px-4 py-1.5 rounded-full tracking-widest shadow-md">
                Acesso Vitalício 💎
              </div>
              
              <div className="text-center space-y-1 pt-2">
                <h4 className="text-lg font-black text-brand-green uppercase tracking-wide">KIT OFICIAL BARRIGA ZERO™</h4>
                <p className="text-xs text-gray-400 line-through font-bold">De R$ 197,00 por apenas</p>
                <p className="font-serif text-5xl font-black text-brand-pink">R$ 27,00</p>
                <p className="text-[10px] text-gray-500 font-extrabold mt-1">Pagamento único • Sem tarifas ocultas</p>
              </div>

              {/* Verified Checklist Item Box */}
              <div className="bg-brand-sage/10 rounded-2xl p-4 border border-brand-green/10">
                <p className="text-xs font-black text-brand-green text-left uppercase tracking-wider mb-2.5 border-b border-brand-green/10 pb-1">
                  Seu Kit Completo Contém:
                </p>
                <ul className="text-left text-xs md:text-sm space-y-2.5 text-brand-dark-green font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Aplicativo completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Kit Oficial para impressão</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Mapa dos 15 Dias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Caderno de Missões</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Guia Alimentar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Ficha de Medidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green font-black">✔</span>
                    <span>Cartão Antissabotagem</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://chk.eduzz.com/118019"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('InitiateCheckout', { value: 27.00, currency: 'BRL', content_name: 'Desafio Barriga Zero' })}
                className="w-full bg-brand-green hover:bg-brand-green/95 text-white font-black py-4 rounded-2xl shadow-xl transition-all duration-200 text-base md:text-lg hover:shadow-2xl flex items-center justify-center gap-2 uppercase tracking-wide"
                id="btn-checkout-card"
              >
                <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                Quero meu Kit Oficial agora
              </a>

              {/* Security sub-badges */}
              <div className="grid grid-cols-3 gap-1 bg-brand-sage p-2 rounded-xl text-[9px] font-bold text-brand-green text-center">
                <div>🛡️ Checkout Seguro</div>
                <div>✨ Satisfação Garantida</div>
                <div>🔒 Privacidade Protegida</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nutri Intro */}
        <section className="bg-white text-gray-900 rounded-3xl p-6 md:p-8 space-y-6 border border-brand-green/10 shadow-xl">
          <div className="text-center space-y-1">
            <span className="text-xs tracking-wider uppercase text-brand-green font-extrabold">Conheça sua nutri</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark-green">Nutricionista Andréia Vaz</h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 max-w-2xl mx-auto">
            <img 
              src="https://andreiavaz846109688.wordpress.com/wp-content/uploads/2026/04/unnamed-9.jpg" 
              alt="Andréia Vaz" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-brand-pink/30 shadow-lg"
              referrerPolicy="no-referrer"
              id="img-nutri-portrait"
            />
            <div className="space-y-4 text-center md:text-left text-sm text-gray-700 leading-relaxed">
              <p className="font-bold text-brand-pink text-base">Oi, eu sou Andréia Vaz</p>
              <p>
                Estou aqui para compartilhar minha jornada e experiência como nutricionista clínica e analista comportamental da obesidade.
              </p>
              <p>
                Desde 2006, venho conduzindo atendimentos nutricionais e, ao longo desse tempo, ajudei milhares de pessoas a alcançarem seus objetivos de perda de peso de maneira descomplicada e sustentável.
              </p>
              <p className="font-serif italic text-brand-pink font-semibold">
                "A nutrição não cura tudo, mas sem nutrição, não cura nada. Emagrecer não deve ser um castigo, e sim um caminho de liberdade e saúde."
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-center">
            Dúvidas Frequentes
          </h3>

          <div className="space-y-3 max-w-2xl mx-auto">
            {FAQ_LIST.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white text-brand-dark-green rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left p-4 md:p-5 font-bold text-xs md:text-sm flex justify-between items-center hover:bg-gray-50 transition duration-150"
                  id={`btn-faq-toggle-${index}`}
                >
                  <span>{faq.question}</span>
                  <HelpCircle className={`w-4 h-4 text-brand-green shrink-0 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="p-4 md:p-5 bg-brand-sage/20 text-xs md:text-sm border-t border-gray-50 leading-relaxed text-gray-700 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Security / Quality Disclaimer */}
        <footer className="text-center space-y-6 py-6 border-t border-brand-green/10 text-xs text-gray-500">
          <div className="flex justify-center gap-6 max-w-xs mx-auto">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-brand-pink" /> Conexão Segura</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-brand-pink" /> Garantia 7 Dias</span>
          </div>
          <p className="leading-relaxed">
            © {new Date().getFullYear()} Desafio Barriga Zero - Nutricionista Andréia Vaz (CRN8 3188). Todos os direitos reservados.
            <br />
            Responsável Técnica: Andréia Vaz • Nutricionista Clínica, Coach de Emagrecimento e Analista Comportamental da Obesidade.
            <br />
            Este material destina-se a fins informativos. Consulte sempre seu profissional de saúde antes de iniciar mudanças alimentares.
          </p>
        </footer>

      </div>
    </div>
  );
}
