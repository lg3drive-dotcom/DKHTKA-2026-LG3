/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as XLSX from "xlsx";
import { STUDENT_RECORDS } from "../data/students";

export function generateDKHTKAExcel() {
  const currentFormattedDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Prepare data array (AOA - Array of Arrays)
  const data: any[][] = [];

  // Row 0-2: KOP SURAT (Institutional Header)
  data.push(["KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH", "", "", "", "", "", "", ""]);
  data.push(["DINAS PENDIDIKAN KOTA CIMAHI", "", "", "", "", "", "", ""]);
  data.push(["TES KEMAMPUAN AKADEMIK SD/MI TAHUN 2026", "", "", "", "", "", "", ""]);
  data.push(["", "", "", "", "", "", "", ""]); // empty row

  // Row 4: Title
  data.push(["** DAFTAR KOLEKTIF HASIL TES KEMAMPUAN AKADEMIK **", "", "", "", "", "", "", ""]);
  data.push(["", "", "", "", "", "", "", ""]); // empty row

  // Rows 6-8: Metadata block
  data.push(["Provinsi", ": 02 - JAWA BARAT", "", "", "NPSN", ": 20224242", "", ""]);
  data.push(["Kota/Kabupaten", ": 05 - KOTA CIMAHI", "", "", "Kepala Sekolah", ": TEDY RESNADI, S.H., S.Pd.", "", ""]);
  data.push(["Satuan Pendidikan", ": 0017 - SD NEGERI LEUWIGAJAH 3", "", "", "NIP Kepala Sekolah", ": 197411272008011004", "", ""]);
  data.push(["", "", "", "", "", "", "", ""]); // empty row

  // Row 10: Table headers
  data.push([
    "No Urut",
    "Nomor Peserta",
    "NISN",
    "Nama Peserta",
    "Tempat, Tanggal Lahir",
    "Matematika",
    "Bahasa Indonesia",
    "Keterangan"
  ]);

  // Rows for student records
  STUDENT_RECORDS.forEach((student) => {
    const ttl = `${student.tempatLahir.toUpperCase()}, ${student.tanggalLahirStr.toUpperCase()}`;
    const matScoreStr = `${student.matematika.toFixed(2)} (${student.matematikaKet})`;
    const indoScoreStr = `${student.bahasaIndonesia.toFixed(2)} (${student.bahasaIndonesiaKet})`;

    data.push([
      student.no,             // Column A: No
      student.nomorPeserta,   // Column B: Nomor Peserta
      student.nisn,           // Column C: NISN
      student.nama.toUpperCase(), // Column D: Nama Peserta
      ttl,                    // Column E: Tempat, Tanggal Lahir
      matScoreStr,            // Column F: Matematika
      indoScoreStr,           // Column G: Bahasa Indonesia
      ""                      // Column H: Keterangan
    ]);
  });

  // Empty spacing before signatures
  data.push(["", "", "", "", "", "", "", ""]);
  data.push(["", "", "", "", "", "", "", ""]);

  // Signatures start index (starts directly after table data rows)
  const sigStartRow = 11 + STUDENT_RECORDS.length + 2;

  data.push(["", "", "", "", `Cimahi, ${currentFormattedDate}`, "", "", ""]);
  data.push(["", "", "", "", "Mengetahui,", "", "", ""]);
  data.push(["", "", "", "", "Kepala Sekolah,", "", "", ""]);
  data.push(["", "", "", "", "", "", "", ""]); // Sign space
  data.push(["", "", "", "", "", "", "", ""]); // Sign space
  data.push(["", "", "", "", "", "", "", ""]); // Sign space
  data.push(["", "", "", "", "TEDY RESNADI, S.H., S.Pd.", "", "", ""]);
  data.push(["", "", "", "", "NIP. 197411272008011004", "", "", ""]);

  // Create workbook sheet from AOA
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Setup merges (Kop, Title, Meta, and Sign block)
  const merges: XLSX.Range[] = [
    // Header Kops
    { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 7 } },
    // Title
    { s: { r: 4, c: 0 }, e: { r: 4, c: 7 } },
    // Metadata values (Column B to D gets merged so texts are readable)
    { s: { r: 6, c: 1 }, e: { r: 6, c: 3 } },
    { s: { r: 6, c: 5 }, e: { r: 6, c: 7 } },
    { s: { r: 7, c: 1 }, e: { r: 7, c: 3 } },
    { s: { r: 7, c: 5 }, e: { r: 7, c: 7 } },
    { s: { r: 8, c: 1 }, e: { r: 8, c: 3 } },
    { s: { r: 8, c: 5 }, e: { r: 8, c: 7 } },
  ];

  // Signature merges (Columns E to H)
  const sigRowIdx = sigStartRow;
  for (let r = sigRowIdx; r < sigRowIdx + 8; r++) {
    merges.push({ s: { r: r, c: 4 }, e: { r: r, c: 7 } });
  }

  ws["!merges"] = merges;

  // Set standard column widths for great readability on any screen
  ws["!cols"] = [
    { wch: 8 },   // Col A: No
    { wch: 25 },  // Col B: Nomor Peserta
    { wch: 15 },  // Col C: NISN
    { wch: 35 },  // Col D: Nama Peserta
    { wch: 32 },  // Col E: Tempat, Tanggal Lahir
    { wch: 20 },  // Col F: Matematika
    { wch: 20 },  // Col G: Bahasa Indonesia
    { wch: 15 }   // Col H: Keterangan
  ];

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "DKHTKA 2026");

  // Output filename: Daftar_Kolektif_Hasil_TKA_2026.xlsx
  XLSX.writeFile(wb, "Daftar_Kolektif_Hasil_TKA_2026.xlsx");
}
