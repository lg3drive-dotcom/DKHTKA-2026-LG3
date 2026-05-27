/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudentRecord {
  no: number;
  nomorPeserta: string;
  nisn: string;
  nama: string;
  tempatLahir: string;
  tanggalLahirStr: string;
  tanggalLahirIso: string; // Format: YYYY-MM-DD for easy HTML5 input match
  matematika: number;
  matematikaKet: string;
  bahasaIndonesia: number;
  bahasaIndonesiaKet: string;
}

export interface ClassStats {
  totalStudents: number;
  matAverage: number;
  matMax: number;
  matMin: number;
  indoAverage: number;
  indoMax: number;
  indoMin: number;
  overallAverage: number;
}
