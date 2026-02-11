
import React from 'react';
import { GoalkeeperStats } from '../types';

interface FifaCardProps {
  stats: GoalkeeperStats;
  name: string;
}

export const FifaCard: React.FC<FifaCardProps> = ({ stats, name }) => {
  return (
    <div className="relative w-64 h-[400px] mx-auto group perspective-1000">
      <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 p-1 rounded-[2rem] shadow-2xl overflow-hidden transition-transform duration-500 group-hover:rotate-y-12">
        {/* Card Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        
        {/* Inner Card Body */}
        <div className="relative h-full w-full bg-[#121212] rounded-[1.8rem] flex flex-col items-center pt-6 px-4 text-white overflow-hidden">
          {/* Header Part: OVR & Position */}
          <div className="flex w-full items-start justify-between px-2">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black text-yellow-400 drop-shadow-md leading-none">{stats.overall}</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">GK | حارس</span>
            </div>
            <div className="text-3xl opacity-50">🇸🇦</div>
          </div>

          {/* Player Silhouette/Avatar area */}
          <div className="relative w-full h-40 mt-2 flex items-center justify-center">
             <div className="text-8xl">🧤</div>
             <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#121212] to-transparent"></div>
          </div>

          {/* Name Area */}
          <div className="mt-2 w-full text-center py-2 bg-yellow-500/10 border-y border-yellow-500/20">
            <h3 className="text-xl font-black uppercase tracking-widest text-yellow-400">{name.split(' ')[0]}</h3>
          </div>

          {/* Stats Grid */}
          <div className="mt-4 grid grid-cols-2 w-full gap-x-4 gap-y-2 px-2">
             <div className="flex justify-between items-center border-b border-white/10 pb-1">
                <span className="text-yellow-400 font-black text-lg">{stats.diving}</span>
                <span className="text-[10px] font-bold text-gray-400">DIV | ارتماء</span>
             </div>
             <div className="flex justify-between items-center border-b border-white/10 pb-1">
                <span className="text-yellow-400 font-black text-lg">{stats.reflexes}</span>
                <span className="text-[10px] font-bold text-gray-400">REF | ارتداد</span>
             </div>
             <div className="flex justify-between items-center border-b border-white/10 pb-1">
                <span className="text-yellow-400 font-black text-lg">{stats.positioning}</span>
                <span className="text-[10px] font-bold text-gray-400">POS | تمركز</span>
             </div>
             <div className="flex justify-between items-center border-b border-white/10 pb-1">
                <span className="text-yellow-400 font-black text-lg">{stats.kicking}</span>
                <span className="text-[10px] font-bold text-gray-400">KIC | ركل</span>
             </div>
          </div>

          {/* Bottom Badge */}
          <div className="mt-auto mb-4 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/40">
            <span className="text-xs font-black text-yellow-400">ELITE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
