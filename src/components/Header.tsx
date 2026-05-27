/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, Award, MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-slate-900/80 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Circle */}
          <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700 text-sky-400 shadow-lg shadow-sky-900/10">
            <GraduationCap className="w-5.5 h-5.5" />
          </div>
          
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">TKA <span className="text-white">Monitor</span></span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                DKHTKA
              </span>
            </div>
            <h1 className="text-xs font-extrabold text-slate-100 tracking-tight">SD Negeri Leuwigajah 3</h1>
          </div>
        </div>

        <div className="flex flex-col items-end leading-none text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cimahi</span>
          <span className="text-[9px] font-medium text-slate-500 mt-1 flex items-center gap-0.5">
            <MapPin className="w-2.5 h-2.5 text-sky-500" /> Jabar
          </span>
        </div>
      </div>
    </header>
  );
}
