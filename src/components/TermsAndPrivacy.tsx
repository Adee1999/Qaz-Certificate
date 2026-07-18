/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Scale } from 'lucide-react';

interface TermsAndPrivacyProps {
  type: 'terms' | 'privacy';
}

export default function TermsAndPrivacy({ type }: TermsAndPrivacyProps) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase mb-4">
          {isPrivacy ? <ShieldCheck className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
          <span>Құқықтық құжат</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          {isPrivacy ? 'Құпиялылық саясаты' : 'Қолдану шарттары'}
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Соңғы рет жаңартылған күні: 18 шілде 2026 жыл
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-6 text-gray-700 dark:text-gray-300">
        {isPrivacy ? (
          <>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">1. Жалпы ережелер</h3>
            <p>
              QazCertificate («біз», «біздің») пайдаланушыларымыздың құпиялылығын құрметтейді. Бұл Құпиялылық саясаты біздің веб-қосымшамызды («Платформа») пайдаланған кезде сіздің жеке деректеріңіздің қалай өңделетінін түсіндіреді.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">2. Деректерді жинау және сақтау</h3>
            <p>
              Біз пайдаланушыларымыздың дербес деректерін біздің серверлерімізде жинамаймыз немесе сақтамаймыз. Барлық марапат қағаздарын жасау, мөр мен қолтаңбаларды жүктеу және мәтіндерді өзгерту тікелей сіздің құрылғыңызда (браузерде) орындалады.
            </p>
            <p>
              Жобалар тарихын сақтау үшін біз браузердің <strong>LocalStorage</strong> технологиясын қолданамыз. Бұл деректер тек сіздің жеке компьютеріңізде немесе смартфоныңызда ғана сақталады және сыртқа жіберілмейді.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">3. Cookies (Куки файлдары)</h3>
            <p>
              Платформаның дұрыс жұмыс істеуі үшін (мысалы, таңдалған жарық/түнгі режимді сақтау) біз куки файлдарын қолдана аламыз. Cookies сіздің құрылғыңыздан басқа деректерді оқу үшін қолданылмайды.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">4. Қауіпсіздік</h3>
            <p>
              Біз сіздің макеттеріңіз бен енгізген ақпараттарыңыздың қауіпсіздігіне барынша кепілдік береміз, себебі олар желі арқылы тасымалданбайды. Сіз жасаған сертификатты өшірген кезде, ол сіздің браузеріңізден біржола жойылады.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">1. Шарттарды қабылдау</h3>
            <p>
              QazCertificate платформасын пайдалану арқылы сіз осы Пайдалану шарттарын толықтай қабылдайсыз және оларды орындауға міндеттенесіз. Егер сіз шарттармен келіспесеңіз, платформаны пайдаланбауыңызды сұраймыз.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">2. Рұқсат етілген пайдалану</h3>
            <p>
              Пайдаланушыларға платформаны келесі мақсаттарда пайдалануға рұқсат етіледі:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Жеке, білім беру, мектепішілік және коммерциялық мақсаттарда сертификаттар мен дипломдар жасау және жүктеу;</li>
              <li>Өз макеттерін жасап, оларды шектеусіз баспаға шығару.</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">3. Жауапкершілікті шектеу</h3>
            <p>
              Біз платформада жасалған құжаттардың мазмұнына және олардың заңдылығына жауапты емеспіз. Пайдаланушылар жалған ақпарат немесе ресми мөрлерді рұқсатсыз қолданғаны үшін өздері заң алдында жауапты болады.
            </p>
            <p>
              Платформа ешқандай мемлекеттік органның ресми лицензиялау жүйесі болып табылмайды. Бұл — тек көркемдік дизайн әзірлейтін конструкторлық құрал.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">4. Шарттарды өзгерту</h3>
            <p>
              Біз осы шарттарды кез келген уақытта алдын ала ескертусіз өзгерту құқығын өзімізде қалдырамыз. Өзгертулер жарияланған сәттен бастап заңды күшіне енеді.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
