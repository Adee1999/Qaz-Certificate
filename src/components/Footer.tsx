/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 no-print transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                QazCertificate
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Қазақ тіліндегі тегін, әрі ең озық онлайн сертификаттар мен дипломдар жасау платформасы. Біздің көмегімізбен кәсіби марапаттарды санаулы секундта әзірлеңіз.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Нұсқаулық</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-indigo-400 transition-colors">
                  Басты бет
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('templates')} className="hover:text-indigo-400 transition-colors">
                  Үлгілер жинағы
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('faq')} className="hover:text-indigo-400 transition-colors">
                  Жиі қойылатын сұрақтар
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-indigo-400 transition-colors">
                  Жоба туралы
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Құқықтық ақпарат</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleLinkClick('privacy')} className="hover:text-indigo-400 transition-colors">
                  Құпиялылық саясаты
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('terms')} className="hover:text-indigo-400 transition-colors">
                  Қолдану шарттары
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-indigo-400 transition-colors">
                  Кері байланыс
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Байланыс</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="hover:text-white transition-colors">support@qazcert.kz</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="hover:text-white transition-colors">+7 (707) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Алматы қаласы, Қазақстан</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>www.qazcert.kz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} QazCertificate. Барлық құқықтар қорғалған. Hostinger Business Hosting үшін оңтайландырылған.
          </p>
          <div className="flex gap-4 text-xs text-slate-400">
            <span>Тіл: Қазақша (Қазақстан)</span>
            <span>•</span>
            <span>Теңшеу: Офлайн режимі</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
