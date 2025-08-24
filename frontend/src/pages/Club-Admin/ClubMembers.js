import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddMemberModal from "../../components/subAdmin/AddMemberModal";
import RemoveMemberModal from "../../components/subAdmin/RemoveMemberModal";
import SummaryApi from "../../common";

const ClubMembers = () => {
  const user = useSelector((state) => state?.user?.user);
  const presidentClubId = user?.clubs?.find(
    (c) => c.role === "President"
  )?.clubId;

  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Fetch all members
  const fetchAllClubMembers = async () => {
    if (!presidentClubId) return;
    setShowLoader(true);
    try {
      const res = await fetch(SummaryApi.getClubMembers.url, {
        method: SummaryApi.getClubMembers.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId: presidentClubId }),
      });
      const data = await res.json();
      if (data.success) {
        setMembers(
          (data.data || []).map((m) => ({ ...m, status: m.status || "Joined" }))
        );
      } else console.error(data.message);
    } catch (err) {
      console.error("Failed to fetch members.", err);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchAllClubMembers();
  }, [presidentClubId]);

  const filteredMembers =
    members?.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.userId?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleAddMember = (newMember) => {
    setMembers([
      ...members,
      { ...newMember, _id: Date.now().toString(), status: "Joined" },
    ]);
    fetchAllClubMembers();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-6 relative">
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 md:mb-0">
          Club Members
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search members..."
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowAddMember(true)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow-md transition duration-200"
          >
            Add Member
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, index) => (
                <tr
                  key={member._id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0">
                      {member.profilePic ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={`data:image/png;base64,${member.profilePic}`}
                          alt={member.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          {member.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {member.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        member.status === "Joined"
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(member.joinedAt)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {member.status !== "Removed" && (
                      <button
                        onClick={() => setRemoveConfirm(member)}
                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 dark:text-gray-400 py-6"
                >
                  No members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <RemoveMemberModal
        member={removeConfirm}
        clubId={presidentClubId}
        onClose={() => setRemoveConfirm(null)}
        onConfirm={() => fetchAllClubMembers()}
      />

      {showAddMember && (
        <AddMemberModal
          onClose={() => setShowAddMember(false)}
          onAdd={handleAddMember}
        />
      )}
    </div>
  );
};

export default ClubMembers;
