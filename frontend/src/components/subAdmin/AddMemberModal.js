import React, { useState } from "react";

const AddMemberModal = ({ onClose, onAdd }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member"); // default role

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Prevent adding President directly
    if (role === "President") {
      alert("You cannot add a member as President directly.");
      return;
    }

    onAdd({ email, role, status: "Active" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Add New Member
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="pl-4 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="pl-4 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Moderator">Moderator</option>
            <option value="VicePresident">VicePresident</option>
            <option value="President" disabled>
              President
            </option>
          </select>
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
