import React, { useState } from "react";
import SummaryApi from "../../common";

const RemoveMemberModal = ({ member, clubId, onClose, onConfirm }) => {
  const [showLoader, setShowLoader] = useState(false);

  if (!member) return null;

  const removeMember = async () => {
    if (!member._id || !clubId) return;
    setShowLoader(true);
    try {
      const res = await fetch(SummaryApi.removeMember.url, {
        method: SummaryApi.removeMember.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId, userId: member._id }),
      });
      const data = await res.json();
      if (data.success) {
        onConfirm(member._id); // notify parent to update UI
        onClose(); // close modal
      } else console.error(data.message);
    } catch (err) {
      console.error("Failed to remove member.", err);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Remove Member
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to remove <strong>{member.name}</strong> from the club? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={removeMember}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            disabled={showLoader}
          >
            {showLoader ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
