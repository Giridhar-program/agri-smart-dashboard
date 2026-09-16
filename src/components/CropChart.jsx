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

const CropChart = () => {
  // We will inject the mock data (Cardamom, Rubber, etc.) in Hour 2
  const emptyData = [];

  return (
    <div className="w-full h-[400px] p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Crop Price Tracker</h3>
          <p className="text-sm text-slate-500">Historical trends and AI forecasts</p>
        </div>
        {/* We will add the "Show AI Prediction" toggle button here in Hour 3 */}
      </div>
      
      <div className="w-full h-[280px] border-dashed border-2 border-slate-200 rounded-xl flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 font-medium">Chart visualization area ready. Awaiting data...</p>
      </div>
    </div>
  );
};

export default CropChart;