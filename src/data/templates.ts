/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CertificateTemplate, EditableElement, TemplateCategory, TemplateType } from '../types';

// Standard fonts available
export const FONT_OPTIONS = [
  'Inter',
  'Times New Roman',
  'Georgia',
  'Arial',
  'Courier New',
  'Montserrat',
  'Cinzel',
  'Playfair Display',
  'Great Vibes',
  'Pinyon Script',
  'Sacramento'
];

// Helper to generate default elements based on category and type
export function generateDefaultElements(
  type: TemplateType,
  category: TemplateCategory,
  titleText: string,
  primaryColor: string,
  secondaryColor: string
): EditableElement[] {
  const isDiploma = type === 'diploma';
  const displayTitle = titleText.toUpperCase();
  
  // Specific templates might need slightly different starting texts
  let subtitleText = isDiploma ? "МАРАПАТТАЛАДЫ" : "ОСЫ СЕРТИФИКАТ СЕНІМДІ ТҮРДЕ БЕРІЛЕДІ:";
  let recipientText = "Ахметов Әлихан Маратұлы";
  let descText = isDiploma
    ? "Халықаралық білім және шығармашылық байқауында жоғары дайындық, шығармашылық ізденіс пен белсенділік танытып, ерекше жетістікке жеткені үшін."
    : "Педагогикалық және инновациялық білім беру бағдарламасын сәтті меңгеріп, теориялық әрі практикалық курсты толық көлемде аяқтағаны үшін.";
    
  if (category === 'Тәрбиеші' || category === 'Балабақша') {
    recipientText = "Серікова Айлин Ерболқызы";
    descText = "Балабақша деңгейінде өткен шығармашылық апталыққа белсенді қатысып, сурет салудан үздік өнер көрсеткені үшін марапатталады.";
  } else if (category === 'Спорт') {
    descText = "Спорттық бұқаралық жарыста жоғары шеберлік, төзімділік және жеңіске деген ерік-жігер танытып, үздік нәтиже көрсеткені үшін.";
  } else if (category === 'Волонтер' || category === 'Ұйымдастырушы') {
    subtitleText = "АЛҒЫС ХАТ ЖӘНЕ РИЗАШЫЛЫҚ";
    descText = "Әлеуметтік маңызы бар қайырымдылық жобаларды дамытуға қосқан зор үлесі, белсенді азаматтық ұстанымы және адал еңбегі үшін шексіз алғыс білдіреміз.";
  } else if (category === 'Семинар' || category === 'Онлайн курс') {
    subtitleText = "ТЫҢДАУШЫ СЕРТИФИКАТЫ";
    descText = "Кәсіби біліктілікті арттыруға бағытталған заманауи интерактивті семинар/курс бағдарламасын толық көлемде (72 сағат) сәтті аяқтады.";
  }

  // Generate distinct elements with clean, responsive percentage positioning
  const elements: EditableElement[] = [
    {
      id: 'org',
      type: 'text',
      label: 'Ұйым атауы',
      text: 'ҚАЗАҚСТАН РЕСПУБЛИКАСЫ БІЛІМ ЖӘНЕ ҒЫЛЫМ МИНИСТРЛІГІ',
      x: 50,
      y: 12,
      width: 80,
      fontSize: 12,
      fontFamily: 'Montserrat',
      fontColor: primaryColor === '#ffffff' ? '#e2e8f0' : '#475569',
      fontWeight: 'bold',
      alignment: 'center',
      letterSpacing: 2,
      lineHeight: 1.4,
      visible: true
    },
    {
      id: 'title',
      type: 'text',
      label: 'Құжат тақырыбы',
      text: displayTitle,
      x: 50,
      y: 22,
      width: 90,
      fontSize: 38,
      fontFamily: 'Cinzel',
      fontColor: secondaryColor === '#ffffff' ? '#fbbf24' : secondaryColor,
      fontWeight: 'bold',
      alignment: 'center',
      letterSpacing: 3,
      lineHeight: 1.2,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.15)',
      visible: true
    },
    {
      id: 'subtitle',
      type: 'text',
      label: 'Қосымша тақырып',
      text: subtitleText,
      x: 50,
      y: 33,
      width: 80,
      fontSize: 14,
      fontFamily: 'Montserrat',
      fontColor: primaryColor === '#ffffff' ? '#cbd5e1' : '#64748b',
      fontWeight: 'normal',
      alignment: 'center',
      letterSpacing: 1.5,
      visible: true
    },
    {
      id: 'recipient',
      type: 'text',
      label: 'Алушының аты-жөні',
      text: recipientText,
      x: 50,
      y: 43,
      width: 85,
      fontSize: 32,
      fontFamily: 'Playfair Display',
      fontColor: primaryColor === '#ffffff' ? '#f8fafc' : '#0f172a',
      fontWeight: 'bold',
      alignment: 'center',
      letterSpacing: 0.5,
      visible: true
    },
    {
      id: 'description',
      type: 'text',
      label: 'Құжат сипаттамасы',
      text: descText,
      x: 50,
      y: 56,
      width: 76,
      fontSize: 14,
      fontFamily: 'Inter',
      fontColor: primaryColor === '#ffffff' ? '#cbd5e1' : '#334155',
      alignment: 'center',
      lineHeight: 1.6,
      visible: true
    },
    {
      id: 'teacher',
      type: 'text',
      label: 'Жетекші аты-жөні',
      text: 'Жетекші: Сұлтанова Әлия Саматқызы',
      x: 25,
      y: 74,
      width: 35,
      fontSize: 11,
      fontFamily: 'Inter',
      fontColor: primaryColor === '#ffffff' ? '#cbd5e1' : '#475569',
      alignment: 'left',
      visible: true
    },
    {
      id: 'director',
      type: 'text',
      label: 'Директор аты-жөні',
      text: 'Директор: Рахымжанов Бауыржан Қанатұлы',
      x: 75,
      y: 74,
      width: 35,
      fontSize: 11,
      fontFamily: 'Inter',
      fontColor: primaryColor === '#ffffff' ? '#cbd5e1' : '#475569',
      alignment: 'right',
      visible: true
    },
    {
      id: 'date',
      type: 'text',
      label: 'Күні',
      text: 'Күні: 18 шілде 2026 жыл',
      x: 25,
      y: 81,
      width: 30,
      fontSize: 10,
      fontFamily: 'Inter',
      fontColor: primaryColor === '#ffffff' ? '#94a3b8' : '#64748b',
      alignment: 'left',
      visible: true
    },
    {
      id: 'certNumber',
      type: 'text',
      label: 'Құжат нөмірі',
      text: '№ QC-2026-000142',
      x: 25,
      y: 85,
      width: 30,
      fontSize: 10,
      fontFamily: 'Inter',
      fontColor: primaryColor === '#ffffff' ? '#94a3b8' : '#64748b',
      alignment: 'left',
      visible: true
    },
    {
      id: 'location',
      type: 'text',
      label: 'Орналасқан жері',
      text: 'Алматы қаласы',
      x: 75,
      y: 81,
      width: 30,
      fontSize: 10,
      fontFamily: 'Inter',
      fontColor: primaryColor === '#ffffff' ? '#94a3b8' : '#64748b',
      alignment: 'right',
      visible: true
    },
    // Special vector graphic elements:
    {
      id: 'qr',
      type: 'qr',
      label: 'QR код',
      text: 'https://qazcert.kz/verify/QC-2026-000142',
      x: 50,
      y: 80,
      width: 8, // fits nicely
      visible: true
    },
    {
      id: 'stamp',
      type: 'image',
      label: 'Мөр орны',
      src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=200', // backup or we can draw custom stamp
      x: 65,
      y: 78,
      width: 10,
      opacity: 0.85,
      rotation: 12,
      visible: true
    },
    {
      id: 'signature',
      type: 'image',
      label: 'Қолтаңба',
      src: 'https://images.unsplash.com/photo-1578301978018-3005759f48f3?auto=format&fit=crop&q=80&w=200',
      x: 35,
      y: 73,
      width: 12,
      opacity: 0.9,
      rotation: -5,
      visible: true
    },
    {
      id: 'watermark',
      type: 'watermark',
      label: 'Су белгісі',
      text: 'QAZCERTIFICATE',
      x: 50,
      y: 50,
      width: 60,
      fontSize: 72,
      fontFamily: 'Montserrat',
      fontColor: primaryColor === '#ffffff' ? '#ffffff' : '#000000',
      opacity: 0.04,
      rotation: 315,
      visible: true
    }
  ];

  return elements;
}

