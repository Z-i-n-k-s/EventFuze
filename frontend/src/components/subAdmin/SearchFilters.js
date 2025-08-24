import React from 'react';

const SearchFilters = ({ searchQuery, setSearchQuery, filter, setFilter, date, setDate }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  mb-4 gap-2">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search milestones..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-1/3 p-2 border rounded-lg border bg-gray-300 dark:bg-slate-700"
      />

      {/* Status Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded-lg outline-none bg-gray-300 dark:bg-slate-700"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="upcoming">Upcoming</option>
        <option value="delayed">Delayed</option>
      </select>

      {/* Date Filter */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border rounded-lg outline-none bg-gray-300 dark:bg-slate-700"
      />
    </div>
  );
};

export default SearchFilters;
