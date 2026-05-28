/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from "jspdf";
import { StudentRecord, ClassStats } from "../types";
import { STUDENT_RECORDS } from "../data/students";

export function generateStudentPDF(student: StudentRecord, stats: ClassStats) {
  // Configured as landscape, mm, a4 (width: 297mm, height: 210mm)
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const width = 297;
  const height = 210;

  // Primary palette: classic black & slate tones for official look
  const primaryBlack = [0, 0, 0];
  const paperText = [30, 41, 59]; // Slate 800
  const mutedText = [100, 116, 139]; // Slate 500

  // Total records and pages calculation (12 students per page list)
  const studentsPerPage = 12;
  const totalInRegistry = STUDENT_RECORDS.length || 57;
  const totalPages = Math.ceil(totalInRegistry / studentsPerPage);
  const studentIndex = student.no;

  for (let page = 1; page <= totalPages; page++) {
    if (page > 1) {
      doc.addPage("a4", "landscape");
    }

    // 1. Draw Tut Wuri Handayani Ministry Seal representation on Top Left
    const logoX = 15;
    const logoY = 12;
    
    // Outer circle
    doc.setDrawColor(0, 50, 120);
    doc.setLineWidth(0.4);
    doc.circle(logoX + 7, logoY + 7, 7, "S");
    
    // Inner circle
    doc.circle(logoX + 7, logoY + 7, 5.5, "S");
    
    // Crest design inside
    doc.setFillColor(0, 120, 200);
    doc.triangle(
      logoX + 7, logoY + 3.2,      // Top apex
      logoX + 4.2, logoY + 9.5,    // Bottom left
      logoX + 9.8, logoY + 9.5,    // Bottom right
      "F"
    );
    doc.setFillColor(255, 215, 0); // Gold center accent
    doc.circle(logoX + 7, logoY + 7, 1.2, "F");

    // 2. Draw "DKHTKA" Badge on Top Right
    const badgeX = 252;
    const badgeY = 12;
    const badgeW = 30;
    const badgeH = 10;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    // Outer border with double border look
    doc.rect(badgeX, badgeY, badgeW, badgeH, "S");
    doc.rect(badgeX + 0.6, badgeY + 0.6, badgeW - 1.2, badgeH - 1.2, "S");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("DKHTKA", badgeX + badgeW / 2, badgeY + 6.8, { align: "center" });

    // 3. Main Center Headers
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH", width / 2, 15, { align: "center" });
    
    doc.setFontSize(10.5);
    doc.text("DINAS PENDIDIKAN KOTA CIMAHI", width / 2, 20.2, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("TES KEMAMPUAN AKADEMIK SD/MI TAHUN 2026", width / 2, 25, { align: "center" });

    // Double Thin-Thick Divider Line matching authentic layouts
    doc.setLineWidth(0.7);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 29.5, width - 10, 29.5);
    doc.setLineWidth(0.2);
    doc.line(10, 31, width - 10, 31);

    // 4. Document Subtitle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("** DAFTAR KOLEKTIF HASIL TES KEMAMPUAN AKADEMIK **", width / 2, 39, { align: "center" });

    // 5. Official Metadata Grid Left vs Right (Line aligned)
    const metaLeftX = 10;
    const metaLeftColsX = metaLeftX + 35;
    const metaRightX = 175;
    const metaRightColsX = metaRightX + 48;
    const metaY = 46;
    const metaLineHeight = 4.8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    // Left Meta Info
    doc.text("Provinsi", metaLeftX, metaY);
    doc.text(":  02 - JAWA BARAT", metaLeftColsX, metaY);
    
    doc.text("Kota/Kabupaten", metaLeftX, metaY + metaLineHeight);
    doc.text(":  05 - KOTA CIMAHI", metaLeftColsX, metaY + metaLineHeight);
    
    doc.text("Satuan Pendidikan", metaLeftX, metaY + (metaLineHeight * 2));
    doc.text(":  0017 - SD NEGERI LEUWIGAJAH 3", metaLeftColsX, metaY + (metaLineHeight * 2));

    // Right Meta Info
    doc.text("NPSN", metaRightX, metaY);
    doc.text(":  20224242", metaRightColsX, metaY);
    
    doc.text("Kepala Satuan Pendidikan", metaRightX, metaY + metaLineHeight);
    doc.text(":  TEDY RESNADI, S.H., S.Pd.", metaRightColsX, metaY + metaLineHeight);
    
    doc.text("NIP Kepala Satuan Pend.", metaRightX, metaY + (metaLineHeight * 2));
    doc.text(":  197411272008011004", metaRightColsX, metaY + (metaLineHeight * 2));

    // Page Specific index limits
    const startRowNo = (page - 1) * studentsPerPage + 1;

    // 7. Draw Table
    const tableY = 62;
    const tableHeaderHeight = 9;
    const tableRowHeight = 7.2;

    // Column budgets summing to exactly 277mm (297 width - 20)
    const colWidths = {
      noUrut: 12,
      nomorPeserta: 56,
      nisn: 25,
      namaPeserta: 70,
      ttl: 46,
      matematika: 22,
      bahasaIndonesia: 26,
      keterangan: 20
    };

    const colX = {
      noUrut: 10,
      nomorPeserta: 10 + colWidths.noUrut,
      nisn: 10 + colWidths.noUrut + colWidths.nomorPeserta,
      namaPeserta: 10 + colWidths.noUrut + colWidths.nomorPeserta + colWidths.nisn,
      ttl: 10 + colWidths.noUrut + colWidths.nomorPeserta + colWidths.nisn + colWidths.namaPeserta,
      matematika: 10 + colWidths.noUrut + colWidths.nomorPeserta + colWidths.nisn + colWidths.namaPeserta + colWidths.ttl,
      bahasaIndonesia: 10 + colWidths.noUrut + colWidths.nomorPeserta + colWidths.nisn + colWidths.namaPeserta + colWidths.ttl + colWidths.matematika,
      keterangan: 10 + colWidths.noUrut + colWidths.nomorPeserta + colWidths.nisn + colWidths.namaPeserta + colWidths.ttl + colWidths.matematika + colWidths.bahasaIndonesia,
      end: width - 10
    };

    // Border Settings: crisp black
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);

    // Fill Header Background with elegant light cream gray tint
    doc.setFillColor(245, 247, 250);
    doc.rect(10, tableY, colX.end - 10, tableHeaderHeight, "F");
    doc.rect(10, tableY, colX.end - 10, tableHeaderHeight, "S");

    // Output Headers text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(0, 0, 0);

    doc.text("No", colX.noUrut + colWidths.noUrut / 2, tableY + 5.8, { align: "center" });
    doc.text("Nomor Peserta", colX.nomorPeserta + colWidths.nomorPeserta / 2, tableY + 5.8, { align: "center" });
    doc.text("NISN", colX.nisn + colWidths.nisn / 2, tableY + 5.8, { align: "center" });
    doc.text("Nama Peserta", colX.namaPeserta + 4, tableY + 5.8);
    doc.text("Tempat, Tanggal Lahir", colX.ttl + colWidths.ttl / 2, tableY + 5.8, { align: "center" });
    
    // Multi-line Header adjustments for subjects
    doc.setFontSize(8);
    doc.text("Matematika", colX.matematika + colWidths.matematika / 2, tableY + 5.8, { align: "center" });
    doc.text("B. Indonesia", colX.bahasaIndonesia + colWidths.bahasaIndonesia / 2, tableY + 5.8, { align: "center" });
    doc.text("Keterangan", colX.keterangan + colWidths.keterangan / 2, tableY + 5.8, { align: "center" });

    // Draw Vertical lines for Header
    doc.line(colX.nomorPeserta, tableY, colX.nomorPeserta, tableY + tableHeaderHeight);
    doc.line(colX.nisn, tableY, colX.nisn, tableY + tableHeaderHeight);
    doc.line(colX.namaPeserta, tableY, colX.namaPeserta, tableY + tableHeaderHeight);
    doc.line(colX.ttl, tableY, colX.ttl, tableY + tableHeaderHeight);
    doc.line(colX.matematika, tableY, colX.matematika, tableY + tableHeaderHeight);
    doc.line(colX.bahasaIndonesia, tableY, colX.bahasaIndonesia, tableY + tableHeaderHeight);
    doc.line(colX.keterangan, tableY, colX.keterangan, tableY + tableHeaderHeight);

    // 8. Render rows
    let rowY = tableY + tableHeaderHeight;

    // Print EXACTLIST of static numbers (12 rows per page grid)
    for (let i = 0; i < studentsPerPage; i++) {
      const currentRowNo = startRowNo + i;
      const isThisMe = currentRowNo === studentIndex;
      const currentRecord = STUDENT_RECORDS.find((s) => s.no === currentRowNo);

      // Background selection: highlight current verified student row with highly beautiful safe pastel color highlight
      if (isThisMe) {
        doc.setFillColor(224, 242, 254); // Soft blue 100
        doc.rect(10, rowY, colX.end - 10, tableRowHeight, "F");
      } else {
        // Empty alternate skeleton lines matching printout guidelines
        doc.setFillColor(255, 255, 255);
        doc.rect(10, rowY, colX.end - 10, tableRowHeight, "F");
      }

      // Border surrounding row cells
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.18);
      doc.rect(10, rowY, colX.end - 10, tableRowHeight, "S");

      // Print always the serial number (Keep official skeletal registry alive)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0, 0);
      doc.text(String(currentRowNo), colX.noUrut + colWidths.noUrut / 2, rowY + 4.8, { align: "center" });

      if (currentRecord) {
        doc.setFont("helvetica", isThisMe ? "bold" : "normal");
        doc.setFontSize(8);
        
        // Nomor Peserta
        doc.text(currentRecord.nomorPeserta, colX.nomorPeserta + colWidths.nomorPeserta / 2, rowY + 4.8, { align: "center" });
        
        // NISN
        doc.text(currentRecord.nisn, colX.nisn + colWidths.nisn / 2, rowY + 4.8, { align: "center" });
        
        // Nama Peserta (Uppercase) - Display ONLY if this is the logged-in student, otherwise keep blank!
        if (isThisMe) {
          doc.text(currentRecord.nama.toUpperCase(), colX.namaPeserta + 4, rowY + 4.8);
        } else {
          // Empty as requested: "nama hanya muncul nama dia sendiri, kolom bagian nama dikosongkan"
          doc.setFont("helvetica", "italic");
          doc.setTextColor(150, 150, 150);
          doc.text("[ Rahasia / Anonim ]", colX.namaPeserta + 4, rowY + 4.8);
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "normal");
        }
        
        // Tempat Tanggal Lahir (Uppercase)
        const ttlStr = `${currentRecord.tempatLahir}, ${currentRecord.tanggalLahirStr}`.toUpperCase();
        doc.text(ttlStr, colX.ttl + colWidths.ttl / 2, rowY + 4.8, { align: "center" });
        
        // Matematika score
        doc.text(currentRecord.matematika.toFixed(2), colX.matematika + colWidths.matematika / 2, rowY + 4.8, { align: "center" });
        
        // Bahasa Indonesia score
        doc.text(currentRecord.bahasaIndonesia.toFixed(2), colX.bahasaIndonesia + colWidths.bahasaIndonesia / 2, rowY + 4.8, { align: "center" });
        
        // Keterangan (Math / Indo status combined, e.g. "LULUS / MEMADAI")
        const combinedKet = currentRecord.matematikaKet.toUpperCase();
        doc.text(combinedKet, colX.keterangan + colWidths.keterangan / 2, rowY + 4.8, { align: "center" });
      }

      // Grid vertical lines
      doc.line(colX.nomorPeserta, rowY, colX.nomorPeserta, rowY + tableRowHeight);
      doc.line(colX.nisn, rowY, colX.nisn, rowY + tableRowHeight);
      doc.line(colX.namaPeserta, rowY, colX.namaPeserta, rowY + tableRowHeight);
      doc.line(colX.ttl, rowY, colX.ttl, rowY + tableRowHeight);
      doc.line(colX.matematika, rowY, colX.matematika, rowY + tableRowHeight);
      doc.line(colX.bahasaIndonesia, rowY, colX.bahasaIndonesia, rowY + tableRowHeight);
      doc.line(colX.keterangan, rowY, colX.keterangan, rowY + tableRowHeight);

      rowY += tableRowHeight;
    }

    // 9. Informational text about other lines being anonymized
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 115, 115);
    doc.text(
      "*Catatan: Kolom Nama Peserta selain nama Anda sendiri sengaja diautomasi sebagai Anonim demi menghormati Perlindungan Data Pribadi & Privasi Skor Siswa.",
      10,
      163
    );

    // 10. Dignified Bottom Principal/Official Sign Stamp section
    const sigY = 168;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    // Left informative box: average performance stats watermark or school stamp
    const stampX = 15;
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(250, 250, 250);
    doc.rect(stampX, sigY, 95, 26, "F");
    doc.rect(stampX, sigY, 95, 26, "S");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("REKAP BENCHMARK GABUNGAN KELAS (ANONIM)", stampX + 4, sigY + 5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(`• Total Terdaftar Evaluasi : ${stats.totalStudents || 57} Siswa`, stampX + 5, sigY + 11);
    doc.text(`• Rerata Matematika Kelas : ${stats.matAverage.toFixed(2)}`, stampX + 5, sigY + 16);
    doc.text(`• Rerata B. Indonesia Kelas : ${stats.indoAverage.toFixed(2)}`, stampX + 5, sigY + 21);

    // Right Sign Zone
    const rightSignAlignX = 220;
    
    const currentDate = new Date();
    const formatIndID = currentDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Cimahi, ${formatIndID}`, rightSignAlignX, sigY);
    doc.text("Mengetahui,", rightSignAlignX, sigY + 4.5);
    
    doc.setFont("helvetica", "bold");
    doc.text("Kepala Satuan Pendidikan", rightSignAlignX, sigY + 9);
    
    // Principal name line & NIP
    doc.text("TEDY RESNADI, S.H., S.Pd.", rightSignAlignX, sigY + 26);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("NIP. 197411272008011004", rightSignAlignX, sigY + 30);
    
    // Line separator for sign
    doc.setLineWidth(0.3);
    doc.line(rightSignAlignX, sigY + 27, rightSignAlignX + 55, sigY + 27);

    // 11. Page footer details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    
    // Centered footer watermark
    doc.text("DOKUMEN INTEGRITAS - HASIL EVALUASI TKA MANDIRI TAHUN 2026", width / 2, 201, { align: "center" });

    // Right-aligned page numbers
    doc.setFont("helvetica", "normal");
    doc.text(`Halaman ${page} dari ${totalPages}`, width - 25, 201);
  }

  // 12. Save PDF file
  const safeName = student.nama.replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`Hasil_TKA_2026_${safeName}.pdf`);
}

/**
 * Utility to convert image URL to base64 for jsPDF robust inclusion,
 * avoiding standard CORS load errors.
 */
function urlToBase64(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = (img as HTMLImageElement).naturalWidth;
      canvas.height = (img as HTMLImageElement).naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          resolve(canvas.toDataURL("image/png"));
          return;
        } catch (e) {
          resolve("");
          return;
        }
      }
      resolve("");
    };
    img.onerror = function() {
      resolve("");
    };
    img.src = url;
  });
}

export async function generateAdminReportPDF(
  subjectType: "matematika" | "bahasaIndonesia" | "both",
  stats: ClassStats
) {
  // Configured as Portrait A4 (width: 210mm, height: 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const width = 210;
  const height = 297;

  // Pre-load the two logo images
  const leftLogoUrl = "https://i.ibb.co.com/wZdz4JgV/logo-lg3-20260425-202811-0000.png";
  const rightLogoUrl = "https://i.ibb.co.com/39BKK1KR/logo-lg3-20260425-202644-0000.png";

  const [leftLogoBase64, rightLogoBase64] = await Promise.all([
    urlToBase64(leftLogoUrl),
    urlToBase64(rightLogoUrl)
  ]);

  // Write Indonesian Kop Surat Model 1 (Official Style)
  const logoSize = 18;
  const logoY = 12;

  // Left Logo Insertion
  if (leftLogoBase64) {
    doc.addImage(leftLogoBase64, "PNG", 15, logoY, logoSize, logoSize);
  } else {
    // Vector crest placeholder
    doc.setDrawColor(0, 50, 120);
    doc.setLineWidth(0.4);
    doc.circle(24, logoY + 9, 8, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("PEMDA", 24, logoY + 10, { align: "center" });
  }

  // Right Logo Insertion
  if (rightLogoBase64) {
    doc.addImage(rightLogoBase64, "PNG", width - 15 - logoSize, logoY, logoSize, logoSize);
  } else {
    // Vector crest placeholder
    doc.setDrawColor(0, 120, 50);
    doc.setLineWidth(0.4);
    doc.circle(width - 24, logoY + 9, 8, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("SDN", width - 24, logoY + 10, { align: "center" });
  }

  // Center Headings
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(0, 0, 0);
  doc.text("PEMERINTAH DAERAH KOTA CIMAHI", width / 2, 14, { align: "center" });
  
  doc.text("DINAS PENDIDIKAN", width / 2, 18.5, { align: "center" });
  
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("SD NEGERI LEUWIGAJAH 3", width / 2, 23.5, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.text("Jln. Kerkof No.33 Rt 09 Rw 09 Kel. Leuwigajah Kec. Cimahi Selatan", width / 2, 27.5, { align: "center" });

  // Triple Border Divider lines
  doc.setLineWidth(0.85);
  doc.setDrawColor(0, 0, 0);
  doc.line(12, 30.5, width - 12, 30.5);
  doc.setLineWidth(0.2);
  doc.line(12, 31.8, width - 12, 31.8);

  // Document Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DAFTAR KOLEKTIF HASIL TES KEMAMPUAN AKADEMIK", width / 2, 40, { align: "center" });

  // Draw metadata block
  const metaY = 49;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Sekolah                  :  SD NEGERI LEUWIGAJAH 3", 15, metaY);
  
  const subjectDisplay = subjectType === "matematika" 
    ? "MATEMATIKA" 
    : subjectType === "bahasaIndonesia" 
      ? "BAHASA INDONESIA" 
      : "MATEMATIKA & BAHASA INDONESIA";
  doc.text("Mata Pelajaran      :  " + subjectDisplay, 15, metaY + 4.5);

  // Gather extreme students dynamically
  let mathMaxScore = stats.matMax;
  let mathMinScore = stats.matMin;
  let indoMaxScore = stats.indoMax;
  let indoMinScore = stats.indoMin;

  const matHighestList = STUDENT_RECORDS.filter(s => s.matematika === mathMaxScore);
  const matLowestList = STUDENT_RECORDS.filter(s => s.matematika === mathMinScore);
  const indoHighestList = STUDENT_RECORDS.filter(s => s.bahasaIndonesia === indoMaxScore);
  const indoLowestList = STUDENT_RECORDS.filter(s => s.bahasaIndonesia === indoMinScore);

  interface ExtremeRow {
    role: "Tertinggi" | "Terendah";
    subject: "Matematika" | "B. Indonesia";
    no: number;
    nama: string;
    nisn: string;
    score: number;
    ket: string;
  }

  const rowsToShow: ExtremeRow[] = [];

  if (subjectType === "matematika" || subjectType === "both") {
    matHighestList.forEach(s => rowsToShow.push({
      role: "Tertinggi",
      subject: "Matematika",
      no: s.no,
      nama: s.nama,
      nisn: s.nisn,
      score: s.matematika,
      ket: s.matematikaKet
    }));
    matLowestList.forEach(s => rowsToShow.push({
      role: "Terendah",
      subject: "Matematika",
      no: s.no,
      nama: s.nama,
      nisn: s.nisn,
      score: s.matematika,
      ket: s.matematikaKet
    }));
  }

  if (subjectType === "bahasaIndonesia" || subjectType === "both") {
    indoHighestList.forEach(s => rowsToShow.push({
      role: "Tertinggi",
      subject: "B. Indonesia",
      no: s.no,
      nama: s.nama,
      nisn: s.nisn,
      score: s.bahasaIndonesia,
      ket: s.bahasaIndonesiaKet
    }));
    indoLowestList.forEach(s => rowsToShow.push({
      role: "Terendah",
      subject: "B. Indonesia",
      no: s.no,
      nama: s.nama,
      nisn: s.nisn,
      score: s.bahasaIndonesia,
      ket: s.bahasaIndonesiaKet
    }));
  }

  // Draw Table for extreme scores
  let tableY = 59;
  const thHeight = 8;
  const trHeight = 7.5;

  const colWidths = {
    no: 8,
    category: 24,
    subject: 26,
    nama: 62,
    nisn: 24,
    score: 18,
    ket: 20
  };

  const colX = {
    no: 14,
    category: 14 + colWidths.no,
    subject: 14 + colWidths.no + colWidths.category,
    nama: 14 + colWidths.no + colWidths.category + colWidths.subject,
    nisn: 14 + colWidths.no + colWidths.category + colWidths.subject + colWidths.nama,
    score: 14 + colWidths.no + colWidths.category + colWidths.subject + colWidths.nama + colWidths.nisn,
    ket: 14 + colWidths.no + colWidths.category + colWidths.subject + colWidths.nama + colWidths.nisn + colWidths.score
  };

  // Header background
  doc.setFillColor(235, 238, 243);
  doc.rect(colX.no, tableY, width - 28, thHeight, "F");
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.rect(colX.no, tableY, width - 28, thHeight, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("No", colX.no + colWidths.no / 2, tableY + 5, { align: "center" });
  doc.text("Kategori", colX.category + colWidths.category / 2, tableY + 5, { align: "center" });
  doc.text("Mata Pelajaran", colX.subject + colWidths.subject / 2, tableY + 5, { align: "center" });
  doc.text("Nama Siswa", colX.nama + 3, tableY + 5);
  doc.text("NISN", colX.nisn + colWidths.nisn / 2, tableY + 5, { align: "center" });
  doc.text("Nilai", colX.score + colWidths.score / 2, tableY + 5, { align: "center" });
  doc.text("Status", colX.ket + colWidths.ket / 2, tableY + 5, { align: "center" });

  doc.line(colX.category, tableY, colX.category, tableY + thHeight);
  doc.line(colX.subject, tableY, colX.subject, tableY + thHeight);
  doc.line(colX.nama, tableY, colX.nama, tableY + thHeight);
  doc.line(colX.nisn, tableY, colX.nisn, tableY + thHeight);
  doc.line(colX.score, tableY, colX.score, tableY + thHeight);
  doc.line(colX.ket, tableY, colX.ket, tableY + thHeight);

  let currentY = tableY + thHeight;

  rowsToShow.forEach((row, index) => {
    // Alternate coloration depending on High or Low score
    if (row.role === "Tertinggi") {
      doc.setFillColor(240, 253, 244); // Light Green tint
    } else {
      doc.setFillColor(254, 242, 242); // Light Red tint
    }
    
    doc.rect(colX.no, currentY, width - 28, trHeight, "F");
    doc.rect(colX.no, currentY, width - 28, trHeight, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(0, 0, 0);
    doc.text(String(index + 1), colX.no + colWidths.no / 2, currentY + 4.8, { align: "center" });

    // Category
    doc.setFont("helvetica", "bold");
    if (row.role === "Tertinggi") doc.setTextColor(21, 128, 61); // Green index
    else doc.setTextColor(185, 28, 28); // Red index
    doc.text(row.role.toUpperCase(), colX.category + colWidths.category / 2, currentY + 4.8, { align: "center" });
    
    // Reset black text
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    
    // Subject
    doc.text(row.subject, colX.subject + colWidths.subject / 2, currentY + 4.8, { align: "center" });
    
    // Name (uppercase)
    doc.setFont("helvetica", "bold");
    doc.text(row.nama.toUpperCase(), colX.nama + 3, currentY + 4.8);
    doc.setFont("helvetica", "normal");
    
    // NISN
    doc.text(row.nisn, colX.nisn + colWidths.nisn / 2, currentY + 4.8, { align: "center" });
    
    // Score
    doc.setFont("helvetica", "bold");
    doc.text(row.score.toFixed(2), colX.score + colWidths.score / 2, currentY + 4.8, { align: "center" });
    
    // Ket Status
    doc.setFont("helvetica", "normal");
    doc.text(row.ket, colX.ket + colWidths.ket / 2, currentY + 4.8, { align: "center" });

    // Inner separators
    doc.line(colX.category, currentY, colX.category, currentY + trHeight);
    doc.line(colX.subject, currentY, colX.subject, currentY + trHeight);
    doc.line(colX.nama, currentY, colX.nama, currentY + trHeight);
    doc.line(colX.nisn, currentY, colX.nisn, currentY + trHeight);
    doc.line(colX.score, currentY, colX.score, currentY + trHeight);
    doc.line(colX.ket, currentY, colX.ket, currentY + trHeight);

    currentY += trHeight;
  });

  // Bottom Signature Row
  const sigY = currentY + 12;
  
  const currentDate = new Date();
  const formatIndID = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  doc.setFontSize(8.5);
  doc.text(`Cimahi, ${formatIndID}`, width - 75, sigY);
  doc.text("Mengetahui,", width - 75, sigY + 4.5);
  doc.setFont("helvetica", "bold");
  doc.text("Kepala Satuan Pendidikan,", width - 75, sigY + 9);
  
  doc.text("TEDY RESNADI, S.H., S.Pd.", width - 75, sigY + 27);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("NIP. 197411272008011004", width - 75, sigY + 31);
  doc.line(width - 75, sigY + 28, width - 15, sigY + 28);

  // Footer document sign
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text("DKHTKA - ARSIP INTERNAL INTEGRITAS KOTA CIMAHI TAHUN 2026", width / 2, height - 12, { align: "center" });

  // Save the admin report with dedicated official filename
  doc.save(`Laporan_Admin_Sore_Ekstrem_2026_${subjectType}.pdf`);
}

