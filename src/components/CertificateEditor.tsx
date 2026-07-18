/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import {
  Save,
  Download,
  Printer,
  Undo,
  Type,
  Image as ImageIcon,
  Palette,
  Layout,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Calendar,
  Layers,
  ArrowLeft,
  Eye,
  Settings,
  Lock,
  Unlock,
  Trash2
} from 'lucide-react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CertificateTemplate, EditableElement, SavedProject, TemplateType } from '../types';
import { FONT_OPTIONS } from '../data/templates';

interface CertificateEditorProps {
  initialTemplate: CertificateTemplate | SavedProject;
  onBack: () => void;
  onSave: (project: SavedProject) => void;
}

export default function CertificateEditor({
  initialTemplate,
  onBack,
  onSave
}: CertificateEditorProps) {
  // We'll manage the project state locally
  const [projectTitle, setProjectTitle] = useState(initialTemplate.title);
  const [canvasBg, setCanvasBg] = useState(initialTemplate.canvasBg);
  const [borderColor, setBorderColor] = useState(initialTemplate.borderColor);
  const [borderStyle, setBorderStyle] = useState(initialTemplate.borderStyle);
  const [primaryColor, setPrimaryColor] = useState(initialTemplate.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(initialTemplate.secondaryColor);
  const [elements, setElements] = useState<EditableElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // View states
  const [zoom, setZoom] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'text_fields' | 'styling' | 'media' | 'export'>('text_fields');
  const [isGenerating, setIsGenerating] = useState(false);

  // References
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging and Resizing State
  const dragStartRef = useRef<{ x: number; y: number; elementX: number; elementY: number } | null>(null);
  const resizeStartRef = useRef<{ x: number; width: number; fontSize?: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Load elements initially and handle QR code conversion
  useEffect(() => {
    // deep clone elements to prevent mutating references
    const clonedElements = JSON.parse(JSON.stringify(initialTemplate.elements)) as EditableElement[];
    setElements(clonedElements);
    
    // Regenerate QR code if present
    clonedElements.forEach((el) => {
      if (el.type === 'qr' && el.text) {
        regenerateQRCodeForElement(el.id, el.text);
      }
    });
  }, [initialTemplate]);

  // Helper to regenerate QR code base64 URL
  const regenerateQRCodeForElement = (elId: string, textValue: string) => {
    QRCode.toDataURL(
      textValue,
      {
        width: 250,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      },
      (err, url) => {
        if (!err && url) {
          setElements((prev) =>
            prev.map((el) => (el.id === elId ? { ...el, src: url } : el))
          );
        }
      }
    );
  };

  // Auto-generate Certificate Number
  const handleAutoGenerateNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const dateYear = new Date().getFullYear();
    const newNum = `QC-${dateYear}-${randomNum}`;
    updateElementValue('certNumber', 'text', `№ ${newNum}`);
    // Also update QR code link to match new number
    updateElementValue('qr', 'text', `https://qazcert.kz/verify/${newNum}`);
  };

  // Set today's date
  const handleSetTodayDate = () => {
    const months = [
      'қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
      'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'
    ];
    const today = new Date();
    const formattedDate = `Күні: ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} жыл`;
    updateElementValue('date', 'text', formattedDate);
  };

  // Helper to update individual properties of an element
  const updateElementValue = (id: string, key: keyof EditableElement, value: any) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          const updated = { ...el, [key]: value };
          // If it's the QR code and the text changed, regenerate QR
          if (el.type === 'qr' && key === 'text') {
            regenerateQRCodeForElement(id, value);
          }
          return updated;
        }
        return el;
      })
    );
  };

  // Select element on clicking it on canvas
  const handleElementSelect = (id: string, e: ReactMouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(id);
  };

  // Drag & drop element handlers (supports percentage mapping so it stays responsive!)
  const handleDragStart = (id: string, e: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = elements.find((x) => x.id === id);
    if (!el || el.isLocked) return;

    setSelectedElementId(id);
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    dragStartRef.current = {
      x: clientX,
      y: clientY,
      elementX: el.x,
      elementY: el.y
    };
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !dragStartRef.current || !selectedElementId || !canvasRef.current) return;

    const el = elements.find((x) => x.id === selectedElementId);
    if (!el) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    const canvasRect = canvasRef.current.getBoundingClientRect();

    // Convert pixels drag to percentage of canvas size
    const percentDeltaX = (deltaX / canvasRect.width) * 100;
    const percentDeltaY = (deltaY / canvasRect.height) * 100;

    let newX = Math.min(Math.max(dragStartRef.current.elementX + percentDeltaX, 0), 100);
    let newY = Math.min(Math.max(dragStartRef.current.elementY + percentDeltaY, 0), 100);

    // Round for snaps
    newX = Math.round(newX * 10) / 10;
    newY = Math.round(newY * 10) / 10;

    updateElementValue(selectedElementId, 'x', newX);
    updateElementValue(selectedElementId, 'y', newY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Resizing handler
  const handleResizeStart = (id: string, e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = elements.find((x) => x.id === id);
    if (!el || el.isLocked) return;

    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      width: el.width,
      fontSize: el.fontSize
    };
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !resizeStartRef.current || !selectedElementId || !canvasRef.current) return;

    const el = elements.find((x) => x.id === selectedElementId);
    if (!el) return;

    const deltaX = e.clientX - resizeStartRef.current.x;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const percentDeltaX = (deltaX / canvasRect.width) * 100;

    const newWidth = Math.min(Math.max(resizeStartRef.current.width + percentDeltaX, 5), 100);
    updateElementValue(selectedElementId, 'width', Math.round(newWidth));

    // If it is a text element, optionally scale font size slightly for a better visual scaling feel
    if (el.type === 'text' && resizeStartRef.current.fontSize) {
      const scaleRatio = newWidth / resizeStartRef.current.width;
      const newFontSize = Math.min(Math.max(resizeStartRef.current.fontSize * scaleRatio, 8), 120);
      updateElementValue(selectedElementId, 'fontSize', Math.round(newFontSize));
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    resizeStartRef.current = null;
  };

  // Universal event listeners for mouse moves during drag/resize
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        handleDragMove(e);
      } else if (isResizing && 'clientX' in e) {
        handleResizeMove(e);
      }
    };

    const onEnd = () => {
      handleDragEnd();
      handleResizeEnd();
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, isResizing, selectedElementId, elements]);

  // Image upload handler (base64 converter) for stamp, signature, logo, backgrounds
  const handleImageUpload = (elId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateElementValue(elId, 'src', e.target.result as string);
        updateElementValue(elId, 'visible', true);
      }
    };
    reader.readAsDataURL(file);
  };

  // Zoom Fit Screen
  const handleZoomFit = () => {
    if (containerRef.current && canvasRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48; // padding
      const containerHeight = containerRef.current.clientHeight - 48;
      
      // A4 is 1.4142 wide relative to height
      const desiredWidth = containerHeight * 1.4142;
      let targetZoom = 100;
      
      if (desiredWidth <= containerWidth) {
        targetZoom = (containerHeight / 650) * 100; // base height of canvas is roughly 650px
      } else {
        targetZoom = (containerWidth / 920) * 100; // base width is roughly 920px
      }
      setZoom(Math.min(Math.max(Math.round(targetZoom), 30), 150));
    }
  };

  // Zoom Full Screen Toggle
  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Download high-quality A4 image
  const handleDownloadImage = async (format: 'png' | 'jpg') => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    setSelectedElementId(null); // deselect to remove selection borders

    // Wait a brief tick for render
    await new Promise((r) => setTimeout(r, 150));

    try {
      // html2canvas options for super crisp 300 DPI results (scale up elements!)
      const canvas = await html2canvas(canvasRef.current, {
        scale: 4, // 4x scale gives ultra sharp 300 DPI high resolution outputs!
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const fileExtension = format;
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const imgData = canvas.toDataURL(mimeType, 0.95);

      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${projectTitle.replace(/\s+/g, '_') || 'certificate'}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Кескінді жүктеу қатесі:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download high-quality A4 PDF
  const handleDownloadPDF = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    setSelectedElementId(null);

    await new Promise((r) => setTimeout(r, 150));

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 3.5, // Crisp resolution scaling
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Landscape A4 size in points: 842 x 595 (width x height)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4'
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 842, 595, undefined, 'FAST');
      pdf.save(`${projectTitle.replace(/\s+/g, '_') || 'certificate'}.pdf`);
    } catch (err) {
      console.error('PDF жүктеу қатесі:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download SVG
  const handleDownloadSVG = () => {
    // Generate a simple vector representation
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1414 1000" width="100%" height="100%">
        <rect width="1414" height="1000" fill="${canvasBg}" />
        <rect x="20" y="20" width="1374" height="960" fill="none" stroke="${borderColor}" stroke-width="12" />
        <text x="707" y="200" text-anchor="middle" font-family="Cinzel, serif" font-size="52" fill="${secondaryColor}" font-weight="bold">${projectTitle.toUpperCase()}</text>
        <text x="707" y="450" text-anchor="middle" font-family="Playfair Display, serif" font-size="42" fill="${primaryColor}">Алушының Аты-жөні</text>
        <text x="707" y="600" text-anchor="middle" font-family="Inter, sans-serif" font-size="20" fill="${primaryColor}" opacity="0.8">Қазақстан Республикасы марапаты</text>
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${projectTitle.replace(/\s+/g, '_') || 'certificate'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Browser Print trigger (completely seamless due to CSS @media print!)
  const handlePrint = () => {
    setSelectedElementId(null);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Save changes locally
  const handleSaveProject = () => {
    const updatedProject: SavedProject = {
      id: initialTemplate.id,
      title: projectTitle,
      lastUpdated: new Date().toISOString(),
      canvasBg,
      borderColor,
      borderStyle,
      primaryColor,
      secondaryColor,
      elements,
      type: (initialTemplate as any).type || 'certificate',
      templateId: (initialTemplate as any).templateId || initialTemplate.id
    };
    onSave(updatedProject);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      
      {/* 1. LEFT SIDEBAR: Controls & Settings */}
      <aside className="w-full lg:w-96 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shrink-0 no-print">
        {/* Navigation / Header */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-900 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-1 text-xs font-bold"
            id="editor-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Артқа</span>
          </button>
          
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="text-sm font-bold text-gray-800 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 text-center truncate max-w-[150px]"
            title="Жоба атауы"
            id="editor-project-title"
          />

          <button
            onClick={handleSaveProject}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow transition-colors cursor-pointer"
            id="editor-save-btn"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Сақтау</span>
          </button>
        </div>

        {/* Control Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-900">
          {[
            { id: 'text_fields', label: 'Деректер', icon: Type },
            { id: 'styling', label: 'Стильдер', icon: Palette },
            { id: 'media', label: 'Суреттер', icon: ImageIcon },
            { id: 'export', label: 'Экспорт', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-xs font-bold flex flex-col items-center gap-1 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-450 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
                id={`tab-btn-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: QUICK TEXT DATA FIELDS */}
          {activeTab === 'text_fields' && (
            <div className="space-y-4 animate-fade-in" id="panel-text-fields">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Құжат мәтіндері</span>
                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded font-bold">Лезде өзгереді</span>
              </div>

              {/* Elements form inputs */}
              {elements.filter((el) => el.type === 'text' && el.id !== 'watermark').map((el) => (
                <div key={el.id} className="space-y-1.5" id={`input-group-${el.id}`}>
                  <div className="flex items-center justify-between">
                    <label htmlFor={`input-${el.id}`} className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <span>{el.label}</span>
                      <button
                        onClick={() => updateElementValue(el.id, 'visible', !el.visible)}
                        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors ${el.visible ? 'text-indigo-600' : 'text-gray-350'}`}
                        title={el.visible ? 'Көрінеді' : 'Жасырылған'}
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </label>

                    {/* Auto tools */}
                    {el.id === 'certNumber' && (
                      <button
                        onClick={handleAutoGenerateNumber}
                        className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Авто-нөмір</span>
                      </button>
                    )}
                    {el.id === 'date' && (
                      <button
                        onClick={handleSetTodayDate}
                        className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                      >
                        <Calendar className="w-2.5 h-2.5" />
                        <span>Бүгінгі күн</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    id={`input-${el.id}`}
                    value={el.text || ''}
                    disabled={!el.visible}
                    onChange={(e) => updateElementValue(el.id, 'text', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:outline-none transition-all text-xs dark:text-white font-medium"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: DETAILED STYLING & COLORS */}
          {activeTab === 'styling' && (
            <div className="space-y-6 animate-fade-in" id="panel-styling">
              {/* General Colors */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Негізгі бояулар</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Өң түсі (Background)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={canvasBg.startsWith('#') ? canvasBg : '#faf8f2'}
                        onChange={(e) => setCanvasBg(e.target.value)}
                        className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={canvasBg}
                        onChange={(e) => setCanvasBg(e.target.value)}
                        className="flex-1 px-2.5 text-xs rounded border border-gray-200 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Жиек түсі (Border)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-1 px-2.5 text-xs rounded border border-gray-200 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Негізгі мәтін түсі</label>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full h-8 rounded border border-gray-200 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Екпінді алтын түс</label>
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-full h-8 rounded border border-gray-200 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Border Styles */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Жиектеме стилі</span>
                <select
                  value={borderStyle}
                  onChange={(e) => setBorderStyle(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 bg-transparent dark:text-white text-xs font-semibold cursor-pointer"
                  id="border-style-select"
                >
                  <option value="classic" className="dark:bg-slate-950">Классикалық өрнек (Classic)</option>
                  <option value="double" className="dark:bg-slate-950">Қос жиек (Double)</option>
                  <option value="solid" className="dark:bg-slate-950">Жай жиек (Solid)</option>
                  <option value="modern" className="dark:bg-slate-950">Заманауи бұрыш (Modern)</option>
                  <option value="none" className="dark:bg-slate-950">Жиексіз (None)</option>
                </select>
              </div>

              {/* Selected Element Specific Typography Styles */}
              {selectedElementId ? (
                (() => {
                  const el = elements.find((x) => x.id === selectedElementId);
                  if (!el || el.type !== 'text') return null;
                  return (
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-900 animate-fade-in" id="element-text-styling">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-650 uppercase tracking-wider flex items-center gap-1">
                          <Settings className="w-3.5 h-3.5" />
                          <span>{el.label} баптауы</span>
                        </span>
                        <button
                          onClick={() => updateElementValue(el.id, 'isLocked', !el.isLocked)}
                          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors ${el.isLocked ? 'text-red-500' : 'text-gray-400'}`}
                          title={el.isLocked ? 'Құлыпталған (жылжыту жабық)' : 'Ашық'}
                        >
                          {el.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Font Family selector */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Қаріп (Font Family)</label>
                        <select
                          value={el.fontFamily || 'Inter'}
                          onChange={(e) => updateElementValue(el.id, 'fontFamily', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-250 dark:border-slate-800 bg-transparent dark:text-white text-xs cursor-pointer"
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font} value={font} className="dark:bg-slate-950" style={{ fontFamily: font }}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Font Size & Weight & Style */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Өлшемі (Font Size)</label>
                          <input
                            type="number"
                            value={el.fontSize || 14}
                            onChange={(e) => updateElementValue(el.id, 'fontSize', parseInt(e.target.value) || 12)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-250 dark:border-slate-800 bg-transparent dark:text-white text-xs"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Мәтін түсі</label>
                          <input
                            type="color"
                            value={el.fontColor || '#000000'}
                            onChange={(e) => updateElementValue(el.id, 'fontColor', e.target.value)}
                            className="w-full h-8 rounded border border-gray-200 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Alignment & Format row */}
                      <div className="flex gap-2 items-center justify-between pt-1">
                        <div className="flex rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                          <button
                            onClick={() => updateElementValue(el.id, 'fontWeight', el.fontWeight === 'bold' ? 'normal' : 'bold')}
                            className={`p-2 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors border-r border-gray-200 dark:border-slate-800 ${el.fontWeight === 'bold' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600' : 'text-gray-500'}`}
                            title="Қалың (Bold)"
                          >
                            <Bold className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateElementValue(el.id, 'fontStyle', el.fontStyle === 'italic' ? 'normal' : 'italic')}
                            className={`p-2 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors border-r border-gray-200 dark:border-slate-800 ${el.fontStyle === 'italic' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600' : 'text-gray-500'}`}
                            title="Көлбеу (Italic)"
                          >
                            <Italic className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateElementValue(el.id, 'textDecoration', el.textDecoration === 'underline' ? 'none' : 'underline')}
                            className={`p-2 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors ${el.textDecoration === 'underline' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600' : 'text-gray-500'}`}
                            title="Асты сызылған"
                          >
                            <Underline className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                          <button
                            onClick={() => updateElementValue(el.id, 'alignment', 'left')}
                            className={`p-2 hover:bg-gray-50 dark:hover:bg-slate-900 border-r border-gray-200 dark:border-slate-800 ${el.alignment === 'left' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600' : 'text-gray-500'}`}
                            title="Сол жақ"
                          >
                            <AlignLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateElementValue(el.id, 'alignment', 'center')}
                            className={`p-2 hover:bg-gray-50 dark:hover:bg-slate-900 border-r border-gray-200 dark:border-slate-800 ${el.alignment === 'center' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600' : 'text-gray-500'}`}
                            title="Орталау"
                          >
                            <AlignCenter className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateElementValue(el.id, 'alignment', 'right')}
                            className={`p-2 hover:bg-gray-50 dark:hover:bg-slate-900 ${el.alignment === 'right' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600' : 'text-gray-500'}`}
                            title="Оң жақ"
                          >
                            <AlignRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Letter spacing & Line Height Sliders */}
                      <div className="space-y-3 pt-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-gray-500">
                            <span>Әріп аралығы (Letter Spacing)</span>
                            <span>{el.letterSpacing || 0}px</span>
                          </div>
                          <input
                            type="range"
                            min="-2"
                            max="12"
                            step="0.5"
                            value={el.letterSpacing || 0}
                            onChange={(e) => updateElementValue(el.id, 'letterSpacing', parseFloat(e.target.value))}
                            className="w-full accent-indigo-650"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-gray-500">
                            <span>Жол аралығы (Line Height)</span>
                            <span>{el.lineHeight || 1.2}</span>
                          </div>
                          <input
                            type="range"
                            min="0.8"
                            max="2.5"
                            step="0.1"
                            value={el.lineHeight || 1.2}
                            onChange={(e) => updateElementValue(el.id, 'lineHeight', parseFloat(e.target.value))}
                            className="w-full accent-indigo-650"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-gray-500">
                            <span>Бұрылуы (Rotation)</span>
                            <span>{el.rotation || 0}°</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={el.rotation || 0}
                            onChange={(e) => updateElementValue(el.id, 'rotation', parseInt(e.target.value))}
                            className="w-full accent-indigo-650"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-gray-500">
                            <span>Тұнықтық (Opacity)</span>
                            <span>{Math.round((el.opacity ?? 1) * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.05"
                            value={el.opacity ?? 1}
                            onChange={(e) => updateElementValue(el.id, 'opacity', parseFloat(e.target.value))}
                            className="w-full accent-indigo-650"
                          />
                        </div>
                      </div>

                      {/* Shadow & Effects Toggle */}
                      <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs font-bold text-gray-600 dark:text-gray-400">
                        <input
                          type="checkbox"
                          checked={el.shadow || false}
                          onChange={(e) => updateElementValue(el.id, 'shadow', e.target.checked)}
                          className="rounded text-indigo-600 accent-indigo-600"
                        />
                        <span>Мәтін көлеңкесі (Text Shadow)</span>
                      </label>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center p-6 border border-dashed border-gray-200 dark:border-slate-800 rounded-xl text-xs text-gray-450">
                  Баптауларды ашу үшін экрандағы кез келген мәтінді басыңыз
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEDIA UPLOADER (Stamp, Logo, Signature, QR code text) */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fade-in" id="panel-media">
              {/* QR Code configuration */}
              <div className="p-4 border border-gray-100 dark:border-slate-900 rounded-xl bg-gray-50/50 dark:bg-slate-900/20 space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Автоматты QR код</span>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">QR сілтемесі немесе мәтіні</label>
                  <input
                    type="text"
                    value={elements.find((x) => x.type === 'qr')?.text || ''}
                    onChange={(e) => {
                      const qrEl = elements.find((x) => x.type === 'qr');
                      if (qrEl) {
                        updateElementValue(qrEl.id, 'text', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none text-xs dark:text-white"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={elements.find((x) => x.type === 'qr')?.visible ?? true}
                    onChange={(e) => {
                      const qrEl = elements.find((x) => x.type === 'qr');
                      if (qrEl) {
                        updateElementValue(qrEl.id, 'visible', e.target.checked);
                      }
                    }}
                    className="rounded text-indigo-600 accent-indigo-600"
                  />
                  <span>QR кодты көрсету</span>
                </label>
              </div>

              {/* Uploads Stamps & Signature */}
              {[
                { id: 'stamp', label: 'Ресми Мөр (Stamp)', defaultSample: 'Мөр орны' },
                { id: 'signature', label: 'Қолтаңба (Signature)', defaultSample: 'Қолтаңба орны' }
              ].map((uploader) => {
                const el = elements.find((x) => x.id === uploader.id);
                return (
                  <div key={uploader.id} className="space-y-2 border-t border-gray-100 dark:border-slate-900 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{uploader.label}</span>
                      {el && (
                        <button
                          onClick={() => updateElementValue(uploader.id, 'visible', !el.visible)}
                          className={`text-xs font-bold ${el.visible ? 'text-indigo-600' : 'text-gray-400'}`}
                        >
                          {el.visible ? 'Көрініп тұр' : 'Жасырылған'}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        id={`file-${uploader.id}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(uploader.id, file);
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor={`file-${uploader.id}`}
                        className="flex-1 py-4 border border-dashed border-gray-250 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-gray-50/50 dark:bg-slate-900/50 hover:bg-indigo-600/5 hover:border-indigo-600/50 transition-all text-[11px] font-bold text-gray-500"
                      >
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                        <span>Суретті жүктеу (PNG / JPG)</span>
                      </label>
                    </div>

                    {el?.src && el.visible && (
                      <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-slate-900 rounded-lg text-xs">
                        <span className="truncate max-w-[150px] font-medium text-gray-500">Сурет жүктелді</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateElementValue(uploader.id, 'rotation', (el.rotation || 0) + 90)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded text-gray-500"
                            title="Бұру"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateElementValue(uploader.id, 'src', '')}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded text-red-500"
                            title="Өшіру"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Watermark Section */}
              <div className="border-t border-gray-100 dark:border-slate-900 pt-4 space-y-3">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Қорғаныс Су белгісі (Watermark)</span>
                {(() => {
                  const watermark = elements.find((x) => x.id === 'watermark');
                  if (!watermark) return null;
                  return (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Су белгісі мәтіні</label>
                        <input
                          type="text"
                          value={watermark.text || ''}
                          onChange={(e) => updateElementValue(watermark.id, 'text', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none text-xs dark:text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-600 dark:text-gray-400">
                          <input
                            type="checkbox"
                            checked={watermark.visible}
                            onChange={(e) => updateElementValue(watermark.id, 'visible', e.target.checked)}
                            className="rounded text-indigo-600 accent-indigo-600"
                          />
                          <span>Су белгісін белсендіру</span>
                        </label>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Тұнықтық:</span>
                          <input
                            type="range"
                            min="0.01"
                            max="0.2"
                            step="0.01"
                            value={watermark.opacity || 0.04}
                            onChange={(e) => updateElementValue(watermark.id, 'opacity', parseFloat(e.target.value))}
                            className="w-16 accent-indigo-650"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 4: HIGH RESOLUTION EXPORT CHANNELS */}
          {activeTab === 'export' && (
            <div className="space-y-4 animate-fade-in" id="panel-export">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Сақтау және жүктеу</span>

              <div className="space-y-3">
                <button
                  onClick={handlePrint}
                  disabled={isGenerating}
                  className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  id="btn-print-cmyk"
                >
                  <Printer className="w-4 h-4" />
                  <span>Басып шығару (CMYK форматы)</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-600/10"
                  id="btn-download-pdf"
                >
                  <Download className="w-4 h-4" />
                  <span>Баспаға дайындау (PDF жүктеу)</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDownloadImage('png')}
                    disabled={isGenerating}
                    className="px-4 py-2.5 bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                    id="btn-download-png"
                  >
                    <span>PNG Жоғары сапа</span>
                  </button>
                  <button
                    onClick={() => handleDownloadImage('jpg')}
                    disabled={isGenerating}
                    className="px-4 py-2.5 bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                    id="btn-download-jpg"
                  >
                    <span>JPG Сапалы</span>
                  </button>
                </div>

                <button
                  onClick={handleDownloadSVG}
                  disabled={isGenerating}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900/50 text-gray-600 dark:text-gray-300 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  id="btn-download-svg"
                >
                  <span>Векторлық SVG жүктеу</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-500/10 text-center space-y-2 text-[11px] text-gray-500 dark:text-gray-400">
                <Sparkles className="w-5 h-5 text-indigo-600 mx-auto" />
                <h4 className="font-bold text-gray-800 dark:text-white">Баспахана нұсқаулығы</h4>
                <p className="leading-relaxed">
                  Принтер параметрлерінде <strong>"Жиектерсіз" (No margins)</strong> немесе <strong>"Бетке сәйкестендіру" (Fit to page)</strong> таңдаңыз. Оңтайлы нәтиже алу үшін 200-300 г/м² тығыз қағазды пайдаланыңыз.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE / LIVE PREVIEW AREA */}
      <main className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-900 select-none overflow-hidden" id="editor-workspace-main">
        {/* Workspace Toolbar Controls */}
        <div className="h-12 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 flex items-center justify-between no-print shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(zoom - 10, 30))}
              className="p-1.5 rounded-lg text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
              title="Кішірейту"
              id="zoom-out-btn"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-gray-500 w-12 text-center select-none">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(zoom + 10, 150))}
              className="p-1.5 rounded-lg text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
              title="Үлкейту"
              id="zoom-in-btn"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomFit}
              className="px-2.5 py-1 text-[10px] font-bold rounded bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Бетке сәйкестендіру"
              id="zoom-fit-btn"
            >
              Сәйкестендіру
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleFullScreenToggle}
              className="p-1.5 rounded-lg text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
              title="Толық экран"
              id="fullscreen-toggle-btn"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Landscape A4 Canvas Stage */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto p-8 flex items-center justify-center relative cursor-default"
          onClick={() => setSelectedElementId(null)}
          id="canvas-stage-wrapper"
        >
          {/* Main Printable A4 Stage bounding-box */}
          <div
            id="certificate-print-stage"
            ref={canvasRef}
            className="print-area aspect-[1.4142] bg-white text-slate-900 shadow-2xl relative overflow-hidden transition-all shrink-0 origin-center select-none"
            style={{
              width: '920px', // base standard landscape width
              height: '650px', // base standard landscape height
              transform: `scale(${zoom / 100})`,
              background: canvasBg
            }}
          >
            {/* Dynamic Watermark Text Background layer */}
            {elements.find((x) => x.id === 'watermark')?.visible && (
              (() => {
                const watermark = elements.find((x) => x.id === 'watermark')!;
                return (
                  <div
                    className="absolute pointer-events-none select-none font-display font-black"
                    style={{
                      left: `${watermark.x}%`,
                      top: `${watermark.y}%`,
                      transform: `translate(-50%, -50%) rotate(${watermark.rotation}deg)`,
                      fontSize: `${watermark.fontSize}px`,
                      fontFamily: watermark.fontFamily,
                      color: watermark.fontColor,
                      opacity: watermark.opacity,
                      width: '100%',
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {watermark.text}
                  </div>
                );
              })()
            )}

            {/* Premium Vector Border Frames layer */}
            {borderStyle !== 'none' && (
              <div className="absolute inset-0 pointer-events-none p-4 sm:p-6" id="border-decor-frame">
                {borderStyle === 'solid' && (
                  <div
                    className="w-full h-full border-[8px]"
                    style={{ borderColor }}
                  ></div>
                )}
                {borderStyle === 'double' && (
                  <div
                    className="w-full h-full border-[12px]"
                    style={{ borderColor, borderStyle: 'double' }}
                  ></div>
                )}
                {borderStyle === 'classic' && (
                  <div
                    className="w-full h-full border-[10px] relative"
                    style={{ borderColor }}
                  >
                    {/* Classic Corner Ornaments inside the border using SVGs */}
                    <svg viewBox="0 0 100 100" className="absolute -top-1 -left-1 w-10 h-10" style={{ color: borderColor }}>
                      <path d="M 0,0 L 40,0 L 40,10 L 10,10 L 10,40 L 0,40 Z" fill="currentColor" />
                    </svg>
                    <svg viewBox="0 0 100 100" className="absolute -top-1 -right-1 w-10 h-10 rotate-90" style={{ color: borderColor }}>
                      <path d="M 0,0 L 40,0 L 40,10 L 10,10 L 10,40 L 0,40 Z" fill="currentColor" />
                    </svg>
                    <svg viewBox="0 0 100 100" className="absolute -bottom-1 -left-1 w-10 h-10 -rotate-90" style={{ color: borderColor }}>
                      <path d="M 0,0 L 40,0 L 40,10 L 10,10 L 10,40 L 0,40 Z" fill="currentColor" />
                    </svg>
                    <svg viewBox="0 0 100 100" className="absolute -bottom-1 -right-1 w-10 h-10 rotate-180" style={{ color: borderColor }}>
                      <path d="M 0,0 L 40,0 L 40,10 L 10,10 L 10,40 L 0,40 Z" fill="currentColor" />
                    </svg>
                  </div>
                )}
                {borderStyle === 'modern' && (
                  <div className="w-full h-full relative">
                    {/* Simple modern geometrical accents */}
                    <div className="absolute top-0 left-0 w-16 h-1 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute top-0 left-0 w-1 h-16 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute top-0 right-0 w-16 h-1 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute top-0 right-0 w-1 h-16 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute bottom-0 left-0 w-16 h-1 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute bottom-0 left-0 w-1 h-16 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute bottom-0 right-0 w-16 h-1 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                    <div className="absolute bottom-0 right-0 w-1 h-16 bg-indigo-600" style={{ backgroundColor: borderColor }}></div>
                  </div>
                )}
              </div>
            )}

            {/* Editable Elements Render Stage */}
            {elements.filter((el) => el.visible && el.type !== 'watermark').map((el) => {
              const isSelected = selectedElementId === el.id;
              
              // CSS Styles for standard text or image positioning
              const itemStyle: any = {
                position: 'absolute',
                left: `${el.x}%`,
                top: `${el.y}%`,
                transform: `translate(-50%, -50%) rotate(${el.rotation || 0}deg)`,
                width: `${el.width}%`,
                opacity: el.opacity ?? 1,
                cursor: el.isLocked ? 'not-allowed' : (isDragging ? 'grabbing' : 'grab'),
                userSelect: 'none',
                transition: isDragging || isResizing ? 'none' : 'all 0.15s ease-out'
              };

              // Additional specific typography styles
              if (el.type === 'text') {
                itemStyle.fontSize = `${el.fontSize}px`;
                itemStyle.fontFamily = el.fontFamily;
                itemStyle.color = el.fontColor || '#000000';
                itemStyle.fontWeight = el.fontWeight || 'normal';
                itemStyle.fontStyle = el.fontStyle || 'normal';
                itemStyle.textDecoration = el.textDecoration || 'none';
                itemStyle.textAlign = el.alignment || 'center';
                itemStyle.lineHeight = el.lineHeight || 1.2;
                if (el.letterSpacing) {
                  itemStyle.letterSpacing = `${el.letterSpacing}px`;
                }
                if (el.shadow) {
                  itemStyle.textShadow = `1px 2px 4px ${el.shadowColor || 'rgba(0,0,0,0.2)'}`;
                }
              }

              return (
                <div
                  key={el.id}
                  style={itemStyle}
                  onClick={(e) => handleElementSelect(el.id, e)}
                  onMouseDown={(e) => handleDragStart(el.id, e)}
                  onTouchStart={(e) => handleDragStart(el.id, e)}
                  className={`group relative ${isSelected ? 'ring-2 ring-indigo-600 ring-offset-2 rounded px-2 py-1' : 'hover:ring-1 hover:ring-gray-300'}`}
                  id={`canvas-el-${el.id}`}
                >
                  {/* Lock Indicator */}
                  {el.isLocked && isSelected && (
                    <div className="absolute -top-3.5 -left-1 bg-red-500 text-white p-0.5 rounded shadow">
                      <Lock className="w-2.5 h-2.5" />
                    </div>
                  )}

                  {/* ELEMENT TYPE RENDERERS */}
                  {el.type === 'text' && (
                    <div className="break-words outline-none">
                      {el.text}
                    </div>
                  )}

                  {el.type === 'qr' && el.src && (
                    <img
                      src={el.src}
                      alt="QR"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto mx-auto border border-gray-100 dark:border-slate-800 shadow-sm"
                    />
                  )}

                  {el.type === 'image' && el.src && (
                    <img
                      src={el.src}
                      alt={el.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto mx-auto object-contain"
                    />
                  )}

                  {/* Resizing Handle on Bottom Right */}
                  {isSelected && !el.isLocked && (
                    <div
                      onMouseDown={(e) => handleResizeStart(el.id, e)}
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-indigo-600 border border-white rounded-full cursor-se-resize shadow-md flex items-center justify-center translate-x-1.5 translate-y-1.5"
                      title="Өлшемін өзгерту"
                      id={`resize-handle-${el.id}`}
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
