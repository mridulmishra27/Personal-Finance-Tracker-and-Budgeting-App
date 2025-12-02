import React from 'react'
import StatsCards from '../components/Statscards'
import SpendingOverview from '../components/SpendingOverview'
import BudgetStatus from '../components/BudgetStatus'

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Top Section - Financial Overview Cards */}
      <StatsCards />
      
      {/* Bottom Section - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Spending Overview */}
        <SpendingOverview />
        
        {/* Right Column - Budget Status */}
        <BudgetStatus />
      </div>
    </div>
  )
}

export default Home