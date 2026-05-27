/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { STUDENT_RECORDS, getStats } from "../data/students";
import { StudentRecord } from "../types";
import { generateStudentPDF } from "../utils/pdfGenerator";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Calendar, 
  User, 
  Lock, 
  Unlock, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Calculator, 
  BookOpen, 
  Sparkles,
  TrendingUp,
  RefreshCw
} from "lucide-react";

export default function PrivatePortal() {
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [matchedStudent, setMatchedStudent] = useState<StudentRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setMatchedStudent(null);

    if (!nama.trim()) {
      setErrorMsg("Silakan periksa kembali: Nama Lengkap tidak boleh kosong.");
      return;
    }
    if (!tanggalLahir) {
      setErrorMsg("Silakan periksa kembali: Tanggal Lahir wajib diisi.");
      return;
    }

    // Standardize input names: ignore case, trim spaces, collapse multiple spaces
    const cleanInputName = nama
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    // Look for name match first
    const studentWithName = STUDENT_RECORDS.filter(s => {
      const dbCleanName = s.nama.toLowerCase().trim().replace(/\s+/g, " ");
      return dbCleanName === cleanInputName;
    });

    if (studentWithName.length === 0) {
      // Direct exact match not found. Try a startsWith or includes match to assist with typos
      const partialMatch = STUDENT_RECORDS.find(s => {
        const dbCleanName = s.nama.toLowerCase().trim().replace(/\s+/g, " ");
        return dbCleanName.includes(cleanInputName) || cleanInputName.includes(dbCleanName);
      });
      
      if (partialMatch) {
         setErrorMsg(`Siswa bernama "${nama}" tidak terdaftar. Apakah maksud Anda: "${partialMatch.nama}"? Harap masukkan nama lengkap Anda dengan benar.`);
      } else {
         setErrorMsg("Nama tidak terdaftar di sistem. Mohon periksa kembali keselarasan ejaan nama lengkap Anda.");
      }
      return;
    }

    // Verify birthdate match
    const exactMatch = studentWithName.find(s => s.tanggalLahirIso === tanggalLahir);

    if (!exactMatch) {
      setErrorMsg("Kombinasi salah: Nama terdaftar, tetapi Tanggal Lahir tidak cocok. Mohon koordinasikan ulang.");
      return;
    }

    // Success!
    setMatchedStudent(exactMatch);
    setSuccessMsg(`Hasil TKA berhasil dikonfirmasi secara privat!`);
  };

  const handleReset = () => {
    setNama("");
    setTanggalLahir("");
    setMatchedStudent(null);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleExportPDF = () => {
    if (!matchedStudent) return;
    setIsExporting(true);
    try {
      const stats = getStats();
      generateStudentPDF(matchedStudent, stats);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh PDF. Silakan coba kembali.");
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-5">
      {/* Search portal card */}
      <AnimatePresence mode="wait">
        {!matchedStudent ? (
          <motion.div
            key="search-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/90 border border-slate-700/65 shadow-xl rounded-[1.8rem] p-5"
          >
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/50">
              <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-800 text-sky-400 flex items-center justify-center shadow-inner">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-bold text-white text-sm">Akses Laporan TKA Mandiri</h2>
                <p className="text-[10px] text-slate-400 font-bold">Verifikasi data pribadi Anda untuk membuka nilai</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  Nama Lengkap Siswa
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: MUHAMMAD HAMZAH RAMADHAN"
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition duration-200 uppercase font-semibold text-slate-200 placeholder:text-slate-600 font-sans"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  Tanggal Lahir Siswa
                </label>
                <input
                  type="date"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-xs focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition duration-200 text-slate-200 font-sans"
                />
              </div>

              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-rose-300"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-450" />
                  <span className="text-xs font-semibold leading-normal">{errorMsg}</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-lg shadow-sky-950/30 flex items-center justify-center gap-2 cursor-pointer mt-3 active:scale-[0.98]"
              >
                <Unlock className="w-4 h-4" />
                Buka Skor Privat Saya
              </button>
            </form>

            <div className="mt-4 bg-slate-950/40 rounded-xl p-3 border border-slate-800/80 flex gap-2 items-start">
              <span className="text-[10px] text-slate-400 leading-relaxed font-medium">
                🔒 <strong>Enkripsi Mandiri:</strong> Nilai tersimpan secara aman dalam enkripsi serverless. Siswa lain tidak dapat mengakses nilai Anda tanpa mengetahui tanggal lahir yang sinkron.
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result-display"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Header Success */}
            <div className="bg-emerald-500/10 border border-emerald-555/20 text-emerald-300 p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verifikasi Sukses</h4>
                  <p className="text-[10px] text-emerald-400 font-bold">{successMsg}</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-[10px] px-3 py-1.5 bg-slate-800 border border-slate-700 font-extrabold uppercase rounded-xl text-slate-200 hover:bg-slate-700 shrink-0 transition"
              >
                Ganti Siswa
              </button>
            </div>

            {/* Profile card banner - Stylized with massive number block like the Bento template */}
            <div className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>

              <div>
                <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                  Hasil Individu
                </span>
                
                <h3 className="text-white text-3xl font-light mt-4 leading-tight">Rerata Nilai Anda</h3>
                
                {/* Large score display */}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-6xl font-black text-white tracking-tighter leading-none font-sans">
                    {((matchedStudent.matematika + matchedStudent.bahasaIndonesia) / 2).toFixed(1)}
                  </span>
                  <span className="text-sm font-bold text-sky-200 uppercase">Nilai Akhir</span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-[10px] text-sky-100 font-bold border-t border-white/10 pt-3">
                  <span>Nama: <strong className="text-white uppercase">{matchedStudent.nama}</strong></span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1 text-[10px] text-sky-100 font-bold">
                  <span>NISN: <strong className="text-white font-mono">{matchedStudent.nisn}</strong></span>
                  <span>No Peserta: <strong className="text-white font-mono">{matchedStudent.nomorPeserta}</strong></span>
                </div>
              </div>
            </div>

            {/* Scores bento layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Matematika score card */}
              <div className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-4 flex flex-col items-center justify-between text-center min-h-[165px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calculator className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Matematika</span>
                </div>

                <div className="my-2">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                    {matchedStudent.matematika.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5">/100</span>
                </div>

                <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${
                  matchedStudent.matematikaKet.toLowerCase() === "baik" 
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" 
                    : "bg-sky-500/10 text-sky-300 border-sky-500/20"
                }`}>
                  {matchedStudent.matematikaKet}
                </span>
                
                <div className="mt-2 text-[10px] text-slate-400 font-medium border-t border-slate-700/50 pt-1.5 w-full flex justify-between px-1">
                  <span>Rerata kelas:</span>
                  <strong className="text-white font-mono">{stats.matAverage.toFixed(1)}</strong>
                </div>
              </div>

              {/* Bahasa Indonesia score card */}
              <div className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-4 flex flex-col items-center justify-between text-center min-h-[165px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">B. Indonesia</span>
                </div>

                <div className="my-2">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                    {matchedStudent.bahasaIndonesia.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5">/100</span>
                </div>

                <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${
                  matchedStudent.bahasaIndonesiaKet.toLowerCase() === "baik" 
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" 
                    : "bg-sky-500/10 text-sky-300 border-sky-500/20"
                }`}>
                  {matchedStudent.bahasaIndonesiaKet}
                </span>

                <div className="mt-2 text-[10px] text-slate-400 font-medium border-t border-slate-700/50 pt-1.5 w-full flex justify-between px-1">
                  <span>Rerata kelas:</span>
                  <strong className="text-white font-mono">{stats.indoAverage.toFixed(1)}</strong>
                </div>
              </div>
            </div>

            {/* Combined Metrics Card */}
            <div className="bg-slate-800 border border-slate-700/80 rounded-[1.8rem] p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <h4 className="text-[10px] font-bold text-slate-350 uppercase tracking-wider">Laporan Benchmark Rata-rata Kelas</h4>
              </div>
              
              <div className="space-y-4">
                {/* Math Comparison block */}
                <div>
                  <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                    <span>Matematika Anda vs Rerata Kelas</span>
                    <span className="font-extrabold font-mono text-white">
                      {matchedStudent.matematika >= stats.matAverage ? "+" : ""}
                      {(matchedStudent.matematika - stats.matAverage).toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950/80 h-3 rounded-full overflow-hidden flex border border-slate-800">
                    <div 
                      className={`h-full rounded-full ${matchedStudent.matematika >= stats.matAverage ? "bg-emerald-450 bg-gradient-to-r from-emerald-550 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-amber-400"}`}
                      style={{ width: `${Math.min(100, Math.max(5, (matchedStudent.matematika / 100) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Indo Comparison block */}
                <div>
                  <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                    <span>B. Indonesia Anda vs Rerata Kelas</span>
                    <span className="font-extrabold font-mono text-white">
                      {matchedStudent.bahasaIndonesia >= stats.indoAverage ? "+" : ""}
                      {(matchedStudent.bahasaIndonesia - stats.indoAverage).toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950/80 h-3 rounded-full overflow-hidden flex border border-slate-800">
                    <div 
                      className={`h-full rounded-full ${matchedStudent.bahasaIndonesia >= stats.indoAverage ? "bg-emerald-450 bg-gradient-to-r from-emerald-550 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-amber-400"}`}
                      style={{ width: `${Math.min(100, Math.max(5, (matchedStudent.bahasaIndonesia / 100) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Print Certificate button */}
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-950/30 flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98]"
            >
              <Download className={`w-4 h-4 ${isExporting ? "animate-spin" : ""}`} />
              {isExporting ? "Membuat PDF..." : "Ekspor Hasil TKA Mandiri (PDF)"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
