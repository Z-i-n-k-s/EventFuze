import { motion } from "framer-motion";
import {
  Plus
} from "lucide-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cards from "../../components/admin/clubmanagement/Cards";
import ClubList from "../../components/admin/clubmanagement/ClubList";
import DialogueBox from "../../components/admin/clubmanagement/DialogueBox";

const ClubManagement = () => {
  const [clubs, setClubs] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for demonstration
  useEffect(() => {
    const sampleClubs = [
      {
        id: 1,
        name: "Tech Innovation Club",
        description: "A community of tech enthusiasts focused on innovation, coding, and emerging technologies. We host hackathons, workshops, and networking events.",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
        ],
        milestones: [
          {
            title: "First Hackathon",
            description: "Successfully organized our first hackathon with 50+ participants",
            date: "2023-03-15",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400"
          },
          {
            title: "AI Workshop Series",
            description: "Launched comprehensive AI workshop series",
            date: "2023-06-20"
          }
        ],
        adminId: "admin_001",
        members: [
          { userId: "user_001", role: "President", joinedAt: "2023-01-15" },
          { userId: "user_002", role: "Vice President", joinedAt: "2023-01-20" },
          { userId: "user_003", role: "Moderator", joinedAt: "2023-02-01" },
          { userId: "user_004", role: "Member", joinedAt: "2023-02-15" }
        ],
        createdAt: "2023-01-15",
      },
      {
        id: 2,
        name: "Business Entrepreneurs Network",
        description: "Connecting aspiring entrepreneurs with mentors, investors, and like-minded professionals. Monthly meetups and pitch competitions.",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400"
        ],
        milestones: [
          {
            title: "First Pitch Competition",
            description: "Hosted successful pitch competition with 10 startups",
            date: "2022-10-15",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400"
          }
        ],
        adminId: "admin_002",
        members: [
          { userId: "user_005", role: "President", joinedAt: "2022-08-10" },
          { userId: "user_006", role: "Vice President", joinedAt: "2022-08-15" },
          { userId: "user_007", role: "Member", joinedAt: "2022-09-01" }
        ],
        createdAt: "2022-08-10",
      },
      {
        id: 3,
        name: "Arts & Culture Collective",
        description: "Celebrating creativity through art exhibitions, cultural events, and collaborative projects. Open to all art forms and cultural expressions.",
        images: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8a?w=400",
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400"
        ],
        milestones: [
          {
            title: "First Art Exhibition",
            description: "Successfully organized our first art exhibition",
            date: "2023-04-10"
          }
        ],
        adminId: "admin_003",
        members: [
          { userId: "user_008", role: "President", joinedAt: "2023-03-20" },
          { userId: "user_009", role: "Moderator", joinedAt: "2023-04-01" },
          { userId: "user_010", role: "Member", joinedAt: "2023-04-15" }
        ],
        createdAt: "2023-03-20",
      },
      {
        id: 4,
        name: "Environmental Action Group",
        description: "Dedicated to environmental conservation and sustainability. Organizing clean-up drives, awareness campaigns, and green initiatives.",
        images: [
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
        ],
        milestones: [],
        adminId: "admin_004",
        members: [
          { userId: "user_011", role: "President", joinedAt: "2022-11-05" },
          { userId: "user_012", role: "Member", joinedAt: "2022-11-10" }
        ],
        createdAt: "2022-11-05",
      },
      {
        id: 5,
        name: "Sports & Fitness Community",
        description: "Promoting healthy lifestyles through sports activities, fitness challenges, and wellness programs. All skill levels welcome.",
        images: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
        ],
        milestones: [
          {
            title: "First Fitness Challenge",
            description: "Organized 30-day fitness challenge with 100+ participants",
            date: "2023-07-01"
          }
        ],
        adminId: "admin_005",
        members: [
          { userId: "user_013", role: "President", joinedAt: "2023-06-12" },
          { userId: "user_014", role: "Vice President", joinedAt: "2023-06-15" },
          { userId: "user_015", role: "Moderator", joinedAt: "2023-06-20" }
        ],
        createdAt: "2023-06-12",
      },
      {
        id: 6,
        name: "Science & Research Society",
        description: "Advancing scientific knowledge through research projects, seminars, and collaboration with academic institutions.",
        images: [
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400"
        ],
        milestones: [
          {
            title: "Research Symposium",
            description: "Hosted annual research symposium with 20+ presentations",
            date: "2022-12-15"
          }
        ],
        adminId: "admin_006",
        members: [
          { userId: "user_016", role: "President", joinedAt: "2022-12-01" },
          { userId: "user_017", role: "Member", joinedAt: "2022-12-10" }
        ],
        createdAt: "2022-12-01",
      },
    ];
    setClubs(sampleClubs);
  }, []);



  // Add new club function for DialogueBox
  const addClub = useCallback((formData) => {
    const newClub = {
      id: Date.now(),
      ...formData,
      currentMembers: 0,
      totalEvents: 0,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setClubs(prev => [newClub, ...prev]);
    toast.success("Club created successfully!");
  }, []);

  // Update club function for DialogueBox
  const updateClub = useCallback((formData) => {
    setClubs(prev => 
      prev.map((club) =>
        club.id === editingClub.id
          ? { ...club, ...formData, updatedAt: new Date().toISOString() }
          : club
      )
    );
    toast.success("Club updated successfully!");
  }, [editingClub]);

  // Reset form function for DialogueBox
  const resetForm = useCallback(() => {
    setShowCreateForm(false);
    setEditingClub(null);
  }, []);

  const handleEdit = useCallback((club) => {
    setEditingClub(club);
    setShowCreateForm(true);
  }, []);

  const handleDelete = useCallback((clubId) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      setClubs(prev => prev.filter((club) => club.id !== clubId));
      toast.success("Club deleted successfully!");
    }
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.adminId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const totalClubs = clubs.length;
  const totalMembers = clubs.reduce(
    (sum, club) => sum + (club.members ? club.members.length : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Club Management
            </h1>
            <p className="text-gray-600 mt-1">
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
        />

        {/* Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clubs by name, description, or admin ID..."
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
