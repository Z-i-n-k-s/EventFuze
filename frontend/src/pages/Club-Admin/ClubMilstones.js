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
    <div className="p-6 bg-gray-100 min-h-screen">
      <HeaderSummary onAddClick={() => setIsModalOpen(true)} />
      <SearchFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} filter={filter} setFilter={setFilter} date={date} setDate={setDate} />
      <MilestonesList milestones={filteredMilestones} onEdit={(m) => { setEditingMilestone(m); setIsModalOpen(true); }} onDelete={handleDeleteMilestone} />
      {isModalOpen && <AddMilestoneModal milestone={editingMilestone} onClose={() => { setIsModalOpen(false); setEditingMilestone(null); }} onSave={handleSaveMilestone} />}
    </div>
  );
};

export default ClubMilestones;
