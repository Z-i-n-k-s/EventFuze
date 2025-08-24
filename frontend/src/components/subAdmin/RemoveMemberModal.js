import React, { useState } from "react";
import SummaryApi from "../../common";

const RemoveMemberModal = ({ member, clubId, onClose, onConfirm }) => {
  const [showLoader, setShowLoader] = useState(false);

  if (!member) return null;

  console.error( member, clubId, onClose, onConfirm);

  const removeMember = async () => {
    if (!member?.userId || !clubId) {
      console.error("Missing member ID or club ID");
      return;
    }

    setShowLoader(true);
    try {
      console.log("Removing member:", member.userId, "from club:", clubId);

      const res = await fetch(SummaryApi.removeMember.url, {
        method: SummaryApi.removeMember.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clubId, userId: member.userId }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        // Notify parent to update the UI
        onConfirm(member._id);
        onClose();
      } else {
        console.error("API Error:", data.message);
        alert(data.message || "Failed to remove member.");
      }
    } catch (err) {
      console.error("Failed to remove member:", err);
      alert("Something went wrong while removing the member.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Remove Member
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to remove{" "}
          <strong className="text-red-500">{member.name}</strong> from the club?{" "}
          This action <span className="font-semibold">cannot</span> be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white hover:opacity-80 transition"
            disabled={showLoader}
          >
            Cancel
          </button>
          <button
            onClick={removeMember}
            className={`px-4 py-2 rounded-lg text-white transition ${
              showLoader
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
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
