"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MdClose, MdSearch, MdFilterList, MdClear } from 'react-icons/md';
import { IoCheckmark } from 'react-icons/io5';
import { Oval } from 'react-loader-spinner';
import { fetchClimatiqActivities } from '../../utils/climatiqApi';

// Mock scope data - replace with actual imports from your project
const scope1Info = [
  { Category: [{ name: 'Stationary Combustion', SubCategory: ['Natural Gas', 'Coal', 'Oil'] }] },
  { Category: [{ name: 'Mobile Combustion', SubCategory: ['Gasoline', 'Diesel'] }] }
];

const scope2Info = [
  { Category: [{ name: 'Electricity', SubCategory: ['Grid Electricity', 'Renewable Energy'] }] }
];

const scope3Info = [
  { Category: [{ name: 'Business Travel', SubCategory: ['Air Travel', 'Ground Travel'] }] },
  { Category: [{ name: 'Waste', SubCategory: ['Solid Waste', 'Wastewater'] }] }
];

const EmissionFactorsSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    year: '',
    region: '',
    unitType: '',
    sourceLca: '',
    subcategory: '',
    scope: '',
    source: '',
    category: ''
  });

  // Get all available options for filters
  const scopeData = useMemo(() => ({
    scope1: scope1Info,
    scope2: scope2Info,
    scope3: scope3Info
  }), []);

  const allCategories = useMemo(() => {
    const categories = new Set();
    Object.values(scopeData).forEach(scopeArray => {
      scopeArray.forEach(info => {
        info.Category.forEach(cat => categories.add(cat.name));
      });
    });
    return Array.from(categories).sort();
  }, [scopeData]);

  const allSubcategories = useMemo(() => {
    const subcategories = new Set();
    Object.values(scopeData).forEach(scopeArray => {
      scopeArray.forEach(info => {
        info.Category.forEach(cat => {
          cat.SubCategory.forEach(sub => subcategories.add(sub));
        });
      });
    });
    return Array.from(subcategories).sort();
  }, [scopeData]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - i);
  }, []);

  const regionOptions = [
    'GLOBAL', 'US', 'GB', 'DE', 'FR', 'AU', 'CA', 'IN', 'CN', 'JP', 'BR', 'MX', 'EU'
  ];

  const unitTypeOptions = [
    'Mass', 'Volume', 'Energy', 'Distance', 'Money', 'Activity', 'Number', 'Area', 'Time'
  ];

  const sourceOptions = [
    'EPA', 'DEFRA', 'IEA', 'IPCC', 'GHG_PROTOCOL', 'ECOINVENT', 'EXIOBASE', 'OTHER'
  ];

  // Search function using real API
  const searchEmissionFactors = useCallback(async (searchQuery = searchTerm, pageNum = 1, filterParams = filters) => {
    // If no search criteria provided, clear results
    if (!searchQuery.trim() && !filterParams.subcategory && !filterParams.category) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    try {
      let allResults = [];
      const searchQueries = [];

      // If specific subcategory is selected, search for that
      if (filterParams.subcategory) {
        searchQueries.push({ subcategory: filterParams.subcategory });
      }
      // If specific category is selected, get all its subcategories
      else if (filterParams.category) {
        const categorySubcategories = [];
        Object.values(scopeData).forEach(scopeArray => {
          scopeArray.forEach(info => {
            const foundCategory = info.Category.find(cat => cat.name === filterParams.category);
            if (foundCategory) {
              categorySubcategories.push(...foundCategory.SubCategory);
            }
          });
        });
        
        categorySubcategories.forEach(sub => {
          searchQueries.push({ subcategory: sub });
        });
      }
      // If search term provided, search common subcategories
      else if (searchQuery.trim()) {
        const commonSubcategories = [
          'Natural Gas', 'Electricity', 'Gasoline', 'Diesel', 'Coal', 'Oil',
          'Air Travel', 'Ground Travel', 'Solid Waste', 'Wastewater'
        ];
        
        const matchingSubcategories = commonSubcategories.filter(sub =>
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (matchingSubcategories.length > 0) {
          matchingSubcategories.forEach(sub => {
            searchQueries.push({ subcategory: sub });
          });
        } else {
          searchQueries.push({ subcategory: 'Natural Gas' });
        }
      }

      if (searchQueries.length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      // Execute all search queries
      const searchPromises = searchQueries.map(async (query) => {
        try {
          const apiParams = {
            subcategory: query.subcategory,
            page: pageNum,
            ...(filterParams.region && { region: filterParams.region }),
            ...(filterParams.year && { year: filterParams.year }),
            ...(filterParams.unitType && { unit_type: filterParams.unitType })
          };

          const response = await fetchClimatiqActivities(apiParams);
          return response.results || [];
        } catch (error) {
          console.error(`Error searching for ${query.subcategory}:`, error);
          return [];
        }
      });

      const searchResults = await Promise.all(searchPromises);
      allResults = searchResults.flat();

      // Remove duplicates and apply filters
      const uniqueResults = allResults.filter((result, index, arr) => 
        arr.findIndex(r => r.activity_id === result.activity_id) === index
      );

      let filteredResults = uniqueResults;

      // Apply search term filter
      if (searchQuery.trim()) {
        filteredResults = filteredResults.filter(item => 
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply other filters
      if (filterParams.source) {
        filteredResults = filteredResults.filter(item => 
          item.source?.toLowerCase() === filterParams.source.toLowerCase()
        );
      }

      if (filterParams.sourceLca) {
        filteredResults = filteredResults.filter(item => 
          item.source_lca_activity?.toLowerCase().includes(filterParams.sourceLca.toLowerCase())
        );
      }

      // Filter by scope based on category mapping
      if (filterParams.scope) {
        const scopeCategories = new Set();
        if (filterParams.scope === 'scope1' || filterParams.scope === '1') {
          scope1Info.forEach(info => {
            info.Category.forEach(cat => scopeCategories.add(cat.name.toLowerCase()));
          });
        } else if (filterParams.scope === 'scope2' || filterParams.scope === '2') {
          scope2Info.forEach(info => {
            info.Category.forEach(cat => scopeCategories.add(cat.name.toLowerCase()));
          });
        } else if (filterParams.scope === 'scope3' || filterParams.scope === '3') {
          scope3Info.forEach(info => {
            info.Category.forEach(cat => scopeCategories.add(cat.name.toLowerCase()));
          });
        }
        
        if (scopeCategories.size > 0) {
          filteredResults = filteredResults.filter(item => 
            scopeCategories.has(item.category?.toLowerCase())
          );
        }
      }

      // Sort results
      filteredResults.sort((a, b) => {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setResults(filteredResults);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, scopeData]);

  // Handle search
  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    searchEmissionFactors(searchTerm, 1, filters);
  }, [searchEmissionFactors, searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      year: '',
      region: '',
      unitType: '',
      sourceLca: '',
      subcategory: '',
      scope: '',
      source: '',
      category: ''
    });
    setSearchTerm('');
    setResults([]);
  };

  // Handle selection
  const handleSelect = (factor) => {
    setSelectedFactor(factor);
  };

  // Confirm selection
  const confirmSelection = () => {
    if (selectedFactor && onSelect) {
      onSelect(selectedFactor);
      onClose();
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setResults([]);
      setSelectedFactor(null);
      setCurrentPage(1);
      setShowFilters(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[85vh] max-w-6xl overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Search Emission Factors</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MdFilterList />
              Filters
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search emission factors by name, category, or activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Oval height={16} width={16} color="white" /> : <MdSearch />}
              Search
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <MdClear />
              Clear
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Regions</option>
                  {regionOptions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                <select
                  value={filters.scope}
                  onChange={(e) => handleFilterChange('scope', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Scopes</option>
                  <option value="1">Scope 1</option>
                  <option value="2">Scope 2</option>
                  <option value="3">Scope 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Sources</option>
                  {sourceOptions.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {allCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  value={filters.subcategory}
                  onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Subcategories</option>
                  {allSubcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                <select
                  value={filters.unitType}
                  onChange={(e) => handleFilterChange('unitType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Unit Types</option>
                  {unitTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source LCA</label>
                <input
                  type="text"
                  placeholder="Enter source LCA activity"
                  value={filters.sourceLca}
                  onChange={(e) => handleFilterChange('sourceLca', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {loading && results.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <Oval height={50} width={50} color="#3B82F6" />
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-4 bg-gray-50 border-b">
                <p className="text-sm text-gray-600">
                  Found {results.length} emission factors
                  {selectedFactor && (
                    <span className="ml-4 text-blue-600 font-medium">
                      Selected: {selectedFactor.name}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CO₂e Factor</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((factor, index) => (
                      <tr
                        key={`${factor.activity_id}-${index}`}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedFactor?.activity_id === factor.activity_id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleSelect(factor)}
                      >
                        <td className="px-4 py-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedFactor?.activity_id === factor.activity_id
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {selectedFactor?.activity_id === factor.activity_id && (
                              <IoCheckmark className="text-white text-sm" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <div className="max-w-xs">
                            <div className="font-medium">{factor.name}</div>
                            {factor.source_lca_activity && factor.source_lca_activity !== 'unknown' && (
                              <div className="text-xs text-gray-500">{factor.source_lca_activity}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{factor.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{factor.source}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{factor.unit_type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{factor.region}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{factor.year}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {factor.factor !== undefined ? (
                            typeof factor.factor === 'number' ? factor.factor.toExponential(3) : factor.factor
                          ) : factor.co2_factor !== undefined ? (
                            typeof factor.co2_factor === 'number' ? factor.co2_factor.toExponential(3) : factor.co2_factor
                          ) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : searchTerm || Object.values(filters).some(v => v) ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">No emission factors found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search terms or filters</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">Search for emission factors</p>
                <p className="text-gray-400 text-sm">Enter a search term or use filters to find emission factors</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmSelection}
            disabled={!selectedFactor}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Factor
          </button>
        </div>
      </div>
    </div>
  );
};

// Make sure to export as default
export default EmissionFactorsSearchModal;