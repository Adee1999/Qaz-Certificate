/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase mb-4">
          <Mail className="w-4 h-4" />
          <span>Байланыс парақшасы</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Бізбен байланысыңыз
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          Платформаның жұмысына байланысты сұрақтарыңыз, ұсыныстарыңыз немесе корпоративті дизайн қызметтеріне тапсырыс беру үшін хабарласа аласыз.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Contact info details */}
        <div className="lg:col-span-1 space-y-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-900 pb-4">
              Байланыс деректері
            </h3>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Электрондық пошта</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">support@qazcert.kz</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Телефон нөмірі</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">+7 (707) 123-45-67</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Мекенжайымыз</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Алматы қаласы, Қазақстан</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-905 dark:bg-slate-900 text-indigo-600 border border-indigo-500/10 text-center">
            <h4 className="font-bold text-base text-gray-900 dark:text-white mb-2">Офлайн қолдау</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Біздің платформа толық браузерде жұмыс істейтіндіктен, сұраныстарға 24/7 пошта арқылы жауап береміз.
            </p>
          </div>
        </div>

        {/* Contact Form card */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in" id="contact-success-msg">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto border border-teal-200">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Хат сәтті жіберілді!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Біздің қолдау қызметі хатыңызды алды. Жақын арада сіздің көрсеткен электронды поштаңызға жауап қайтарамыз.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors"
                id="reset-contact-btn"
              >
                Жаңа хат жазу
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Хат жолдау</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Аты-жөніңіз <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all text-sm dark:text-white"
                    placeholder="Мысалы: Әлихан Маратұлы"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Электрондық пошта <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all text-sm dark:text-white"
                    placeholder="Мысалы: alikhan@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Хат тақырыбы
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all text-sm dark:text-white"
                  placeholder="Хат мәні не туралы?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Хат мәтіні <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all text-sm dark:text-white resize-none"
                  placeholder="Бізге жазатын хабарламаңызды осында қалдырыңыз..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer"
                id="submit-contact-btn"
              >
                {isLoading ? (
                  <span>Жіберілуде...</span>
                ) : (
                  <>
                    <span>Хатты жіберу</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
