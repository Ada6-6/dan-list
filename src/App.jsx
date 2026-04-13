import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { ReadinessCard } from './components/ReadinessCard';
import { MOCK_DATA } from './data';

function App() {
  const [selectedStations, setSelectedStations] = useState(['HKG', 'JFK', 'LHR', 'MAA', 'SIN']);
  const [cabinClass, setCabinClass] = useState('Business');
  const [menuCycle, setMenuCycle] = useState('2026M03');
  const [cycleIndicator, setCycleIndicator] = useState('Normal');

  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleAddStation = (station) => {
    setSelectedStations(prev => [...prev, station].sort());
  };

  const handleRemoveStation = (station) => {
    setSelectedStations(prev => prev.filter(s => s !== station));
  };

  const readinessData = useMemo(() => {
    if (selectedStations.length === 0) {
      return { food: [], beverage: [], equipment: [], staff: [] };
    }

    const modifier = (() => {
      let val = 0;
      if (cabinClass === 'Economy') val -= 8;
      if (cabinClass === 'First') val += 7;
      if (menuCycle === '2026M01') val -= 4;
      if (menuCycle === '2026M02') val += 3;
      if (cycleIndicator === 'Special') val += 12;
      return val;
    })();

    const filtered = MOCK_DATA.filter(d => selectedStations.includes(d.station));
    
    const aggregated = filtered.reduce((acc, curr) => {
      if (!acc[curr.region]) {
        acc[curr.region] = { foodSum: 0, bevSum: 0, count: 0 };
      }
      acc[curr.region].foodSum += curr.food;
      acc[curr.region].bevSum += curr.beverage;
      acc[curr.region].count += 1;
      return acc;
    }, {});

    const regions = Object.keys(aggregated).sort();
    
    return {
      food: regions.map(r => ({
        region: r,
        value: Math.max(0, Math.min(100, (aggregated[r].foodSum / aggregated[r].count) + modifier + (r.length * 1.5)))
      })),
      beverage: regions.map(r => ({
        region: r,
        value: Math.max(0, Math.min(100, (aggregated[r].bevSum / aggregated[r].count) + modifier - (r.length * 1.2)))
      })),
      equipment: regions.map(r => ({
        region: r,
        value: Math.max(0, Math.min(100, (aggregated[r].foodSum / aggregated[r].count) + modifier - 5 + r.length))
      })),
      staff: regions.map(r => ({
        region: r,
        value: Math.max(0, Math.min(100, (aggregated[r].bevSum / aggregated[r].count) + modifier + 4))
      }))
    };
  }, [selectedStations, cabinClass, menuCycle, cycleIndicator]);

  const cards = [
    { id: 'food', title: 'Image Readiness (Food)', data: readinessData.food },
    { id: 'beverage', title: 'Image Readiness (Beverages)', data: readinessData.beverage },
    { id: 'equipment', title: 'Image Readiness (Equipment)', data: readinessData.equipment },
    { id: 'staff', title: 'Image Readiness (Staff)', data: readinessData.staff }
  ];

  // Group into pages of 2 cards each for desktop view
  const pages = [
    [cards[0], cards[1]],
    [cards[2], cards[3]]
  ];

  const handlePrev = () => {
    setCarouselIndex(prev => (prev === 0 ? pages.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCarouselIndex(prev => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 bg-white border border-slate-200 shadow-sm rounded-xl p-6">
        <FilterBar 
          selectedStations={selectedStations}
          onAddStation={handleAddStation}
          onRemoveStation={handleRemoveStation}
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
          menuCycle={menuCycle}
          setMenuCycle={setMenuCycle}
          cycleIndicator={cycleIndicator}
          setCycleIndicator={setCycleIndicator}
        />
        
        {selectedStations.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-16 flex flex-col items-center justify-center text-slate-500">
            <p className="text-lg font-medium mb-2">No stations selected</p>
            <p className="text-sm">Please select at least one station to view the readiness dashboard.</p>
          </div>
        ) : (
          <div className="relative flex items-center bg-slate-100/50 py-4 md:py-8 rounded-lg border border-slate-200">
            <button 
              onClick={handlePrev} 
              className="absolute left-2 md:left-6 z-20 p-2 text-slate-400 hover:text-slate-600 bg-white shadow-md border border-slate-200 rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="w-full px-12 md:px-20">
              <div className="w-full overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-500 ease-in-out w-full"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {pages.map((page, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-8 w-full flex-shrink-0 relative">
                      {page.map(c => (
                        <div key={c.id} className="w-full md:w-1/2">
                          <ReadinessCard title={c.title} data={c.data} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext} 
              className="absolute right-2 md:right-6 z-20 p-2 text-slate-400 hover:text-slate-600 bg-white shadow-md border border-slate-200 rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
