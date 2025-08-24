import React from "react";

const MilestoneCard = ({ milestone, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow rounded-2xl mb-4 flex justify-between items-center">
      <div>
        {milestone.image && (
          <img
            src={milestone.image}
            alt={milestone.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
        )}
        <h2 className="text-lg font-semibold">{milestone.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
        <p className="text-sm text-gray-400 mb-1">
          {new Date(milestone.date).toLocaleDateString()}
        </p>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            milestone.status === "completed"
              ? "bg-green-100 text-green-700"
              : milestone.status === "upcoming"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {milestone.status}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MilestoneCard;
