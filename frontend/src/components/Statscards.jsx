import React from "react";
import { assets } from "../assets/assets"; // your icons

const StatsCards = () => {
  const stats = [
    { title: "Total Income", value: "₹0.00", icon: assets.income_icon, bg: "bg-[#1a233a]" },
    { title: "Total Expenses", value: "₹0.00", icon: assets.expense_icon, bg: "bg-[#1a233a]" },
    { title: "Total Savings", value: "₹0.00", icon: assets.savings_icon, bg: "bg-[#1a233a]" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`${item.bg} p-5 rounded-xl shadow-lg border border-white/5`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-white/10">
              <img src={item.icon} alt="" className="w-6" />
            </div>
            <div>
              <h2 className="text-gray-300 text-sm">{item.title}</h2>
              <h1 className="text-xl font-semibold text-white">{item.value}</h1>
              <p className="text-gray-500 text-xs">No data yet</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
