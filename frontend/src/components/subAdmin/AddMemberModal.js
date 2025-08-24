import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common"; // Adjust the path if needed

const AddMemberModal = ({ onClose, onAdd }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const user = useSelector((state) => state?.user?.user);
  const clubId = user?.clubs?.find((c) => c.role === "President")?.clubId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    if (!clubId) {
      toast.error("Club ID not found. Cannot add member.");
      return;
    }

    if (role === "President") {
      toast.error("You cannot add a member as President directly.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.addMember.url, {
        method: SummaryApi.addMember.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clubId, email, role }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Member added successfully!");
        onAdd({ email, role, status: "Active" });
        onClose();
      } else {
        toast.error(data.message || "Failed to add member");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding member to club");
    }
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
            <option value="VicePresident">Vice President</option>
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
