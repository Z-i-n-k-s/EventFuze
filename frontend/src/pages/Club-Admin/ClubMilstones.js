import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeaderSummary from "../../components/subAdmin/HeaderSummary";
import SearchFilters from "../../components/subAdmin/SearchFilters";
import MilestonesList from "../../components/subAdmin/MilestonesList";
import AddMilestoneModal from "../../components/subAdmin/AddMilestoneModal";
import SummaryApi from "../../common";
import uploadImage from "../../helpers/uploadImage";

const ClubMilestones = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [date, setDate] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);

  // Delete confirmation modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState(null);

  const user = useSelector((state) => state?.user?.user);

  // Get clubId
  const clubId = user?.clubs?.find((c) => c.role === "President")?.clubId;

  // Fetch milestones
  useEffect(() => {
    if (!clubId) return;

    const fetchMilestones = async () => {
      try {
        const res = await fetch(SummaryApi.getAllMilestones.url, {
          method: SummaryApi.getAllMilestones.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clubId }),
        });
        const data = await res.json();

        if (data.success) {
          setMilestones(data.data || []);
        } else {
          toast.error(data.message || "Failed to fetch milestones");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching milestones");
      }
    };

    fetchMilestones();
  }, [clubId]);

  // Add / Edit milestone
  const handleSaveMilestone = async (milestone) => {
    if (!clubId) return;

    try {
      let imageUrl = milestone.image;
      if (milestone.image instanceof File) {
        const uploaded = await uploadImage([milestone.image], "mern_product");
        imageUrl = uploaded[0].secure_url;
      }

      const body = { clubId, title: milestone.title, description: milestone.description, date: milestone.date, image: imageUrl };
      let url = SummaryApi.addMilestone.url;

      if (editingMilestone) {
        url = SummaryApi.updateMilestone.url;
        body.milestoneId = editingMilestone._id;
      }

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to save milestone");
        return;
      }

      if (editingMilestone) {
        setMilestones((prev) =>
          prev.map((m) => (m._id === editingMilestone._id ? { ...m, ...milestone, image: imageUrl } : m))
        );
      } else {
        const newMilestone = data.data[data.data.length - 1] || milestone;
        setMilestones((prev) => [...prev, newMilestone]);
      }

      setIsModalOpen(false);
      setEditingMilestone(null);
      toast.success(data.message || "Milestone saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error saving milestone");
    }
  };

  // Delete milestone
  const handleDeleteMilestone = async (milestoneId) => {
    if (!clubId) return;

    try {
      const res = await fetch(SummaryApi.deleteMilestone.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId, clubId }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to delete milestone");
        return;
      }

      setMilestones((prev) => prev.filter((m) => m._id !== milestoneId));
      toast.success(data.message || "Milestone deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting milestone");
    }
  };

  // Filter milestones with dynamic status
  const filteredMilestones = milestones
    .map((m) => ({ ...m, status: new Date(m.date) > new Date() ? "upcoming" : "completed" }))
    .filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" || m.status === filter;
      const matchesDate = !date || m.date.slice(0, 10) === date;
      return matchesSearch && matchesFilter && matchesDate;
    });

  return (
    <div className="min-h-screen">
      <HeaderSummary onAddClick={() => setIsModalOpen(true)} />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        date={date}
        setDate={setDate}
      />
      <MilestonesList
        milestones={filteredMilestones}
        onEdit={(m) => { setEditingMilestone(m); setIsModalOpen(true); }}
        onDelete={(m) => { setMilestoneToDelete(m); setDeleteModalOpen(true); }}
      />

      {isModalOpen && (
        <AddMilestoneModal
          milestone={editingMilestone}
          onClose={() => { setIsModalOpen(false); setEditingMilestone(null); }}
          onSave={handleSaveMilestone}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-lg dark:shadow-slate-700 transition-colors duration-300">
            <p className="text-gray-900 dark:text-white text-lg mb-6">
              Are you sure you want to delete "{milestoneToDelete.title}"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setDeleteModalOpen(false); setMilestoneToDelete(null); }}
                className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteMilestone(milestoneToDelete._id);
                  setDeleteModalOpen(false);
                  setMilestoneToDelete(null);
                }}
                className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubMilestones;
