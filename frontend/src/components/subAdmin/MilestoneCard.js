import React from "react";
import { Edit, Trash2 } from "lucide-react";

const MilestoneCard = ({ milestone, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-gray-200 dark:bg-slate-700  rounded-2xl p-4 mb-4 transition-colors duration-300">
      
      {/* Left section: Image + Details */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/4">
        {milestone.image && (
          <img
            src={milestone.image}
            alt={milestone.title}
            className="w-full md:w-48 h-40 md:h-32 object-cover rounded-xl shadow-sm dark:shadow-slate-700"
          />
        )}
        <div className="flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {milestone.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm my-1">
            {milestone.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(milestone.date).toLocaleDateString()}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                milestone.status === "completed"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                  : milestone.status === "upcoming"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                  : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {milestone.status}
            </span>
          </div>
        </div>
      </div>

      {/* Right section: Icon Buttons without background */}
      <div className="flex gap-3 mt-4 md:mt-0">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:text-yellow-500 dark:hover:text-yellow-400 transition"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:text-red-600 dark:hover:text-red-500 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default MilestoneCard;
