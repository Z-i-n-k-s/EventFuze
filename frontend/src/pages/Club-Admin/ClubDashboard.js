import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaCalendarAlt,
  FaTrophy,
  FaImage,
  FaSearch,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import EditDetails from "../../components/subAdmin/EditDetails";
import ViewEventDet from "../../components/subAdmin/ViewEventDet";
import SummaryApi from "../../common"; // make sure this path is correct

const ClubDashboard = () => {
  const user = useSelector((state) => state?.user?.user);
  const ClubId = user?.clubs?.find((c) => c.role === "President")?.clubId;

  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false); // added missing loading state
  const [clubData, setClubData] = useState({
    name: "Tech Innovators Club",
    description: "A club for technology enthusiasts and innovators",
    totalMembers: 128,
    totalEvents: 24,
    upcomingEvents: 3,
    milestones: 5,
  });
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!ClubId) return;

    try {
      setLoading(true);
      const response = await fetch(SummaryApi.getEventsByClub.url, {
        method: SummaryApi.getEventsByClub.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId: ClubId }),
      });

      const data = await response.json();

      if (response.ok) {
        setEvents(data.data);
      } else {
        toast.error(data.message || "Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events from server");
    } finally {
      setLoading(false);
    }
  }, [ClubId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-6">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            {clubData.name}
          </h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Members */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaUsers className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {clubData.totalMembers}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Total Members</p>
          </div>
        </div>
        {/* Events */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaCalendarAlt className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {clubData.totalEvents}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Total Events</p>
          </div>
        </div>
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaTrophy className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {clubData.upcomingEvents}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Upcoming Events</p>
          </div>
        </div>
        {/* Milestones */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaImage className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {clubData.milestones}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Milestones</p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 md:mb-0">
            Events
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "recent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("recent")}
            >
              Recent Events
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Events
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Loading events...
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 transition-transform hover:-translate-y-1"
              >
                <div className="mb-3">
                  <img
                      src={event.images[0]}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />

                  <div className="flex justify-between items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                      {event.type}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {event.date}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p>
                    <span className="font-medium">Time:</span> {event.time}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {event.location}
                  </p>
                  <p>
                    <span className="font-medium">Attendees:</span>{" "}
                    {event.attendees}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 px-3 py-3 bg-green-600 text-white text-sm rounded-lg hover:bg-green-900 transition-colors flex items-center justify-center"
                  >
                    <FaEye className="mr-1" /> View Details
                  </button>
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="flex-1 px-3 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              No events found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedEvent && (
        <ViewEventDet
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {editingEvent && (
        <EditDetails
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default ClubDashboard;
