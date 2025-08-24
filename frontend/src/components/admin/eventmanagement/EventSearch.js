import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Filter, Search } from "lucide-react";
import React, { useState } from "react";

const EventSearch = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  statusOptions,
}) => {
  const [showDateFilters, setShowDateFilters] = useState(false);
  return (
    <div className=" ">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
            <input
              type="text"
              placeholder="Search events by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-300 dark:bg-slate-600 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 bg-gray-300 dark:bg-slate-600 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDateFilters(!showDateFilters)}
            className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center gap-2 transition-colors ${
              showDateFilters ? 'bg-blue-50 border-blue-300 bg-gray-300 dark:bg-slate-600' : 'hover:bg-gray-50'
            }`}
          >
            <motion.div
              animate={{ rotate: showDateFilters ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Filter className="w-4 h-4" />
            </motion.div>
            <Calendar className="w-4 h-4" />
            Date Filter
          </motion.button>
        </div>
      </div>
      
      {/* Date Range Filters */}
      <AnimatePresence>
        {showDateFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut"
            }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium  mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-300 dark:bg-slate-600"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium  mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-300 dark:bg-slate-600"
                />
              </div>
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="px-4 py-2 bg-green-800 hover:bg-gray-200 hover:text-black rounded-lg transition-colors"
                >
                  Clear Dates
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSearch;
