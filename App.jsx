import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GripVertical, Check, X, AlertTriangle, Download, RotateCcw, Search, BookOpen, Target, Flame, Sparkles, Info, Award, CheckCircle2, Clock, Circle } from 'lucide-react';

// ============ MODULE DATA ============
const MODULES = [
  // ACCOUNTING CORE (11 CUs)
  { id: 'ACCT111', name: 'Financial Accounting', cat: 'acct-core', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT112', name: 'Management Accounting', cat: 'acct-core', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT221', name: 'Accounting Information Systems', cat: 'acct-core', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT223', name: 'Taxation', cat: 'acct-core', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT224', name: 'Financial Reporting and Analysis', cat: 'acct-core', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT331', name: 'Audit & Assurance', cat: 'acct-core', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT332', name: 'Accounting Thought & Governance', cat: 'acct-core', cu: 1, diff: 2, wl: 2 },
  { id: 'ACCT334', name: 'Intermediate Financial Accounting', cat: 'acct-core', cu: 1, diff: 5, wl: 3 },
  { id: 'ACCT335', name: 'Advanced Financial Accounting', cat: 'acct-core', cu: 1, diff: 5, wl: 3 },
  { id: 'ACCT336', name: 'Valuation', cat: 'acct-core', cu: 1, diff: 4, wl: 2 },
  { id: 'ACCT337', name: 'Statistical Programming', cat: 'acct-core', cu: 1, diff: 3, wl: 2 },

  // BUSINESS CORE (7 CUs)
  { id: 'LGST101', name: 'Business Law', cat: 'biz-core', cu: 1, diff: 3, wl: 2 },
  { id: 'LGST201', name: 'Company Law', cat: 'biz-core', cu: 1, diff: 4, wl: 3 },
  { id: 'FNCE101', name: 'Finance', cat: 'biz-core', cu: 1, diff: 4, wl: 3 },
  { id: 'FNCE102', name: 'Financial Markets and Investments', cat: 'biz-core', cu: 1, diff: 3, wl: 2 },
  { id: 'COR-STAT1202', name: 'Introductory Statistics', cat: 'biz-core', cu: 1, diff: 3, wl: 2 },
  { id: 'OBHR101', name: 'Management of People at Work', cat: 'biz-core', cu: 1, diff: 2, wl: 2 },
  { id: 'MGMT102', name: 'Strategy', cat: 'biz-core', cu: 1, diff: 3, wl: 2 },

  // ACCOUNTING ELECTIVES (3 CUs)
  { id: 'ACCT401', name: 'Strategic Management Accounting', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT403', name: 'Advanced Taxation', cat: 'acct-elec', cu: 1, diff: 5, wl: 3 },
  { id: 'ACCT407', name: 'Corporate Financial Management', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT409', name: 'Auditing for the Public Sector', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT410', name: 'Internal Audit', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT414', name: 'Accounting Analytics Capstone', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT417', name: 'Insolvency and Restructuring', cat: 'acct-elec', cu: 1, diff: 4, wl: 2 },
  { id: 'ACCT418', name: 'Data Modelling and Visualisation', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT420', name: 'Forecasting and Forensic Analytics', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT421', name: 'Analytics for Value Investing', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'ACCT423', name: 'Audit Analytics', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT424', name: 'Auditing Info Systems', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'ACCT425', name: 'Forensic Accounting & Investigation', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'FNCE315', name: 'Analytics in Finance & Real Estate', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },
  { id: 'IS465', name: 'Corporate Banking Technology', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'IS452', name: 'Blockchain in Financial Services', cat: 'acct-elec', cu: 1, diff: 3, wl: 2 },
  { id: 'IS453', name: 'Financial Analytics', cat: 'acct-elec', cu: 1, diff: 4, wl: 3 },

  // CAPABILITIES (5 CUs)
  { id: 'COR1201', name: 'Calculus (Numeracy)', cat: 'cap', cu: 1, diff: 4, wl: 2 },
  { id: 'COR1701', name: 'Critical Thinking in the Real World', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'COR1702', name: 'Computational Thinking', cat: 'cap', cu: 1, diff: 3, wl: 2 },
  { id: 'COR1703', name: 'Managing in a VUCA Context', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-COMM1304', name: 'Management Communication', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-MGMT1302', name: 'Business, Government and Society', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'COR1301', name: 'Leadership and Team Building', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'COR1305', name: 'Modelling and Analytics', cat: 'cap', cu: 1, diff: 3, wl: 2 },
  { id: 'COR1306', name: 'Capital Markets in China', cat: 'cap', cu: 1, diff: 3, wl: 2 },
  { id: 'OBHR003', name: 'Transformative Leadership', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'WR-RSN', name: 'Writing and Reasoning', cat: 'cap', cu: 1, diff: 2, wl: 2 },
  { id: 'INTERN', name: 'Internship', cat: 'cap', cu: 1, diff: 2, wl: 3 },

  // COMMUNITIES (3 CUs)
  { id: 'COR2100', name: 'Economics and Society', cat: 'comm', cu: 1, diff: 3, wl: 2 },
  { id: 'COR2201', name: 'Technology and World Change', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR2202', name: 'Science, Environment and Empire', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR2203', name: 'Climate Change: Global and Local', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR2204', name: 'Science and Technology Studies', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-DIGCUL', name: 'Digital Cultures', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-URBAN', name: 'Urban Cultures', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-FILMSEA', name: 'Film in Southeast Asia', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-SG50', name: 'Singapore: Imagining the Next 50 Years', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-POLSEA', name: 'Politics of South-East Asia', cat: 'comm', cu: 1, diff: 3, wl: 2 },
  { id: 'COR-LANG', name: 'Foreign Languages', cat: 'comm', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-CS', name: 'Community Service', cat: 'comm', cu: 1, diff: 1, wl: 2 },

  // CIVILISATIONS (2 CUs)
  { id: 'COR3302', name: 'Ethics & Social Responsibility for Accounting', cat: 'civ', cu: 1, diff: 3, wl: 2 },
  { id: 'COR3001', name: 'Big Questions', cat: 'civ', cu: 1, diff: 2, wl: 2 },
  { id: 'COR-GLOBEXP', name: 'Global Exposure (Non-credit)', cat: 'civ', cu: 0, diff: 1, wl: 1 },

  // FREE ELECTIVES (3 CUs)
  { id: 'FREE1', name: 'Free Elective 1', cat: 'free', cu: 1, diff: 3, wl: 2 },
  { id: 'FREE2', name: 'Free Elective 2', cat: 'free', cu: 1, diff: 3, wl: 2 },
  { id: 'FREE3', name: 'Free Elective 3', cat: 'free', cu: 1, diff: 3, wl: 2 },
];

const CATEGORIES = {
  'acct-core':  { label: 'Accounting Core',     color: '#7C1D1D', accent: '#B91C3C', soft: '#FEE2E2', short: 'AC' },
  'biz-core':   { label: 'Business Core',       color: '#1E3A5F', accent: '#2563EB', soft: '#DBEAFE', short: 'BC' },
  'acct-elec':  { label: 'Accounting Electives',color: '#7B3F00', accent: '#D97706', soft: '#FEF3C7', short: 'AE' },
  'cap':        { label: 'Capabilities',        color: '#1F4D2B', accent: '#059669', soft: '#D1FAE5', short: 'CP' },
  'comm':       { label: 'Communities',         color: '#5B21B6', accent: '#7C3AED', soft: '#EDE9FE', short: 'CM' },
  'civ':        { label: 'Civilisations',       color: '#7C2D12', accent: '#C2410C', soft: '#FED7AA', short: 'CV' },
  'free':       { label: 'Free Electives',      color: '#155E75', accent: '#0891B2', soft: '#CFFAFE', short: 'FE' },
};

const SEMESTERS = [
  { id: 's1', label: 'Sem 1', sub: 'Aug – Dec', year: 1 },
  { id: 's2', label: 'Sem 2', sub: 'Jan – Apr', year: 1 },
  { id: 's3', label: 'Sem 1', sub: 'Aug – Dec', year: 2 },
  { id: 's4', label: 'Sem 2', sub: 'Jan – Apr', year: 2 },
  { id: 's5', label: 'Sem 1', sub: 'Aug – Dec', year: 3 },
  { id: 's6', label: 'Sem 2', sub: 'Jan – Apr', year: 3 },
  { id: 's7', label: 'Sem 1', sub: 'Aug – Dec', year: 4 },
  { id: 's8', label: 'Sem 2', sub: 'Jan – Apr', year: 4 },
];

// Status: 'completed' (taken & passed), 'taking' (currently enrolled), 'planned' (default)
// Y1 is auto-completed since user said it's done. Calculus is exempted.
const DEFAULT_PLAN = {
  's1': ['ACCT111', 'WR-RSN', 'COR3001', 'COR2100', 'COR-CS'],
  's2': ['LGST101', 'ACCT112', 'OBHR101', 'COR-STAT1202'],
  // Suggested Y2 — balanced workload, builds on Y1 foundations.
  // Y2S1: gets the core accounting locked in early. Avg difficulty ~3.0.
  's3': ['ACCT221', 'ACCT223', 'FNCE101', 'COR1702', 'COR-MGMT1302'],
  // Y2S2: pushes into FRA but balances with lighter mods. Avg ~3.2.
  's4': ['ACCT224', 'FNCE102', 'MGMT102', 'COR-COMM1304', 'COR2201'],
  's5': [], 's6': [], 's7': [], 's8': [],
  'exempted': ['COR1201'],
  // Per-module status overrides. Y1 = completed, Y2 = planned by default.
  'status': {
    'ACCT111': 'completed', 'WR-RSN': 'completed', 'COR3001': 'completed',
    'COR2100': 'completed', 'COR-CS': 'completed',
    'LGST101': 'completed', 'ACCT112': 'completed', 'OBHR101': 'completed',
    'COR-STAT1202': 'completed',
  },
};

// ============ UTILS ============
const getDiffLabel = (d) => ['', 'Chill', 'Easy', 'Moderate', 'Hard', 'Brutal'][d];
const getDiffColor = (d) => ['', '#10B981', '#65A30D', '#CA8A04', '#EA580C', '#DC2626'][d];

const STATUS_META = {
  'completed': { label: 'Completed', icon: CheckCircle2, color: '#059669', bg: '#D1FAE5', border: '#A7F3D0' },
  'taking':    { label: 'Taking now', icon: Clock,        color: '#0891B2', bg: '#CFFAFE', border: '#A5F3FC' },
  'planned':   { label: 'Planned',    icon: Circle,       color: '#78716C', bg: '#F5F5F4', border: '#E7E5E4' },
};

// localStorage helper (works without Anthropic's window.storage on GitHub Pages)
const storage = {
  get: (key) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch { return false; }
  },
};

// ============ MAIN APP ============
export default function App() {
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [draggedId, setDraggedId] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [toast, setToast] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showExemptModal, setShowExemptModal] = useState(false);
  const [statusMenuFor, setStatusMenuFor] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const scrollRafRef = useRef(null);
  const bankScrollRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = storage.get('smu-acct-planner-v2');
    if (saved) {
      // Ensure all expected keys exist (backward compat)
      if (!saved.exempted) saved.exempted = [];
      if (!saved.status) saved.status = {};
      setPlan(saved);
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    storage.set('smu-acct-planner-v2', plan);
  }, [plan, loaded]);

  // ===== AUTO-SCROLL WHILE DRAGGING =====
  useEffect(() => {
    if (!draggedId) {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      return;
    }

    let mouseY = 0, mouseX = 0;
    const EDGE = 90;
    const MAX_SPEED = 22;

    const onDragOverWindow = (e) => { mouseY = e.clientY; mouseX = e.clientX; };

    const tick = () => {
      const vh = window.innerHeight;
      // Window scroll
      if (mouseY < EDGE) {
        const s = ((EDGE - mouseY) / EDGE) * MAX_SPEED;
        window.scrollBy(0, -s);
      } else if (mouseY > vh - EDGE) {
        const s = ((mouseY - (vh - EDGE)) / EDGE) * MAX_SPEED;
        window.scrollBy(0, s);
      }
      // Bank inner scroll
      const bank = bankScrollRef.current;
      if (bank) {
        const r = bank.getBoundingClientRect();
        if (mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom) {
          if (mouseY - r.top < EDGE) {
            const s = ((EDGE - (mouseY - r.top)) / EDGE) * MAX_SPEED;
            bank.scrollBy(0, -s);
          } else if (r.bottom - mouseY < EDGE) {
            const s = ((EDGE - (r.bottom - mouseY)) / EDGE) * MAX_SPEED;
            bank.scrollBy(0, s);
          }
        }
      }
      scrollRafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('dragover', onDragOverWindow);
    scrollRafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('dragover', onDragOverWindow);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [draggedId]);

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2400);
  };

  const placedIds = useMemo(() => {
    const all = new Set();
    Object.entries(plan).forEach(([k, v]) => {
      if (k === 'status') return;
      if (Array.isArray(v)) v.forEach(id => all.add(id));
    });
    return all;
  }, [plan]);

  const bankModules = useMemo(() => {
    return MODULES.filter(m => !placedIds.has(m.id))
      .filter(m => filterCat === 'all' || m.cat === filterCat)
      .filter(m => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q);
      });
  }, [placedIds, filterCat, search]);

  const getModule = (id) => MODULES.find(m => m.id === id);
  const getStatus = (id) => (plan.status && plan.status[id]) || 'planned';

  const exemptedMods = useMemo(
    () => (plan.exempted || []).map(getModule).filter(Boolean),
    [plan.exempted]
  );

  const progress = useMemo(() => {
    const reqs = { 'acct-core': 11, 'biz-core': 7, 'acct-elec': 3, 'cap': 5, 'comm': 3, 'civ': 2, 'free': 3 };
    const earned = {};
    Object.keys(reqs).forEach(k => earned[k] = 0);
    placedIds.forEach(id => {
      const m = getModule(id);
      if (m) earned[m.cat] = (earned[m.cat] || 0) + m.cu;
    });
    const total = Object.values(earned).reduce((a, b) => a + b, 0);
    const totalReq = Object.values(reqs).reduce((a, b) => a + b, 0);
    return { earned, reqs, total, totalReq };
  }, [placedIds]);

  // Status counters
  const statusCounts = useMemo(() => {
    let completed = 0, taking = 0, planned = 0;
    placedIds.forEach(id => {
      const s = getStatus(id);
      if (s === 'completed') completed++;
      else if (s === 'taking') taking++;
      else planned++;
    });
    return { completed, taking, planned, exempted: exemptedMods.length };
  }, [placedIds, plan.status, exemptedMods.length]);

  const handleDragStart = (e, id) => { setDraggedId(id); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e, target) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDragOver(target); };
  const handleDragLeave = () => setDragOver(null);

  const handleDrop = (e, targetSem) => {
    e.preventDefault();
    if (!draggedId) return;
    const draggedMod = getModule(draggedId);
    const newPlan = { ...plan };

    // Remove from all list-buckets
    Object.keys(newPlan).forEach(k => {
      if (k === 'status') return;
      if (Array.isArray(newPlan[k])) newPlan[k] = newPlan[k].filter(id => id !== draggedId);
    });

    if (targetSem === 'bank') {
      showToast('Returned to bank', 'ok');
    } else if (targetSem === 'exempted') {
      newPlan.exempted = [...(newPlan.exempted || []), draggedId];
      showToast(`Marked ${draggedMod.name} as exempted`, 'ok');
    } else {
      if (newPlan[targetSem].length >= 6) {
        showToast('Semester full (max 6 mods)', 'warn');
        setDraggedId(null); setDragOver(null); return;
      }
      newPlan[targetSem] = [...newPlan[targetSem], draggedId];
      const sem = SEMESTERS.find(s => s.id === targetSem);
      showToast(`Added to Y${sem.year} ${sem.label}`, 'ok');
    }

    setPlan(newPlan);
    setDraggedId(null); setDragOver(null);
  };

  const handleDragEnd = () => { setDraggedId(null); setDragOver(null); };

  const removeFromSem = (semId, modId) => {
    setPlan(p => ({ ...p, [semId]: p[semId].filter(id => id !== modId) }));
    showToast('Removed', 'ok');
  };

  const removeExemption = (modId) => {
    setPlan(p => ({ ...p, exempted: (p.exempted || []).filter(id => id !== modId) }));
    showToast('Exemption removed', 'ok');
  };

  const addExemption = (modId) => {
    setPlan(p => {
      const np = { ...p };
      Object.keys(np).forEach(k => {
        if (k === 'status' || k === 'exempted') return;
        if (Array.isArray(np[k])) np[k] = np[k].filter(id => id !== modId);
      });
      np.exempted = [...(np.exempted || []), modId];
      return np;
    });
    showToast('Marked as exempted', 'ok');
    setShowExemptModal(false);
  };

  const setStatus = (modId, status) => {
    setPlan(p => {
      const np = { ...p };
      np.status = { ...(np.status || {}) };
      if (status === 'planned') delete np.status[modId];
      else np.status[modId] = status;
      return np;
    });
    setStatusMenuFor(null);
  };

  const handleReset = () => {
    if (confirm('Reset entire plan to default (Y1 done, Y2 suggested)?')) {
      setPlan(DEFAULT_PLAN);
      showToast('Plan reset', 'ok');
    }
  };

  const handleExport = () => {
    const text = `SMU ACCOUNTANCY PLAN
Generated: ${new Date().toLocaleString()}
Total CUs: ${progress.total} / ${progress.totalReq}
Status: ${statusCounts.completed} completed · ${statusCounts.taking} taking · ${statusCounts.planned} planned · ${statusCounts.exempted} exempted

${SEMESTERS.map(s => {
  const mods = plan[s.id].map(getModule).filter(Boolean);
  const cu = mods.reduce((sum, m) => sum + m.cu, 0);
  return `=== Y${s.year} ${s.label} (${cu} CUs) ===
${mods.length ? mods.map(m => `  • [${getStatus(m.id).toUpperCase()}] ${m.id} - ${m.name} (Diff ${m.diff}/5)`).join('\n') : '  (empty)'}`;
}).join('\n\n')}

=== EXEMPTED (${exemptedMods.length} CUs) ===
${exemptedMods.length ? exemptedMods.map(m => `  • ${m.id} - ${m.name}`).join('\n') : '  (none)'}

=== PROGRESS BY CATEGORY ===
${Object.keys(progress.reqs).map(k => `${CATEGORIES[k].label}: ${progress.earned[k] || 0}/${progress.reqs[k]}`).join('\n')}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smu-acct-plan-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Plan exported', 'ok');
  };

  const years = [1, 2, 3, 4].map(y => ({ year: y, sems: SEMESTERS.filter(s => s.year === y) }));
  const exemptableModules = MODULES.filter(m => !placedIds.has(m.id) || plan.exempted?.includes(m.id));

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#FAFAF7', color: '#1C1917' }}>
      {/* HEADER */}
      <header className="relative px-6 md:px-10 pt-8 pb-6 border-b border-stone-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-md flex items-center justify-center text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #7C1D1D 0%, #B91C3C 100%)' }}>
                <BookOpen size={20} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-mono">SMU · BACC</div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-none tracking-tight text-stone-900">
              Module <span className="italic" style={{ color: '#B91C3C' }}>Atelier</span>
            </h1>
            <p className="text-stone-500 mt-2 text-sm max-w-md">
              Drag, drop, and orchestrate four years of accountancy. Built for your degree, your pace.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setShowExemptModal(true)} className="px-3 py-2 text-sm rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200 transition flex items-center gap-2 text-amber-800 shadow-sm">
              <Award size={14} /> Exemptions ({exemptedMods.length})
            </button>
            <button onClick={() => setShowInfo(true)} className="px-3 py-2 text-sm rounded-md bg-white hover:bg-stone-50 border border-stone-200 transition flex items-center gap-2 text-stone-700 shadow-sm">
              <Info size={14} /> Guide
            </button>
            <button onClick={handleExport} className="px-3 py-2 text-sm rounded-md bg-white hover:bg-stone-50 border border-stone-200 transition flex items-center gap-2 text-stone-700 shadow-sm">
              <Download size={14} /> Export
            </button>
            <button onClick={handleReset} className="px-3 py-2 text-sm rounded-md bg-white hover:bg-stone-50 border border-stone-200 transition flex items-center gap-2 text-stone-700 shadow-sm">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* GRADUATION PROGRESS */}
        <div className="max-w-[1800px] mx-auto mt-6">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <Target size={14} style={{ color: '#B91C3C' }} />
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Graduation Progress</div>
            <div className="flex items-center gap-3 ml-auto text-xs font-mono">
              <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-600" /> {statusCounts.completed}</span>
              <span className="flex items-center gap-1"><Clock size={11} className="text-cyan-600" /> {statusCounts.taking}</span>
              <span className="flex items-center gap-1"><Circle size={11} className="text-stone-400" /> {statusCounts.planned}</span>
              <span className="flex items-center gap-1"><Award size={11} className="text-amber-600" /> {statusCounts.exempted}</span>
              <span className="border-l border-stone-300 pl-3">
                <span className="font-bold" style={{ color: '#B91C3C' }}>{progress.total}</span>
                <span className="text-stone-400"> / {progress.totalReq} CUs</span>
              </span>
            </div>
          </div>
          <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
            {Object.keys(progress.reqs).map(k => {
              const earned = Math.min(progress.earned[k] || 0, progress.reqs[k]);
              const pct = (earned / progress.totalReq) * 100;
              return (
                <div key={k} style={{ width: `${pct}%`, background: CATEGORIES[k].accent, transition: 'width 0.5s ease' }}
                  title={`${CATEGORIES[k].label}: ${earned}/${progress.reqs[k]}`} />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
            {Object.keys(progress.reqs).map(k => {
              const done = (progress.earned[k] || 0) >= progress.reqs[k];
              return (
                <div key={k} className="flex items-center gap-1.5 font-mono">
                  <div className="w-2 h-2 rounded-sm" style={{ background: CATEGORIES[k].accent }} />
                  <span className="text-stone-500">{CATEGORIES[k].label}</span>
                  <span className={done ? 'text-emerald-600 font-semibold' : 'text-stone-700'}>
                    {progress.earned[k] || 0}/{progress.reqs[k]}
                  </span>
                  {done && <Check size={11} className="text-emerald-600" />}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-10 py-8 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 paper-texture">

        <section className="space-y-6">
          {exemptedMods.length > 0 && (
            <div
              className={`drop-zone rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/60 overflow-hidden ${dragOver === 'exempted' ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, 'exempted')} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, 'exempted')}
            >
              <div className="px-4 py-2.5 border-b border-amber-200 flex items-center justify-between bg-amber-100/50">
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-amber-700" />
                  <div className="font-display font-semibold text-sm text-amber-900">Exempted Modules</div>
                  <div className="text-[10px] uppercase tracking-widest text-amber-600 font-mono">· {exemptedMods.length} CU earned without taking</div>
                </div>
                <button onClick={() => setShowExemptModal(true)} className="text-xs text-amber-700 hover:text-amber-900 font-medium">+ Manage</button>
              </div>
              <div className="p-3 flex flex-wrap gap-2">
                {exemptedMods.map(m => <ExemptedCard key={m.id} mod={m} onRemove={() => removeExemption(m.id)} />)}
              </div>
            </div>
          )}

          {years.map(({ year, sems }) => (
            <YearRow
              key={year} year={year} sems={sems} plan={plan} getModule={getModule} getStatus={getStatus}
              dragOver={dragOver} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              onDragStart={handleDragStart} onDragEnd={handleDragEnd} draggedId={draggedId} onRemove={removeFromSem}
              statusMenuFor={statusMenuFor} setStatusMenuFor={setStatusMenuFor} setStatus={setStatus}
            />
          ))}
        </section>

        {/* BANK */}
        <aside className="xl:sticky xl:top-4 xl:self-start xl:max-h-[calc(100vh-2rem)] flex flex-col">
          <div
            className={`drop-zone rounded-lg border border-stone-200 bg-white flex flex-col flex-1 overflow-hidden shadow-sm ${dragOver === 'bank' ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, 'bank')} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, 'bank')}
          >
            <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: '#B91C3C' }} />
                <div className="font-display font-semibold text-sm text-stone-900">Module Bank</div>
              </div>
              <div className="font-mono text-[10px] text-stone-500">{bankModules.length} available</div>
            </div>

            <div className="p-3 border-b border-stone-200 space-y-2 bg-white">
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ACCT421, Audit…"
                  className="w-full bg-stone-50 border border-stone-200 rounded-md pl-7 pr-2 py-1.5 text-xs placeholder-stone-400 text-stone-900 focus:outline-none focus:border-stone-400 focus:bg-white transition" />
              </div>
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-md px-2 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-400 focus:bg-white transition">
                <option value="all">All categories</option>
                {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            <div ref={bankScrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1.5 min-h-[400px] xl:max-h-[calc(100vh-300px)] bg-stone-50/50">
              {bankModules.length === 0 && <div className="text-center text-stone-400 text-xs italic py-8">No modules match</div>}
              {bankModules.map(m => (
                <ModuleCard key={m.id} mod={m} status="planned" onDragStart={handleDragStart} onDragEnd={handleDragEnd}
                  isDragging={draggedId === m.id} compact />
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in">
          <div className={`px-4 py-2.5 rounded-lg shadow-lg border text-sm font-medium flex items-center gap-2 ${
            toast.type === 'warn' ? 'bg-red-50 border-red-200 text-red-800' :
            toast.type === 'ok' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
            'bg-white border-stone-200 text-stone-800'
          }`}>
            {toast.type === 'warn' ? <AlertTriangle size={14} /> : <Check size={14} />}
            {toast.msg}
          </div>
        </div>
      )}

      {/* INFO MODAL */}
      {showInfo && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowInfo(false)}>
          <div className="bg-white border border-stone-200 rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto scrollbar-thin shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-2xl font-bold text-stone-900">How to use</h2>
              <button onClick={() => setShowInfo(false)} className="text-stone-400 hover:text-stone-900"><X size={20} /></button>
            </div>
            <div className="space-y-4 text-sm text-stone-700">
              <div><div className="font-semibold mb-1" style={{ color: '#B91C3C' }}>Drag & Drop (with auto-scroll!)</div>
                <p>Grab any module from the right-side bank and drop it into a semester. While dragging, hover near the top or bottom edge of the screen and the page will scroll automatically.</p></div>
              <div><div className="font-semibold mb-1" style={{ color: '#B91C3C' }}>Module Status</div>
                <p>Click the small status dot on any module to toggle between <span className="text-emerald-700 font-semibold">Completed</span>, <span className="text-cyan-700 font-semibold">Taking now</span>, and <span className="text-stone-500 font-semibold">Planned</span>. Y1 mods are pre-marked as completed.</p></div>
              <div><div className="font-semibold mb-1" style={{ color: '#B91C3C' }}>Exemptions</div>
                <p>Got exempted? Click the Exemptions button to mark mods. They still count toward your CUs. Calculus is pre-marked.</p></div>
              <div><div className="font-semibold mb-1" style={{ color: '#B91C3C' }}>Difficulty Heatmap</div>
                <p>Each module shows a difficulty rating (1 Chill → 5 Brutal). The colored bar on each semester reflects the average — green is light, red is grueling.</p></div>
              <div><div className="font-semibold mb-1" style={{ color: '#B91C3C' }}>Workload Warnings</div>
                <p>If a semester has more than 5 modules or workload exceeds 13, a <span className="text-red-700 font-semibold">HEAVY</span> badge appears.</p></div>
              <div className="pt-3 border-t border-stone-200 text-xs text-stone-500">
                <strong>Note:</strong> Difficulty ratings are estimates from common student feedback. Actual difficulty varies by professor. Cross-check OASIS/BOSS for official info.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXEMPT MODAL */}
      {showExemptModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowExemptModal(false)}>
          <div className="bg-white border border-stone-200 rounded-xl max-w-2xl w-full p-6 max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 flex items-center gap-2"><Award size={22} className="text-amber-600" /> Manage Exemptions</h2>
                <p className="text-stone-500 text-sm mt-1">Modules you've been exempted from. They count toward your CUs.</p>
              </div>
              <button onClick={() => setShowExemptModal(false)} className="text-stone-400 hover:text-stone-900"><X size={20} /></button>
            </div>
            <div className="mb-5">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-2">Current exemptions ({exemptedMods.length})</div>
              {exemptedMods.length === 0 ? <div className="text-sm text-stone-400 italic py-3">None yet.</div> :
                <div className="flex flex-wrap gap-2">
                  {exemptedMods.map(m => (
                    <div key={m.id} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-50 border border-amber-200">
                      <span className="font-mono font-semibold text-xs text-amber-900">{m.id}</span>
                      <span className="text-xs text-amber-800">{m.name}</span>
                      <button onClick={() => removeExemption(m.id)} className="text-amber-600 hover:text-red-600"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              }
            </div>
            <div className="flex-1 overflow-hidden flex flex-col border-t border-stone-200 pt-4">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-2">Add an exemption</div>
              <div className="flex-1 overflow-y-auto scrollbar-thin border border-stone-200 rounded-md">
                {exemptableModules.filter(m => !plan.exempted?.includes(m.id)).map(m => (
                  <button key={m.id} onClick={() => addExemption(m.id)}
                    className="w-full px-3 py-2 hover:bg-amber-50 border-b border-stone-100 last:border-0 flex items-center justify-between text-left transition">
                    <div>
                      <div className="font-mono text-xs font-semibold" style={{ color: CATEGORIES[m.cat].color }}>{m.id}</div>
                      <div className="text-sm text-stone-700">{m.name}</div>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded" style={{ background: CATEGORIES[m.cat].soft, color: CATEGORIES[m.cat].color }}>
                      {CATEGORIES[m.cat].short}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-[1800px] mx-auto px-6 md:px-10 py-6 text-center text-xs text-stone-400 font-mono border-t border-stone-200 mt-4">
        Built for SMU Accountancy · Auto-saved locally · v2.0
      </footer>
    </div>
  );
}

// ============ YEAR ROW ============
function YearRow({ year, sems, plan, getModule, getStatus, dragOver, onDragOver, onDragLeave, onDrop, onDragStart, onDragEnd, draggedId, onRemove, statusMenuFor, setStatusMenuFor, setStatus }) {
  const phaseLabel = year === 1 ? 'Foundation' : year === 2 ? 'Specialisation' : year === 3 ? 'Application' : 'Capstone';
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3 px-1">
        <h2 className="font-display text-2xl font-bold text-stone-900">Year <span className="italic" style={{ color: '#B91C3C' }}>{year}</span></h2>
        <div className="h-px flex-1 bg-stone-200" />
        <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">{phaseLabel}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sems.map(sem => (
          <SemesterCard key={sem.id} sem={sem} mods={plan[sem.id].map(getModule).filter(Boolean)}
            getStatus={getStatus} dragOver={dragOver} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onDrop={onDrop} onDragStart={onDragStart} onDragEnd={onDragEnd} draggedId={draggedId}
            onRemove={(modId) => onRemove(sem.id, modId)}
            statusMenuFor={statusMenuFor} setStatusMenuFor={setStatusMenuFor} setStatus={setStatus} />
        ))}
      </div>
    </div>
  );
}

// ============ SEMESTER CARD ============
function SemesterCard({ sem, mods, getStatus, dragOver, onDragOver, onDragLeave, onDrop, onDragStart, onDragEnd, draggedId, onRemove, statusMenuFor, setStatusMenuFor, setStatus }) {
  const cuSum = mods.reduce((s, m) => s + m.cu, 0);
  const wlSum = mods.reduce((s, m) => s + m.wl, 0);
  const diffAvg = mods.length ? (mods.reduce((s, m) => s + m.diff, 0) / mods.length).toFixed(1) : 0;
  const isOverload = mods.length > 5 || wlSum > 13;
  const isFull = mods.length >= 5;
  const heatColor = mods.length === 0 ? '#D1D5DB' :
    diffAvg >= 4 ? '#DC2626' : diffAvg >= 3.5 ? '#EA580C' :
    diffAvg >= 2.5 ? '#CA8A04' : diffAvg >= 1.5 ? '#65A30D' : '#10B981';
  const heatBg = mods.length === 0 ? '#F9FAFB' :
    diffAvg >= 4 ? '#FEF2F2' : diffAvg >= 3.5 ? '#FFF7ED' :
    diffAvg >= 2.5 ? '#FEFCE8' : diffAvg >= 1.5 ? '#F7FEE7' : '#ECFDF5';

  return (
    <div className={`drop-zone rounded-lg border border-stone-200 bg-white overflow-hidden shadow-sm ${dragOver === sem.id ? 'drag-over' : ''}`}
      onDragOver={(e) => onDragOver(e, sem.id)} onDragLeave={onDragLeave} onDrop={(e) => onDrop(e, sem.id)}>
      <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between" style={{ background: heatBg }}>
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-8 rounded-full" style={{ background: heatColor }} />
          <div>
            <div className="font-display font-semibold text-sm text-stone-900">{sem.label}</div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
              {sem.sub} · {mods.length === 0 ? 'empty' : `${mods.length} mods · ${cuSum} CU · avg ${diffAvg}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {isOverload && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-100 text-red-700 border border-red-200">
              <AlertTriangle size={10} /> HEAVY
            </div>
          )}
          {isFull && !isOverload && (
            <div className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 text-amber-700 border border-amber-200">FULL</div>
          )}
          <Flame size={14} style={{ color: heatColor }} />
        </div>
      </div>

      <div className="p-3 min-h-[220px] space-y-2 bg-stone-50/30">
        {mods.length === 0 && (
          <div className="h-full min-h-[200px] flex items-center justify-center text-stone-400 text-xs italic border border-dashed border-stone-300 rounded-md">
            Drop modules here
          </div>
        )}
        {mods.map((m) => (
          <ModuleCard key={m.id} mod={m} status={getStatus(m.id)} onDragStart={onDragStart} onDragEnd={onDragEnd}
            onRemove={() => onRemove(m.id)} isDragging={draggedId === m.id}
            statusMenuOpen={statusMenuFor === m.id}
            onStatusClick={(e) => { e.stopPropagation(); setStatusMenuFor(statusMenuFor === m.id ? null : m.id); }}
            onStatusSelect={(s) => setStatus(m.id, s)} />
        ))}
      </div>
    </div>
  );
}

