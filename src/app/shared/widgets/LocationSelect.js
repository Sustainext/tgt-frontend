
import { useState } from "react";


const locations = [
  {
    location_id: 11,
    location_name: "MK Optimize All 11"
  },
  {
    location_id: 13,
    location_name: "MK Optimize All 13"
  }
];

export default function LocationSelect({ onChange }) {
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filteredLocations = locations.filter(loc =>
    loc.location_name.toLowerCase().includes(query.toLowerCase())
  );

  function handleSelect(location) {
    setSelected(location);
    setQuery(location.location_name);
    setDropdownOpen(false);
    if (onChange) onChange(location);
  }

  return (
    <div className="relative w-72">
      <input
        className="w-full px-3 py-2 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); setDropdownOpen(true); }}
        onFocus={() => setDropdownOpen(true)}
        placeholder="Select location..."
      />
      {dropdownOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto">
          {filteredLocations.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No results found.</li>
          )}
          {filteredLocations.map(loc => (
            <li
              key={loc.location_id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(loc)}
            >
              {loc.location_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}