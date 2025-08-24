import React from "react";
import MilestoneCard from "./MilestoneCard";

const MilestonesList = ({ milestones, onEdit, onDelete }) => {
  if (!milestones.length) {
    return <p className="text-gray-500">No milestones found.</p>;
  }

  return (
    <div className="grid gap-4">
      {milestones.map((m) => {
        const milestoneDate = new Date(m.date);
        const today = new Date();
        const status = milestoneDate > today ? "upcoming" : "completed";

        return (
          <MilestoneCard
            key={m._id}
            milestone={{ ...m, status }}
            onEdit={() => onEdit(m)}
            onDelete={() => onDelete(m._id)}
          />
        );
      })}
    </div>
  );
};

export default MilestonesList;
