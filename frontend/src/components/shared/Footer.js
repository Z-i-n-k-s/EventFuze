

import React from "react";
import Logo from "./Logo";
import { Wallet, PieChart, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user?.user);
  const wallets = useSelector((state) => state.wallets?.list || []);
  const totalBalance = wallets.reduce((sum, w) => sum + (w.balance || 0), 0);
  const monthlyBudget = user?.monthlyBudget || 0;
  
  // Calculate budget utilization percentage
  const budgetUsed = monthlyBudget > 0 ? ((monthlyBudget - totalBalance) / monthlyBudget) * 100 : 0;
  const budgetPercentage = Math.max(0, Math.min(100, budgetUsed));

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Logo & Branding Section */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <div className="flex items-center gap-3">
              <Logo w={140} h={45} />
            </div>
            <p className="text-gray-600 text-sm text-center lg:text-left max-w-xs">
              Smart financial management made simple. Track, budget, and grow your wealth with confidence.
            </p>
            <div className="flex gap-2 mt-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-600 text-xs font-medium">Live Updates</span>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Wallet Balance Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Wallet size={20} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">Total Balance</span>
                  </div>
                  <TrendingUp size={16} className="text-blue-500 opacity-60" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">${totalBalance.toFixed(2)}</p>
                <p className="text-blue-600 text-xs">Across {wallets.length} wallet{wallets.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Monthly Budget Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <DollarSign size={20} className="text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">Monthly Budget</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">${monthlyBudget.toFixed(2)}</p>
                {monthlyBudget > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Used</span>
                      <span className="text-emerald-600">{budgetPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reports & Analytics Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <PieChart size={20} className="text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">Analytics</span>
                  </div>
                  <ArrowRight size={16} className="text-purple-500 opacity-60 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">View Reports</p>
                <p className="text-purple-600 text-xs">Insights & trends</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} FinanceTracker. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Server Status: Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 

export default Footer