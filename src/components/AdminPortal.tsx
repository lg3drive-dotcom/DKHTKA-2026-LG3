/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { STUDENT_RECORDS, getStats } from "../data/students";
import { generateAdminReportPDF } from "../utils/pdfGenerator";
import { 
  Lock, 
  Unlock, 
  FileDown, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Search, 
  Loader2, 
  Eye, 
  Award,
  AlertTriangle,
  Info 
} from "lucide-react";
import { motion } from "motion/react";

export default function AdminPortal() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDownloading, setIsDownloading] = useState<"mat" | "indo" | "both" | null>(null);

  const stats = getStats();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthorized(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Password salah! Silakan coba lagi.");
    }
  };

  const handleDownload = async (type: "mat" | "indo" | "both") => {
    setIsDownloading(type);
    try {
      const subjectParam = type === "mat" ? "matematika" : type === "indo" ? "bahasaIndonesia" : "both";
      await generateAdminReportPDF(subjectParam, stats);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(null);
    }
  };

  // Find math extremes
  const maxMat = stats.matMax;
  const minMat = stats.matMin;
  const topMatStudents = STUDENT_RECORDS.filter(s => s.matematika === maxMat);
  const lowMatStudents = STUDENT_RECORDS.filter(s => s.matematika === minMat);

  // Find Indonesian extremes
  const maxIndo = stats.indoMax;
  const minIndo = stats.indoMin;
  const topIndoStudents = STUDENT_RECORDS.filter(s => s.bahasaIndonesia === maxIndo);
  const lowIndoStudents = STUDENT_RECORDS.filter(s => s.bahasaIndonesia === minIndo);

  if (!isAuthorized) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-[1.8rem] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Lock className="w-32 h-32 text-indigo-400" />
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Akses Terbatas: Administrator</h3>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                Silakan masukkan kata sandi admin sekolah untuk mengakses laporan nilai ekstrim dan analisis instansi.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3.5 max-w-sm pt-2">
              <div>
                <input
                  type="password"
                  placeholder="Masukkan kata sandi admin..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 text-white placeholder-slate-500 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-center focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              {errorMsg && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-rose-450 text-[10px] font-bold"
                >
                  ⚠️ {errorMsg}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/15"
              >
                Buka Portal Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* 
        ========================================================================
        KOP SURAT RESMI - GAYA KEDINASAN INDONESIA MODEL 1 (AUTHENTIC CLONE)
        ========================================================================
      */}
      <div 
        id="kop-surat-resmi-indonesia"
        className="bg-white text-black p-5 rounded-2xl border-b-[3px] border-black pb-2 mb-6 flex items-center justify-between gap-4 select-none print:p-0 print:border-none"
      >
        {/* Logo Kiri (Logo Dinas/Pemda) */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
          <img 
            src="https://i.ibb.co.com/wZdz4JgV/logo-lg3-20260425-202811-0000.png" 
            alt="Logo Pemerintah Daerah"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Teks Identitas Tengah */}
        <div className="flex-1 text-center font-bold">
          <div className="text-sm md:text-base leading-tight uppercase font-bold tracking-normal">
            PEMERINTAH DAERAH KOTA CIMAHI
          </div>
          <div className="text-sm md:text-base leading-tight uppercase font-bold tracking-normal">
            DINAS PENDIDIKAN
          </div>
          <div className="text-lg md:text-xl leading-tight mt-1 mb-1 uppercase font-extrabold tracking-tight">
            SD NEGERI LEUWIGAJAH 3
          </div>
          <div className="text-[9px] md:text-xs font-normal italic leading-relaxed">
            Jln. Kerkof No.33 Rt 09 Rw 09 Kel. Leuwigajah Kec. Cimahi Selatan
          </div>
        </div>

        {/* Logo Kanan (Logo Sekolah/Yayasan) */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
          <img 
            src="https://i.ibb.co.com/39BKK1KR/logo-lg3-20260425-202644-0000.png" 
            alt="Logo Sekolah"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Admin Panel Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-[1.8rem] p-5 shadow-xl relative overflow-hidden">
        
        {/* Section title & Sign-out button */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Unlock className="w-4.5 h-4.5 text-emerald-400" />
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Kontrol Pelaporan Administrator
            </h3>
          </div>
          <button
            onClick={() => {
              setIsAuthorized(false);
              setPassword("");
            }}
            className="text-[9px] font-bold text-slate-400 hover:text-rose-400 uppercase tracking-widest px-2.5 py-1.5 border border-slate-800 rounded-lg hover:border-rose-500/20 hover:bg-rose-500/5 transition-all cursor-pointer"
          >
            Keluar
          </button>
        </div>

        {/* Action button downloads list */}
        <div className="grid grid-cols-1 gap-2.5">
          {/* Download 1: Matematika */}
          <button
            onClick={() => handleDownload("mat")}
            disabled={isDownloading !== null}
            className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-950/80 text-white rounded-2xl flex items-center justify-between border border-slate-800 hover:border-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                {isDownloading === "mat" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block">Dokumen Ekstrem Matematika</span>
                <span className="text-[9px] text-slate-500 font-semibold uppercase">PDF - Resmi Kop Kedinasan</span>
              </div>
            </div>
            <FileDown className="w-4 h-4 text-emerald-400 shrink-0" />
          </button>

          {/* Download 2: Bahasa Indonesia */}
          <button
            onClick={() => handleDownload("indo")}
            disabled={isDownloading !== null}
            className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-950/80 text-white rounded-2xl flex items-center justify-between border border-slate-800 hover:border-sky-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                {isDownloading === "indo" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block">Dokumen Ekstrem B. Indonesia</span>
                <span className="text-[9px] text-slate-500 font-semibold uppercase">PDF - Resmi Kop Kedinasan</span>
              </div>
            </div>
            <FileDown className="w-4 h-4 text-sky-400 shrink-0" />
          </button>

          {/* Download 3: Combined Both */}
          <button
            onClick={() => handleDownload("both")}
            disabled={isDownloading !== null}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-950 to-slate-950 hover:from-indigo-900/60 hover:to-slate-950 text-white rounded-2xl flex items-center justify-between border border-indigo-900/40 hover:border-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                {isDownloading === "both" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block">Dokumen Gabungan Ekstrem Kelas</span>
                <span className="text-[9px] text-indigo-400 font-extrabold uppercase">Instansi - Komprehensif</span>
              </div>
            </div>
            <FileDown className="w-4 h-4 text-indigo-400 shrink-0" />
          </button>
        </div>

        {/* 
          =========================================
          ANALYSIS SUMMARY SCREENS SECTION (READABLE) 
          =========================================
        */}
        <div className="mt-6 space-y-4">
          
          {/* MATEMATIKA DATA SUMMARY */}
          <div className="bg-slate-950/75 border border-slate-850 p-4 rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-3">
              <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest block">
                Matematika Ekstrem
              </span>
              <span className="text-[9px] text-slate-500 font-mono font-bold">
                Max: {maxMat.toFixed(1)} / Min: {minMat.toFixed(1)}
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Top scorers */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    SKOR TERTINGGI ({maxMat.toFixed(2)})
                  </span>
                </div>
                <div className="space-y-1 pl-5">
                  {topMatStudents.map((s) => (
                    <div key={s.no} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200 truncate pr-2">{s.nama.toUpperCase()}</span>
                      <span className="text-[9px] text-slate-500 font-mono shrink-0">NISN: {s.nisn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lowest scorers */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-450 shrink-0" />
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    SKOR TERENDAH ({minMat.toFixed(2)})
                  </span>
                </div>
                <div className="space-y-1 pl-5">
                  {lowMatStudents.map((s) => (
                    <div key={s.no} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200 truncate pr-2">{s.nama.toUpperCase()}</span>
                      <span className="text-[9px] text-slate-500 font-mono shrink-0">NISN: {s.nisn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BAHASA INDONESIA DATA SUMMARY */}
          <div className="bg-slate-950/75 border border-slate-850 p-4 rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-3">
              <span className="text-[9px] font-extrabold text-sky-400 uppercase tracking-widest block">
                Bahasa Indonesia Ekstrem
              </span>
              <span className="text-[9px] text-slate-500 font-mono font-bold">
                Max: {maxIndo.toFixed(1)} / Min: {minIndo.toFixed(1)}
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Top scorers */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-450 shrink-0" />
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    SKOR TERTINGGI ({maxIndo.toFixed(2)})
                  </span>
                </div>
                <div className="space-y-1 pl-5">
                  {topIndoStudents.map((s) => (
                    <div key={s.no} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200 truncate pr-2">{s.nama.toUpperCase()}</span>
                      <span className="text-[9px] text-slate-500 font-mono shrink-0">NISN: {s.nisn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lowest scorers */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-450 shrink-0" />
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    SKOR TERENDAH ({minIndo.toFixed(2)})
                  </span>
                </div>
                <div className="space-y-1 pl-5">
                  {lowIndoStudents.map((s) => (
                    <div key={s.no} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200 truncate pr-2">{s.nama.toUpperCase()}</span>
                      <span className="text-[9px] text-slate-500 font-mono shrink-0">NISN: {s.nisn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Confidential Notice Disclaimer */}
          <div className="bg-indigo-950/20 border border-indigo-900/35 p-3.5 rounded-xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <span className="text-[10px] text-slate-400 leading-relaxed font-semibold">
              INFORMASI KHUSUS: Data ini dirancang untuk mempermudah pimpinan sekolah dalam memantau sebaran performa terluar secara transparan namun konfidensial guna optimalisasi kualitas mengajar.
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
