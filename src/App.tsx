/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Hero from './components/Hero';
import TemplateSelector from './components/TemplateSelector';
import CertificateEditor from './components/CertificateEditor';
import HistoryManager from './components/HistoryManager';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import { CertificateTemplate, SavedProject } from './types';
import { PRESET_TEMPLATES } from './data/templates';

export default function App() {
  // Navigation / Routing
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeProject, setActiveProject] = useState<SavedProject | null>(null);

  // Theme (Dark Mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? saved === 'true' : false;
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // History Projects
  const [projects, setProjects] = useState<SavedProject[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply dark mode CSS class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist Projects
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Favorite toggler
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Select template to open in editor
  const handleSelectTemplate = (template: CertificateTemplate) => {
    // Generate a fresh unique project state based on the template
    const newProject: SavedProject = {
      id: `proj-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `${template.category} - ${template.title}`,
      lastUpdated: new Date().toISOString(),
      canvasBg: template.canvasBg,
      borderColor: template.borderColor,
      borderStyle: template.borderStyle,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      elements: JSON.parse(JSON.stringify(template.elements)), // deep clone
      type: template.type,
      templateId: template.id
    };
    
    setActiveProject(newProject);
    setCurrentPage('editor');
  };

  // Open existing project from history
  const handleOpenProject = (project: SavedProject) => {
    setActiveProject(project);
    setCurrentPage('editor');
  };

  // Save/Update project in history
  const handleSaveProject = (updatedProject: SavedProject) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === updatedProject.id);
      if (exists) {
        return prev.map((p) => (p.id === updatedProject.id ? updatedProject : p));
      } else {
        return [updatedProject, ...prev];
      }
    });
    alert('Жоба сәтті сақталды!');
  };

  // Delete project from history
  const handleDeleteProject = (id: string) => {
    if (confirm('Жобаны жоюды растайсыз ба? Бұл әрекетті қайтару мүмкін емес.')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Duplicate existing project
  const handleDuplicateProject = (project: SavedProject) => {
    const duplicated: SavedProject = {
      ...JSON.parse(JSON.stringify(project)),
      id: `proj-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `${project.title} (Көшірме)`,
      lastUpdated: new Date().toISOString()
    };
    setProjects((prev) => [duplicated, ...prev]);
  };

  // Extract top templates to feature on homepage
  const featuredTemplates = useMemo(() => {
    return PRESET_TEMPLATES.filter((t) => t.isPremium).slice(0, 3);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* SEO Optimizations Meta Tags */}
      <SEO
        title={
          currentPage === 'home'
            ? 'Сертификат және диплом жасау'
            : currentPage === 'editor'
            ? 'Редактор'
            : currentPage === 'templates'
            ? 'Дайын Үлгілер жинағы'
            : currentPage === 'history'
            ? 'Сақталған жобаларым'
            : currentPage === 'about'
            ? 'Платформа туралы'
            : 'Кәсіби Конструктор'
        }
        description="QazCertificate - Бірнеше минут ішінде кәсіби сертификаттар, дипломдар, алғыс хаттар және марапат қағаздарын қазақ тілінде тегін жасаңыз."
      />

      {/* Header section */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        historyCount={projects.length}
      />

      {/* Main Pages router content container */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Hero
            setCurrentPage={setCurrentPage}
            featuredTemplates={featuredTemplates}
            handleSelectTemplate={handleSelectTemplate}
          />
        )}

        {currentPage === 'templates' && (
          <TemplateSelector
            onSelectTemplate={handleSelectTemplate}
            favorites={favorites}
            toggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'editor' && activeProject && (
          <CertificateEditor
            initialTemplate={activeProject}
            onBack={() => {
              // Redirect back to templates page or project list
              setCurrentPage('templates');
              setActiveProject(null);
            }}
            onSave={handleSaveProject}
          />
        )}

        {currentPage === 'history' && (
          <HistoryManager
            projects={projects}
            onOpenProject={handleOpenProject}
            onDeleteProject={handleDeleteProject}
            onDuplicateProject={handleDuplicateProject}
          />
        )}

        {currentPage === 'about' && <About />}

        {currentPage === 'faq' && <FAQ />}

        {currentPage === 'contact' && <Contact />}

        {currentPage === 'privacy' && <TermsAndPrivacy type="privacy" />}

        {currentPage === 'terms' && <TermsAndPrivacy type="terms" />}
      </main>

      {/* Footer section */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
