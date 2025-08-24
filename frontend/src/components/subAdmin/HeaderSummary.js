import React from 'react';

const HeaderSummary = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow rounded-2xl mb-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Club Milestones</h1>
        <p className="text-gray-600">Track and manage all important achievements of your club.</p>
      </div>
      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Add Milestone
      </button>
    </div>
  );
};

export default HeaderSummary;
