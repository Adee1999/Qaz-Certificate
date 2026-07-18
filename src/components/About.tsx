/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, Award, Shield, Users, Trophy } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Дайын тегін үлгілер', value: '50+' },
    { label: 'Жылдамдық', value: '120 сек' },
    { label: 'Баспа сапасы', value: '300 DPI' },
    { label: 'Пайдаланушы ақысы', value: '0 ₸' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20 transition-colors duration-200">
      {/* Intro Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase">
          <Info className="w-4 h-4" />
          <span>Жоба туралы</span>
        </div>
        <h1 className="font-display text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          QazCertificate Платформасы
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Біздің мақсатымыз — Қазақстанның мұғалімдеріне, тәрбиешілеріне, оқу орындарына және спорттық ұйымдарына ешқандай дизайн дағдыларынсыз-ақ, жоғары деңгейлі марапаттар мен сертификаттарды мемлекеттік тілде мүлдем тегін дайындауға көмектесу.
        </p>
      </section>

      {/* Grid of values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Мемлекеттік Нақыш</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Біздің барлық шаблондар мен жиектемелер қазақстандық нарық пен ұлттық эстетикаға, заманауи білім беру мекемелерінің қатаң талаптарына толықтай жауап береді.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Деректер Қауіпсіздігі</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Сіз енгізген кез келген дербес дерек, аты-жөндер немесе жүктелген қолтаңбалар мен мөрлер ешқандай серверге жіберілмейді. Барлық операциялар қауіпсіз түрде браузерде ғана орындалады.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Кәсіби Сапа</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Векторлық бағдарламалаудың арқасында, баспаға жүктелген макеттердегі әрбір ою мен мәтін миллиметрлік дәлдікпен, ешбір бұлыңғырлықсыз анық басылып шығады.
          </p>
        </div>
      </section>

      {/* Stats counter */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-indigo-400">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Vision Statement */}
      <section className="flex flex-col md:flex-row items-center gap-12 border-t border-gray-100 dark:border-slate-900 pt-16">
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Біздің басты құндылығымыз — уақытыңызды үнемдеу
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Әрбір мұғалім немесе ұйымдастырушы әдемі дизайн жасау үшін қымбат графикалық редакторларды үйренуге мәжбүр болмауы тиіс. Біз кез келген қолданушы өз қалауына қарай жылдам әрі сапалы марапаттар әзірлей алатындай қарапайым құрал жасадық.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Платформамыз Hostinger Business Hosting инфрақұрылымында толықтай статикалық технологиямен жұмыс істейді. Бұл оның кез келген уақытта жылдам және тұрақты іске қосылуын қамтамасыз етеді.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 rounded-2xl bg-gray-50 dark:bg-slate-900/40 border border-gray-150 dark:border-slate-850 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <Users className="w-16 h-16 text-indigo-600 mx-auto" />
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Мұғалімдерге көмек</h4>
            <p className="text-xs text-gray-500 dark:text-gray-450 max-w-xs leading-relaxed">
              Қазақстанның түкпір-түкпіріндегі мыңдаған ұстаздар мен тәрбиешілер оқушыларын марапаттау үшін күн сайын біздің платформаны таңдайды.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
