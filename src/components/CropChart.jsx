import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Hour 2: Realistic Mock Data (6-month historical trend in ₹/kg)
const mockCropData = [
  { month: 'Apr', Cardamom: 2100, Rubber: 155, BlackPepper: 520 },
  { month: 'May', Cardamom: 2050, Rubber: 160, BlackPepper: 535 },
  { month: 'Jun', Cardamom: 2200, Rubber: 165, BlackPepper: 550 },
  { month: 'Jul', Cardamom: 2350, Rubber: 172, BlackPepper: 580 },
  { month: 'Aug', Cardamom: 2400, Rubber: 180, BlackPepper: 595 },
  { month: 'Sep', Cardamom: 2380, Rubber: 178, BlackPepper: 610 },
];

const CropChart = () => {
  return (
    <div className="w-full h-[400px] p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Crop Price Tracker (₹/kg)</h3>
          <p className="text-sm text-slate-500">Historical market trends</p>
        </div>
        {/* We will add the "Show AI Prediction" toggle button here in Hour 3 */}
      </div>
      
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockCropData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`₹${value}`, undefined]}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            <Line 
              type="monotone" 
              dataKey="Cardamom" 
              stroke="#168447" /* Brand Green */
              strokeWidth={3} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Rubber" 
              stroke="#3b82f6" /* Blue */
              strokeWidth={3} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="BlackPepper" 
              stroke="#f59e0b" /* Amber */
              strokeWidth={3} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropChart;