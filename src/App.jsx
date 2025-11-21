import React, { useState } from 'react';
import { 
  ChevronDown, 
  Clock, 
  Target, 
  Zap, 
  Briefcase, 
  ArrowUp, 
  ArrowDown, 
  Layout, 
  GripVertical,
  Download,
  Upload,
  Share2,
  Copy,
  Check,
  X
} from 'lucide-react';

// --- DATOS DE LOS PROYECTOS ---
const initialProjectsData = [
  // --- PROJECTS ---
  {
    id: 'p1',
    title: "Generación de Contratos + Firma Digital",
    category: "Project",
    hours: "40-60",
    objective: "Pasar de un proceso manual a un circuito digital completo: creación, envío, firma y archivado desde Salesforce.",
    impact: "Cierra contratos más rápido, mejora experiencia del cliente y reduce trabajo administrativo.",
    scope: ["Plantillas Adobe/DocuSign vinculadas a Salesforce", "Integración Salesforce-Firma", "Almacenamiento automático del PDF"],
    priority: 1
  },
  {
    id: 'p2',
    title: "Proyecto Facturación Interna",
    category: "Project",
    hours: "40-50",
    objective: "Dashboard integral de facturación interna (Comisiones Luma, Co-agents, Facturación por proveedor).",
    impact: "Claridad sobre rentabilidad real y foco comercial.",
    scope: ["Dashboards Visión General", "Por Proveedor", "Por Producto", "Por Co-agent"],
    priority: 2
  },
  {
    id: 'p3',
    title: "Formularios Sincronizados con Salesforce",
    category: "Project",
    hours: "30-40",
    objective: "Canal estructurado para carga de reclamos mediante formulario directo a Case.",
    impact: "Imagen profesional para el cliente, información estandarizada interna.",
    scope: ["Diseño de formulario", "Integración a Salesforce", "Notificaciones internas"],
    priority: 3
  },
  {
    id: 'p4',
    title: "Mensajes Automatizados para Clientes",
    category: "Project",
    hours: "30-40",
    objective: "Automatizar comunicaciones estándar en distintos momentos del ciclo de vida.",
    impact: "Cliente acompañado sin dependencia manual, mayor tasa de respuesta.",
    scope: ["Definir momentos clave", "Implementación en Salesforce", "Plantillas de email"],
    priority: 4
  },
  {
    id: 'p5',
    title: "Encuestas Personalizadas",
    category: "Project",
    hours: "30-40",
    objective: "Recopilar feedback estructurado (postventa, satisfacción, etc.).",
    impact: "Detectar puntos fuertes/débiles. Base para Customer Experience.",
    scope: ["Definición de encuestas", "Integración herramienta", "Dashboards de resultados"],
    priority: 5
  },
  {
    id: 'p6',
    title: "Creación de un Perfil de Cliente",
    category: "Project",
    hours: "30-40",
    objective: "Vista unificada: comportamiento, histórico, tipo de relación.",
    impact: "Priorizar acciones comerciales y mejor segmentación.",
    scope: ["Definir campos del perfil", "Implementar layout", "Scoring/Categorías"],
    priority: 6
  },
  {
    id: 'p7',
    title: "Customer Experience Department",
    category: "Project",
    hours: "30-40",
    objective: "Diseñar modelo de CX en Salesforce con métricas, procesos y roles.",
    impact: "Gestión de experiencia a largo plazo, decisiones basadas en LTV.",
    scope: ["Lifetime Value", "Survey clientes", "Servicio PostVenta (Rol)"],
    priority: 7
  },
  {
    id: 'p8',
    title: "Quote Creation Based on Emails",
    category: "Project",
    hours: "30-40",
    objective: "Integrar Salesforce con email para seguimiento de cotizaciones.",
    impact: "Mayor tasa de cierre, no perder cotizaciones antiguas.",
    scope: ["Integración email", "Automatización", "Reporte de cotizaciones"],
    priority: 8
  },
  {
    id: 'p9',
    title: "Proyecto Data Quality",
    category: "Project",
    hours: "30-40",
    objective: "Monitoreo de calidad de datos para corregir errores en objetos clave.",
    impact: "Mejora dashboards y decisiones. Evita conclusiones erróneas.",
    scope: ["Reglas de calidad", "Dashboards Data Quality", "Validaciones de bloqueo"],
    priority: 9
  },
  {
    id: 'p10',
    title: "Life Cycle Stage (Accounts)",
    category: "Project",
    hours: "30-40",
    objective: "Clasificar cuentas según etapa de vida y tipo (Importer/Supplier).",
    impact: "Campañas y mensajes segmentados correctamente.",
    scope: ["Definir etapas y reglas", "Campos en Account", "Automatización de cambios de etapa"],
    priority: 10
  },
  {
    id: 'p11',
    title: "Proyecto Métricas Logística II",
    category: "Project",
    hours: "20-35",
    objective: "KPIs específicos para tiempos logísticos (Packing materials, Docs embarque).",
    impact: "Medir eficiencia y detectar cuellos de botella.",
    scope: ["Campos de fecha", "Cálculo de días", "Dashboard logístico"],
    priority: 11
  },

  // --- SHORT PROJECTS ---
  {
    id: 'sp1',
    title: "Inteligencia de Proveedores y Cuentas",
    category: "Short-Project",
    hours: "15-20",
    objective: "Vista 360: respuesta, potencial y estado comercial.",
    impact: "Identificar proveedores valiosos y cuentas con 'vida' comercial.",
    scope: ["Tiempo respuesta en Cases", "Dashboard potencial", "Flags de Contrato/Oportunidad"],
    priority: 1
  },
  {
    id: 'sp2',
    title: "Seguimiento Post-Shipping",
    category: "Short-Project",
    hours: "10-15",
    objective: "Mejorar experiencia post-embarque y preparar info para retención.",
    impact: "Soporte proactivo, cliente no olvidado.",
    scope: ["Alerta 15 días post ETA", "Reporte para clientes con reservas"],
    priority: 2
  },
  {
    id: 'sp3',
    title: "Modelo de Datos Cases y Sanitary Registers",
    category: "Short-Project",
    hours: "10-15",
    objective: "Ordenar modelo de datos y mejorar usabilidad de Case.",
    impact: "Trabajo diario más rápido, mejor trazabilidad.",
    scope: ["Búsqueda en Sanitary Reg.", "Objeto intermedio Case-Sanitary"],
    priority: 3
  },
  {
    id: 'sp4',
    title: "Control Comisiones y Debit Note",
    category: "Short-Project",
    hours: "10-15",
    objective: "Asegurar cálculo correcto de comisiones y estado de Debit Notes.",
    impact: "Control financiero, confianza en números.",
    scope: ["Campo 'Remaining Commission'", "Trazabilidad Debit Note"],
    priority: 4
  },
  {
    id: 'sp5',
    title: "Analítica, Comunicación y Documentación",
    category: "Short-Project",
    hours: "10-15",
    objective: "Ordenar capa de reporting interno y externo.",
    impact: "Alineación interna e imagen externa actualizada.",
    scope: ["Dashboard Sales", "Documentación explicativa", "Publicaciones Web"],
    priority: 5
  }
];

