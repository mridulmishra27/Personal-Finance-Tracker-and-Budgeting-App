import React from "react";

const SpendingOverview = () => {
  return (
    <div className="bg-[#141b32] p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Spending Overview</h2>

        {/* Tabs */}
        <div className="flex items-center gap-3 text-sm">
          <button className="px-4 py-1 bg-[#00b3ff]/20 text-[#00b3ff] rounded-lg">
            Week
          </button>
          <button className="px-4 py-1 text-gray-400 hover:text-white">Month</button>
          <button className="px-4 py-1 text-gray-400 hover:text-white">Year</button>
        </div>
      </div>

      {/* Empty chart */}
      <div className="flex flex-col items-center justify-center mt-8 opacity-60 py-16">
        <svg className="w-16 h-16 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500">No spending data</p>
        <p className="text-gray-600 text-xs">Add transactions to see your spending chart</p>
      </div>
    </div>
  );
};

export default SpendingOverview;
