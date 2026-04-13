export const MOCK_DATA = [
  { station: "HKG", region: "SEA", food: 45, beverage: 50 },
  { station: "JFK", region: "NA", food: 40, beverage: 42 },
  { station: "SIN", region: "SEA", food: 48, beverage: 47 },
  { station: "LHR", region: "EUR", food: 47, beverage: 46 },
  { station: "MAA", region: "SWP", food: 37, beverage: 38 },
  { station: "LAX", "region": "AME", "food": 48, "beverage": 48 },
  { station: "DXB", "region": "RGN", "food": 43, "beverage": 43 },
  { station: "SYD", "region": "WAA", "food": 47, "beverage": 47 }
];

export const ALL_STATIONS = MOCK_DATA.map(d => d.station).sort();
