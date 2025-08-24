import { motion } from "framer-motion";
import {
  Plus
} from "lucide-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Cards from "../../components/admin/clubmanagement/Cards";
import ClubList from "../../components/admin/clubmanagement/ClubList";
import DialogueBox from "../../components/admin/clubmanagement/DialogueBox";

const ClubManagement = () => {
  const [clubs, setClubs] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
const [events, setEvents] = useState([]);

// Fetch all events
const fetchEvents = useCallback(async () => {
  try {
    const response = await fetch(SummaryApi.getAllEvents.url, {
      method: SummaryApi.getAllEvents.method,
      credentials: 'include',
    });

    const data = await response.json();

    if (data.success) {
      setEvents(data.data);
    } else {
      toast.error(data.message || "Failed to fetch events");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    toast.error("Failed to fetch events");
  }
}, []);

  // Fetch all clubs from backend
  const fetchClubs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getAllClubs.url, {
        method: SummaryApi.getAllClubs.method,
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setClubs(data.data);
      } else {
        toast.error(data.message || "Failed to fetch clubs");
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
      toast.error("Failed to fetch clubs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load clubs on component mount
  useEffect(() => {
    fetchClubs();
    fetchEvents();
  }, [fetchClubs, fetchEvents]);

  
  // Add new club function for DialogueBox
  const addClub = useCallback(async (formData) => {
    try {
      const response = await fetch(SummaryApi.createClub.url, {
        method: SummaryApi.createClub.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Club created successfully!");
        fetchClubs(); // Refresh the clubs list
      } else {
        toast.error(data.message || "Failed to create club");
      }
    } catch (error) {
      console.error("Error creating club:", error);
      toast.error("Failed to create club");
    }
  }, [fetchClubs]);

const totalEvents = events.length;


  // Update club function for DialogueBox
  const updateClub = useCallback(async (formData) => {
    try {
      const response = await fetch(SummaryApi.updateClub.url, {
        method: SummaryApi.updateClub.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Club updated successfully!");
        fetchClubs(); // Refresh the clubs list
      } else {
        toast.error(data.message || "Failed to update club");
      }
    } catch (error) {
      console.error("Error updating club:", error);
      toast.error("Failed to update club");
    }
  }, [fetchClubs]);

  // Reset form function for DialogueBox
  const resetForm = useCallback(() => {
    setShowCreateForm(false);
    setEditingClub(null);
  }, []);

  const handleEdit = useCallback((club) => {
    setEditingClub(club);
    setShowCreateForm(true);
  }, []);

  const handleDelete = useCallback(async (clubId) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        const response = await fetch(SummaryApi.deleteClub.url, {
          method: SummaryApi.deleteClub.method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ clubId }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(data.message || "Club deleted successfully!");
          fetchClubs(); // Refresh the clubs list
        } else {
          toast.error(data.message || "Failed to delete club");
        }
      } catch (error) {
        console.error("Error deleting club:", error);
        toast.error("Failed to delete club");
      }
    }
  }, [fetchClubs]);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (club.adminName && club.adminName.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const totalClubs = clubs.length;
  const totalMembers = clubs.reduce(
    (sum, club) => sum + (club.members ? club.members.length : 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-600">
              Club Management
            </h1>
            <p className=" mt-1">
              Manage and organize all your clubs
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Club
          </motion.button>
        </div>

        {/* Stats Cards */}
        <Cards
          totalClubs={totalClubs}
          activeClubs={totalClubs}
          totalMembers={totalMembers}
          clubs={clubs}
          totalEvents={totalEvents}
        />

        {/* Search */}
        <div >
          <div className="relative">
            <input
              type="text"
              placeholder="Search clubs by name, description, or admin name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Create/Edit Club Dialog */}
        <DialogueBox
          showCreateForm={showCreateForm}
          resetForm={resetForm}
          editingClub={editingClub}
          addClub={addClub}
          updateClub={updateClub}
        />

        {/* Clubs List */}
        <ClubList
          filteredClubs={filteredClubs}
          moment={moment}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ClubManagement;