// --- MODAL COMPONENT FOR EXPORT/IMPORT ---
const ShareModal = ({ isOpen, onClose, data, onImport }) => {
  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import' | 'email'
  const [importText, setImportText] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  if (!isOpen) return null;

  // Generate export string (Base64 encoded JSON for a cleaner look)
  const exportString = btoa(JSON.stringify(data));
  
  // Generate Email Text
  const generateEmailText = () => {
    const projects = data.filter(p => p.category === 'Project').sort((a,b) => a.priority - b.priority);
    const shortProjects = data.filter(p => p.category === 'Short-Project').sort((a,b) => a.priority - b.priority);
    
    let text = "Hola, aquí está el orden de prioridades propuesto para los proyectos de Salesforce:\n\n";
    text += "=== PROYECTOS PRINCIPALES ===\n";
    projects.forEach(p => text += `${p.priority}. ${p.title} (${p.hours}h)\n`);
    text += "\n=== SHORT PROJECTS ===\n";
    shortProjects.forEach(p => text += `${p.priority}. ${p.title} (${p.hours}h)\n`);
    return text;
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleImportSubmit = () => {
    try {
      const parsedData = JSON.parse(atob(importText));
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        onImport(parsedData);
        onClose();
      } else {
        alert('El código no es válido.');
      }
    } catch (e) {
      alert('Error al leer el código. Asegúrate de copiar todo el texto generado.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Share2 size={18} className="text-blue-600"/> Compartir Configuración
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'export' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Exportar Estado
          </button>
          <button 
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'import' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Importar Estado
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'email' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Texto Email
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Copia este código y envíalo a otra persona. Ellos podrán pegarlo en la pestaña "Importar" para ver tu orden de prioridades exacto.
              </p>
              <div className="relative">
                <textarea 
                  readOnly 
                  value={exportString}
                  className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
                <button 
                  onClick={() => handleCopy(exportString, 'export')}
                  className="absolute top-2 right-2 p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                  title="Copiar al portapapeles"
                >
                  {copySuccess === 'export' ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-gray-500"/>}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Pega aquí el código que recibiste para actualizar el tablero con esa configuración.
              </p>
              <textarea 
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Pega el código aquí..."
                className="w-full h-32 p-3 bg-white border border-gray-300 rounded-lg text-xs font-mono text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
              <button 
                onClick={handleImportSubmit}
                disabled={!importText}
                className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${!importText ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
              >
                <Download size={16} /> Cargar Configuración
              </button>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Genera una lista simple legible para enviar por correo electrónico o mensaje.
              </p>
              <div className="relative">
                <textarea 
                  readOnly 
                  value={generateEmailText()}
                  className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
                <button 
                  onClick={() => handleCopy(generateEmailText(), 'email')}
                  className="absolute top-2 right-2 p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  {copySuccess === 'email' ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-gray-500"/>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ 
  project, 
  onMoveUp, 
  onMoveDown, 
  onPriorityChange, 
  isFirst, 
  isLast, 
  onDragStart, 
  onDragOver, 
  onDrop,
  isDragging 
}) => {
  const [expanded, setExpanded] = useState(false);

  // Color coding based on category
  const isShort = project.category === "Short-Project";
  const accentColor = isShort ? "border-emerald-500" : "border-blue-600";
  const badgeColor = isShort ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800";
  
  // Styles for drag state vs normal state
  const containerClasses = isDragging 
    ? 'opacity-40 border-dashed border-4 border-gray-300 shadow-none scale-95 bg-gray-50'
    : `bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 border-l-4 ${accentColor}`;

  const cursorClass = 'cursor-grab active:cursor-grabbing';

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, project.id)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, project.id)}
      className={`rounded-lg mb-4 transition-all duration-300 ease-in-out ${containerClasses}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          
          {/* Drag Handle & Priority */}
          <div className="flex flex-col items-center gap-2 min-w-[3rem]">
            <div 
              className={`p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 ${cursorClass}`} 
              title="Arrastra para reordenar"
            >
               <GripVertical size={20} />
            </div>

            <div className="flex flex-col items-center bg-gray-50 rounded-lg p-1 border border-gray-200 shadow-inner">
              <button 
                onClick={(e) => { e.stopPropagation(); onMoveUp(project.id); }}
                disabled={isFirst}
                className={`p-1 rounded-md transition-all duration-200 ${isFirst ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                <ArrowUp size={14} strokeWidth={3} />
              </button>
              
              <input 
                type="number" 
                value={project.priority}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onPriorityChange(project.id, parseInt(e.target.value) || 0)}
                className="w-8 text-center font-bold text-gray-700 bg-transparent border-none focus:ring-0 p-0 text-lg"
              />

              <button 
                onClick={(e) => { e.stopPropagation(); onMoveDown(project.id); }}
                disabled={isLast}
                className={`p-1 rounded-md transition-all duration-200 ${isLast ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                <ArrowDown size={14} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Main Content Header */}
          <div className="flex-1 cursor-pointer group" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition-transform duration-300 group-hover:scale-105 ${badgeColor}`}>
                {project.category === 'Project' ? 'Proyecto Principal' : 'Short Project'}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {project.hours} Horas Est.
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors duration-200">
              {project.title}
            </h3>
          </div>

          {/* Toggle Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className={`p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-300 ${expanded ? 'rotate-180 bg-gray-100 text-blue-600' : ''}`}
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Expanded Content */}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
        >
          <div className="overflow-hidden">
            <div className="pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
                  <Target size={16} className="text-red-500" /> Objetivo
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{project.objective}</p>
              </div>

              <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg hover:bg-amber-50 transition-colors duration-300 border border-transparent hover:border-amber-100">
                  <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
                    <Zap size={16} className="text-amber-500" /> Impacto
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{project.impact}</p>
                </div>
                <div className="p-3 rounded-lg hover:bg-indigo-50 transition-colors duration-300 border border-transparent hover:border-indigo-100">
                  <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
                    <Layout size={16} className="text-indigo-500" /> Alcance
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 marker:text-indigo-400">
                    {project.scope.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ projects, shortProjects }) => {
  const totalHoursMinP = projects.reduce((acc, curr) => acc + parseInt(curr.hours.split('-')[0]), 0);
  const totalHoursMaxP = projects.reduce((acc, curr) => acc + parseInt(curr.hours.split('-')[1] || curr.hours.split('-')[0]), 0);
  
  const totalHoursMinSP = shortProjects.reduce((acc, curr) => acc + parseInt(curr.hours.split('-')[0]), 0);
  const totalHoursMaxSP = shortProjects.reduce((acc, curr) => acc + parseInt(curr.hours.split('-')[1] || curr.hours.split('-')[0]), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Proyectos Principales</p>
            <h3 className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300 origin-left">{projects.length}</h3>
          </div>
          <Briefcase className="text-blue-300 opacity-50 group-hover:opacity-80 transition-opacity duration-300" size={32} />
        </div>
        <div className="mt-4 pt-4 border-t border-blue-500/50 flex items-center gap-2 text-sm text-blue-50">
          <Clock size={14} />
          <span>~{totalHoursMinP}-{totalHoursMaxP} Horas totales</span>
        </div>
      </div>

      <div className="group bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Short Projects</p>
            <h3 className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300 origin-left">{shortProjects.length}</h3>
          </div>
          <Zap className="text-emerald-300 opacity-50 group-hover:opacity-80 transition-opacity duration-300" size={32} />
        </div>
        <div className="mt-4 pt-4 border-t border-emerald-400/50 flex items-center gap-2 text-sm text-emerald-50">
          <Clock size={14} />
          <span>~{totalHoursMinSP}-{totalHoursMaxSP} Horas totales</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center hover:border-blue-200 transition-colors duration-300">
         <p className="text-gray-500 text-sm font-medium mb-2">Total Estimado General</p>
         <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">
           {totalHoursMinP + totalHoursMinSP} - {totalHoursMaxP + totalHoursMaxSP}
         </h3>
         <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">Horas de Consultoría</span>
      </div>
    </div>
  );
};

export default function LumaProjectManager() {
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'projects', 'short'
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // --- LOGIC: REORDERING & NORMALIZATION ---
  const normalizePriorities = (items) => {
    return items.map((item, index) => ({
      ...item,
      priority: index + 1
    }));
  };

  const sortByPriority = (items) => [...items].sort((a, b) => a.priority - b.priority);

  const reorderItems = (sourceId, targetId) => {
    const sourceItem = projectsData.find(p => p.id === sourceId);
    const targetItem = projectsData.find(p => p.id === targetId);

    if (!sourceItem || !targetItem) return;
    if (sourceItem.category !== targetItem.category) return; 

    const categoryItems = sortByPriority(projectsData.filter(p => p.category === sourceItem.category));
    
    const sourceIndex = categoryItems.findIndex(p => p.id === sourceId);
    const targetIndex = categoryItems.findIndex(p => p.id === targetId);

    const newCategoryItems = [...categoryItems];
    const [removed] = newCategoryItems.splice(sourceIndex, 1);
    newCategoryItems.splice(targetIndex, 0, removed);

    const updatedCategoryItems = normalizePriorities(newCategoryItems);

    const otherItems = projectsData.filter(p => p.category !== sourceItem.category);
    setProjectsData([...otherItems, ...updatedCategoryItems]);
  };

  // --- HANDLERS: DRAG AND DROP ---
  const handleDragStart = (e, id) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id); 
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = draggedItemId;
    if (sourceId && sourceId !== targetId) {
      reorderItems(sourceId, targetId);
    }
    setDraggedItemId(null);
  };

  // --- HANDLERS: BUTTONS & INPUT ---
  const handleMove = (id, direction) => {
    const item = projectsData.find(p => p.id === id);
    if (!item) return;

    const categoryItems = sortByPriority(projectsData.filter(p => p.category === item.category));
    const currentIndex = categoryItems.findIndex(p => p.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < categoryItems.length) {
      const targetId = categoryItems[targetIndex].id;
      reorderItems(id, targetId);
    }
  };

  const handlePriorityChange = (id, newPriority) => {
    if (newPriority < 1) return;
    const item = projectsData.find(p => p.id === id);
    if (!item) return;

    const categoryItems = sortByPriority(projectsData.filter(p => p.category === item.category));
    const filteredItems = categoryItems.filter(p => p.id !== id);
    
    let insertIndex = newPriority - 1;
    if (insertIndex > filteredItems.length) insertIndex = filteredItems.length;
    
    filteredItems.splice(insertIndex, 0, item);
    const updatedCategoryItems = normalizePriorities(filteredItems);
    const otherItems = projectsData.filter(p => p.category !== item.category);
    setProjectsData([...otherItems, ...updatedCategoryItems]);
  };

  const handleImportData = (newData) => {
    setProjectsData(newData);
  };

  // Derived lists
  const projectsList = sortByPriority(projectsData.filter(p => p.category === 'Project'));
  const shortProjectsList = sortByPriority(projectsData.filter(p => p.category === 'Short-Project'));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto">
        
        {/* MODAL */}
        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)}
          data={projectsData}
          onImport={handleImportData}
        />

        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-fadeIn">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
              Luma <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Roadmap</span>
            </h1>
            <p className="text-slate-500 max-w-xl text-lg leading-relaxed">
              Priorización estratégica de consultoría Salesforce. 
              Arrastra las tarjetas para reordenar.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
             {/* Share Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <Share2 size={16} /> Exportar / Importar
            </button>

            <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'all' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Todo
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'projects' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Proyectos
              </button>
              <button 
                onClick={() => setActiveTab('short')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'short' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Short Projects
              </button>
            </div>
          </div>
        </header>

        {/* Summary Stats */}
        <SummaryCard projects={projectsList} shortProjects={shortProjectsList} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column: Projects */}
          {(activeTab === 'all' || activeTab === 'projects') && (
            <div className={`${activeTab === 'projects' ? 'col-span-1 lg:col-span-2 max-w-4xl mx-auto w-full' : 'col-span-1'}`}>
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 py-4 border-b border-slate-200/50">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Briefcase size={20} /> 
                  </div>
                  Proyectos Principales
                  <span className="text-sm font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full ml-2">{projectsList.length}</span>
                </h2>
              </div>
              
              <div className="space-y-3 pb-8">
                {projectsList.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    isFirst={index === 0}
                    isLast={index === projectsList.length - 1}
                    onMoveUp={() => handleMove(project.id, 'up')}
                    onMoveDown={() => handleMove(project.id, 'down')}
                    onPriorityChange={handlePriorityChange}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    isDragging={draggedItemId === project.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Column: Short Projects */}
          {(activeTab === 'all' || activeTab === 'short') && (
            <div className={`${activeTab === 'short' ? 'col-span-1 lg:col-span-2 max-w-4xl mx-auto w-full' : 'col-span-1'}`}>
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 py-4 border-b border-slate-200/50">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                    <Zap size={20} /> 
                  </div>
                  Short Projects
                  <span className="text-sm font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full ml-2">{shortProjectsList.length}</span>
                </h2>
              </div>

              <div className="space-y-3 pb-8">
                {shortProjectsList.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    isFirst={index === 0}
                    isLast={index === shortProjectsList.length - 1}
                    onMoveUp={() => handleMove(project.id, 'up')}
                    onMoveDown={() => handleMove(project.id, 'down')}
                    onPriorityChange={handlePriorityChange}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    isDragging={draggedItemId === project.id}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}