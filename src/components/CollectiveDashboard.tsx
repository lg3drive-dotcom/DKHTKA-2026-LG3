/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { STUDENT_RECORDS, getStats } from "../data/students";
import { Calculator, BookOpen, Users, Award, TrendingUp, BarChart2, Info, Trophy, Sparkles } from "lucide-react";
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

      {/* PERBANDINGAN RATA-RATA NILAI TKA 2026 */}
      <div className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-5 shadow-2xl space-y-4">
        
        {/* Title block */}
        <div className="text-center space-y-1.5 pb-2.5 border-b border-slate-700/40">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-4.5 h-4.5 text-amber-400" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider">Perbandingan Rata-Rata Nilai TKA 2026</h4>
          </div>
          <p className="text-[9.5px] font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/15 inline-block mx-auto">
            SD NEGERI LEUWIGAJAH 3
          </p>
          <p className="text-[9px] text-slate-400 leading-normal max-w-xs mx-auto">
            Perbandingan Nilai TKA Matematika dan Bahasa Indonesia SD Negeri Leuwigajah 3 dengan Provinsi Jawa Barat dan Nasional
          </p>
        </div>

        {/* GRAFIK PERBANDINGAN */}
        <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grafik Perbandingan</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="w-2 rounded-xs aspect-square" style={{ backgroundColor: "#38bdf8" }} />
                <span className="text-[8px] font-bold text-slate-300">Matematika</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 rounded-xs aspect-square" style={{ backgroundColor: "#fb923c" }} />
                <span className="text-[8px] font-bold text-slate-300">Bahasa Indonesia</span>
              </div>
            </div>
          </div>

          {/* Clustered Bar Charts in CSS/HTML */}
          <div className="h-44 flex items-end justify-around border-b border-slate-800/80 pb-2 px-1 gap-x-2">
            {/* School Bars */}
            <div className="flex flex-col items-center flex-1 max-w-[90px] h-full justify-end">
              <div className="flex gap-1.5 items-end h-32">
                {/* Math */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-black font-mono text-sky-450 mb-0.5">{stats.matAverage.toFixed(2)}</span>
                  <div className="w-3.5 bg-sky-500/15 border-t border-sky-400 rounded-t flex items-end justify-center transition-all duration-300" style={{ height: `${(stats.matAverage / 100) * 110}px` }}>
                    <div className="w-2 bg-sky-450 h-4/5 rounded-t" />
                  </div>
                </div>
                {/* Indo */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-black font-mono text-orange-450 mb-0.5">{stats.indoAverage.toFixed(2)}</span>
                  <div className="w-3.5 bg-orange-500/15 border-t border-orange-400 rounded-t flex items-end justify-center transition-all duration-300" style={{ height: `${(stats.indoAverage / 100) * 110}px` }}>
                    <div className="w-2 bg-orange-450 h-4/5 rounded-t" />
                  </div>
                </div>
              </div>
              <span className="text-[8px] font-black text-slate-300 mt-2 text-center leading-none uppercase">SDN LEUWIGAJAH 3</span>
            </div>

            {/* Jawa Barat Bars */}
            <div className="flex flex-col items-center flex-1 max-w-[90px] h-full justify-end">
              <div className="flex gap-1.5 items-end h-32">
                {/* Math */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-bold font-mono text-slate-400 mb-0.5">43.47</span>
                  <div className="w-3.5 bg-slate-700/30 border-t border-slate-500 rounded-t flex items-end justify-center" style={{ height: `${(43.47 / 100) * 110}px` }}>
                    <div className="w-2 bg-slate-500/80 h-4/5 rounded-t" />
                  </div>
                </div>
                {/* Indo */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-bold font-mono text-slate-400 mb-0.5">60.22</span>
                  <div className="w-3.5 bg-slate-700/30 border-t border-slate-500 rounded-t flex items-end justify-center" style={{ height: `${(60.22 / 100) * 110}px` }}>
                    <div className="w-2 bg-slate-500/80 h-4/5 rounded-t" />
                  </div>
                </div>
              </div>
              <span className="text-[8px] font-bold text-slate-400 mt-2 text-center leading-none uppercase">PROVINSI JABAR</span>
            </div>

            {/* Nasional Bars */}
            <div className="flex flex-col items-center flex-1 max-w-[90px] h-full justify-end">
              <div className="flex gap-1.5 items-end h-32">
                {/* Math */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-bold font-mono text-slate-400 mb-0.5">43.41</span>
                  <div className="w-3.5 bg-slate-700/30 border-t border-slate-500 rounded-t flex items-end justify-center" style={{ height: `${(43.41 / 100) * 110}px` }}>
                    <div className="w-2 bg-slate-500/80 h-4/5 rounded-t" />
                  </div>
                </div>
                {/* Indo */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] font-bold font-mono text-slate-400 mb-0.5">60.14</span>
                  <div className="w-3.5 bg-slate-700/30 border-t border-slate-500 rounded-t flex items-end justify-center" style={{ height: `${(60.14 / 100) * 110}px` }}>
                    <div className="w-2 bg-slate-500/80 h-4/5 rounded-t" />
                  </div>
                </div>
              </div>
              <span className="text-[8px] font-bold text-slate-400 mt-2 text-center leading-none uppercase">NASIONAL</span>
            </div>
          </div>
        </div>

        {/* UNGGUL DI ATAS RATA-RATA Badges */}
        <div className="bg-gradient-to-r from-emerald-600/30 to-teal-600/25 border border-emerald-500/20 rounded-2xl p-3 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-450 shrink-0" />
            <h5 className="text-[10px] font-black text-emerald-300 uppercase tracking-widest leading-none">
              SD NEGERI LEUWIGAJAH 3 UNGGUL DI ATAS RATA-RATA
            </h5>
          </div>
        </div>

        {/* Breakdown Blocks */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* Matematika Comparison */}
          <div className="bg-slate-950/40 border border-slate-750 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded bg-sky-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-wider">MATEMATIKA</span>
              </div>
              <span className="text-[11px] font-black text-sky-400 font-mono bg-sky-400/10 px-2 py-0.5 rounded-lg border border-sky-400/15">
                {stats.matAverage.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-2">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-500 block">lebih tinggi dibandingkan:</span>
              
              <div className="grid grid-cols-2 gap-2.5">
                {/* vs Jabar */}
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-450 block leading-tight">Provinsi Jawa Barat</span>
                    <span className="text-[8px] font-semibold text-slate-500 font-mono">43.47</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[9px] font-black text-emerald-450 font-mono bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/10 shrink-0">
                    <span>↑</span>
                    <span>{(stats.matAverage - 43.47).toFixed(2)}</span>
                  </div>
                </div>

                {/* vs Nasional */}
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-450 block leading-tight">Nasional</span>
                    <span className="text-[8px] font-semibold text-slate-500 font-mono">43.41</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[9px] font-black text-emerald-450 font-mono bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/10 shrink-0">
                    <span>↑</span>
                    <span>{(stats.matAverage - 43.41).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bahasa Indonesia Comparison */}
          <div className="bg-slate-950/40 border border-slate-750 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded bg-orange-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-wider">BAHASA INDONESIA</span>
              </div>
              <span className="text-[11px] font-black text-orange-400 font-mono bg-orange-400/10 px-2 py-0.5 rounded-lg border border-orange-400/15">
                {stats.indoAverage.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-500 block">lebih tinggi dibandingkan:</span>

              <div className="grid grid-cols-2 gap-2.5">
                {/* vs Jabar */}
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-450 block leading-tight">Provinsi Jawa Barat</span>
                    <span className="text-[8px] font-semibold text-slate-500 font-mono">60.22</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[9px] font-black text-emerald-450 font-mono bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/10 shrink-0">
                    <span>↑</span>
                    <span>{(stats.indoAverage - 60.22).toFixed(2)}</span>
                  </div>
                </div>

                {/* vs Nasional */}
                <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-450 block leading-tight">Nasional</span>
                    <span className="text-[8px] font-semibold text-slate-500 font-mono">60.14</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[9px] font-black text-emerald-450 font-mono bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/10 shrink-0">
                    <span>↑</span>
                    <span>{(stats.indoAverage - 60.14).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KESIMPULAN Block */}
        <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-3.5 space-y-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <h6 className="text-[9px] font-black text-amber-400 uppercase tracking-widest leading-none">
              KESIMPULAN EVALUASI
            </h6>
          </div>
          <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
            Berdasarkan hasil TKA 2026, rerata nilai <strong className="text-white">SD Negeri Leuwigajah 3</strong> berada di atas rata-rata Provinsi Jawa Barat dan Nasional, baik pada mata pelajaran Matematika maupun Bahasa Indonesia.
          </p>
          <p className="text-[10px] text-emerald-400 font-extrabold leading-normal">
            Mewujudkan Generasi PERCEKA (Prestasi, Cerdas, dan Berakhlakul Karimah)!
          </p>

          <div className="grid grid-cols-3 gap-1 pt-2.5 border-t border-slate-800/80">
            <div className="text-center">
              <span className="text-[7.5px] font-black text-emerald-405 uppercase block tracking-tighter leading-none">PRESTASI</span>
              <span className="text-[6.5px] text-slate-500 uppercase block mt-1 leading-none font-bold">Unggul & Juara</span>
            </div>
            <div className="text-center border-x border-slate-850">
              <span className="text-[7.5px] font-black text-sky-405 uppercase block tracking-tighter leading-none">CERDAS</span>
              <span className="text-[6.5px] text-slate-500 uppercase block mt-1 leading-none font-bold">Inovatif & Logis</span>
            </div>
            <div className="text-center">
              <span className="text-[7.5px] font-black text-amber-405 uppercase block tracking-tighter leading-none">BERAKHLAK</span>
              <span className="text-[6.5px] text-slate-500 uppercase block leading-none font-bold mt-1">Ahlakul Karimah</span>
            </div>
          </div>
        </div>
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