// ============ MODULE CARD ============
function ModuleCard({ mod, status = 'planned', onDragStart, onDragEnd, onRemove, isDragging, compact = false, statusMenuOpen, onStatusClick, onStatusSelect }) {
  const cat = CATEGORIES[mod.cat];
  const diffColor = getDiffColor(mod.diff);
  const statusMeta = STATUS_META[status];
  const StatusIcon = statusMeta.icon;

  return (
    <div draggable onDragStart={(e) => onDragStart(e, mod.id)} onDragEnd={onDragEnd}
      className={`module-card group relative rounded-md border overflow-hidden bg-white ${isDragging ? 'dragging' : ''}`}
      style={{
        borderColor: status === 'completed' ? statusMeta.border : status === 'taking' ? statusMeta.border : '#E7E5E4',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        opacity: status === 'completed' ? 0.92 : 1,
      }}>
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: cat.accent }} />

      <div className={`flex items-start gap-2 ${compact ? 'p-2 pl-3' : 'p-2.5 pl-3.5'}`}>
        <GripVertical size={12} className="text-stone-300 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <div className="font-mono font-semibold text-[11px] tracking-tight" style={{ color: cat.color }}>{mod.id}</div>
            <div className="flex gap-0.5" title={`Difficulty: ${getDiffLabel(mod.diff)} (${mod.diff}/5)`}>
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-1 h-2.5 rounded-sm" style={{ background: i <= mod.diff ? diffColor : '#E7E5E4' }} />
              ))}
            </div>
          </div>
          <div className={`text-stone-800 leading-tight mt-0.5 font-medium ${compact ? 'text-[11px]' : 'text-xs'} ${status === 'completed' ? 'line-through decoration-emerald-600/40' : ''}`} style={{ wordBreak: 'break-word' }}>
            {mod.name}
          </div>
          {!compact && (
            <div className="flex items-center gap-2 mt-1.5 text-[9px] uppercase tracking-wider font-mono">
              <span className="px-1.5 py-0.5 rounded-sm font-semibold" style={{ background: cat.soft, color: cat.color }}>{cat.short}</span>
              <span className="text-stone-400">{mod.cu} CU</span>
              <span style={{ color: diffColor }} className="font-semibold">{getDiffLabel(mod.diff)}</span>
              {onStatusClick && (
                <div className="ml-auto relative">
                  <button onClick={onStatusClick} className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm font-semibold border transition hover:opacity-80"
                    style={{ background: statusMeta.bg, color: statusMeta.color, borderColor: statusMeta.border }}
                    title={`Status: ${statusMeta.label}`}>
                    <StatusIcon size={9} />
                    <span>{statusMeta.label}</span>
                  </button>
                  {statusMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded-md shadow-lg z-20 min-w-[120px] overflow-hidden">
                      {Object.entries(STATUS_META).map(([key, meta]) => {
                        const Icon = meta.icon;
                        return (
                          <button key={key} onClick={(e) => { e.stopPropagation(); onStatusSelect(key); }}
                            className="w-full px-2 py-1.5 flex items-center gap-1.5 hover:bg-stone-50 text-[10px] font-mono text-left transition"
                            style={{ color: meta.color }}>
                            <Icon size={10} /> {meta.label}
                            {key === status && <Check size={9} className="ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {onRemove && (
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="opacity-0 group-hover:opacity-100 transition text-stone-400 hover:text-red-600 mt-0.5 flex-shrink-0" title="Remove">
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

// ============ EXEMPTED CARD ============
function ExemptedCard({ mod, onRemove }) {
  const cat = CATEGORIES[mod.cat];
  return (
    <div className="group relative rounded-md border border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100/80 px-3 py-1.5 flex items-center gap-2 shadow-sm">
      <Award size={12} className="text-amber-600" />
      <span className="font-mono font-semibold text-[11px]" style={{ color: cat.color }}>{mod.id}</span>
      <span className="text-xs text-stone-700 font-medium">{mod.name}</span>
      <span className="text-[9px] uppercase tracking-wider font-mono text-amber-700 font-semibold">+{mod.cu} CU</span>
      <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 transition text-amber-600 hover:text-red-600 ml-1" title="Remove exemption">
        <X size={12} />
      </button>
    </div>
  );
}
