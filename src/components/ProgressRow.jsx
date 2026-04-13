import React from 'react';
import { cn } from '../utils';

export function ProgressRow({ label, value }) {
  // value is out of 100
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4 group">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="text-slate-500 font-medium">{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 rounded-full transition-all duration-700 ease-out flex items-center group-hover:bg-orange-600 shadow-sm"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
