import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import { ALL_STATIONS } from '../data';

function SingleSelectDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 items-start relative z-40">
      <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</span>
      <div 
        ref={dropdownRef}
        className="flex items-center justify-between bg-white border border-slate-300 rounded px-3 min-h-8 min-w-[160px] shadow-sm relative transition-colors hover:border-slate-400 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-slate-800 text-sm font-semibold">{value}</span>
        <ChevronDown size={14} className="text-slate-400 pointer-events-none ml-2" />
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded shadow-lg py-1 z-50">
            {options.map(option => (
              <button
                key={option}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function FilterBar({ 
  selectedStations, 
  onAddStation, 
  onRemoveStation,
  cabinClass,
  setCabinClass,
  menuCycle,
  setMenuCycle,
  cycleIndicator,
  setCycleIndicator
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const availableStations = ALL_STATIONS.filter(s => !selectedStations.includes(s));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap items-end justify-between gap-6 md:gap-8 w-full select-none border-b border-slate-300 pb-4">
      {/* Stations Dropdown */}
      <div className="flex flex-col gap-1.5 items-start z-50 relative">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Stations</span>
        <div 
          className="flex items-center bg-white border border-slate-300 rounded px-2 min-h-8 min-w-[280px] shadow-sm transition-colors hover:border-slate-400 cursor-pointer"
          ref={dropdownRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-1 flex-wrap py-1 flex-1">
            {selectedStations.map(station => (
              <div 
                key={station}
                className="flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded px-1.5 py-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                {station}
                <button 
                  onClick={(e) => { e.stopPropagation(); onRemoveStation(station); }}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          
          <button 
            className="ml-2 text-slate-400 hover:text-slate-600 focus:outline-none pointer-events-none"
          >
            <ChevronDown size={14} />
          </button>
          
          {isOpen && availableStations.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded shadow-lg py-1 z-50 cursor-auto" onClick={(e) => e.stopPropagation()}>
              {availableStations.map(station => (
                <button
                  key={station}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddStation(station);
                    setIsOpen(false);
                  }}
                >
                  {station}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        
      {/* Right side functional dropdowns */}
      <div className="flex flex-wrap gap-6 md:gap-8 z-40 ml-auto">
        <SingleSelectDropdown 
          label="Cabin Class" 
          options={['Business', 'Economy', 'First']} 
          value={cabinClass} 
          onChange={setCabinClass} 
        />
        <SingleSelectDropdown 
          label="Menu Cycle" 
          options={['2026M01', '2026M02', '2026M03']} 
          value={menuCycle} 
          onChange={setMenuCycle} 
        />
        <SingleSelectDropdown 
          label="Cycle Indicator" 
          options={['Normal', 'Special']} 
          value={cycleIndicator} 
          onChange={setCycleIndicator} 
        />
      </div>
    </div>
  );
}
