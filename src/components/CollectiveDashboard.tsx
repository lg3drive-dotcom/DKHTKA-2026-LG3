/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { STUDENT_RECORDS, getStats } from "../data/students";
import { Calculator, BookOpen, Users, Award, TrendingUp, BarChart2, Info } from "lucide-react";
import { motion } from "motion/react";

export default function CollectiveDashboard() {
  const stats = getStats();
  const [activeSubject, setActiveSubject] = useState<"all" | "mat" | "indo">("all");

  // Dynamic distribution counter
  const distribution = useMemo(() => {
    let matKurang = 0; // < 40
    let matMemadai = 0; // 40 - 69.99
    let matBaik = 0; // >= 70

    let indoKurang = 0;
    let indoMemadai = 0;
    let indoBaik = 0;

    STUDENT_RECORDS.forEach((s) => {
      // Math
      if (s.matematika < 40) matKurang++;
      else if (s.matematika < 70) matMemadai++;
      else matBaik++;

      // Indo
      if (s.bahasaIndonesia < 40) indoKurang++;
      else if (s.bahasaIndonesia < 70) indoMemadai++;
      else indoBaik++;
    });

    return {
      mat: [
        { label: "Kurang (<40)", count: matKurang, color: "#f87171" },
        { label: "Memadai (40-69)", count: matMemadai, color: "#60a5fa" },
        { label: "Baik (≥70)", count: matBaik, color: "#34d399" }
      ],
      indo: [
        { label: "Kurang (<40)", count: indoKurang, color: "#f87171" },
        { label: "Memadai (40-69)", count: indoMemadai, color: "#60a5fa" },
        { label: "Baik (≥70)", count: indoBaik, color: "#34d399" }
      ]
    };
  }, []);

  return (
    <div className="space-y-5 pb-8">
      {/* Overview Stats Block */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 shadow-lg text-center flex flex-col justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Peserta</span>
          <span className="text-xl font-black text-white font-mono my-1 block">{stats.totalStudents}</span>
          <span className="text-[9px] text-slate-500 font-bold">Siswa</span>
        </div>
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 shadow-lg text-center flex flex-col justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Rerata Gabung</span>
          <span className="text-xl font-black text-sky-400 font-mono my-1 block">{stats.overallAverage.toFixed(1)}</span>
          <span className="text-[9px] text-slate-500 font-bold">Kolektif</span>
        </div>
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 shadow-lg text-center flex flex-col justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Kelulusan</span>
          <span className="text-xl font-black text-emerald-400 font-mono my-1 block">94.7%</span>
          <span className="text-[9px] text-slate-500 font-bold">Memadai+</span>
        </div>
      </div>

      {/* Subject Filter (MTK vs INDO) */}
      <div className="bg-slate-950/80 p-1 rounded-xl flex border border-slate-800/80">
        <button
          onClick={() => setActiveSubject("all")}
          className={`flex-1 text-center py-2 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer ${
            activeSubject === "all" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Semua Mapel
        </button>
        <button
          onClick={() => setActiveSubject("mat")}
          className={`flex-1 text-center py-2 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer ${
            activeSubject === "mat" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-sm" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Matematika
        </button>
        <button
          onClick={() => setActiveSubject("indo")}
          className={`flex-1 text-center py-2 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer ${
            activeSubject === "indo" ? "bg-sky-500/10 text-sky-300 border border-sky-500/20 shadow-sm" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          B. Indonesia
        </button>
      </div>

      {/* Render Subject Specific Stats cards */}
      <div className="space-y-4">
        {(activeSubject === "all" || activeSubject === "mat") && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-4 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute right-3 top-3 opacity-5">
              <Calculator className="w-16 h-16 text-emerald-400" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-5 rounded-full bg-emerald-500" />
              <h3 className="font-bold text-white text-sm">Rekap Evaluasi Matematika</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2 border-b border-slate-700/40">
              <div className="text-center">
                <span className="text-[9px] text-slate-400 font-bold block mb-1">TERTINGGI</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{stats.matMax.toFixed(2)}</span>
              </div>
              <div className="text-center border-x border-slate-700/30">
                <span className="text-[9px] text-slate-400 font-bold block mb-1">RATA-RATA</span>
                <span className="text-lg font-black text-white font-mono">{stats.matAverage.toFixed(2)}</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-slate-400 font-bold block mb-1">TERENDAH</span>
                <span className="text-lg font-black text-rose-400 font-mono">{stats.matMin.toFixed(2)}</span>
              </div>
            </div>

            {/* Micro-visual chart for Math distribution */}
            <div className="mt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Sebaran Kompetensi</span>
              <div className="space-y-3.5">
                {distribution.mat.map((item, idx) => {
                  const pct = Math.round((item.count / stats.totalStudents) * 100);
                  const barColor = item.label.includes("Kurang") ? "#f43f5e" : item.label.includes("Memadai") ? "#38bdf8" : "#34d399";
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-350 w-28 text-left truncate">{item.label}</span>
                      <div className="flex-1 bg-slate-950/60 h-3 rounded-full overflow-hidden border border-slate-800/80 relative">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ width: `${pct}%`, backgroundColor: barColor }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-300 font-mono w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {(activeSubject === "all" || activeSubject === "indo") && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-4 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute right-3 top-3 opacity-5">
              <BookOpen className="w-16 h-16 text-sky-400" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-5 rounded-full bg-sky-500" />
              <h3 className="font-bold text-white text-sm">Rekap Evaluasi Bahasa Indonesia</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2 border-b border-slate-700/40">
              <div className="text-center">
                <span className="text-[9px] text-slate-400 font-bold block mb-1">TERTINGGI</span>
                <span className="text-lg font-black text-sky-400 font-mono">{stats.indoMax.toFixed(2)}</span>
              </div>
              <div className="text-center border-x border-slate-700/30">
                <span className="text-[9px] text-slate-400 font-bold block mb-1">RATA-RATA</span>
                <span className="text-lg font-black text-white font-mono">{stats.indoAverage.toFixed(2)}</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-slate-400 font-bold block mb-1">TERENDAH</span>
                <span className="text-lg font-black text-rose-400 font-mono">{stats.indoMin.toFixed(2)}</span>
              </div>
            </div>

            {/* Micro-visual chart for Indo distribution */}
            <div className="mt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Sebaran Kompetensi</span>
              <div className="space-y-3.5">
                {distribution.indo.map((item, idx) => {
                  const pct = Math.round((item.count / stats.totalStudents) * 100);
                  const barColor = item.label.includes("Kurang") ? "#f43f5e" : item.label.includes("Memadai") ? "#38bdf8" : "#34d399";
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-350 w-28 text-left truncate">{item.label}</span>
                      <div className="flex-1 bg-slate-950/60 h-3 rounded-full overflow-hidden border border-slate-800/80 relative">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ width: `${pct}%`, backgroundColor: barColor }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-300 font-mono w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Class Comparison Chart (Group Benchmark Bar Graph with interactive tooltips) */}
      <div className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-sky-400" />
          <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Perbandingan Rata-rata Kelas (Sore-mapel)</h4>
        </div>

        {/* Responsive Interactive SVG Column Bar Chart */}
        <div className="w-full flex justify-center py-2 h-44 items-end gap-x-8 px-4 border-b border-slate-700/40">
          {/* Mat average bar */}
          <div className="flex flex-col items-center flex-1 max-w-[80px]">
            <span className="text-[10px] font-bold text-emerald-400 mb-1.5 font-mono">{stats.matAverage.toFixed(1)}</span>
            <div className="w-8 bg-emerald-500/10 hover:bg-emerald-500/20 border-t-2 border-emerald-400 rounded-t-md transition-all duration-300 flex items-end justify-center" style={{ height: `${(stats.matAverage / 100) * 120}px` }}>
              <div className="w-4 bg-emerald-400 h-2/3 rounded-t-xs" />
            </div>
            <span className="text-[10px] font-bold text-slate-450 mt-2.5 text-center leading-none">Matematika</span>
          </div>

          {/* Overall average bar */}
          <div className="flex flex-col items-center flex-1 max-w-[80px]">
            <span className="text-[10px] font-bold text-slate-300 mb-1.5 font-mono">{stats.overallAverage.toFixed(1)}</span>
            <div className="w-8 bg-slate-950/80 hover:bg-slate-950 border-t-2 border-slate-500 rounded-t-md transition-all duration-300 flex items-end justify-center" style={{ height: `${(stats.overallAverage / 100) * 120}px` }}>
              <div className="w-4 bg-slate-500 h-2/3 rounded-t-xs" />
            </div>
            <span className="text-[10px] font-bold text-slate-450 mt-2.5 text-center leading-none">Rerata Gabung</span>
          </div>

          {/* Indo average bar */}
          <div className="flex flex-col items-center flex-1 max-w-[80px]">
            <span className="text-[10px] font-bold text-sky-400 mb-1.5 font-mono">{stats.indoAverage.toFixed(1)}</span>
            <div className="w-8 bg-sky-500/10 hover:bg-sky-500/20 border-t-2 border-sky-400 rounded-t-md transition-all duration-300 flex items-end justify-center" style={{ height: `${(stats.indoAverage / 100) * 120}px` }}>
              <div className="w-4 bg-sky-400 h-2/3 rounded-t-xs" />
            </div>
            <span className="text-[10px] font-bold text-slate-450 mt-2.5 text-center leading-none">B. Indonesia</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 mt-4.5 text-center leading-relaxed">
          💡 Rata-rata Pelajaran Bahasa Indonesia lebih unggul dibandingkan Matematika. Pendidik dapat menjadikannya bahan evaluasibelajar tahun depan.
        </p>
      </div>

      {/* Info Warning */}
      <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
        <span className="text-[10px] text-slate-400 leading-relaxed font-medium">
          Seluruh data rekapitulsai di atas dirancang secara anonim penuh tanpa menampilkan nama, Nomor Peserta, maupun NISN. Sesuai dengan Peraturan Perlindungan Kerahasiaan Nilai Siswa.
        </span>
      </div>
    </div>
  );
}
