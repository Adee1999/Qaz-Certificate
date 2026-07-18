/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Heart, Award, FileText, Star, Trash2 } from 'lucide-react';
import { CertificateTemplate, TemplateCategory, TemplateType } from '../types';
import { PRESET_TEMPLATES } from '../data/templates';

interface TemplateSelectorProps {
  onSelectTemplate: (template: CertificateTemplate) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function TemplateSelector({
  onSelectTemplate,
  favorites,
  toggleFavorite
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'certificate' | 'diploma' | 'favorites'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Grouped Categories list
  const categories: { label: string; value: string }[] = useMemo(() => {
    const list = [
      { label: 'Барлық санаттар', value: 'all' },
      // Certificate categories
      { label: 'Мұғалім', value: 'Мұғалім' },
      { label: 'Тәрбиеші', value: 'Тәрбиеші' },
      { label: 'Мектеп', value: 'Мектеп' },
      { label: 'Балабақша', value: 'Балабақша' },
      { label: 'Семинар', value: 'Семинар' },
      { label: 'Олимпиада', value: 'Олимпиада' },
      { label: 'Байқау', value: 'Байқау' },
      { label: 'Конкурс', value: 'Конкурс' },
      { label: 'Онлайн курс', value: 'Онлайн курс' },
      { label: 'Қатысушы', value: 'Қатысушы' },
      { label: 'Жеңімпаз', value: 'Жеңімпаз' },
      { label: 'Ұйымдастырушы', value: 'Ұйымдастырушы' },
      { label: 'Волонтер', value: 'Волонтер' },
      { label: 'Спорт', value: 'Спорт' },
      { label: 'Мемлекеттік', value: 'Мемлекеттік' },
      { label: 'Классикалық', value: 'Классикалық' },
      { label: 'Минималистік', value: 'Минималистік' },
      { label: 'Заманауи', value: 'Заманауи' },
      // Diploma categories
      { label: 'І орын', value: 'І орын' },
      { label: 'ІІ орын', value: 'ІІ орын' },
      { label: 'ІІІ орын', value: 'ІІІ орын' },
      { label: 'Бас жүлде', value: 'Бас жүлде' },
      { label: 'Алғыс хат', value: 'Алғыс хат' },
      { label: 'Мадақтама', value: 'Мадақтама' },
      { label: 'Құрмет грамотасы', value: 'Құрмет грамотасы' }
    ];
    return list;
  }, []);

  // Filter templates based on choices
  const filteredTemplates = useMemo(() => {
    return PRESET_TEMPLATES.filter((tpl) => {
      // 1. Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        tpl.title.toLowerCase().includes(query) ||
        tpl.category.toLowerCase().includes(query);

      // 2. Type Tabs
      let matchesType = true;
      if (selectedType === 'certificate') {
        matchesType = tpl.type === 'certificate';
      } else if (selectedType === 'diploma') {
        matchesType = tpl.type === 'diploma';
      } else if (selectedType === 'favorites') {
        matchesType = favorites.includes(tpl.id);
      }

      // 3. Category Dropdown/Chips
      const matchesCategory =
        selectedCategory === 'all' || tpl.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory, favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      {/* Title section */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Дайын шаблондар жинағы
        </h1>
        <p className="text-sm text-gray-650 dark:text-gray-400 max-w-2xl mx-auto">
          Қажетті санатты таңдап, дайын стильді ашыңыз және оны өзіңізге қарай жылдам баптаңыз. Барлығы 50-ден астам таңдаулы дизайн.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Inputs */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Шаблон атауын немесе санатты іздеу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:outline-none transition-all text-sm dark:text-white"
              id="search-templates-input"
            />
          </div>

          {/* Category Select Dropdown */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:outline-none transition-all text-sm dark:text-white font-semibold cursor-pointer"
              id="category-filter-select"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="dark:bg-slate-950">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type selector tabs */}
        <div className="flex flex-wrap gap-2 border-t border-gray-100 dark:border-slate-900 pt-4">
          {[
            { id: 'all', label: 'Барлығы' },
            { id: 'certificate', label: 'Сертификаттар' },
            { id: 'diploma', label: 'Дипломдар' },
            { id: 'favorites', label: 'Таңдаулылар' }
          ].map((tab) => {
            const isActive = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300 hover:bg-gray-250 dark:hover:bg-slate-800'
                }`}
                id={`type-tab-${tab.id}`}
              >
                {tab.id === 'favorites' ? `❤️ ${tab.label} (${favorites.length})` : tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of templates */}
      {filteredTemplates.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850">
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto" />
          <h3 className="text-xl font-bold text-gray-950 dark:text-white">Шаблондар табылмады</h3>
          <p className="text-sm text-gray-550 dark:text-gray-450 max-w-sm mx-auto">
            Өкінішке орай, сіз енгізген іздеу шарттарына сәйкес келетін макет табылмады. Санатты немесе іздеу кілт сөзін өзгертіп көріңіз.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const isFav = favorites.includes(template.id);
            return (
              <div
                key={template.id}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                id={`template-item-card-${template.id}`}
              >
                {/* Visual Representation */}
                <div
                  className="aspect-video w-full flex flex-col items-center justify-center p-6 relative select-none"
                  style={{ background: template.canvasBg }}
                >
                  {/* Miniature Border ornament */}
                  <div
                    className="absolute inset-2 border-2 rounded pointer-events-none opacity-40"
                    style={{
                      borderColor: template.borderColor,
                      borderStyle: template.borderStyle === 'double' ? 'double' : 'solid'
                    }}
                  ></div>

                  <Award className="w-10 h-10 mb-2" style={{ color: template.secondaryColor }} />
                  <span
                    className="font-display text-xs font-extrabold text-center tracking-wider"
                    style={{ color: template.primaryColor }}
                  >
                    {template.category.toUpperCase()}
                  </span>
                  <span className="text-[9px] mt-1 opacity-70" style={{ color: template.primaryColor }}>
                    {template.type === 'certificate' ? 'СЕРТИФИКАТ' : 'ДИПЛОМ'}
                  </span>

                  {/* Favorite button float */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(template.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 shadow hover:scale-110 active:scale-95 transition-all text-red-500"
                    id={`fav-star-${template.id}`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                {/* Footer details of card */}
                <div className="p-5 border-t border-gray-100 dark:border-slate-900 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                        {template.category}
                      </span>
                      {template.isPremium && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 text-[8px] font-bold rounded bg-indigo-600 text-white">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Таңдаулы
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {template.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-900 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                      {template.type === 'certificate' ? 'Сертификат үлгісі' : 'Диплом үлгісі'}
                    </span>
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-slate-100 text-white font-bold text-xs rounded-lg transition-all"
                      id={`edit-template-btn-${template.id}`}
                    >
                      Редакторда ашу
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
