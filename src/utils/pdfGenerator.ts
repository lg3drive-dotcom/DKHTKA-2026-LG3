/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from "jspdf";
import { StudentRecord, ClassStats } from "../types";

export function generateStudentPDF(student: StudentRecord, stats: ClassStats) {
  // Ensure we use 'portrait', 'mm', 'a4' (width: 210mm, height: 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Modern Indigo Theme colors
  const primaryColor = { r: 30, g: 41, b: 59 }; // Slate 800
  const accentColor = { r: 79, g: 70, b: 229 }; // Indigo 600
  const textColor = { r: 51, g: 65, b: 85 }; // Slate 700
  const mutedTextColor = { r: 100, g: 116, b: 139 }; // Slate 500

  // Draw Header border & background accents
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.rect(10, 10, 190, 277); // Outer frame

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text("KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH", 105, 22, { align: "center" });
  
  doc.setFontSize(12);
  doc.text("DINAS PENDIDIKAN KOTA CIMAHI", 105, 28, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("SD NEGERI LEUWIGAJAH 3", 105, 34, { align: "center" });
  
  doc.setFontSize(8);
  doc.text("NPSN: 20224242 | Satuan Pendidikan: 0017 | Kota Cimahi, Jawa Barat", 105, 39, { align: "center" });

  // Divider Line
  doc.setLineWidth(0.5);
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.line(15, 43, 195, 43);
  doc.setLineWidth(0.2);
  doc.line(15, 44.5, 195, 44.5);

  // Document Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.text("KARTU HASIL TES KEMAMPUAN AKADEMIK (TKA)", 105, 54, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text("TAHUN AJARAN 2026", 105, 59, { align: "center" });

  // Student Info Box
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.rect(15, 65, 180, 42, "F");
  
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.rect(15, 65, 180, 42, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text("IDENTITAS PESERTA TES", 20, 72);

  doc.setLineWidth(0.3);
  doc.line(20, 74, 80, 74);

  // Labels
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(mutedTextColor.r, mutedTextColor.g, mutedTextColor.b);
  
  doc.text("Nama Lengkap", 20, 81);
  doc.text("Nomor Peserta", 20, 87);
  doc.text("NISN", 20, 93);
  doc.text("TTL", 20, 99);

  // Values
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  
  doc.text(`:  ${student.nama}`, 50, 81);
  doc.text(`:  ${student.nomorPeserta}`, 50, 87);
  doc.text(`:  ${student.nisn}`, 50, 93);
  doc.text(`:  ${student.tempatLahir}, ${student.tanggalLahirStr}`, 50, 99);

  // Score Table Header
  const tableY = 114;
  doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.rect(15, tableY, 180, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("MATA PELAJARAN", 20, tableY + 5.5);
  doc.text("SKOR", 110, tableY + 5.5, { align: "center" });
  doc.text("KATEGORI", 155, tableY + 5.5, { align: "center" });

  // Table Content - Matematika
  const row1Y = tableY + 8;
  doc.setFillColor(255, 255, 255);
  doc.rect(15, row1Y, 180, 10, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, row1Y, 180, 10, "S");
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text("Matematika", 20, row1Y + 6.5);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.text(student.matematika.toFixed(2), 110, row1Y + 6.5, { align: "center" });
  
  // Categorization styling
  const matIsGood = student.matematikaKet.toLowerCase() === "baik";
  doc.setTextColor(matIsGood ? 16 : 100, matIsGood ? 124 : 116, matIsGood ? 65 : 139); // Green if Baik, Gray otherwise
  doc.text(student.matematikaKet, 155, row1Y + 6.5, { align: "center" });

  // Table Content - Bahasa Indonesia
  const row2Y = row1Y + 10;
  doc.setFillColor(250, 250, 250);
  doc.rect(15, row2Y, 180, 10, "F");
  doc.rect(15, row2Y, 180, 10, "S");
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  doc.text("Bahasa Indonesia", 20, row2Y + 6.5);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.text(student.bahasaIndonesia.toFixed(2), 110, row2Y + 6.5, { align: "center" });
  
  const indoIsGood = student.bahasaIndonesiaKet.toLowerCase() === "baik";
  doc.setTextColor(indoIsGood ? 16 : 100, indoIsGood ? 124 : 116, indoIsGood ? 65 : 139);
  doc.text(student.bahasaIndonesiaKet, 155, row2Y + 6.5, { align: "center" });

  // Row average
  const totalRerata = Math.round(((student.matematika + student.bahasaIndonesia) / 2) * 100) / 100;
  const row3Y = row2Y + 10;
  doc.setFillColor(241, 245, 249);
  doc.rect(15, row3Y, 180, 10, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, row3Y, 180, 10, "S");
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text("Rata-rata Pribadi", 20, row3Y + 6.5);
  doc.text(totalRerata.toFixed(2), 110, row3Y + 6.5, { align: "center" });
  doc.text("-", 155, row3Y + 6.5, { align: "center" });

  // Benchmark - Perbandingan Kelas (Anonymous)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text("PERFORMA KOLEKTIF KELAS (BENCHMARK ANONIM)", 15, 154);
  
  doc.setLineWidth(0.3);
  doc.setDrawColor(203, 213, 225);
  doc.line(15, 156.5, 195, 156.5);

  // Draw benchmark metrics boxes
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 161, 55, 25, "F");
  doc.rect(15, 161, 55, 25, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(mutedTextColor.r, mutedTextColor.g, mutedTextColor.b);
  doc.text("Rata-rata Kelas (MTK)", 42.5, 168, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.text(stats.matAverage.toFixed(2), 42.5, 179, { align: "center" });

  doc.setFillColor(248, 250, 252);
  doc.rect(77.5, 161, 55, 25, "F");
  doc.rect(77.5, 161, 55, 25, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(mutedTextColor.r, mutedTextColor.g, mutedTextColor.b);
  doc.text("Rata-rata Kelas (IND)", 105, 168, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(stats.indoAverage.toFixed(2), 105, 179, { align: "center" });

  doc.setFillColor(248, 250, 252);
  doc.rect(140, 161, 55, 25, "F");
  doc.rect(140, 161, 55, 25, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(mutedTextColor.r, mutedTextColor.g, mutedTextColor.b);
  doc.text("Rerata Gabungan", 167.5, 168, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(stats.overallAverage.toFixed(2), 167.5, 179, { align: "center" });

  // Comparison statement
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textColor.r, textColor.g, textColor.b);
  
  let mathDiffText = "";
  if (student.matematika > stats.matAverage) {
    mathDiffText = `lebih tinggi ${(student.matematika - stats.matAverage).toFixed(2)} poin dibanding rata-rata kelas.`;
  } else if (student.matematika < stats.matAverage) {
    mathDiffText = `selisih ${(stats.matAverage - student.matematika).toFixed(2)} poin di bawah rata-rata kelas.`;
  } else {
    mathDiffText = "sama dengan rata-rata nilai Matematika kelas.";
  }

  let indoDiffText = "";
  if (student.bahasaIndonesia > stats.indoAverage) {
    indoDiffText = `lebih tinggi ${(student.bahasaIndonesia - stats.indoAverage).toFixed(2)} poin dibanding rata-rata kelas.`;
  } else if (student.bahasaIndonesia < stats.indoAverage) {
    indoDiffText = `selisih ${(stats.indoAverage - student.bahasaIndonesia).toFixed(2)} poin di bawah rata-rata kelas.`;
  } else {
    indoDiffText = "sama dengan rata-rata nilai Bahasa Indonesia kelas.";
  }

  doc.setFont("helvetica", "bold");
  doc.text("Catatan Evaluasi:", 15, 196);
  doc.setFont("helvetica", "normal");
  doc.text(`1. Pencapaian Akademik Matematika Anda ${mathDiffText}`, 15, 201);
  doc.text(`2. Pencapaian Akademik Bahasa Indonesia Anda ${indoDiffText}`, 15, 206);
  
  doc.setFont("helvetica", "italic");
  doc.setTextColor(mutedTextColor.r, mutedTextColor.g, mutedTextColor.b);
  doc.setFontSize(8);
  doc.text("*Informasi kelas ini dianonimkan demi menjaga kerahasiaan & sportivitas antar siswa.", 15, 212);

  // Footer & Principal Signature
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  // Signature location
  const sigY = 224;
  doc.text("Mengetahui,", 145, sigY);
  doc.setFont("helvetica", "bold");
  doc.text("Kepala Satuan Pendidikan", 145, sigY + 4.5);
  
  // Principal details
  doc.text("TEDY RESNADI, S.H., S.Pd.", 145, sigY + 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("NIP. 197411272008011004", 145, sigY + 27);

  // Date of print
  const currentDate = new Date();
  const formatIndID = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.text(`Cimahi, ${formatIndID}`, 145, sigY - 6.5);

  // Sign Line
  doc.setLineWidth(0.2);
  doc.setDrawColor(100, 116, 139);
  doc.line(145, sigY + 24, 190, sigY + 24);

  // Logo Watermark representation
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.setFont("helvetica", "bold");
  doc.text("DKHTKA SD NEGERI LEUWIGAJAH 3 KOTA CIMAHI", 105, 282, { align: "center" });

  // Save PDF
  const safeName = student.nama.replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`Hasil_TKA_2026_${safeName}.pdf`);
}
