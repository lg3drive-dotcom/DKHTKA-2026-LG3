/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STUDENT_RECORDS } from "../data/students";
import { StudentRecord, ClassStats } from "../types";

/**
 * Open a blank tab and render a print-ready version of the student's collective list
 */
export function printStudentReportHTML(student: StudentRecord, stats: ClassStats) {
  const width = "297mm"; // A4 Landscape size reference
  const studentsPerPage = 12;
  const totalInRegistry = STUDENT_RECORDS.length;
  const totalPages = Math.ceil(totalInRegistry / studentsPerPage);
  const studentIndex = student.no;

  const currentFormattedDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Compile pages
  let pagesHtml = "";

  for (let page = 1; page <= totalPages; page++) {
    const startRowNo = (page - 1) * studentsPerPage + 1;
    const endRowNo = Math.min(startRowNo + studentsPerPage - 1, totalInRegistry);

    // Build rows for this page
    let rowsHtml = "";
    for (let i = 0; i < studentsPerPage; i++) {
      const currentRowNo = startRowNo + i;
      const isThisMe = currentRowNo === studentIndex;
      const currentRecord = STUDENT_RECORDS.find((s) => s.no === currentRowNo);

      if (currentRecord) {
        const isHighlighted = isThisMe ? "bg-blue-50/90 font-bold border-black" : "bg-white";
        const nameDisplay = isThisMe 
          ? `<span class="font-extrabold text-black uppercase">${currentRecord.nama.toUpperCase()}</span>`
          : `<span class="italic text-gray-400 font-normal">[ Rahasia / Anonim ]</span>`;
          
        rowsHtml += `
          <tr class="${isHighlighted} border border-black h-10 text-center">
            <td class="border border-black font-bold text-xs">${currentRowNo}</td>
            <td class="border border-black font-mono text-xs">${currentRecord.nomorPeserta}</td>
            <td class="border border-black font-mono text-xs">${currentRecord.nisn}</td>
            <td class="border border-black text-left px-3 text-xs uppercase">${nameDisplay}</td>
            <td class="border border-black text-xs uppercase">${currentRecord.tempatLahir}, ${currentRecord.tanggalLahirStr}</td>
            <td class="border border-black font-mono text-xs ${isThisMe ? 'font-bold text-blue-800' : ''}">${currentRecord.matematika.toFixed(2)}</td>
            <td class="border border-black font-mono text-xs ${isThisMe ? 'font-bold text-blue-800' : ''}">${currentRecord.bahasaIndonesia.toFixed(2)}</td>
            <td class="border border-black text-xs uppercase font-semibold">${currentRecord.matematikaKet.toUpperCase()}</td>
          </tr>
        `;
      } else {
        // Skeletal rows to match Indonesian report standard if needed
        rowsHtml += `
          <tr class="bg-white border border-black h-10 text-center">
            <td class="border border-black font-bold text-xs">${currentRowNo}</td>
            <td class="border border-black"></td>
            <td class="border border-black"></td>
            <td class="border border-black"></td>
            <td class="border border-black"></td>
            <td class="border border-black"></td>
            <td class="border border-black"></td>
            <td class="border border-black"></td>
          </tr>
        `;
      }
    }

    // Page HTML with official Kop Surat
    pagesHtml += `
      <!-- PAGE ${page} -->
      <div class="page bg-white p-8 relative flex flex-col justify-between mx-auto my-0 print:my-0 print:p-0 print:shadow-none" style="width: 297mm; min-height: 209mm; box-sizing: border-box;">
        
        <!-- Header / Kop Surat Resmi Indonesia Model 1 -->
        <div>
          <div class="flex items-center justify-between gap-4 border-b-[3px] border-black pb-2 mb-4 select-none">
            <!-- Logo Kiri -->
            <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
              <img 
                src="https://i.ibb.co.com/wZdz4JgV/logo-lg3-20260425-202811-0000.png" 
                alt="Logo Pemerintah Daerah"
                referrerPolicy="no-referrer"
                class="max-w-full max-h-full object-contain"
              />
            </div>

            <!-- Teks Identitas Tengah -->
            <div class="flex-1 text-center font-bold font-serif">
              <div class="text-sm md:text-base leading-tight uppercase font-bold">
                KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
              </div>
              <div class="text-xs md:text-sm leading-tight uppercase font-bold mt-0.5">
                DINAS PENDIDIKAN KOTA CIMAHI
              </div>
              <div class="text-lg md:text-xl leading-tight mt-1 mb-1 uppercase font-black tracking-tight">
                SD NEGERI LEUWIGAJAH 3
              </div>
              <div class="text-[9px] md:text-xs font-normal italic leading-relaxed">
                Jln. Kerkof No.33 Rt 09 Rw 09 Kel. Leuwigajah Kec. Cimahi Selatan
              </div>
            </div>

            <!-- Logo Kanan -->
            <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
              <img 
                src="https://i.ibb.co.com/39BKK1KR/logo-lg3-20260425-202644-0000.png" 
                alt="Logo Sekolah"
                referrerPolicy="no-referrer"
                class="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <!-- Document Subtitle -->
          <div class="text-center mb-4">
            <h2 class="text-base font-extrabold uppercase font-serif text-black leading-tight tracking-wider">
              DAFTAR KOLEKTIF HASIL TES KEMAMPUAN AKADEMIK (DKHTKA)
            </h2>
            <p class="text-[11px] font-medium text-gray-700 italic mt-0.5 font-serif">
              Tahun Ajaran Evaluasi Mandiri Kompetensi Siswa 2026
            </p>
          </div>

          <!-- Official Metadata Grid Left vs Right -->
          <div class="grid grid-cols-2 gap-4 text-xs font-serif text-black mb-4 pb-2 border-b border-gray-100">
            <div class="space-y-1">
              <div class="flex"><span class="w-32 font-bold">Provinsi</span> <span>: 02 - JAWA BARAT</span></div>
              <div class="flex"><span class="w-32 font-bold">Kota/Kabupaten</span> <span>: 05 - KOTA CIMAHI</span></div>
              <div class="flex"><span class="w-32 font-bold">Satuan Pendidikan</span> <span>: 0017 - SD NEGERI LEUWIGAJAH 3</span></div>
            </div>
            <div class="space-y-1 pl-12">
              <div class="flex"><span class="w-40 font-bold">NPSN</span> <span>: 20224242</span></div>
              <div class="flex"><span class="w-40 font-bold">Kepala Satuan Pendidikan</span> <span>: TEDY RESNADI, S.H., S.Pd.</span></div>
              <div class="flex"><span class="w-40 font-bold">NIP Kepala Sekolah</span> <span>: 197411272008011004</span></div>
            </div>
          </div>

          <!-- Official Table list -->
          <table class="w-full border-collapse border-2 border-black text-black text-xs font-serif">
            <thead>
              <tr class="bg-gray-100 border-2 border-black font-bold h-10 text-center">
                <th class="border-2 border-black w-10">No</th>
                <th class="border-2 border-black w-48">Nomor Peserta</th>
                <th class="border-2 border-black w-28">NISN</th>
                <th class="border-2 border-black">Nama Peserta</th>
                <th class="border-2 border-black w-52">Tempat, Tanggal Lahir</th>
                <th class="border-2 border-black w-24">Matematika</th>
                <th class="border-2 border-black w-24">B. Indonesia</th>
                <th class="border-2 border-black w-24">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="mt-2 text-[10px] text-gray-500 italic">
            *Catatan: Kolom Nama Peserta selain nama Anda sengaja diautomasi sebagai Anonim demi menghormati Perlindungan Data Pribadi (PDP).
          </div>
        </div>

        <!-- Document Footer, Signatures and Stamps -->
        <div class="mt-4 pt-1 flex items-end justify-between">
          <!-- Statistics block watermark style on the left -->
          <div class="border border-gray-400 bg-gray-50 p-2.5 rounded-lg w-[320px] text-[10px] font-serif text-black space-y-0.5">
            <h5 class="font-extrabold uppercase text-[10px] text-gray-800 border-b border-gray-300 pb-1 mb-1">
              REKAP BENCHMARK GABUNGAN KELAS
            </h5>
            <div class="flex justify-between"><span>Total Terdaftar Evaluasi:</span> <strong class="font-bold">${stats.totalStudents || 57} Siswa</strong></div>
            <div class="flex justify-between"><span>Rerata Matematika Kelas:</span> <strong class="font-bold">${stats.matAverage.toFixed(2)}</strong></div>
            <div class="flex justify-between"><span>Rerata B. Indonesia Kelas:</span> <strong class="font-bold">${stats.indoAverage.toFixed(2)}</strong></div>
          </div>

          <!-- Centered watermark style metadata -->
          <div class="text-center pb-2">
            <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">
              DOKUMEN INTEGRITAS TKA CIMAHI 2026
            </span>
          </div>

          <!-- Official sign block on the right -->
          <div class="text-xs font-serif text-black w-64 text-left">
            <div>Cimahi, ${currentFormattedDate}</div>
            <div class="mt-0.5">Mengetahui,</div>
            <div class="font-bold uppercase text-xs mt-0.5">Kepala Satuan Pendidikan</div>
            <div class="h-10"></div> <!-- space for signature -->
            <div class="font-bold text-xs uppercase underline">TEDY RESNADI, S.H., S.Pd.</div>
            <div class="text-[10px] mt-0.5 text-gray-850">NIP. 197411272008011004</div>
          </div>
        </div>

        <!-- Page marking bottom right -->
        <div class="absolute bottom-2 right-8 text-[10px] font-serif font-bold text-gray-400">
          Halaman ${page} dari ${totalPages}
        </div>
      </div>
      
      <!-- PAGE BREAK IF NOT LAST -->
      ${page < totalPages ? '<div class="page-break"></div>' : ""}
    `;
  }

  // Construct complete HTML String
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Cetak_Hasil_TKA_2026_${student.nama.replace(/\s+/g, "_")}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;700&display=swap');
        
        body {
          background-color: #f1f5f9;
          font-family: 'Times New Roman', Times, Baskerville, Georgia, serif;
        }

        @media print {
          body {
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .page {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: auto !important;
          }
          .page-break {
            page-break-after: always;
            break-after: page;
          }
        }

        .page {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          background-color: white;
          border-radius: 8px;
        }
      </style>
    </head>
    <body class="p-4 print:p-0">

      <!-- Floating Controls Banner -->
      <div class="no-print max-w-4xl mx-auto mb-6 bg-white border border-slate-200 p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 font-sans">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            🖨️
          </div>
          <div>
            <h4 class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Mode Pratinjau Cetak</h4>
            <p class="text-[10px] text-slate-500 font-medium">Gunakan tombol cetak atau pintasan Ctrl+P / Cmd+P di browser Anda.</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            onclick="window.print()" 
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Cetak Dokumen
          </button>
          <button 
            onclick="window.close()" 
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Tutup Halaman
          </button>
        </div>
      </div>

      <!-- Main pages render zone -->
      <div class="space-y-8 print:space-y-0">
        ${pagesHtml}
      </div>

      <script>
        // Auto trigger browser native print pop up
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 600);
        });
      </script>
    </body>
    </html>
  `;

  // Write and open
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}

/**
 * Open a blank tab and render a print-ready version of the Admin's extreme score report
 */
export function printAdminReportHTML(
  subjectType: "matematika" | "bahasaIndonesia" | "both",
  stats: ClassStats
) {
  const currentFormattedDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Calculate extreme students
  const mathMaxScore = stats.matMax;
  const mathMinScore = stats.matMin;
  const indoMaxScore = stats.indoMax;
  const indoMinScore = stats.indoMin;

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

  let tableRowsHtml = "";
  rowsToShow.forEach((row, index) => {
    const isTertinggi = row.role === "Tertinggi";
    const bgClass = isTertinggi ? "bg-green-50/90" : "bg-red-50/90";
    const textColor = isTertinggi ? "text-green-700 font-extrabold" : "text-rose-700 font-extrabold";
    const statusBg = isTertinggi ? "text-green-800" : "text-rose-800";

    tableRowsHtml += `
      <tr class="${bgClass} border border-black h-10 text-center">
        <td class="border border-black font-bold">${index + 1}</td>
        <td class="border border-black font-bold uppercase ${textColor}">${row.role}</td>
        <td class="border border-black font-semibold">${row.subject}</td>
        <td class="border border-black text-left px-3 text-xs uppercase font-extrabold text-black">${row.nama.toUpperCase()}</td>
        <td class="border border-black font-mono">${row.nisn}</td>
        <td class="border border-black font-mono font-extrabold text-sm text-black">${row.score.toFixed(2)}</td>
        <td class="border border-black font-serif text-xs capitalize ${statusBg}">${row.ket}</td>
      </tr>
    `;
  });

  const subjectHeaderLabel = subjectType === "matematika" 
    ? "MATA PELAJARAN: MATEMATIKA" 
    : subjectType === "bahasaIndonesia" 
      ? "MATA PELAJARAN: BAHASA INDONESIA" 
      : "SELURUH MATA EVALUASI (GABUNGAN)";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan_Evaluasi_Ekstrem_2026_${subjectType}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          background-color: #f1f5f9;
          font-family: 'Times New Roman', Times, Baskerville, Georgia, serif;
        }

        @media print {
          body {
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .page {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: auto !important;
          }
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
        }

        .page {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          background-color: white;
          border-radius: 8px;
        }
      </style>
    </head>
    <body class="p-6 print:p-0">

      <!-- Floating Controls Banner -->
      <div class="no-print max-w-3xl mx-auto mb-6 bg-white border border-slate-200 p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 font-sans">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            📊
          </div>
          <div>
            <h4 class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Mode Pratinjau Cetak Lap. Admin</h4>
            <p class="text-[10px] text-slate-500 font-medium">Gunakan tombol cetak atau pintasan Ctrl+P / Cmd+P di browser Anda.</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            onclick="window.print()" 
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Cetak Laporan
          </button>
          <button 
            onclick="window.close()" 
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Tutup Halaman
          </button>
        </div>
      </div>

      <!-- A4 Page Container -->
      <div class="page bg-white p-10 max-w-[210mm] min-h-[297mm] mx-auto flex flex-col justify-between print:max-w-full print:min-h-0">
        
        <div>
          <!-- Header / Kop Surat Resmi Indonesia Model 1 -->
          <div class="flex items-center justify-between gap-4 border-b-[3px] border-black pb-2 mb-6 select-none font-serif text-black">
            <!-- Logo Kiri -->
            <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
              <img 
                src="https://i.ibb.co.com/wZdz4JgV/logo-lg3-20260425-202811-0000.png" 
                alt="Logo Pemerintah Daerah"
                referrerPolicy="no-referrer"
                class="max-w-full max-h-full object-contain"
              />
            </div>

            <!-- Teks Identitas Tengah -->
            <div class="flex-1 text-center font-bold">
              <div class="text-xs md:text-sm leading-tight uppercase font-bold text-black-900">
                PEMERINTAH DAERAH KOTA CIMAHI
              </div>
              <div class="text-xs md:text-sm leading-tight uppercase font-bold text-black-900 mt-0.5">
                DINAS PENDIDIKAN
              </div>
              <div class="text-lg md:text-xl leading-tight mt-1 mb-1 uppercase font-black tracking-tight text-black">
                SD NEGERI LEUWIGAJAH 3
              </div>
              <div class="text-[9px] md:text-xs font-normal italic leading-relaxed text-black">
                Jln. Kerkof No.33 Rt 09 Rw 09 Kel. Leuwigajah Kec. Cimahi Selatan
              </div>
            </div>

            <!-- Logo Kanan -->
            <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
              <img 
                src="https://i.ibb.co.com/39BKK1KR/logo-lg3-20260425-202644-0000.png" 
                alt="Logo Sekolah"
                referrerPolicy="no-referrer"
                class="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <!-- Document Subtitle -->
          <div class="text-center mb-8 font-serif">
            <h2 class="text-base font-extrabold uppercase text-black leading-tight tracking-wider underline">
              LAPORAN PRIVAT HASIL PENILAIAN EKSTREM TKA 2026
            </h2>
            <div class="text-[10px] font-bold text-red-700 tracking-wide mt-1 uppercase">
              REKAP KHUSUS AMBANG TERLUAR — BASHAN PRIVAT KEPALA INSTANSI
            </div>
          </div>

          <!-- Metadata block -->
          <div class="grid grid-cols-2 gap-4 text-xs font-serif text-black mb-6 pb-2 border-b border-gray-200">
            <div class="space-y-1">
              <div class="flex"><span class="w-28 text-gray-600 font-bold">Kota/Kabupaten</span> <span>: KOTA CIMAHI</span></div>
              <div class="flex"><span class="w-28 text-gray-600 font-bold">Sekolah</span> <span>: SD NEGERI LEUWIGAJAH 3</span></div>
              <div class="flex"><span class="w-28 text-gray-600 font-bold">Bahasan</span> <span class="font-bold">: ${subjectHeaderLabel}</span></div>
            </div>
            <div class="space-y-1 pl-12 text-right">
              <div><span class="text-gray-600 font-bold">Tanggal Terbit :</span> cimahi, ${currentFormattedDate}</div>
              <div><span class="text-gray-600 font-bold">Klasifikasi :</span> <strong class="text-red-700 uppercase font-extrabold font-serif">SANGAT RAHASIA / INTERN KEPALA SEKOLAH</strong></div>
            </div>
          </div>

          <!-- Table with data -->
          <table class="w-full border-collapse border-2 border-black text-black text-xs font-serif mb-8">
            <thead>
              <tr class="bg-gray-150 border-2 border-black font-bold h-10 text-center">
                <th class="border-2 border-black w-10">No</th>
                <th class="border-2 border-black w-24">Kategori</th>
                <th class="border-2 border-black w-28">Mata Pelajaran</th>
                <th class="border-2 border-black">Nama Siswa</th>
                <th class="border-2 border-black w-24">NISN</th>
                <th class="border-2 border-black w-20">Nilai</th>
                <th class="border-2 border-black w-24">Status</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>

          <!-- Analysis Block -->
          <div class="border border-gray-400 bg-gray-50/50 p-4 rounded-xl text-xs font-serif text-black mb-8 space-y-2">
            <h5 class="font-bold uppercase text-xs border-b border-gray-300 pb-1.5 mb-2 text-gray-800 flex items-center gap-1.5">
              <span>📋</span> DIAGNOSIS AKADEMIK DARI SATUAN PENDIDIKAN
            </h5>
            <ol class="list-decimal pl-4 space-y-1.5 text-gray-800 leading-relaxed">
              <li><strong>Kelompok Tertinggi (Performa OSN):</strong> Peserta didik Berkategori TERTINGGI direkomendasikan masuk program pengayaan intensif guna persiapan ajang sains nasional (OSN/O2SN).</li>
              <li><strong>Kelompok Terendah (Remedial Terbimbing):</strong> Peserta didik Berkategori TERENDAH diwajibkan mengikuti program remedial terbimbing secara privat oleh wali kelas masing-masing.</li>
              <li><strong>Klausul Kerahasiaan (PDP):</strong> Dokumen hasil rekap ini bersifat rahasia instansi dan dilarang disebarluaskan untuk menjaga stabilitas psikologis murid pendidik.</li>
            </ol>
          </div>
        </div>

        <!-- Official Seal and Sign Stamp zone -->
        <div class="mt-8 pt-4 border-t border-gray-100 flex items-end justify-between font-serif text-black text-xs">
          <!-- Left institutional Stamp container seal template -->
          <div class="border-2 border-blue-800 p-3 text-center text-blue-800 rounded-md w-48 font-bold text-[10px] leading-tight opacity-90">
            <div class="border border-blue-800 p-2 space-y-1">
              <div>KEMENTERIAN DIKDASMEN</div>
              <div class="text-xs">SDN LEUWIGAJAH 3</div>
              <div class="font-serif italic font-normal text-[9px] border-t border-blue-800 pt-1">TANDA TANGAN RESMI</div>
            </div>
          </div>

          <!-- Right formal sign zone -->
          <div class="w-64 text-left">
            <div>Cimahi, ${currentFormattedDate}</div>
            <div class="mt-0.5">Mengetahui,</div>
            <div class="font-bold uppercase text-xs mt-0.5">Kepala Satuan Pendidikan</div>
            <div class="h-12"></div> <!-- Seal / Write space -->
            <div class="font-bold text-xs uppercase underline">TEDY RESNADI, S.H., S.Pd.</div>
            <div class="text-[10px] text-gray-800 mt-0.5">NIP. 197411272008011004</div>
          </div>
        </div>

      </div>

      <script>
        // Auto trigger browser native print pop up
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 600);
        });
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
