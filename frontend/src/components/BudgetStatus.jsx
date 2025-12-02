import React from "react";
import { assets } from "../assets/assets";

const budgetItems = [
  { label: "Food & Dining", used: 0, total: 0, icon: assets.food_icon, color: "bg-red-400" },
  { label: "Transportation", used: 0, total: 0, icon: assets.transport_icon, color: "bg-blue-400" },
  { label: "Entertainment", used: 0, total: 0, icon: assets.entertain_icon, color: "bg-purple-400" },
];

const BudgetStatus = () => {
  return (
    <div className="bg-[#141b32] p-6 rounded-xl shadow-lg relative">
      <h2 className="text-white text-lg font-semibold mb-4">Budget Status</h2>

      <div className="flex flex-col gap-5">
        {budgetItems.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                  <img src={item.icon} className="w-5" alt={item.label} />
                </div>
                <p className="text-gray-200 font-medium">{item.label}</p>
              </div>
              <p className="text-gray-400 text-sm">
                ₹{item.used} / ₹{item.total}
              </p>
            </div>

            <div className="w-full bg-gray-700/40 h-2 rounded-full mt-1">
              <div className="h-full rounded-full bg-white/20" style={{ width: "0%" }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default BudgetStatus;
