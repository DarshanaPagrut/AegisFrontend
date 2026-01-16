import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Activity, 
  Shield, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar,
  ExternalLink,
  MoreVertical,
  RefreshCw,
  LogOut,
  Zap,
  LayoutDashboard,
  Menu,
  X,
  Bell,
  User,
  ArrowUpRight,
  Target
} from 'lucide-react';

// --- THEME & DATA MOCKS (For Preview Stability) ---
// Note: In your local project, you can restore imports for Navbar, ThemeContext, etc.
const useTheme = () => ({ dark: true });



export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Safely handle environment variables
    let baseUrl = 'http://localhost:5000';
    try {
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
        // @ts-ignore
        baseUrl = import.meta.env.VITE_API_BASE_URL;
      }
    } catch (e) {}

    fetch(`${baseUrl}/api/history`)
      .then(res => res.json())
      .then(data => {
        setHistoryData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch history:", err);
        // Fallback data for preview/dev mode
        setHistoryData([
          { id: 1, date: new Date().toISOString(), url: 'https://malicious-example.com/login-portal', riskScore: 92, riskReasons: ['Domain Age', 'Suspect IP'], actionTaken: 'blocked' },
          { id: 2, date: new Date(Date.now() - 3600000).toISOString(), url: 'https://secure-bank-access.co', riskScore: 15, riskReasons: [], actionTaken: 'allowed' },
          { id: 3, date: new Date(Date.now() - 7200000).toISOString(), url: 'https://free-crypto-token.xyz/claim', riskScore: 68, riskReasons: ['High Frequency', 'Bot Detected'], actionTaken: 'blocked' },
          { id: 4, date: new Date(Date.now() - 10800000).toISOString(), url: 'https://internal-docs.company.local', riskScore: 5, riskReasons: [], actionTaken: 'allowed' },
          { id: 5, date: new Date(Date.now() - 86400000).toISOString(), url: 'https://update-system-now.net', riskScore: 55, riskReasons: ['Unusual TLD'], actionTaken: 'allowed' },
        ]);
        setIsLoading(false);
      });
  }, []);

  const filteredAndSortedData = historyData
    .filter(check => {
      const matchesSearch = check.url?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' ||
        (filterBy === 'blocked' && check.actionTaken === 'blocked') ||
        (filterBy === 'allowed' && check.actionTaken === 'allowed') ||
        (filterBy === 'suspicious' && check.riskScore > 50 && check.actionTaken === 'allowed');
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'risk':
          aValue = a.riskScore;
          bValue = b.riskScore;
          break;
        case 'url':
          aValue = a.url?.toLowerCase() || '';
          bValue = b.url?.toLowerCase() || '';
          break;
        default: return 0;
      }
      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

  const stats = {
    total: historyData.length,
    blocked: historyData.filter(c => c.actionTaken === 'blocked').length,
    suspicious: historyData.filter(c => c.riskScore > 50 && c.actionTaken === 'allowed').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const getActionBadge = (action: string) => {
    if (action === 'blocked') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-black tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
          <Shield className="w-3 h-3 mr-1.5" /> BLOCKED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <ShieldCheck className="w-3 h-3 mr-1.5" /> ALLOWED
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30">
      <Navbar variant="app" />
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Security Operations</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              Surveillance Dashboard
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl text-sm leading-relaxed font-medium">
              Unified threat surveillance and investigative logs. Monitor scanning activity and critical system interventions in real-time.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <button onClick={() => window.location.reload()} className="p-3 bg-[#121216] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1a20] transition-all shadow-xl active:scale-95">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              Secure Export
            </button>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
               <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Shield className="w-6 h-6 text-blue-400/30" />
               </div>
            </div>
            <p className="text-gray-600 mt-6 font-bold uppercase tracking-widest text-[10px]">Decrypting Security Feed...</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Network Entities', value: stats.total, icon: Target, color: 'blue', trend: '+12.5%' },
                { label: 'Threat Interceptions', value: stats.blocked, icon: Shield, color: 'red', trend: '+2.4%' },
                { label: 'Risk Anomalies', value: stats.suspicious, icon: AlertTriangle, color: 'amber', trend: '-1.2%' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.3)' }}
                  className="group p-8 bg-[#121216]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl group-hover:bg-${stat.color}-500/10 transition-all`} />
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                      <stat.icon className={`w-8 h-8 ${
                        stat.color === 'blue' ? 'text-blue-400' : 
                        stat.color === 'red' ? 'text-red-400' : 'text-amber-400'
                      }`} />
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* History Container */}
            <motion.div variants={itemVariants} className="bg-[#121216]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-white/5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                    <div>
                      <h2 className="text-2xl font-black tracking-tight">Intelligence Logs</h2>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-0.5">Global stream processing</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-4xl">
                    <div className="relative flex-1">
                      <Search className="h-4 w-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search URLs, IPs, or Entities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#0a0a0c] border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/30 outline-none text-sm text-gray-200 placeholder-gray-700 transition-all font-medium"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="relative">
                        <select
                          value={filterBy}
                          onChange={(e) => setFilterBy(e.target.value)}
                          className="pl-5 pr-10 py-3 bg-[#0a0a0c] border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none hover:bg-white/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="all">Global Logs</option>
                          <option value="blocked">Intercepted</option>
                          <option value="allowed">Verified</option>
                          <option value="suspicious">Anomalies</option>
                        </select>
                        <ChevronDown className="h-3 w-3 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      <div className="relative">
                        <select
                          value={`${sortBy}-${sortOrder}`}
                          onChange={(e) => {
                            const [field, order] = e.target.value.split('-');
                            setSortBy(field);
                            setSortOrder(order as 'asc' | 'desc');
                          }}
                          className="pl-5 pr-10 py-3 bg-[#0a0a0c] border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none hover:bg-white/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="date-desc">Chronological</option>
                          <option value="date-asc">Reverse</option>
                          <option value="risk-desc">Highest Risk</option>
                          <option value="url-asc">A-Z Map</option>
                        </select>
                        <ChevronDown className="h-3 w-3 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0a0a0c]/50">
                      <th className="px-8 py-6 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Marker</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Target Entity</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Threat Vector</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Action Taken</th>
                      <th className="px-8 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    <AnimatePresence mode='popLayout'>
                      {filteredAndSortedData.map((check, idx) => (
                        <motion.tr 
                          key={check.id || idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-white/[0.01] transition-colors"
                        >
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-300">{formatDate(check.date)}</span>
                              <span className="text-[10px] text-gray-600 font-mono font-bold mt-1 uppercase">
                                {new Date(check.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 max-w-md">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col truncate">
                                <span className="text-sm font-black text-gray-200 truncate leading-tight" title={check.url}>
                                  {check.url}
                                </span>
                                <span className="text-[9px] text-blue-500/50 font-mono font-bold uppercase tracking-tighter mt-0.5">HTTPS // PROCESSED</span>
                              </div>
                              <ExternalLink className="w-3 h-3 text-gray-700 group-hover:text-blue-500 transition-colors cursor-pointer flex-shrink-0" />
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4 min-w-[200px]">
                              <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${check.riskScore}%` }}
                                  className={`h-full ${
                                    check.riskScore >= 70 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 
                                    check.riskScore >= 30 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.2)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                                  }`}
                                />
                              </div>
                              <span className={`text-xs font-black w-8 text-right ${
                                check.riskScore >= 70 ? 'text-red-400' : check.riskScore >= 30 ? 'text-amber-400' : 'text-emerald-400'
                              }`}>
                                {check.riskScore}%
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {check.riskReasons?.slice(0, 2).map((reason: string, rIdx: number) => (
                                <span key={rIdx} className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/5 font-black uppercase tracking-widest">
                                  {reason}
                                </span>
                              ))}
                              {check.riskReasons?.length > 2 && (
                                <span className="text-[9px] text-gray-600 self-center font-bold">+{check.riskReasons.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            {getActionBadge(check.actionTaken)}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="p-2 text-gray-700 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {filteredAndSortedData.length === 0 && (
                <div className="text-center py-32">
                  <div className="inline-flex p-8 bg-white/5 rounded-full mb-6">
                    <Search className="h-10 w-10 text-gray-800" />
                  </div>
                  <h3 className="text-xl font-black text-white">No Matching Entity</h3>
                  <p className="text-gray-600 mt-2 text-sm font-medium">Try adjusting your intelligence filters.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}