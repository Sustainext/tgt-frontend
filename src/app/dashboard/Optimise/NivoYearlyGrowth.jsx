import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

const NivoYearlyGrowth = () => {
  // Default years range
  const startYear = 2020;
  const endYear = 2030;
  
  // Generate years array
  const years = Array.from(
    { length: endYear - startYear + 1 }, 
    (_, i) => startYear + i
  );
  
  // Initial values (random values between -50 and 50)
  const initialValues = {};
  years.forEach(year => {
    initialValues[year] = 0;
  });
  
  const [values, setValues] = useState(initialValues);
  const [maxRange, setMaxRange] = useState(100);
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
  
  // Format data for Nivo
  const lineData = [
    {
      id: 'yearlyGrowth',
      data: years.map(year => ({
        x: year.toString(),
        y: values[year]
      }))
    }
  ];
  
  const barData = years.map(year => ({
    year: year.toString(),
    growth: values[year],
    color: values[year] >= 0 ? 'positive' : 'negative'
  }));
  
  // Handle auto-adjusting ranges based on values
  const autoAdjustRange = (value) => {
    // If a value exceeds current range, bump up to the next range level
    if (Math.abs(value) > maxRange) {
      // Determine next appropriate range
      if (maxRange === 100) {
        setMaxRange(200);
      } else if (maxRange === 200) {
        setMaxRange(500);
      } else if (maxRange === 500) {
        setMaxRange(1000);
      } else if (maxRange === 1000) {
        setMaxRange(2000);
      }
      // Return true to indicate the range was adjusted
      return true;
    }
    return false;
  };

  // Handle point click and drag with smoother movement and auto-range adjustment
  const handlePointDrag = (point, event) => {
    // Get the year for this point
    const year = parseInt(point.data.x);
    
    // Capture initial mouse position and point value
    const initialY = event.clientY;
    const initialValue = values[year];
    
    // Flag to track if we're dragging
    let isDragging = true;
    
    // Create handlers for smooth dragging
    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;
      
      // Calculate delta from starting position
      const deltaY = initialY - moveEvent.clientY;
      
      // More responsive sensitivity factor (5x more sensitive than before)
      const chartContainer = event.target.closest('svg').parentElement;
      const sensitivity = (maxRange * 2) / (chartContainer.getBoundingClientRect().height / 5);
      const valueChange = deltaY * sensitivity;
      
      // Calculate new value with smoothing
      const newValue = Math.round(initialValue + valueChange);
      
      // Check if we need to auto-adjust range
      const rangeAdjusted = autoAdjustRange(newValue);
      
      // Apply constraints based on current max range
      // Note: If range was just adjusted, we don't want to constrain to the old range
      const constrainedValue = rangeAdjusted ? newValue : Math.max(Math.min(newValue, maxRange), -maxRange);
      
      // Update state
      setValues(prev => ({
        ...prev,
        [year]: constrainedValue
      }));
    };
    
    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Add global event listeners for dragging beyond the element
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Prevent default behaviors
    event.preventDefault();
    event.stopPropagation();
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ point }) => {
    const year = point.data.x;
    const growth = point.data.y;
    
    return (
      <div
        style={{
          background: 'white',
          padding: '9px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      >
        <div><strong>Year:</strong> {year}</div>
        <div>
          <strong>Growth:</strong> 
          <span style={{ color: growth >= 0 ? '#38a169' : '#e53e3e' }}>
            {growth > 0 ? '+' : ''}{growth}%
          </span>
        </div>
        <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
          Click and drag to modify
        </div>
      </div>
    );
  };
  
  
  // Custom bar component with smooth interactive behavior
  const CustomBar = ({ bar, onClick }) => {
    const handleMouseDown = (e) => {
      // Capture the initial mouse position and value
      const startY = e.clientY;
      const startValue = bar.data.growth;
      const year = parseInt(bar.data.year);
      
      // Get chart dimensions for proper scaling
      const chartContainer = e.target.closest('svg').parentElement;
      const chartHeight = chartContainer.getBoundingClientRect().height;
      
      // Calculate sensitivity based on chart height and max range (5x more sensitive)
      const sensitivity = (maxRange * 2) / (chartHeight / 5);
      
      const handleMouseMove = (moveEvent) => {
        // Calculate delta with proper scaling
        const deltaY = startY - moveEvent.clientY;
        const deltaValue = deltaY * sensitivity;
        
        // Apply smoothing and rounding
        const newValue = Math.round(startValue + deltaValue);
        const constrainedValue = Math.max(Math.min(newValue, maxRange), -maxRange);
        
        setValues(prev => ({
          ...prev,
          [year]: constrainedValue
        }));
      };
      
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Prevent default behaviors
      e.preventDefault();
    };
    
    return (
      <g transform={`translate(${bar.x},${bar.y})`}>
        {/* Visual indicator for dragging direction */}
        <line
          x={0}
          y1={-20}
          y2={bar.height > 0 ? bar.height + 20 : -20}
          stroke={bar.color}
          strokeWidth={1}
          strokeDasharray="3,3"
          strokeOpacity={0.6}
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Interactive bar with smooth transitions */}
        <rect
          x={-bar.width / 2}
          y={0}
          width={bar.width}
          height={bar.height}
          fill={bar.color}
          onMouseDown={handleMouseDown}
          style={{ 
            cursor: 'pointer',
            transition: 'height 0.2s ease-out, fill 0.2s ease-out'
          }}
          onMouseOver={(e) => {
            e.target.style.fillOpacity = 0.8;
          }}
          onMouseOut={(e) => {
            e.target.style.fillOpacity = 1;
          }}
        />
        
        {/* Value label */}
        <text
          x={0}
          y={bar.height > 0 ? -10 : 15}
          textAnchor="middle"
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            fill: bar.color,
            pointerEvents: 'none',
            transition: 'y 0.2s ease-out'
          }}
        >
          {bar.data.growth > 0 ? '+' : ''}{bar.data.growth}%
        </text>
      </g>
    );
  };
  
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Yearly Growth</h2>
        
        <div className="flex gap-4">
          <div className="flex border rounded overflow-hidden shadow-sm">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 transition-colors ${
                chartType === 'line' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 transition-colors ${
                chartType === 'bar' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Bar
            </button>
          </div>
          
          {/* Range selector */}
          {/* <div className="flex space-x-2">
            <button 
              onClick={() => setMaxRange(100)}
              className={`px-3 py-1 rounded transition-colors shadow-sm ${
                maxRange === 100 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ±100%
            </button>
          </div> */}
        </div>
      </div>
      
      {/* Chart container with drag instruction overlay */}
      <div style={{ height: 400 }} className="mb-6 relative rounded-lg overflow-hidden border border-gray-100 shadow-sm">
        {/* Subtle instruction overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 z-10 pointer-events-none">
          <div className="bg-white px-4 py-2 rounded-full shadow-md text-gray-600 font-medium text-sm opacity-0 hover:opacity-100 transform translate-y-4 hover:translate-y-0 transition-all duration-300">
            Click and drag points to adjust values
          </div>
        </div>
        
        {chartType === 'line' ? (
          <ResponsiveLine
            data={lineData}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: -maxRange,
              max: maxRange,
              stacked: false
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Year',
              legendOffset: 36,
              legendPosition: 'middle'
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Growth (%)',
              legendOffset: -40,
              legendPosition: 'middle',
              format: v => `${v > 0 ? '+' : ''}${v}%`
            }}
            enableGridX={false}
            colors={["#4F46E5"]} // More consistent color
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-15}
            enableArea={true}
            areaOpacity={0.1}
            useMesh={true}
            enableSlices={false}
            animate={true}
            motionConfig="stiff" // Smoother animations
            tooltip={({ point }) => <CustomTooltip point={point} />}
            markers={[
              {
                axis: 'y',
                value: 0,
                lineStyle: { stroke: '#888', strokeWidth: 1, strokeDasharray: '4 4' },
                legend: '',
                legendOrientation: 'horizontal'
              }
            ]}
            theme={{
              // Enhance theme for better visuals
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fill: "#64748b"
                  }
                },
                legend: {
                  text: {
                    fontSize: 13,
                    fontWeight: 600,
                    fill: "#475569"
                  }
                }
              },
              grid: {
                line: {
                  stroke: "#e2e8f0",
                  strokeWidth: 1
                }
              }
            }}
            layers={[
              'grid',
              'markers',
              'axes',
              'areas',
              'lines',
              'crosshair',
              // Custom layer for interactive points
              ({ points, ...rest }) => (
                <g>
                  {points.map(point => (
                    <g
                      key={point.id}
                      transform={`translate(${point.x},${point.y})`}
                      onMouseDown={(e) => handlePointDrag(point, e)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Larger hit area */}
                      <circle
                        r={20}
                        fill="rgba(255,255,255,0.01)"
                        stroke="transparent"
                        strokeWidth={0}
                      />
                      
                      {/* Visual indicator line */}
                      <line
                        x1={0}
                        y1={-20}
                        x2={0}
                        y2={20}
                        stroke={point.data.y >= 0 ? '#38a169' : '#e53e3e'}
                        strokeWidth={1}
                        strokeDasharray="2,2"
                        strokeOpacity={0.5}
                        pointerEvents="none"
                      />
                      
                      {/* Visible point */}
                      <circle
                        r={8}
                        fill="white"
                        stroke={point.data.y >= 0 ? '#38a169' : '#e53e3e'}
                        strokeWidth={2.5}
                        pointerEvents="none"
                      />
                      
                      {/* Value label */}
                      <text
                        y={point.data.y >= 0 ? -15 : 20}
                        textAnchor="middle"
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          fill: point.data.y >= 0 ? '#38a169' : '#e53e3e',
                          pointerEvents: 'none'
                        }}
                      >
                        {point.data.y > 0 ? '+' : ''}{point.data.y}%
                      </text>
                    </g>
                  ))}
                </g>
              )
            ]}
          />
        ) : (
          <ResponsiveBar
            data={barData}
            keys={['growth']}
            indexBy="year"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={({ data }) => data.growth >= 0 ? '#38a169' : '#e53e3e'}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Year',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Growth (%)',
              legendPosition: 'middle',
              legendOffset: 50,
              format: v => `${v > 0 ? '+' : ''}${v}%`
            }}
            minValue={-maxRange}
            maxValue={maxRange}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            animate={true}
            motionConfig="stiff" // Smoother animations
            tooltip={({ data }) => (
              <div style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}>
                <div><strong>Year:</strong> {data.year}</div>
                <div>
                  <strong>Growth:</strong> 
                  <span style={{ color: data.growth >= 0 ? '#38a169' : '#e53e3e' }}>
                    {data.growth > 0 ? '+' : ''}{data.growth}%
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
                  Click and drag to modify
                </div>
              </div>
            )}
            layers={[
              'grid',
              'markers',
              'axes',
              'bars',
              // Replace the default bars with custom interactive bars
              ({ bars }) => (
                <g>
                  {bars.map(bar => (
                    <g 
                      key={bar.key}
                      transform={`translate(${bar.x},${bar.y})`}
                      onMouseDown={(e) => {
                        const year = parseInt(bar.data.year);
                        const startY = e.clientY;
                        const startValue = bar.data.growth;
                        
                        // Get chart dimensions for proper scaling
                        const chartContainer = e.target.closest('svg').parentElement;
                        const chartHeight = chartContainer.getBoundingClientRect().height;
                        
                        // Calculate sensitivity (5x more responsive)
                        const sensitivity = (maxRange * 2) / (chartHeight / 5);
                        
                        let isDragging = true;
                        
                        const handleMouseMove = (moveEvent) => {
                          if (!isDragging) return;
                          // Calculate delta with proper scaling
                          const deltaY = startY - moveEvent.clientY;
                          const deltaValue = deltaY * sensitivity;
                          
                          // Apply smoothing and rounding
                          const newValue = Math.round(startValue + deltaValue);
                          
                          // Check if we need to auto-adjust range
                          const rangeAdjusted = autoAdjustRange(newValue);
                          
                          // Apply constraints based on current max range
                          // If range was just adjusted, don't constrain to old range
                          const constrainedValue = rangeAdjusted ? newValue : Math.max(Math.min(newValue, maxRange), -maxRange);
                          
                          setValues(prev => ({
                            ...prev,
                            [year]: constrainedValue
                          }));
                        };
                        
                        const handleMouseUp = () => {
                          isDragging = false;
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                        
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      {/* Visual indicator for dragging direction */}
                      <line
                        x={0}
                        y1={-20}
                        y2={bar.height > 0 ? bar.height + 20 : -20}
                        stroke={bar.color}
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        strokeOpacity={0.6}
                        style={{ pointerEvents: 'none' }}
                      />
                      
                      {/* Interactive bar with smooth transitions */}
                      <rect
                        x={-bar.width / 2}
                        y={0}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        style={{ 
                          cursor: 'pointer',
                          transition: 'height 0.2s ease-out, fill 0.2s ease-out'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.fillOpacity = 0.8;
                        }}
                        onMouseOut={(e) => {
                          e.target.style.fillOpacity = 1;
                        }}
                      />
                      
                      {/* Value label */}
                      <text
                        x={0}
                        y={bar.height > 0 ? -10 : 15}
                        textAnchor="middle"
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          fill: bar.color,
                          pointerEvents: 'none',
                          transition: 'y 0.2s ease-out'
                        }}
                      >
                        {bar.data.growth > 0 ? '+' : ''}{bar.data.growth}%
                      </text>
                    </g>
                  ))}
                </g>
              ),
              'legends',
            ]}
          />
        )}
      </div>
      
      {/* Data table */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-700">Growth Summary</h3>
          <div className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
            Average: {(Object.values(values).reduce((a, b) => a + b, 0) / years.length).toFixed(1)}%
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {years.map(year => (
            <div key={`summary-${year}`} className="flex justify-between">
              <span className="font-medium text-gray-600">{year}:</span>
              <span className={values[year] > 0 ? "text-green-600" : "text-red-600"}>
                {values[year] > 0 ? "+" : ""}{values[year]}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-600 flex items-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>
          <span className="font-medium">Pro Tip:</span> Click and drag points up or down to adjust values. The chart will animate smoothly as you make changes.
        </span>
      </div> */}
    </div>
  );
};

export default NivoYearlyGrowth;