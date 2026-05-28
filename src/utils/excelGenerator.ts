/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STUDENT_RECORDS } from "../data/students";

export function generateDKHTKAExcel() {
  const currentFormattedDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Calculate stats to double check
  const totalStudents = STUDENT_RECORDS.length;

  // Build rows
  let rowsHtml = "";
  STUDENT_RECORDS.forEach((student) => {
    const ttl = `${student.tempatLahir.toUpperCase()}, ${student.tanggalLahirStr.toUpperCase()}`;
    
    // Format score with line breaks
    const matScore = student.matematika.toFixed(2);
    const matKet = `(${student.matematikaKet})`;
    const indoScore = student.bahasaIndonesia.toFixed(2);
    const indoKet = `(${student.bahasaIndonesiaKet})`;

    rowsHtml += `
      <tr style="height: 32pt;">
        <td class="cell-border text-center font-body" style="mso-number-format:'\\@'; font-size: 10pt;">${student.no}</td>
        <td class="cell-border text-center font-mono" style="mso-number-format:'\\@'; font-size: 9.5pt;">${student.nomorPeserta}</td>
        <td class="cell-border text-center font-mono" style="mso-number-format:'\\@'; font-size: 9.5pt;">${student.nisn}</td>
        <td class="cell-border text-left font-body font-bold" style="mso-number-format:'\\@'; font-size: 10pt; padding-left: 6px;">${student.nama.toUpperCase()}</td>
        <td class="cell-border text-left font-body" style="mso-number-format:'\\@'; font-size: 9.5pt; padding-left: 6px;">${ttl}</td>
        <td class="cell-border text-center font-mono" style="mso-number-format:'General'; font-size: 10pt; white-space: normal; vertical-align: middle;">
          ${matScore}<br style="mso-data-placement:same-cell;" /><span style="font-size: 8.5pt; color: #475569; font-weight: normal; font-family: Arial, sans-serif;">${matKet}</span>
        </td>
        <td class="cell-border text-center font-mono" style="mso-number-format:'General'; font-size: 10pt; white-space: normal; vertical-align: middle;">
          ${indoScore}<br style="mso-data-placement:same-cell;" /><span style="font-size: 8.5pt; color: #475569; font-weight: normal; font-family: Arial, sans-serif;">${indoKet}</span>
        </td>
        <td class="cell-border text-center font-body" style="mso-number-format:'\\@';"></td>
      </tr>
    `;
  });

  // Excel XML content with HTML page wrapper that Excel handles perfectly
  const excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>DKHTKA 2026</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
                <x:Print>
                  <x:ValidPrinterInfo/>
                  <x:PaperSizeIndex>9</x:PaperSizeIndex> <!-- A4 -->
                  <x:HorizontalResolution>600</ horizontalResolution>
                  <x:VerticalResolution>600</verticalResolution>
                </x:Print>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #ffffff;
        }
        .text-center {
          text-align: center;
        }
        .text-left {
          text-align: left;
        }
        .text-right {
          text-align: right;
        }
        .font-mono {
          font-family: "Courier New", Courier, monospace, Consolas;
        }
        .font-body {
          font-family: "Calibri", "Arial", sans-serif;
        }
        .font-bold {
          font-weight: bold;
        }
        .cell-border {
          border: 0.5pt solid #000000;
          vertical-align: middle;
          padding: 4px;
        }
        .table-header {
          background-color: #f8fafc;
          border: 1.5pt solid #000000;
          font-weight: bold;
          text-align: center;
          vertical-align: middle;
          font-family: "Arial", sans-serif;
        }
        .meta-table td {
          font-family: "Arial", sans-serif;
          font-size: 10pt;
          vertical-align: middle;
        }
      </style>
    </head>
    <body>
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <!-- Column width specs for Excel -->
        <colgroup>
          <col width="45" />   <!-- Col A: No -->
          <col width="190" />  <!-- Col B: Nomor Peserta -->
          <col width="110" />  <!-- Col C: NISN -->
          <col width="240" />  <!-- Col D: Nama Peserta -->
          <col width="220" />  <!-- Col E: Tempat Tanggal Lahir -->
          <col width="110" />  <!-- Col F: Matematika -->
          <col width="110" />  <!-- Col G: Bahasa Indonesia -->
          <col width="110" />  <!-- Col H: Keterangan -->
        </colgroup>

        <!-- KOP SURAT (Header Institution) -->
        <tr style="height: 20pt;">
          <td colspan="8" class="text-center font-bold" style="font-size: 12pt; font-family: 'Arial', sans-serif;">KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH</td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="8" class="text-center font-bold" style="font-size: 11pt; font-family: 'Arial', sans-serif;">DINAS PENDIDIKAN KOTA CIMAHI</td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="8" class="text-center font-bold" style="font-size: 11pt; font-family: 'Arial', sans-serif;">TES KEMAMPUAN AKADEMIK SD/MI TAHUN 2026</td>
        </tr>
        <tr style="height: 10pt;">
          <td colspan="8"></td>
        </tr>
        <tr style="height: 22pt;">
          <td colspan="8" class="text-center font-bold" style="font-size: 11.5pt; font-family: 'Arial', sans-serif; tracking-wider;">** DAFTAR KOLEKTIF HASIL TES KEMAMPUAN AKADEMIK **</td>
        </tr>
        <tr style="height: 15pt;">
          <td colspan="8"></td>
        </tr>

        <!-- METADATA BLOCK -->
        <tr style="height: 18pt;">
          <td colspan="4" style="font-family: Arial, sans-serif; font-size: 9.5pt; padding-left: 5px;">
            <strong>Provinsi</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 02 - JAWA BARAT
          </td>
          <td colspan="4" style="font-family: Arial, sans-serif; font-size: 9.5pt; padding-left: 20px;">
            <strong>NPSN</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 20224242
          </td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="4" style="font-family: Arial, sans-serif; font-size: 9.5pt; padding-left: 5px;">
            <strong>Kota/Kabupaten</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 05 - KOTA CIMAHI
          </td>
          <td colspan="4" style="font-family: Arial, sans-serif; font-size: 9.5pt; padding-left: 20px;">
            <strong>Kepala Sekolah</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: TEDY RESNADI, S.H., S.Pd.
          </td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="4" style="font-family: Arial, sans-serif; font-size: 9.5pt; padding-left: 5px;">
            <strong>Satuan Pendidikan</strong>&nbsp;: 0017 - SD NEGERI LEUWIGAJAH 3
          </td>
          <td colspan="4" style="font-family: Arial, sans-serif; font-size: 9.5pt; padding-left: 20px;">
            <strong>NIP Kepala Sekolah</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 197411272008011004
          </td>
        </tr>
        <tr style="height: 15pt;">
          <td colspan="8"></td>
        </tr>

        <!-- MAIN TABLE HEADERS -->
        <tr style="height: 28pt; background-color: #f1f5f9; text-align: center;">
          <td class="table-header" style="font-size: 9.5pt; width: 45px;">No Urut</td>
          <td class="table-header" style="font-size: 9.5pt; width: 190px;">Nomor Peserta</td>
          <td class="table-header" style="font-size: 9.5pt; width: 110px;">NISN</td>
          <td class="table-header" style="font-size: 9.5pt; width: 240px;">Nama Peserta</td>
          <td class="table-header" style="font-size: 9.5pt; width: 220px;">Tempat, Tanggal Lahir</td>
          <td class="table-header" style="font-size: 9.5pt; width: 110px;">Matematika</td>
          <td class="table-header" style="font-size: 9.5pt; width: 110px;">Bahasa Indonesia</td>
          <td class="table-header" style="font-size: 9.5pt; width: 110px;">Keterangan</td>
        </tr>

        <!-- DATA ROWS -->
        ${rowsHtml}

        <!-- BOTTOM SPACE -->
        <tr style="height: 20pt;"><td colspan="8"></td></tr>

        <!-- SIGNATURE AREA -->
        <tr style="height: 18pt;">
          <td colspan="5"></td>
          <td colspan="3" class="text-left" style="font-family: Arial, sans-serif; font-size: 10pt; padding-left: 10px;">
            Cimahi, ${currentFormattedDate}
          </td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="5"></td>
          <td colspan="3" class="text-left" style="font-family: Arial, sans-serif; font-size: 10pt; padding-left: 10px;">
            Mengetahui,
          </td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="5"></td>
          <td colspan="3" class="text-left font-bold" style="font-family: Arial, sans-serif; font-size: 10pt; padding-left: 10px; text-transform: uppercase;">
            Kepala Sekolah
          </td>
        </tr>
        <!-- Signature Height Buffer -->
        <tr style="height: 40pt;">
          <td colspan="8"></td>
        </tr>
        <tr style="height: 18pt;">
          <td colspan="5"></td>
          <td colspan="3" class="text-left font-bold" style="font-family: Arial, sans-serif; font-size: 10pt; padding-left: 10px; text-decoration: underline;">
            TEDY RESNADI, S.H., S.Pd.
          </td>
        </tr>
        <tr style="height: 16pt;">
          <td colspan="5"></td>
          <td colspan="3" class="text-left" style="font-family: Arial, sans-serif; font-size: 9pt; padding-left: 10px; color: #334155;">
            NIP. 197411272008011004
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Create Blob and prompt download
  const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Daftar_Kolektif_Hasil_TKA_2026.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
