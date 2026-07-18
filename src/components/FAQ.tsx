/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: 'QazCertificate арқылы сертификат жасау тегін бе?',
      answer: 'Иә, біздің платформа толықтай тегін. Барлық дайын үлгілер мен өңдеу құралдары шектеусіз қолжетімді. Ешқандай жасырын төлемдер немесе су белгісі (watermark) жоқ.'
    },
    {
      question: 'Сертификатты қалай басып шығаруға болады?',
      answer: 'Марапат қағазын жасап болғаннан кейін "Баспаға дайындау (PDF)" батырмасын басыңыз. Сонда құжат стандартты А4 форматында, шеткі жиектерсіз (no margins) және баспаға барынша қолайлы 300 DPI сапада жүктеледі. Жүктелген файлды кез келген баспаханада немесе үй принтерінде шығара аласыз.'
    },
    {
      question: 'Мөр мен қолтаңбаны қалай жүктеуге болады?',
      answer: 'Редактор терезесінің сол жақ мәзірінен "Суреттер" бөлімін таңдаңыз. Сол жерден өз ұйымыңыздың мөрін (Stamp) немесе қолтаңбасын (Signature) PNG немесе JPG форматында жүктеп, сертификат бетінде кез келген орынға жылжытып, өлшемін кішірейтіп немесе бұрып орналастыра аласыз.'
    },
    {
      question: 'Құжаттағы QR код қалай жұмыс істейді?',
      answer: 'QR код марапат алушының құжатын тексеру үшін қолданылады. Сіз редакторда QR код мәтінін немесе сілтемесін өзгерте аласыз. QR код толықтай векторлық форматта жасалады және құжатты жүктегенде сапасы еш бұзылмайды.'
    },
    {
      question: 'Менің жобаларым сақталып қала ма?',
      answer: 'Иә, сіздің жасаған барлық жобаларыңыз браузердің LocalStorage жадында автоматты түрде сақталып тұрады. Кез келген уақытта сайтқа қайта оралып, "Жобаларым" бөлімінен бұрынғы макетті тауып, қайтадан өңдей немесе дубликат жасай аласыз.'
    },
    {
      question: 'Құжат нөмірін өзгертуге бола ма?',
      answer: 'Иә, құжат нөмірі автоматты түрде "QC-2026-XXXXXX" үлгісінде жасалғанымен, сіз оны редактор терезесінде өз қалауыңызша мәтіндік өрісті басып, кез келген басқа нөмірге немесе серияға өзгерте аласыз.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>Сұрақ-жауап бөлімі</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Жиі қойылатын сұрақтар
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Сертификат жасау платформасы мен баспа қызметтеріне қатысты көкейіңізде жүрген сұрақтарға жауаптар.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 overflow-hidden shadow-sm"
              id={`faq-item-${idx}`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                <span>{item.question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-650 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-900 animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative call to action */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-600/10 to-indigo-700/5 dark:from-slate-900 border border-indigo-500/10 text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Сұрағыңызға жауап таппадыңыз ба?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6">
          Бізге кез келген уақытта жаза аласыз. Кері байланыс парақшасы арқылы сұраныс жолдаңыз, біз көмектесуге әрдайым дайынбыз.
        </p>
      </div>
    </div>
  );
}
