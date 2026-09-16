import React from 'react';

const DashboardHome = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agricultural Overview</h2>
      {/* Empty Grid Layout for Hour 3 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400">Chart Area 1 (Pending)</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400">Chart Area 2 (Pending)</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400">AI Insights (Pending)</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
