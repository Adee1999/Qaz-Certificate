/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Award, Moon, Sun, Menu, X, FileText, History, Info, HelpCircle, Mail, Heart } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  favoritesCount: number;
  historyCount: number;
}

export default function Header({
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode,
  favoritesCount,
  historyCount
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Басты бет', icon: Award },
    { id: 'templates', label: 'Үлгілер', icon: FileText },
    { id: 'history', label: 'Жобаларым', icon: History, count: historyCount },
    { id: 'about', label: 'Біз туралы', icon: Info },
    { id: 'faq', label: 'Сұрақ-жауап', icon: HelpCircle },
    { id: 'contact', label: 'Байланыс', icon: Mail },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur no-print transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="logo-container"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
              QazCertificate
            </span>
            <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-medium -mt-1 tracking-wider uppercase">
              Отандық конструктор
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-900'
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {item.count !== undefined && item.count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white leading-none">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Favorites Badge */}
          <button
            onClick={() => handleNavClick('templates')}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors relative"
            title="Таңдаулы үлгілер"
            id="fav-btn"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold rounded-full bg-red-500 text-white flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900"
            title={darkMode ? 'Жарық режим' : 'Түнгі режим'}
            id="theme-toggle-btn"
          >
            {darkMode ? <Sun className="w-5 h-5 text-indigo-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-slate-950 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900'
                  }`}
                  id={`nav-mobile-${item.id}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
