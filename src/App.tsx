import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import SalesLandingPage from './components/SalesLandingPage';
import CheckoutForm from './components/CheckoutForm';
import StudentDashboard from './components/StudentDashboard';
import { CheckCircle, ShieldCheck, Play, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { initPixel, trackEvent } from './lib/metaPixel';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: ''
  });

  // Load student credentials from localStorage if already simulated, and initialize Pixel
  useEffect(() => {
    // Initialize standard Meta Pixel
    initPixel();

    const savedName = localStorage.getItem('barriga_zero_student_name');
    const savedEmail = localStorage.getItem('barriga_zero_student_email');
    if (savedName && savedEmail) {
      setStudentInfo({ name: savedName, email: savedEmail });
    }
  }, []);

  const handleCheckoutSuccess = (name: string, email: string) => {
    setStudentInfo({ name, email });
    localStorage.setItem('barriga_zero_student_name', name);
    localStorage.setItem('barriga_zero_student_email', email);
    
    // Track successful simulated Purchase with Meta Pixel and CAPI
    trackEvent('Purchase', {
      email,
      value: 27.00,
      currency: 'BRL',
      content_name: 'Desafio Barriga Zero'
    });

    setView('welcome');
  };

  const handleLogout = () => {
    // Return back to sales page, keep name stored for easy testing or clear it
    setView('landing');
  };

  // Mockup image generated inside project assets
  const mockupImgUrl = '/src/assets/images/desafio_mockup_1783370194277.jpg';

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark-green antialiased font-sans transition-colors duration-300">
      
      {/* View routing router */}
      {view === 'landing' && (
        <SalesLandingPage 
          onStartCheckout={() => setView('checkout')}
          onPreviewApp={() => {
            // If they haven't put a name yet, give a mock student name
            if (!studentInfo.name) {
              setStudentInfo({ name: 'Maria de Souza (Demonstração)', email: 'maria@exemplo.com' });
            }
            setView('app');
          }}
          mockupImgUrl={mockupImgUrl}
        />
      )}

      {view === 'checkout' && (
        <CheckoutForm 
          onBack={() => setView('landing')}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {view === 'welcome' && (
        <div className="min-h-screen bg-brand-green text-brand-cream flex items-center justify-center py-10 px-4">
          <div className="max-w-md w-full bg-white text-brand-dark-green rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 border-4 border-brand-gold animate-fade-in text-center">
            
            <div className="flex justify-center">
              <div className="bg-brand-sage p-3 rounded-full text-brand-green animate-pulse">
                <CheckCircle className="w-12 h-12 fill-brand-green/20" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-brand-pink font-bold text-[10px] tracking-widest uppercase block">PAGAMENTO CONFIRMADO!</span>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-green leading-tight">
                Seja muito bem-vinda, {studentInfo.name.split(' ')[0]}!
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                Seu acesso completo ao <strong>Desafio Barriga Zero</strong> está liberado! Enviamos as credenciais de acesso também no e-mail <strong>{studentInfo.email}</strong>.
              </p>
            </div>

            <div className="bg-brand-sage/40 rounded-2xl p-4 border border-brand-green/10 text-left space-y-2.5 text-xs">
              <p className="font-bold text-brand-green uppercase tracking-wider text-[10px] text-center border-b border-gray-200 pb-1.5">
                ⚡ TUDO ISSO JÁ ESTÁ LIBERADO PRA VOCÊ:
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <span>🗺️ O Mapa Completo dos 15 Dias</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <span>📓 Caderno de Missões Diárias Interativo</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <span>🍽️ Guia Completo "O Que Comer"</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <span>💛 Cartão Antissabotagem de Bolso</span>
              </div>
            </div>

            <button 
              onClick={() => setView('app')}
              className="w-full bg-brand-green hover:bg-brand-green/95 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition duration-200 text-sm md:text-base tracking-wide flex items-center justify-center gap-2 group"
              id="btn-access-app"
            >
              <Play className="w-4 h-4 text-brand-gold fill-brand-gold group-hover:scale-110 transition" />
              Entrar no Desafio Barriga Zero
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-gray-400 italic">
              Você já está conectada no seu dispositivo. Divirta-se!
            </p>
          </div>
        </div>
      )}

      {view === 'app' && (
        <StudentDashboard 
          studentName={studentInfo.name}
          studentEmail={studentInfo.email}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}
