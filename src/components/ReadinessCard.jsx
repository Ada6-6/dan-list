import React from 'react';
import { ProgressRow } from './ProgressRow';
import { cn } from '../utils';

export function ReadinessCard({ title, data, className }) {
  return (
    <div className={cn("bg-white border border-slate-200 shadow-sm rounded-lg p-6 relative overflow-hidden transition-shadow duration-500 hover:shadow-md", className)}>
      <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <h2 className="bg-[#125B8E] text-white px-6 py-1.5 rounded-sm text-lg font-medium shadow-sm tracking-wide">
            {title}
          </h2>
        </div>
        
        <div className="flex flex-col gap-2">
          {data.length === 0 ? (
            <div className="text-center text-slate-400 py-8 text-sm">
              No data available for selected stations.
            </div>
          ) : (
            data.map(row => (
              <ProgressRow key={row.region} label={row.region} value={row.value} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
