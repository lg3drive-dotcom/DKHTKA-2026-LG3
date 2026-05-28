/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import PrivatePortal from "./components/PrivatePortal";
import CollectiveDashboard from "./components/CollectiveDashboard";
import AdminPortal from "./components/AdminPortal";
import { Lock, BarChart2, BookOpen, Heart, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"private" | "collective" | "admin">("private");

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col items-center">
      
      {/* Container Wrapper - Mimicing a mobile app layout inside a responsive max-width card */}
      <div className="w-full max-w-md bg-slate-900 min-h-screen flex flex-col shadow-2xl border-x border-slate-800 relative">
        
        {/* Academic Header */}
        <Header />

        {/* Content Box with scrolling */}
        <main className="flex-1 px-4 py-5 overflow-y-auto pb-24">
          
          {/* Informational Welcome Card - Stylized like Bento block */}
          <div className="mb-5 bg-gradient-to-br from-indigo-900/40 to-slate-800 border border-slate-700/60 rounded-[1.8rem] p-5 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 translate-x-3 -translate-y-3">
              <BookOpen className="w-24 h-24 text-sky-400" />
            </div>
            
            <span className="text-[9px] bg-sky-500/10 border border-sky-500/20 rounded-full px-2.5 py-1 text-sky-300 font-extrabold tracking-wider uppercase inline-block mb-2.5">
              Keterangan Resmi
            </span>
            <h2 className="text-sm font-extrabold text-white leading-snug">
              Sistem Informasi & Pengumuman Hasil Tes TKA 2026
            </h2>
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-medium">
              Selamat datang di portal akademik resmi. Di sini Anda dapat memantau hasil evaluasi Matematika dan Bahasa Indonesia secara mandiri, aman, dan privat.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "private" && (
              <motion.div
                key="private-view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                <PrivatePortal />
              </motion.div>
            )}
            {activeTab === "collective" && (
              <motion.div
                key="collective-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                <CollectiveDashboard />
              </motion.div>
            )}
            {activeTab === "admin" && (
              <motion.div
                key="admin-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <AdminPortal />
              </motion.div>
            )}
          </AnimatePresence>

        </main>

        {/* Navigation bar positioned at the bottom of the container */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 border-t border-slate-800 shadow-xl px-4 py-3 z-40 sticky backdrop-blur-md">
          <div className="flex items-center justify-around bg-slate-950/80 border border-slate-800 p-1 rounded-2xl">
            
            {/* Tab 1: Hasil Mandiri */}
            <button
              onClick={() => setActiveTab("private")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "private" ? "text-white font-extrabold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <div className={`p-1 px-3 rounded-lg transition-colors ${
                activeTab === "private" ? "bg-sky-500/20 text-sky-400" : "bg-transparent text-slate-500"
              }`}>
                <Lock className="w-4 h-4 mx-auto" />
              </div>
              <span className="text-[9px] tracking-tight font-bold">Hasil Mandiri</span>
            </button>

            {/* Tab 2: Evaluasi Kelas */}
            <button
              onClick={() => setActiveTab("collective")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "collective" ? "text-white font-extrabold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <div className={`p-1 px-3 rounded-lg transition-colors ${
                activeTab === "collective" ? "bg-sky-500/20 text-sky-400" : "bg-transparent text-slate-500"
              }`}>
                <BarChart2 className="w-4 h-4 mx-auto" />
              </div>
              <span className="text-[9px] tracking-tight font-bold">Evaluasi Kelas</span>
            </button>

            {/* Tab 3: Akses Admin */}
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "admin" ? "text-white font-extrabold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <div className={`p-1 px-3 rounded-lg transition-colors ${
                activeTab === "admin" ? "bg-indigo-500/20 text-indigo-400" : "bg-transparent text-slate-500"
              }`}>
                <ShieldAlert className="w-4 h-4 mx-auto" />
              </div>
              <span className="text-[9px] tracking-tight font-bold">Akses Admin</span>
            </button>

          </div>
        </div>

        {/* Small branding footer inside application viewport */}
        <footer className="text-center py-5 bg-slate-900 border-t border-slate-800/60 flex flex-col items-center gap-1.5 px-4 mb-20">
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 tracking-widest uppercase">
            <span>SDN LEUWIGAJAH 3</span>
            <span>•</span>
            <span>KOTA CIMAHI</span>
          </div>
          <p className="text-[8px] text-slate-400 flex items-center gap-1 font-semibold tracking-wide">
            Dikelola dengan <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" /> untuk Pendidikan Indonesia
          </p>
        </footer>

      </div>
    </div>
  );
}
