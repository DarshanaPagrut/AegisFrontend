import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Activity, 
  Calendar,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';

/**
 * NOTE FOR USER: 
 * For the purpose of this preview, I have inlined the data and theme logic 
 * to ensure the component renders correctly. In your actual project, 
 * you can revert these to imports:
 * * import { useTheme } from '../contexts/ThemeContext';
 * import { scanHistory, riskDistribution, trendData } from '../data/dummyData';
 */

// --- MOCK DATA (Inlined for Preview Stability) ---
const scanHistory = [
  { date: 'Mon', count: 45 },
  { date: 'Tue', count: 52 },
  { date: 'Wed', count: 38 },
  { date: 'Thu', count: 65 },
  { date: 'Fri', count: 48 },
  { date: 'Sat', count: 70 },
  { date: 'Sun', count: 55 },
];

const riskDistribution = [
  { name: 'Safe', value: 65 },
  { name: 'Suspicious', value: 20 },
  { name: 'Malicious', value: 10 },
  { name: 'Critical', value: 5 },
];

const trendData = [
  { name: 'Week 1', scans: 120 },
  { name: 'Week 2', scans: 180 },
  { name: 'Week 3', scans: 150 },
  { name: 'Week 4', scans: 210 },
  { name: 'Week 5', scans: 190 },
  { name: 'Week 6', scans: 240 },
];

// Mock theme hook
const useTheme = () => ({ dark: true });

const Analytics: React.FC = () => {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState('Weekly');

  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];
  const GRADIENT_COLORS = {
    primary: '#3b82f6',
    secondary: '#6366f1'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#121216] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: <span className="text-white">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30 font-sans">
      <Navbar variant="app" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">Intelligence Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              Security Analytics
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-[#121216] border border-white/5 rounded-xl text-sm font-medium hover:bg-[#1a1a20] transition-colors group">
              <Calendar className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
              Last 30 Days
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              <Filter className="w-4 h-4" />
              Filter Reports
            </button>
          </motion.div>
        </div>

        {/* Key Metrics Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {[
            { label: 'Total Scans', value: '1,284', icon: Shield, trend: '+12.5%', color: 'blue' },
            { label: 'Threats Blocked', value: '142', icon: AlertTriangle, trend: '+4.2%', color: 'indigo' },
            { label: 'System Health', value: '98.2%', icon: Activity, trend: 'Optimal', color: 'emerald' },
            { label: 'Active Sessions', value: '12', icon: ShieldCheck, trend: 'Secure', color: 'blue' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.4)' }}
              className="group p-6 bg-[#121216]/80 backdrop-blur-xl border border-white/5 rounded-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/10 transition-colors">
                  <stat.icon className={`w-6 h-6 ${i % 2 === 0 ? 'text-blue-400' : 'text-indigo-400'}`} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${stat.trend.includes('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-tight">{stat.label}</p>
                <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Threat Activity Chart */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 p-8 bg-[#121216]/80 backdrop-blur-xl border border-white/5 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold mb-1">Threat Activity</h2>
                <p className="text-gray-400 text-sm">Temporal analysis of security events</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-xs text-gray-400 font-medium">Unique Scans</span>
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GRADIENT_COLORS.primary} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={GRADIENT_COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={15}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="scans" 
                    stroke={GRADIENT_COLORS.primary} 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorScans)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Risk Profile Donut Chart */}
          <motion.div 
            variants={itemVariants}
            className="p-8 bg-[#121216]/80 backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold">Risk Profile</h2>
              <Info className="w-4 h-4 text-gray-500 cursor-help" />
            </div>
            <p className="text-gray-400 text-sm mb-8">Classification of entities detected</p>
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="h-[240px] w-full relative">
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold">1.2k</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Entities</span>
                 </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="value"
                      animationDuration={1200}
                    >
                      {riskDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                {riskDistribution.map((entry, index) => (
                  <div key={index} className="flex flex-col gap-1 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{entry.name}</span>
                    </div>
                    <span className="text-sm font-bold">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Weekly Volume Analysis */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 p-8 bg-[#121216]/80 backdrop-blur-xl border border-white/5 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1">Volume Analysis</h2>
                <p className="text-gray-400 text-sm">Security checks distribution over time</p>
              </div>
              <div className="flex bg-[#0a0a0c] p-1 rounded-xl border border-white/5">
                {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scanHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={15}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Bar 
                    dataKey="count" 
                    fill={GRADIENT_COLORS.primary} 
                    radius={[6, 6, 0, 0]} 
                    barSize={45}
                    animationDuration={1000}
                  >
                    {scanHistory.map((_, index) => (
                      <Cell 
                        key={`bar-cell-${index}`} 
                        fill={index === 5 ? GRADIENT_COLORS.primary : 'rgba(59, 130, 246, 0.4)'} 
                        className="transition-all duration-300 hover:fill-blue-400"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Actionable Insights Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
           <motion.div 
            whileHover={{ y: -5 }}
            className="group relative p-px rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-transparent"
           >
              <div className="bg-[#121216] p-8 rounded-[23px] h-full relative z-10 border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Threat Forecast</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
                  Based on historical patterns, we anticipate a <span className="text-white font-semibold">15% increase</span> in spear-phishing attempts during the next 48 hours. Ensure internal firewalls are active.
                </p>
                <button className="flex items-center gap-2 text-blue-400 text-sm font-bold group-hover:gap-4 transition-all">
                  Access Detailed Intelligence <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
           </motion.div>

           <motion.div 
            whileHover={{ y: -5 }}
            className="group relative p-px rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent"
           >
              <div className="bg-[#121216] p-8 rounded-[23px] h-full relative z-10 border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold">Aegis Score</h3>
                </div>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-5xl font-black text-white leading-none">92</span>
                  <div className="flex flex-col">
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Tier: Elite</span>
                    <span className="text-gray-500 text-[10px]">Top 5% of Users</span>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"
                  />
                </div>
                <button className="flex items-center gap-2 text-indigo-400 text-sm font-bold group-hover:gap-4 transition-all">
                  Optimize Infrastructure <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;