import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#0d1224] shadow-xl p-5 text-gray-300 flex flex-col gap-6 z-10">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-4">
        <img src={assets.logo} alt="logo" className="w-10" />
        <h1 className="text-xl font-semibold text-white">FinanceApp</h1>
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col gap-2">
        <SidebarLink path="/" label="Dashboard" icon={assets.home_icon} />
        <SidebarLink path="/transactions" label="Transactions" icon={assets.transaction_icon} />
        <SidebarLink path="/budget" label="Budget" icon={assets.budget_icon} />
        <SidebarLink path="/goals" label="Goals" icon={assets.goals_icon} />
        <SidebarLink path="/accounts" label="Accounts" icon={assets.accounts_icon} />
        <SidebarLink path="/analytics" label="Analytics" icon={assets.analytics_icon} />
      </nav>

    </div>
  );
};

const SidebarLink = ({ path, label, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg transition-all 
        ${isActive ? "bg-[#1a233a] text-white" : "hover:bg-[#141a2e]"}`
      }
    >
      <img src={icon} className="w-5 opacity-80" alt="" />
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
