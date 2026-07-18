/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ElementType = 'text' | 'image' | 'qr' | 'watermark' | 'border' | 'background';

export interface EditableElement {
  id: string;
  type: ElementType;
  label: string; // Kazakh label
  text?: string;
  src?: string; // Image base64 or SVG data
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  width: number; // percentage of canvas width (0 - 100)
  height?: number; // percentage of canvas height or automatically derived
  fontSize?: number; // in pixels (relative to canvas scale)
  fontFamily?: string;
  fontColor?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  letterSpacing?: number; // in tracking em or px
  lineHeight?: number;
  alignment?: 'left' | 'center' | 'right';
  shadow?: boolean;
  shadowColor?: string;
  opacity?: number; // 0 to 1
  rotation?: number; // 0 to 360
  visible: boolean;
  isLocked?: boolean;
}

export type TemplateCategory =
  | 'Мұғалім'
  | 'Тәрбиеші'
  | 'Мектеп'
  | 'Балабақша'
  | 'Семинар'
  | 'Олимпиада'
  | 'Байқау'
  | 'Конкурс'
  | 'Онлайн курс'
  | 'Қатысушы'
  | 'Жеңімпаз'
  | 'Ұйымдастырушы'
  | 'Волонтер'
  | 'Спорт'
  | 'Мемлекеттік'
  | 'Классикалық'
  | 'Минималистік'
  | 'Заманауи'
  // Diploma categories:
  | 'І орын'
  | 'ІІ орын'
  | 'ІІІ орын'
  | 'Бас жүлде'
  | 'Алғыс хат'
  | 'Мадақтама'
  | 'Құрмет грамотасы';

export type TemplateType = 'certificate' | 'diploma';

export interface CertificateTemplate {
  id: string;
  title: string; // Kazakh title
  category: TemplateCategory;
  type: TemplateType;
  isPremium?: boolean;
  thumbnail: string; // Preview image or SVG representation
  canvasBg: string; // Background color or CSS gradient
  borderColor: string;
  borderStyle: 'solid' | 'double' | 'classic' | 'modern' | 'none';
  elements: EditableElement[];
  watermarkIcon?: string; // Icon name from lucide or SVG path
  primaryColor: string;
  secondaryColor: string;
}

export interface SavedProject {
  id: string;
  title: string;
  lastUpdated: string;
  canvasBg: string;
  borderColor: string;
  borderStyle: 'solid' | 'double' | 'classic' | 'modern' | 'none';
  primaryColor: string;
  secondaryColor: string;
  elements: EditableElement[];
  type: TemplateType;
  templateId: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
