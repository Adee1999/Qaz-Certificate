/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, ShieldCheck, Zap, Printer, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { CertificateTemplate } from '../types';

interface HeroProps {
  setCurrentPage: (page: string) => void;
  featuredTemplates: CertificateTemplate[];
  handleSelectTemplate: (template: CertificateTemplate) => void;
}

export default function Hero({ setCurrentPage, featuredTemplates, handleSelectTemplate }: HeroProps) {
  // Highlight some premium advantages of QazCertificate
  const advantages = [
    {
      icon: Zap,
      title: 'Жылдам дайындау',
      desc: 'Бар болғаны 2 минут ішінде өзіңізге қажетті кәсіби макетті жасап шығыңыз.'
    },
    {
      icon: ShieldCheck,
      title: 'Ресми QR код',
      desc: 'Әрбір құжатқа автоматты түрде қауіпсіз және бірегей QR код орнатылады.'
    },
    {
      icon: Printer,
      title: 'Баспаға дайын (300 DPI)',
      desc: 'A4 форматында, жоғары ажыратымдылықта және CMYK форматына бейімделген жүктеу.'
    }
  ];

  const steps = [
    { num: '01', title: 'Үлгіні таңдаңыз', desc: '50-ден астам дайын заманауи және классикалық дизайндар.' },
    { num: '02', title: 'Мәтіндерді өзгертіңіз', desc: 'Алушы атын, тақырыпты, мөр мен қолтаңбаны өз еркіңізбен реттеңіз.' },
    { num: '03', title: 'Жүктеп алыңыз', desc: 'PNG, JPG немесе баспаға арналған PDF форматында лезде сақтаңыз.' }
  ];

  return (
    <div className="relative overflow-hidden transition-colors duration-200">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none dark:opacity-[0.03]">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Kazakh Traditional Ornament Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 border border-indigo-200 dark:border-indigo-900/50 animate-bounce">
          <Award className="w-4 h-4 shrink-0" />
          <span>Ұлттық нақыштағы заманауи конструктор</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
          <span className="block">Сертификат және диплом жасау</span>
          <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
            бірнеше секунд ішінде
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Бірнеше минут ішінде кәсіби сертификаттар, дипломдар, алғыс хаттар және марапат қағаздарын жасаңыз. Мүлдем тегін, тіркелусіз және жүктеу шектеусіз.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              setCurrentPage('templates');
              // Set query filter or similar if needed
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            id="hero-cert-btn"
          >
            <span>Сертификат жасау</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              setCurrentPage('templates');
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/80 font-bold rounded-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            id="hero-diploma-btn"
          >
            <span>Диплом жасау</span>
          </button>

          <button
            onClick={() => setCurrentPage('templates')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-50 dark:bg-indigo-950/20 hover:bg-indigo-100 dark:hover:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            id="hero-templates-btn"
          >
            <span>Үлгілерді көру</span>
          </button>
        </div>

        {/* Interactive Preview Mockup Box */}
        <div className="relative max-w-4xl mx-auto rounded-2xl border border-gray-200 dark:border-slate-800 p-3 sm:p-4 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md shadow-2xl">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative group">
            {/* Elegant preview placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-indigo-100/10 to-transparent dark:from-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-500/20">
                <Award className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Интерактивті реттелетін векторлық үлгілер
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg">
                Әрбір мәтін блогын таңдап, қаріпті, түсті, өлшемді және орналасуын тікелей браузерде баптаңыз. Қолтаңба мен мөр жүктеп, бірегей қорғаныс су белгісін қосыңыз.
              </p>
              <button
                onClick={() => setCurrentPage('templates')}
                className="mt-6 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white dark:text-indigo-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                id="hero-interactive-preview-btn"
              >
                <span>Конструкторды іске қосу</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="border-t border-b border-gray-100 dark:border-slate-900 bg-gray-50/50 dark:bg-slate-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Неліктен QazCertificate таңдайды?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Марапаттау құжаттарын баспаға барынша сапалы дайындау үшін барлық қажетті мүмкіндіктер жинақталған.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all hover:-translate-y-1"
                  id={`advantage-card-${idx}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-100 dark:border-indigo-900/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Құжатты дайындау қадамдары
          </h2>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 text-sm">
            Үш қарапайым қадам арқылы кәсіби марапат қағаздарын баспаға дайындап шығыңыз.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="text-center px-4" id={`step-item-${idx}`}>
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/20 border-4 border-white dark:border-slate-950">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Featured Templates */}
      <section className="bg-indigo-50/10 dark:bg-slate-900/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Танымал дайын үлгілер
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Көпшіліктің таңдауына ие болған үздік классикалық және заманауи дизайндар
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('templates')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/10"
              id="view-all-templates-btn"
            >
              <span>Барлық 50+ үлгіні көру</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemplates.slice(0, 3).map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-lg transition-all"
                id={`featured-template-${template.id}`}
              >
                {/* Visual Representation of Template */}
                <div 
                  className="aspect-video w-full flex flex-col items-center justify-center p-6 transition-transform group-hover:scale-[1.02] relative"
                  style={{ background: template.canvasBg }}
                >
                  {/* Miniature Border ornament */}
                  <div 
                    className="absolute inset-2 border-2 rounded pointer-events-none opacity-40"
                    style={{ borderColor: template.borderColor, borderStyle: template.borderStyle === 'double' ? 'double' : 'solid' }}
                  ></div>
                  <Award className="w-10 h-10 mb-2" style={{ color: template.secondaryColor }} />
                  <span className="font-display text-xs font-extrabold text-center tracking-wider" style={{ color: template.primaryColor }}>
                    {template.category.toUpperCase()}
                  </span>
                  <span className="text-[9px] mt-1 opacity-70" style={{ color: template.primaryColor }}>
                    {template.type === 'certificate' ? 'СЕРТИФИКАТ' : 'ДИПЛОМ'}
                  </span>
                </div>

                <div className="p-5 border-t border-gray-100 dark:border-slate-900">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      {template.category}
                    </span>
                    {template.isPremium && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-600 text-white">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Таңдаулы
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans font-bold text-gray-900 dark:text-white truncate">
                    {template.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Тегін жүктеу</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                      Өңдеу <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guaranteed High Quality Vector Graphics Info */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Жоғары технологиялық векторлық сапа</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white">
            Кез келген өлшемде бұлдырамайтын анық мәтіндер мен жиектер
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Біздің құрылғымызда жасалған кез келген макет баспаға шығарғанда мінсіз сапаны сақтайды. Себебі, жиектемелер, оюлар, тақырыптар және мәтіндік қаріптер түгелдей векторлық технологиямен (SVG және TrueType WebFonts) өңделеді.
          </p>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Ешқандай су белгісі немесе жасырын ақы жоқ</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Hostinger жылдам серверлерінде лезде өңделу</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Деректеріңіз толығымен қауіпсіз және браузерде ғана сақталады</span>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 dark:from-indigo-950/10 border border-indigo-500/10 flex items-center justify-center min-h-[300px]">
          {/* Custom SVG composition representing Vector quality */}
          <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto" id="vector-illustration-svg">
            <rect x="10" y="10" width="380" height="280" rx="16" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-indigo-500/50" />
            <circle cx="200" cy="150" r="80" fill="none" stroke="currentColor" strokeWidth="8" className="text-indigo-500" />
            <path d="M160 150 L190 180 L245 125" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500" />
            <text x="200" y="270" textAnchor="middle" fill="currentColor" className="text-gray-800 dark:text-white font-display font-black text-sm tracking-wider">300 DPI ВЕКТОР</text>
          </svg>
        </div>
      </section>
    </div>
  );
}
