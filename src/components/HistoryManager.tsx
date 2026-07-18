/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trash2, Edit3, Copy, FolderOpen, Award } from 'lucide-react';
import { SavedProject } from '../types';

interface HistoryManagerProps {
  projects: SavedProject[];
  onOpenProject: (project: SavedProject) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (project: SavedProject) => void;
}

export default function HistoryManager({
  projects,
  onOpenProject,
  onDeleteProject,
  onDuplicateProject
}: HistoryManagerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      <div className="text-center space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Менің сақталған жобаларым
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Браузер жадында автоматты түрде сақталған құжаттарыңыздың тізімі. Жобаларды кез келген уақытта қайта ашып, көшірмесін жасап немесе өшіре аласыз.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="py-20 text-center space-y-6 rounded-2xl bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850">
          <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Сақталған жобалар жоқ</h3>
            <p className="text-sm text-gray-550 dark:text-gray-450 max-w-sm mx-auto">
              Қазірше ешқандай сертификат немесе диплом өңдеп сақтамадыңыз. Конструктор арқылы жаңа макет жасауды бастаңыз.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              id={`project-card-${project.id}`}
            >
              {/* Miniature Layout Preview of Canvas Colors */}
              <div
                className="aspect-video w-full flex flex-col items-center justify-center p-6 relative select-none"
                style={{ background: project.canvasBg }}
              >
                <div
                  className="absolute inset-2 border-2 rounded pointer-events-none opacity-40"
                  style={{
                    borderColor: project.borderColor,
                    borderStyle: project.borderStyle === 'double' ? 'double' : 'solid'
                  }}
                ></div>

                <Award className="w-8 h-8 mb-2" style={{ color: project.secondaryColor }} />
                <span
                  className="font-display text-[10px] font-extrabold text-center tracking-wider"
                  style={{ color: project.primaryColor }}
                >
                  {project.type === 'certificate' ? 'СЕРТИФИКАТ' : 'ДИПЛОМ'}
                </span>
                <span className="text-[8px] mt-1 opacity-70" style={{ color: project.primaryColor }}>
                  {project.title}
                </span>
              </div>

              {/* Card Footer details */}
              <div className="p-5 border-t border-gray-100 dark:border-slate-900 space-y-4">
                <div>
                  <h3 className="font-sans font-bold text-gray-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 block mt-0.5">
                    Өзгертілді: {new Date(project.lastUpdated).toLocaleDateString('kk-KZ')} {new Date(project.lastUpdated).toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-50 dark:border-slate-900 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="flex items-center gap-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors"
                    title="Өңдеу"
                    id={`open-project-btn-${project.id}`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Өңдеу</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDuplicateProject(project)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg transition-colors"
                      title="Көшірмесін жасау"
                      id={`duplicate-project-btn-${project.id}`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-2 text-gray-550 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                      title="Жою"
                      id={`delete-project-btn-${project.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
