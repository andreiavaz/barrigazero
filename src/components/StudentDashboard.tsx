import React, { useState, useEffect } from 'react';
import { AppTab, DailyMissionState, MeasurementsState, WaterLog } from '../types';
import { MISSIONS_DATA, FOOD_GUIDE, DailyMissionData } from '../data';
import { 
  CheckCircle, 
  Map, 
  BookOpen, 
  Activity, 
  Heart, 
  Award, 
  Trash2, 
  Plus, 
  Coffee, 
  Flame, 
  Printer, 
  Droplet,
  ChevronRight,
  ArrowLeft,
  Smartphone,
  Save,
  CheckCircle2,
  RefreshCw,
  LogOut
} from 'lucide-react';

interface StudentDashboardProps {
  studentName: string;
  studentEmail: string;
  onLogout: () => void;
}

export default function StudentDashboard({ studentName, studentEmail, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<AppTab>('map');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [nameForCertificate, setNameForCertificate] = useState(studentName || 'Andréia de Souza');

  // Load interactive state from localStorage or set defaults
  const [missionState, setMissionState] = useState<DailyMissionState>(() => {
    const saved = localStorage.getItem('barriga_zero_missions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return { completedTasks: {}, notes: {} };
  });

  const [measurements, setMeasurements] = useState<MeasurementsState>(() => {
    const saved = localStorage.getItem('barriga_zero_measurements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      day1: { peso: '', cintura: '', quadril: '' },
      day15: { peso: '', cintura: '', quadril: '' },
      conquistas: '',
      photoBefore: null,
      photoAfter: null
    };
  });

  const [waterLog, setWaterLog] = useState<WaterLog>(() => {
    const saved = localStorage.getItem('barriga_zero_water');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return { target: 2100, consumed: 0, logs: [] };
  });

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('barriga_zero_missions', JSON.stringify(missionState));
  }, [missionState]);

  useEffect(() => {
    localStorage.setItem('barriga_zero_measurements', JSON.stringify(measurements));
  }, [measurements]);

  useEffect(() => {
    localStorage.setItem('barriga_zero_water', JSON.stringify(waterLog));
  }, [waterLog]);

  // Handle task check toggles
  const toggleTask = (dayNum: number, taskIdx: number) => {
    setMissionState(prev => {
      const dayTasks = { ...(prev.completedTasks[dayNum] || {}) };
      dayTasks[taskIdx] = !dayTasks[taskIdx];
      return {
        ...prev,
        completedTasks: {
          ...prev.completedTasks,
          [dayNum]: dayTasks
        }
      };
    });
  };

  // Handle daily notes change
  const handleNoteChange = (dayNum: number, key: string, val: string) => {
    setMissionState(prev => {
      const dayNotes = { ...(prev.notes[dayNum] || {}) };
      dayNotes[key] = val;
      return {
        ...prev,
        notes: {
          ...prev.notes,
          [dayNum]: dayNotes
        }
      };
    });
  };

  // Get total tasks count and completed tasks count
  const getProgressStats = () => {
    let total = 0;
    let completed = 0;
    
    // Check total days
    MISSIONS_DATA.forEach(day => {
      day.tasks.forEach((_, idx) => {
        total++;
        if (missionState.completedTasks[day.dayNum]?.[idx]) {
          completed++;
        }
      });
    });

    return { total, completed, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const { total, completed, pct } = getProgressStats();

  // Reset progress for testing
  const handleResetProgress = () => {
    if (window.confirm('Deseja realmente resetar todo o seu progresso no Desafio?')) {
      setMissionState({ completedTasks: {}, notes: {} });
      setWaterLog({ target: 2100, consumed: 0, logs: [] });
      setMeasurements({
        day1: { peso: '', cintura: '', quadril: '' },
        day15: { peso: '', cintura: '', quadril: '' },
        conquistas: '',
        photoBefore: null,
        photoAfter: null
      });
    }
  };

  // Handle water changes
  const addWater = (amount: number) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWaterLog(prev => ({
      ...prev,
      consumed: prev.consumed + amount,
      logs: [
        { id: Math.random().toString(), time: now, amount },
        ...prev.logs
      ]
    }));
  };

  const clearWater = () => {
    setWaterLog(prev => ({ ...prev, consumed: 0, logs: [] }));
  };

  const handleWeightChangeForWater = (weight: number) => {
    const target = weight > 0 ? Math.round(weight * 35) : 2100;
    setWaterLog(prev => ({ ...prev, target }));
  };

  // Check if a day is fully completed
  const isDayCompleted = (dayNum: number) => {
    const dayData = MISSIONS_DATA.find(d => d.dayNum === dayNum);
    if (!dayData) return false;
    const completedTasks = missionState.completedTasks[dayNum] || {};
    return dayData.tasks.every((_, idx) => completedTasks[idx] === true);
  };

  // Print/Download certificate mock
  const handlePrintCertificate = () => {
    window.print();
  };

  // Demo simulate photos
  const handleSimulatePhoto = (type: 'before' | 'after') => {
    const urls = {
      before: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=300',
      after: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=300'
    };
    setMeasurements(prev => ({
      ...prev,
      [type === 'before' ? 'photoBefore' : 'photoAfter']: urls[type]
    }));
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark-green font-sans flex flex-col justify-between">
      
      {/* Member App Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="bg-brand-green text-white p-2 rounded-xl">
              <Award className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <span className="text-[10px] text-brand-green font-bold uppercase tracking-widest block">Área de Alunas</span>
              <h1 className="font-serif italic font-bold text-sm md:text-base leading-tight text-brand-green">Desafio Barriga Zero</h1>
            </div>
          </div>

          {/* Progress widget */}
          <div className="hidden md:flex items-center gap-3 bg-brand-sage/40 px-3 py-1.5 rounded-2xl border border-brand-green/10 text-xs">
            <div className="text-left">
              <span className="font-semibold block text-[10px] text-gray-500 uppercase">Seu Progresso</span>
              <span className="font-bold text-brand-green">{completed} de {total} missões</span>
            </div>
            <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-green h-full" style={{ width: `${pct}%` }}></div>
            </div>
            <span className="font-bold text-brand-green">{pct}%</span>
          </div>

          {/* User badge / log out */}
          <div className="flex items-center gap-2 text-xs">
            <div className="text-right">
              <span className="font-bold block text-gray-800">{studentName || 'Aluna Vip'}</span>
              <span className="text-[9px] text-gray-400 font-mono">Acesso Vitalício</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-1.5 text-gray-400 hover:text-brand-pink hover:bg-red-50 rounded-lg transition"
              title="Voltar para a Página de Vendas"
              id="btn-app-logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selector Nav */}
        <nav className="max-w-4xl mx-auto px-2 overflow-x-auto flex border-t border-gray-100 divide-x divide-gray-100 text-xs">
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex-1 min-w-[70px] py-3 px-2 text-center flex flex-col items-center gap-1.5 transition font-semibold ${
              activeTab === 'map' ? 'text-brand-green bg-brand-sage/30 border-b-2 border-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
            id="tab-map"
          >
            <Map className="w-4 h-4" />
            <span>🗺️ O Mapa</span>
          </button>
          <button 
            onClick={() => setActiveTab('missions')}
            className={`flex-1 min-w-[75px] py-3 px-2 text-center flex flex-col items-center gap-1.5 transition font-semibold ${
              activeTab === 'missions' ? 'text-brand-green bg-brand-sage/30 border-b-2 border-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
            id="tab-missions"
          >
            <BookOpen className="w-4 h-4" />
            <span>📓 Caderno</span>
          </button>
          <button 
            onClick={() => setActiveTab('food')}
            className={`flex-1 min-w-[75px] py-3 px-2 text-center flex flex-col items-center gap-1.5 transition font-semibold ${
              activeTab === 'food' ? 'text-brand-green bg-brand-sage/30 border-b-2 border-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
            id="tab-food"
          >
            <Coffee className="w-4 h-4" />
            <span>🍽️ Alimentação</span>
          </button>
          <button 
            onClick={() => setActiveTab('sabotage')}
            className={`flex-1 min-w-[80px] py-3 px-2 text-center flex flex-col items-center gap-1.5 transition font-semibold ${
              activeTab === 'sabotage' ? 'text-brand-green bg-brand-sage/30 border-b-2 border-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
            id="tab-sabotage"
          >
            <Heart className="w-4 h-4" />
            <span>💛 Antissabote</span>
          </button>
          <button 
            onClick={() => setActiveTab('metrics')}
            className={`flex-1 min-w-[75px] py-3 px-2 text-center flex flex-col items-center gap-1.5 transition font-semibold ${
              activeTab === 'metrics' ? 'text-brand-green bg-brand-sage/30 border-b-2 border-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
            id="tab-metrics"
          >
            <Activity className="w-4 h-4" />
            <span>📏 Medidas</span>
          </button>
          <button 
            onClick={() => setActiveTab('certificate')}
            className={`flex-1 min-w-[75px] py-3 px-2 text-center flex flex-col items-center gap-1.5 transition font-semibold ${
              activeTab === 'certificate' ? 'text-brand-green bg-brand-sage/30 border-b-2 border-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
            id="tab-certificate"
          >
            <Award className="w-4 h-4" />
            <span>🎯 Certificado</span>
          </button>
        </nav>
      </header>

      {/* Main dashboard body content */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-6 md:py-8">
        
        {/* TAB 1: O MAPA DOS 15 DIAS */}
        {activeTab === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-brand-green text-brand-cream rounded-3xl p-5 md:p-6 space-y-2 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl"></div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider block">🗺️ Roteiro de Emagrecimento</span>
              <h2 className="font-serif text-xl md:text-2xl font-bold">O Mapa dos 15 Dias</h2>
              <p className="text-xs text-brand-cream/80 max-w-md mx-auto">
                Clique em qualquer dia do mapa abaixo para abrir a missão diária e começar a realizar suas tarefas. Complete cada missão para desinchar!
              </p>
            </div>

            {/* Grid 15 Days Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {MISSIONS_DATA.map((day) => {
                const completed = isDayCompleted(day.dayNum);
                return (
                  <button
                    key={day.dayNum}
                    onClick={() => {
                      setSelectedDay(day.dayNum);
                      setActiveTab('missions');
                    }}
                    className={`p-4 rounded-2xl text-left border relative transition group hover:-translate-y-1 ${
                      completed 
                        ? 'bg-brand-sage/50 border-brand-green text-brand-dark-green shadow-sm' 
                        : selectedDay === day.dayNum
                          ? 'bg-white border-brand-gold text-brand-dark-green shadow-md'
                          : 'bg-white border-gray-100 hover:border-brand-green/30 text-brand-dark-green shadow-sm'
                    }`}
                    id={`btn-map-day-${day.dayNum}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        completed ? 'bg-brand-green/15 text-brand-green' : 'bg-gray-100 text-gray-500'
                      }`}>
                        Dia {day.dayNum.toString().padStart(2, '0')}
                      </span>
                      {completed && <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 fill-brand-green/20" />}
                    </div>
                    <h3 className="font-bold text-xs md:text-sm line-clamp-1 group-hover:text-brand-green transition-colors">{day.title}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 italic">
                      {day.tasks.length} Tarefas
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Help tip */}
            <div className="bg-brand-sage/30 border border-brand-green/10 p-4 rounded-2xl text-xs flex justify-between items-center gap-3">
              <p className="text-gray-600">
                ⭐ Conclua todas as tarefas dos 15 dias de missões para liberar seu <strong>Certificado Barriga Zero</strong> autografado!
              </p>
              <button 
                onClick={handleResetProgress}
                className="text-gray-400 hover:text-brand-pink text-[10px] underline shrink-0 flex items-center gap-1 font-mono"
              >
                <RefreshCw className="w-3 h-3" /> Resetar
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CADERNO DE MISSÕES */}
        {activeTab === 'missions' && (
          <div className="space-y-6 animate-fade-in">
            {/* Day Selector Slider */}
            <div className="bg-white rounded-2xl p-3 border border-gray-150 shadow-sm flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-bold uppercase text-brand-green shrink-0 px-2">DIAS:</span>
              {MISSIONS_DATA.map((day) => {
                const comp = isDayCompleted(day.dayNum);
                return (
                  <button
                    key={day.dayNum}
                    onClick={() => setSelectedDay(day.dayNum)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs shrink-0 flex items-center justify-center transition ${
                      selectedDay === day.dayNum
                        ? 'bg-brand-green text-white shadow'
                        : comp
                          ? 'bg-brand-sage text-brand-green border border-brand-green/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    id={`btn-mission-day-select-${day.dayNum}`}
                  >
                    {day.dayNum}
                  </button>
                );
              })}
            </div>

            {/* Mission Card Display */}
            {(() => {
              const day = MISSIONS_DATA.find(d => d.dayNum === selectedDay);
              if (!day) return null;
              const completedDay = isDayCompleted(day.dayNum);

              return (
                <div className="space-y-6">
                  
                  {/* Title Box */}
                  <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="bg-brand-pink text-white font-bold text-[10px] tracking-wider px-3 py-1 rounded-full uppercase">
                        ACELERADORA • 15 DIAS
                      </span>
                      <span className="font-serif italic font-bold text-sm text-brand-green">
                        Desafio Barriga Zero • Dia {day.dayNum.toString().padStart(2, '0')} de 15
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-green">
                      {day.title}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {day.description}
                    </p>

                    {day.quote && (
                      <div className="border-l-4 border-brand-pink pl-3 italic text-xs text-brand-pink bg-brand-pink/5 py-1.5 rounded-r-lg">
                        "{day.quote}"
                      </div>
                    )}
                  </div>

                  {/* Tasks Box */}
                  <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-4">
                    <h3 className="font-bold text-xs md:text-sm text-brand-green uppercase tracking-wide flex items-center gap-2 border-b border-gray-100 pb-2">
                      <CheckCircle className="w-4 h-4" />
                      Sua Missão de Hoje
                    </h3>

                    <div className="space-y-3">
                      {day.tasks.map((task, idx) => {
                        const isTaskCompleted = missionState.completedTasks[day.dayNum]?.[idx] || false;
                        return (
                          <label 
                            key={idx}
                            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                              isTaskCompleted 
                                ? 'bg-brand-sage/20 border-brand-green/30 text-brand-dark-green' 
                                : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={isTaskCompleted}
                              onChange={() => toggleTask(day.dayNum, idx)}
                              className="w-4.5 h-4.5 rounded border-gray-300 text-brand-green focus:ring-brand-green shrink-0 mt-0.5 accent-brand-green"
                              id={`checkbox-day-${day.dayNum}-task-${idx}`}
                            />
                            <span className="text-xs md:text-sm font-medium">{task}</span>
                          </label>
                        );
                      })}
                    </div>

                    {completedDay && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs py-3 px-4 rounded-xl font-bold flex items-center gap-2 animate-bounce mt-2">
                        <span>✨</span>
                        <span>Parabéns! Você concluiu com sucesso todas as missões do Dia {day.dayNum}! Continue firme.</span>
                      </div>
                    )}
                  </div>

                  {/* Custom Recipe Display if Dia 2 */}
                  {day.recipe && (
                    <div className="bg-[#fdfbf7] rounded-3xl p-5 md:p-6 border border-brand-gold/30 shadow-md space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🍎</span>
                        <h4 className="font-serif text-lg font-bold text-brand-green">{day.recipe.title}</h4>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                          <p className="font-bold text-brand-pink uppercase tracking-wider text-[10px]">Ingredientes</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {day.recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <p className="font-bold text-brand-pink uppercase tracking-wider text-[10px]">Modo de Preparo</p>
                          <ol className="list-decimal list-inside space-y-1 text-gray-600">
                            {day.recipe.preparation.map((step, i) => <li key={i}>{step}</li>)}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Textarea Diary inputs */}
                  {day.hasInputs && day.inputs && (
                    <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-4">
                      <h3 className="font-bold text-xs md:text-sm text-brand-green uppercase tracking-wide border-b border-gray-100 pb-2">
                        📝 Seu Diário do Dia
                      </h3>

                      <div className="space-y-3">
                        {day.inputs.map((inputLabel, idx) => {
                          const noteVal = missionState.notes[day.dayNum]?.[inputLabel] || '';
                          return (
                            <div key={idx}>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">{inputLabel}</label>
                              <textarea 
                                value={noteVal}
                                onChange={(e) => handleNoteChange(day.dayNum, inputLabel, e.target.value)}
                                placeholder="Escreva sua reflexão ou resposta aqui..."
                                className="w-full p-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 text-gray-800"
                                rows={2}
                                id={`input-day-${day.dayNum}-note-${idx}`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="text-right text-[10px] text-gray-400 italic">
                        Salvo automaticamente em tempo real ✓
                      </div>
                    </div>
                  )}

                </div>
              );
            })()}

          </div>
        )}

        {/* TAB 3: ALIMENTAÇÃO (O que comer nos 15 dias) */}
        {activeTab === 'food' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Intro book title display */}
            <div className="bg-[#FAF8F5] border border-brand-gold/30 rounded-3xl p-6 shadow-sm space-y-4 text-center">
              <span className="text-[10px] text-brand-pink font-extrabold tracking-widest uppercase">MATERIAL DE APOIO</span>
              <h2 className="font-serif text-3xl font-bold text-brand-green leading-tight">O Que Comer nos 15 Dias</h2>
              <span className="inline-block bg-brand-pink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                SEU PRATO, SUA ÁGUA, SUA ROTINA
              </span>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Aqui não tem lista de proibições pra decorar nem prato calculado grama a grama. Tem o essencial, do jeito mais simples possível, pra você montar seu dia sem terrorismo nutricional.
              </p>
            </div>

            {/* Water Calculator Segment */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-green flex items-center gap-2 border-b border-gray-100 pb-2">
                <Droplet className="w-5 h-5 text-blue-500" />
                {FOOD_GUIDE.waterCalc.title}
              </h3>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <p className="text-xs text-gray-500">{FOOD_GUIDE.waterCalc.description}</p>
                  
                  {/* Dynamic Weight Calculator Input */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Digite seu Peso atual (kg):</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Ex: 65" 
                        onChange={(e) => handleWeightChangeForWater(Number(e.target.value))}
                        className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-brand-green font-bold"
                        id="input-water-weight"
                      />
                      <span className="text-xs flex items-center text-gray-500">kg</span>
                    </div>
                  </div>

                  <div className="bg-brand-sage/50 p-3 rounded-xl border border-brand-green/10">
                    <p className="text-xs font-bold text-brand-dark-green">Meta Calculada:</p>
                    <p className="text-base font-black text-brand-green">
                      {(waterLog.target / 1000).toFixed(2)} Litros / dia
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">{FOOD_GUIDE.waterCalc.example}</p>
                  </div>
                </div>

                {/* Tracker widget inside app */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center space-y-3">
                  <span className="text-[10px] font-bold text-blue-600 block uppercase tracking-wider">💧 Registro de Água Hoje</span>
                  
                  <div className="space-y-1">
                    <span className="text-2xl font-black text-blue-700">
                      {(waterLog.consumed / 1000).toFixed(2)} / {(waterLog.target / 1000).toFixed(2)} L
                    </span>
                    <div className="w-full bg-blue-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (waterLog.consumed / waterLog.target) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => addWater(250)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm flex items-center gap-1"
                      id="btn-add-water-250"
                    >
                      <Plus className="w-3.5 h-3.5" /> +250ml
                    </button>
                    <button 
                      onClick={() => addWater(500)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm flex items-center gap-1"
                      id="btn-add-water-500"
                    >
                      <Plus className="w-3.5 h-3.5" /> +500ml
                    </button>
                    <button 
                      onClick={clearWater}
                      className="text-gray-400 hover:text-red-500 p-1.5"
                      title="Limpar Registro"
                      id="btn-clear-water"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Meals Tab Sections */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-brand-green border-b border-gray-100 pb-2">
                🍳 Estrutura das Refeições
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {FOOD_GUIDE.meals.map((meal, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
                    <h4 className="font-serif text-base font-bold text-brand-pink border-b border-brand-pink/15 pb-1">
                      {meal.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 leading-normal">{meal.subtitle}</p>

                    {/* Bases / Option display cards */}
                    {meal.bases && meal.carbs && (
                      <div className="space-y-3 pt-2 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] text-brand-green uppercase">Bases (Proteína/Gordura):</p>
                          <div className="flex flex-wrap gap-1">
                            {meal.bases.map((b, i) => <span key={i} className="bg-brand-sage text-brand-green px-2 py-0.5 rounded-full font-medium">{b}</span>)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] text-brand-green uppercase">Carboidrato Leve:</p>
                          <div className="flex flex-wrap gap-1">
                            {meal.carbs.map((c, i) => <span key={i} className="bg-brand-sage text-brand-green px-2 py-0.5 rounded-full font-medium">{c}</span>)}
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400 italic pt-1">{meal.notes}</p>
                      </div>
                    )}

                    {/* Lanches Option display cards */}
                    {meal.morning && meal.afternoon && (
                      <div className="space-y-3 pt-2 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] text-brand-green uppercase">Lanche da Manhã:</p>
                          <div className="flex flex-wrap gap-1">
                            {meal.morning.map((m, i) => <span key={i} className="bg-brand-sage text-brand-green px-2 py-0.5 rounded-full font-medium">{m}</span>)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] text-brand-green uppercase">Lanche da Tarde:</p>
                          <div className="flex flex-wrap gap-1">
                            {meal.afternoon.map((a, i) => <span key={i} className="bg-brand-sage text-brand-green px-2 py-0.5 rounded-full font-medium">{a}</span>)}
                          </div>
                        </div>
                        <p className="text-[9px] bg-brand-pink/5 text-brand-pink p-1.5 rounded-lg font-medium">{meal.tip}</p>
                      </div>
                    )}

                    {/* Almoço option display cards */}
                    {meal.greens && meal.proteinAndCarb && (
                      <div className="space-y-3 pt-2 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] text-brand-green uppercase">Hortaliças (Metade do Prato):</p>
                          <div className="flex flex-wrap gap-1">
                            {meal.greens.map((g, i) => <span key={i} className="bg-brand-sage text-brand-green px-2 py-0.5 rounded-full font-medium">{g}</span>)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] text-brand-green uppercase">Proteína e Carboidrato:</p>
                          <div className="flex flex-wrap gap-1">
                            {meal.proteinAndCarb.map((p, i) => <span key={i} className="bg-brand-sage text-brand-green px-2 py-0.5 rounded-full font-medium">{p}</span>)}
                          </div>
                        </div>
                        <p className="text-[10px] text-brand-gold font-bold uppercase">{meal.lunchOnly}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Priorities & Pauses (Comida de verdade e O que dar uma pausa) */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Comida de verdade */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
                <h4 className="font-serif text-lg font-bold text-brand-green border-b border-gray-100 pb-2">
                  🟢 Comida de Verdade (Priorizar)
                </h4>
                
                <div className="space-y-3 text-xs">
                  {FOOD_GUIDE.priorities.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <p className="font-bold text-brand-green">{item.category}</p>
                      <p className="text-gray-600 leading-normal">{item.items}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* O que dar uma pausa */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
                <h4 className="font-serif text-lg font-bold text-brand-pink border-b border-gray-100 pb-2">
                  🔴 O Que Dar Uma Pausa (Evitar)
                </h4>

                <div className="space-y-3 text-xs">
                  {FOOD_GUIDE.pauses.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-red-50/50 p-2 rounded-xl border border-red-100/40">
                      <span className="text-brand-pink font-bold">✕</span>
                      <div>
                        <p className="font-bold text-brand-pink">{item.name}</p>
                        <p className="text-[10px] text-gray-500">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: CARTÃO ANTISSABOTAGEM */}
        {activeTab === 'sabotage' && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
            
            {/* Pocket card container mockup */}
            <div className="bg-[#FAF8F5] border-4 border-brand-gold rounded-3xl shadow-xl overflow-hidden text-brand-dark-green">
              
              {/* Pocket card Header */}
              <div className="bg-brand-green text-brand-cream text-center py-5 px-4 space-y-1 border-b border-brand-gold">
                <span className="text-[10px] text-brand-gold font-bold tracking-widest block uppercase">KIT BARRIGA ZERO • CARTÃO DE BOLSO</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold">Cartão Antissabotagem</h2>
                <p className="text-[11px] text-brand-cream/80 italic max-w-sm mx-auto">
                  Pra quando bater a vontade de desistir, comer por ansiedade ou jogar tudo pro alto.
                </p>
              </div>

              {/* Card body with steps */}
              <div className="p-5 md:p-6 space-y-5">
                
                {/* Core Quote */}
                <div className="bg-brand-sage/60 border border-brand-green/20 rounded-2xl p-4 text-center italic text-xs md:text-sm text-brand-dark-green font-medium">
                  "Você não é sabotadora. Você só nunca teve um plano pra esse momento exato."
                </div>

                {/* Steps List */}
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
                    <span className="bg-brand-pink text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                    <p className="text-gray-700 leading-normal">
                      <strong>Pare.</strong> Antes de decidir qualquer coisa, respire fundo três vezes. Só isso já corta o piloto automático.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
                    <span className="bg-brand-pink text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                    <p className="text-gray-700 leading-normal">
                      <strong>Beba um copo de água primeiro.</strong> Muita vontade de comer é sede ou ansiedade disfarçada.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
                    <span className="bg-brand-pink text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                    <p className="text-gray-700 leading-normal">
                      <strong>Pergunte com sinceridade:</strong> Eu tô com fome de verdade, ou estou tentando resolver outra coisa com comida?
                    </p>
                  </div>

                  <div className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
                    <span className="bg-brand-pink text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                    <p className="text-gray-700 leading-normal">
                      <strong>Escolha uma fonte de prazer</strong> que não seja comida (suas fontes do dia 7 do caderno). Só por 10 minutos.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
                    <span className="bg-brand-pink text-white font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                    <p className="text-gray-700 leading-normal">
                      <strong>Se ainda quiser comer, coma.</strong> Sentada, devagar, sem culpa. Sem virar a caixa inteira, sem se punir depois.
                    </p>
                  </div>
                </div>

                {/* Repeat Phrases segment */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider text-center">FRASES PRA REPETIR NESSE MOMENTO</span>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs text-center font-semibold text-brand-green">
                    <div className="bg-brand-sage/40 py-2 px-1 rounded-xl">"A culpa nunca foi falta de força."</div>
                    <div className="bg-brand-sage/40 py-2 px-1 rounded-xl">"Seu corpo não precisa virar castigo."</div>
                    <div className="bg-brand-sage/40 py-2 px-1 rounded-xl">"Eu recomeço na próxima refeição."</div>
                    <div className="bg-brand-sage/40 py-2 px-1 rounded-xl">"Mulher... respira."</div>
                  </div>
                </div>

              </div>

              {/* Pocket card Footer */}
              <div className="bg-brand-green/10 text-center py-3 text-[10px] text-gray-500 border-t border-gray-200">
                Guarda esse cartão por perto: geladeira, carteira ou tela do celular. Confia na nutri.
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: FICHA DE MEDIDAS E EVOLUÇÃO */}
        {activeTab === 'metrics' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-brand-green border-b border-gray-150 pb-2">
                📏 Ficha de Medidas e Evolução
              </h2>
              <p className="text-xs text-gray-500">
                Acompanhe suas medidas de peso, cintura e quadril tiradas no Dia 1 e compare com os resultados finais do Dia 15 para visualizar seus incríveis avanços.
              </p>

              <div className="grid md:grid-cols-2 gap-6 pt-2">
                
                {/* Day 1 Input Form */}
                <div className="bg-brand-sage/20 border border-brand-green/10 p-4 rounded-2xl space-y-3">
                  <span className="bg-brand-green text-white font-bold text-[9px] tracking-wider py-0.5 px-2.5 rounded-full uppercase">DIA 01 DE 15</span>
                  
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">PESO ATUAL (kg):</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 68.5"
                        value={measurements.day1.peso}
                        onChange={(e) => setMeasurements(prev => ({
                          ...prev,
                          day1: { ...prev.day1, peso: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-250 text-xs focus:outline-none focus:border-brand-green"
                        id="input-metrics-weight-day1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">CINTURA (cm):</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 85"
                        value={measurements.day1.cintura}
                        onChange={(e) => setMeasurements(prev => ({
                          ...prev,
                          day1: { ...prev.day1, cintura: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-250 text-xs focus:outline-none focus:border-brand-green"
                        id="input-metrics-waist-day1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">QUADRIL (cm):</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 104"
                        value={measurements.day1.quadril}
                        onChange={(e) => setMeasurements(prev => ({
                          ...prev,
                          day1: { ...prev.day1, quadril: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-250 text-xs focus:outline-none focus:border-brand-green"
                        id="input-metrics-hip-day1"
                      />
                    </div>
                  </div>
                </div>

                {/* Day 15 Input Form */}
                <div className="bg-brand-pink/5 border border-brand-pink/20 p-4 rounded-2xl space-y-3">
                  <span className="bg-brand-pink text-white font-bold text-[9px] tracking-wider py-0.5 px-2.5 rounded-full uppercase">DIA 15 DE 15</span>
                  
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">PESO ATUAL (kg):</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 66.2"
                        value={measurements.day15.peso}
                        onChange={(e) => setMeasurements(prev => ({
                          ...prev,
                          day15: { ...prev.day15, peso: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-250 text-xs focus:outline-none focus:border-brand-pink"
                        id="input-metrics-weight-day15"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">CINTURA (cm):</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 81"
                        value={measurements.day15.cintura}
                        onChange={(e) => setMeasurements(prev => ({
                          ...prev,
                          day15: { ...prev.day15, cintura: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-250 text-xs focus:outline-none focus:border-brand-pink"
                        id="input-metrics-waist-day15"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">QUADRIL (cm):</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 101"
                        value={measurements.day15.quadril}
                        onChange={(e) => setMeasurements(prev => ({
                          ...prev,
                          day15: { ...prev.day15, quadril: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-250 text-xs focus:outline-none focus:border-brand-pink"
                        id="input-metrics-hip-day15"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Before / After Photo simulator */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-green border-b border-gray-150 pb-2">
                📸 Sua evolução corporal (Fotos de Comparação)
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-2 border border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 flex flex-col items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">ANTES DO DESAFIO</span>
                  {measurements.photoBefore ? (
                    <img 
                      src={measurements.photoBefore} 
                      alt="Antes" 
                      className="w-32 h-40 object-cover rounded-xl shadow-sm border border-gray-200"
                    />
                  ) : (
                    <div className="w-32 h-40 rounded-xl bg-gray-200 border border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-1.5">
                      <span className="text-xl">📷</span>
                      <span className="text-[9px] font-medium font-mono text-center px-2">Sem foto carregada</span>
                    </div>
                  )}
                  <button 
                    onClick={() => handleSimulatePhoto('before')}
                    className="mt-2 text-[10px] bg-brand-green/10 text-brand-green font-bold py-1 px-3 rounded-lg hover:bg-brand-green/20 transition"
                    id="btn-simulate-before-photo"
                  >
                    Simular Envio
                  </button>
                </div>

                <div className="space-y-2 border border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 flex flex-col items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">DEPOIS DO DESAFIO</span>
                  {measurements.photoAfter ? (
                    <img 
                      src={measurements.photoAfter} 
                      alt="Depois" 
                      className="w-32 h-40 object-cover rounded-xl shadow-sm border border-gray-200"
                    />
                  ) : (
                    <div className="w-32 h-40 rounded-xl bg-gray-200 border border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-1.5">
                      <span className="text-xl">✨</span>
                      <span className="text-[9px] font-medium font-mono text-center px-2">Sem foto carregada</span>
                    </div>
                  )}
                  <button 
                    onClick={() => handleSimulatePhoto('after')}
                    className="mt-2 text-[10px] bg-brand-green/10 text-brand-green font-bold py-1 px-3 rounded-lg hover:bg-brand-green/20 transition"
                    id="btn-simulate-after-photo"
                  >
                    Simular Envio
                  </button>
                </div>
              </div>
            </div>

            {/* Achievements Box */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-md space-y-3">
              <label className="block font-serif text-base font-bold text-brand-green">🏅 Suas Maiores Conquistas no Desafio:</label>
              <textarea 
                value={measurements.conquistas}
                onChange={(e) => setMeasurements(prev => ({ ...prev, conquistas: e.target.value }))}
                placeholder="Ex: Consegui usar um shorts antigo que não servia mais! Me sinto mais leve e sem aquele estufamento..."
                className="w-full p-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                rows={3}
                id="input-metrics-achievements"
              />
              <div className="text-right text-[10px] text-gray-400 italic">
                Salvo no aplicativo de aluna ✓
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: CERTIFICADO DE CONCLUSÃO */}
        {activeTab === 'certificate' && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            
            {/* Input to modify name */}
            <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-sm space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase">
                Nome para o Certificado de Conclusão:
              </label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={nameForCertificate}
                  onChange={(e) => setNameForCertificate(e.target.value)}
                  placeholder="Seu nome completo"
                  className="flex-grow px-4 py-2 rounded-xl border border-gray-200 text-xs md:text-sm font-bold focus:outline-none focus:border-brand-green"
                  id="input-certificate-name"
                />
                <button 
                  onClick={handlePrintCertificate}
                  className="bg-brand-green hover:bg-brand-green/95 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                  id="btn-print-certificate"
                >
                  <Printer className="w-4 h-4 text-brand-gold" />
                  Imprimir
                </button>
              </div>
            </div>

            {/* Visual Certificate Mockup */}
            <div className="bg-[#FCF9F2] border-[12px] border-[#cbb387] rounded-3xl p-6 md:p-10 text-center text-brand-dark-green relative overflow-hidden shadow-2xl space-y-6">
              
              {/* Floral background accents */}
              <div className="absolute top-2 left-2 text-2xl text-brand-green/20">✿</div>
              <div className="absolute top-2 right-2 text-2xl text-brand-green/20">✿</div>
              <div className="absolute bottom-2 left-2 text-2xl text-brand-green/20">✿</div>
              <div className="absolute bottom-2 right-2 text-2xl text-brand-green/20">✿</div>

              <div className="space-y-2">
                <span className="text-[10px] text-brand-green font-extrabold tracking-widest block uppercase">
                  DESAFIO BARRIGA ZERO • ACELERADORA 15 DIAS
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-black text-brand-green tracking-tight">
                  Certificado de Conclusão
                </h2>
                <div className="w-24 h-0.5 bg-brand-gold mx-auto my-2"></div>
                <p className="font-serif italic text-xs md:text-sm text-brand-pink/90">
                  "Isso aqui é prova de que você não desistiu de você"
                </p>
              </div>

              <div className="py-4 space-y-4">
                <p className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500">Concedido orgulhosamente a:</p>
                <p className="font-serif text-xl md:text-3xl font-bold text-brand-pink underline decoration-brand-gold/50 decoration-2 underline-offset-8">
                  {nameForCertificate}
                </p>
              </div>

              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Concluiu os <strong>15 dias</strong> do Desafio Barriga Zero: pesou, mediu, se organizou, errou, recomeçou e não desistiu. Eliminar a barriga foi só o começo. Sustentar isso é o próximo capítulo, e a nutri vai estar aqui para ele também.
              </p>

              {/* Signature block */}
              <div className="pt-8 grid grid-cols-2 gap-4 border-t border-brand-gold/20 text-xs">
                <div className="space-y-1">
                  <div className="font-serif italic text-brand-green font-bold text-sm">Andréia Vaz</div>
                  <div className="w-28 h-px bg-gray-300 mx-auto"></div>
                  <div className="text-[9px] text-gray-400 block uppercase">Nutricionista Clínica CRN8 3188</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-gray-700 text-xs font-bold pt-1">
                    {new Date().toLocaleDateString('pt-BR')}
                  </div>
                  <div className="w-28 h-px bg-gray-300 mx-auto"></div>
                  <div className="text-[9px] text-gray-400 block uppercase">Data de Conclusão</div>
                </div>
              </div>

              {/* Gold seal stamp decoration */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-brand-gold/15 rounded-full flex items-center justify-center font-serif italic text-[10px] text-brand-gold font-bold uppercase rotate-12 border-2 border-dashed border-brand-gold/30">
                Selo de Sucesso
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Sticky Bottom stats for mobile */}
      <footer className="bg-white border-t border-gray-100 py-3 text-center text-[10px] text-gray-400">
        <p>© {new Date().getFullYear()} Desafio Barriga Zero • Desenvolvido com carinho para Andréia Vaz.</p>
      </footer>

    </div>
  );
}