// Generates 50+ diverse and beautiful templates
export function generateTemplates(): CertificateTemplate[] {
  const templates: CertificateTemplate[] = [];

  const certificateCategories: TemplateCategory[] = [
    'Мұғалім', 'Тәрбиеші', 'Мектеп', 'Балабақша', 'Семинар', 
    'Олимпиада', 'Байқау', 'Конкурс', 'Онлайн курс', 'Қатысушы', 
    'Жеңімпаз', 'Ұйымдастырушы', 'Волонтер', 'Спорт', 'Мемлекеттік', 
    'Классикалық', 'Минималистік', 'Заманауи'
  ];

  const diplomaCategories: TemplateCategory[] = [
    'І орын', 'ІІ орын', 'ІІІ орын', 'Бас жүлде', 'Алғыс хат', 
    'Мадақтама', 'Құрмет грамотасы'
  ];

  // Colors combinations for variety
  const themes = [
    { bg: '#faf8f2', primary: '#0f172a', secondary: '#9a3412', border: 'classic', label: 'Алтын Классика' },
    { bg: '#0f172a', primary: '#ffffff', secondary: '#eab308', border: 'double', label: 'Түнгі Көк' },
    { bg: '#ffffff', primary: '#1e293b', secondary: '#0f766e', border: 'modern', label: 'Заманауи Изумруд' },
    { bg: '#f8fafc', primary: '#0f172a', secondary: '#1d4ed8', border: 'solid', label: 'Минимал Сапфир' },
    { bg: '#fefbf3', primary: '#1c1917', secondary: '#854d0e', border: 'classic', label: 'Табиғи Охра' },
    { bg: '#064e3b', primary: '#ffffff', secondary: '#facc15', border: 'double', label: 'Көркем Изумруд' },
  ];

  let templateIdCounter = 1;

  // Let's generate 2 templates per certificate category = 36 templates
  certificateCategories.forEach((cat) => {
    for (let variant = 1; variant <= 2; variant++) {
      const theme = themes[(templateIdCounter) % themes.length];
      const isAlt = variant === 2;
      const titleText = isAlt ? `${cat} мақтау қағазы` : `${cat} сертификаты`;
      const id = `cert-${cat.toLowerCase().replace(/\s+/g, '-')}-${variant}`;
      
      const elements = generateDefaultElements('certificate', cat, titleText, theme.primary, theme.secondary);
      
      templates.push({
        id,
        title: `${cat} - ${theme.label} нұсқасы (№${variant})`,
        category: cat,
        type: 'certificate',
        thumbnail: theme.bg, // dynamically rendered in UI
        canvasBg: theme.bg,
        borderColor: theme.secondary,
        borderStyle: theme.border as 'solid' | 'double' | 'classic' | 'modern' | 'none',
        elements,
        primaryColor: theme.primary,
        secondaryColor: theme.secondary,
        isPremium: false
      });
      templateIdCounter++;
    }
  });

  // Let's generate 2 templates per diploma category = 14 templates
  // Total = 36 + 14 = 50 templates! Exactly 50. Let's do even 3 for some to be 52 templates.
  diplomaCategories.forEach((cat) => {
    for (let variant = 1; variant <= 2; variant++) {
      const theme = themes[(templateIdCounter + 3) % themes.length];
      const titleText = cat;
      const id = `dipl-${cat.toLowerCase().replace(/\s+/g, '-')}-${variant}`;
      
      const elements = generateDefaultElements('diploma', cat, titleText, theme.primary, theme.secondary);
      
      templates.push({
        id,
        title: `${cat} - ${theme.label} стилі (№${variant})`,
        category: cat,
        type: 'diploma',
        thumbnail: theme.bg,
        canvasBg: theme.bg,
        borderColor: theme.secondary,
        borderStyle: theme.border as 'solid' | 'double' | 'classic' | 'modern' | 'none',
        elements,
        primaryColor: theme.primary,
        secondaryColor: theme.secondary,
        isPremium: false
      });
      templateIdCounter++;
    }
  });

  // Add 2 more to bring total to 52 (over 50 templates)
  const bonusCategories: {cat: TemplateCategory, type: TemplateType}[] = [
    { cat: 'Заманауи', type: 'certificate' },
    { cat: 'Құрмет грамотасы', type: 'diploma' }
  ];

  bonusCategories.forEach(({cat, type}) => {
    const theme = themes[1]; // Dark royal theme
    const id = `bonus-${cat.toLowerCase().replace(/\s+/g, '-')}-special`;
    const titleText = type === 'certificate' ? `${cat} арнайы сертификаты` : `${cat} (Үздік Нұсқа)`;
    const elements = generateDefaultElements(type, cat, titleText, theme.primary, theme.secondary);
    
    templates.push({
      id,
      title: `${cat} - Таңдаулы Патша Көк`,
      category: cat,
      type,
      thumbnail: theme.bg,
      canvasBg: theme.bg,
      borderColor: theme.secondary,
      borderStyle: 'double',
      elements,
      primaryColor: theme.primary,
      secondaryColor: theme.secondary,
      isPremium: true
    });
  });

  return templates;
}

export const PRESET_TEMPLATES = generateTemplates();
